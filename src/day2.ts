import { day2data } from "./day2data"
type Instruction = "up" | "down" | "forward"
const data = day2data.split("\n").map(x => {
	const inst = x.split(" ")
	return [inst[0] as Instruction, parseInt(inst[1])] as const
})
const horizontal = data
	.filter(x => x[0] === "forward")
	?.reduce((total, curr) => total + curr[1], 0)

const vertical = data
	.filter(predicate => predicate[0] === "up" || predicate[0] === "down")
	.reduce((total, curr) => {
		if (curr[0] === "up") {
			return total - curr[1]
		} else {
			return total + curr[1]
		}
	}, 0)

const part1 = {
	horizontal,
	vertical,
	answer: horizontal * vertical,
}

const position = data.reduce(
	(total, curr) => {
		switch (curr[0]) {
			case "forward":
				total = {
					horizontal: total.horizontal + curr[1],
					depth: total.depth + curr[1] * total.aim,
					aim: total.aim,
				}
				return total
			case "up":
				total = {
					...total,
					aim: total.aim - curr[1],
				}
				return total
			case "down":
				total = {
					...total,
					aim: total.aim + curr[1],
				}
				return total
		}
	},
	{ horizontal: 0, depth: 0, aim: 0 }
)

const part2 = {
	...position,
	answer: position.horizontal * position.depth,
}

export const day2 = {
	part1,
	part2,
}
