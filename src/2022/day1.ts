import { data } from "./day1data"

// Part 1
// split by blank lines
// split each group by newlines
// convert each item to a number
// sum numbers in each group
// find largest sum

const groups = data
	.split("\n")
	.map(Number)
	.reduce<number[][]>(
		(all, curr) => {
			const last = all[all.length - 1]
			if (curr === 0) {
				all.push([])
			} else {
				last.push(curr)
			}
			return all
		},
		[[]]
	)
const sums = groups.map((group) => group.reduce((a, b) => a + b, 0))

const largest = sums.reduce((a, b) => Math.max(a, b), 0)

console.log("Largest number:", largest)

// Part 2
// find the total of the top largest numbers

const top = sums.sort((a, b) => b - a).slice(0, 3)

const total = top.reduce((a, b) => a + b, 0)

console.log("Total of top 3 elves:", total)
