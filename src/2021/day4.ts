import { day4data } from "./day4data"

type Board = { number: number; picked?: boolean }[][]

const data = day4data.split("\n")
const answers = data[0].split(",").map(Number)

const findSum = (board: Board) => {
	const sum = board.reduce((sum, row) => {
		return (
			sum +
			row.reduce((sum, seat) => {
				return sum + (seat.picked ? 0 : seat.number)
			}, 0)
		)
	}, 0)
	return sum
}

const play = (findLast?: boolean) => {
	const bds: Board[] = data
		.slice(1)
		.map(x =>
			x
				.split(" ")
				.map(x => parseInt(x))
				.filter(x => {
					return !isNaN(x)
				})
		)
		.reduce<{ number: number; picked?: boolean }[][][]>(
			(all, curr) => {
				if (curr.length === 0) {
					all.push([])
					return all
				}
				const row = curr.map(x => ({ number: x, picked: false }))
				all[all.length - 1].push(row)
				return all
			},
			[[]]
		)

	let bingo:
		| { board: Board; round: number; number: number; boardIdx?: number }
		| undefined
	const winners: {
		boardIdx?: number
	}[] = []
	answers.map((a, round) => {
		bds.forEach((board, boardIndex) => {
			board.forEach(row => {
				row.forEach((seat, seatIndex) => {
					const isWinningBoard = winners.find(x => x.boardIdx === boardIndex)
					if ((bingo && !findLast) || (findLast && isWinningBoard)) {
						return
					}
					if (seat.number === a) {
						seat.picked = true
					}
					// return if row is full
					if (row.every(x => x.picked)) {
						bingo = {
							round,
							number: a,
							board: bds[boardIndex],
							boardIdx: boardIndex,
						}
						if (findLast) {
							winners.push({
								boardIdx: boardIndex,
							})
							return
						}
					}
					// return if column is full
					// if every seat  in board[i] is picked
					if (board.every(x => x[seatIndex].picked)) {
						bingo = {
							board: bds[boardIndex],
							round,
							number: a,
							boardIdx: boardIndex,
						}
						if (findLast) {
							winners.push({
								boardIdx: boardIndex,
							})
						}
						return
					}
				})
			})
		})
	})

	// sum of unmarked seats in bingo board
	if (bingo) {
		return findSum(bingo.board) * bingo.number
	}
}

const part1 = play()
// part 2: find which board wins last!
const part2 = play(true)

export const day4 = {
	part1,
	part2,
}
