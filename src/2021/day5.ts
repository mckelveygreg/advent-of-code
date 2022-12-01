import { day5data } from "./day5data"
// make array of coordinate points from number[][][]
// example: [[{x1: 0, y1: 0}, {x2: 1, y2: 1}], [{x1: 0, y1: 0}, {x2: 1, y2: 1}]]
//

type Coordinate1 = { x1: number; y1: number }
type Coordinate2 = { x2: number; y2: number }

const data = day5data.map(line =>
	line.map((coord, coordIdx) => {
		if (coordIdx === 0) {
			return {
				x1: coord[0],
				y1: coord[1],
			} as Coordinate1
		} else {
			return {
				x2: coord[0],
				y2: coord[1],
			} as Coordinate2
		}
	})
) as [Coordinate1, Coordinate2][]
// const maxX = Math.max(...data.flatMap(coord => [coord[0].x1, coord[1].x2]))
// console.log({ maxX })
// const maxY = Math.max(...data.flatMap(coord => [coord[0].y1, coord[1].y2]))
// console.log({ maxY })

const makeMatrix = (_d: typeof data) => {
	// const matrix: number[][] = [[]]
	// maybe use a map?
}
console.log(makeMatrix(data))
export const day5 = {
	part1: "TODO",
	part2: "TODO",
}
