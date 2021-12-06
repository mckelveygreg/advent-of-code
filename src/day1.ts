import { day1data } from "./day1data"

const data: number[] = day1data.split("\n").map(n => Number(n))
const part1 = data.reduce(
	(all, curr) => {
		if (!all.prev) {
			console.log("init", all)
			all.prev = curr
			all.count = 0
			return all
		}

		if (all.prev < curr) {
			all.count++
		}
		all.prev = curr
		return all
	},
	{ prev: 0, count: 0 }
)
console.log({ part1 })

const slidingWindow = data
	.map((d, i, arr) => [d, arr[i + 1], arr[i + 2]].filter(Boolean))
	.map(d => d.reduce((a, b) => a + b, 0))

const part2 = slidingWindow.reduce(
	(all, curr) => {
		if (!all.prev) {
			console.log("init", all)
			all.prev = curr
			all.count = 0
			return all
		}
		if (all.prev < curr) {
			all.count++
		}
		all.prev = curr
		return all
	},
	{ prev: 0, count: 0 }
)
console.log({ part2 })

export const day1 = {
	part1,
	part2,
}
