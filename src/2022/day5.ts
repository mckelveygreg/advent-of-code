import { data } from "./day5data"

// Parse the input string to extract the initial configuration of the stacks and the rearrangement procedure
const input = data.split("\n")
const split = input.findIndex((x) => x === "")
const indexes = input
	.at(split - 1)
	?.split("")
	// return the index number of each number in the string
	.map((x, i) => (x === " " ? undefined : i))
	// filter out the undefined values
	.flatMap((x) => (x ? [x] : []))
if (!indexes) throw new Error("No indexes found")
console.log(indexes)

const stacks = input
	.slice(0, split - 1)
	.reduce<string[][]>(
		(all, curr) => {
			const currArr = curr.split("")
			indexes.forEach((column, index) => {
				const letter = currArr[column]

				if (letter) {
					if (!all?.[index]) all[index] = []
					all[index]?.push(letter)
				}
			})
			return all
		},
		[[]]
	)
	.map((arr) => arr.flatMap((x) => (x === " " ? [] : [x])))

/**
 * move 4 from 9 to 1
 * move 6 from 3 to 1
 * move 7 from 4 to 1
 */
// break up the above commands into an tuple of [number, from, to]
const commands = input
	.slice(split + 1)
	.map((x) => x.split(" "))
	.map((x) => [parseInt(x[1], 10), parseInt(x[3], 10), parseInt(x[5], 10)])

// recursively move the number of crates from one stack to another
function moveCrate(
	newStacks: string[][],
	from: number,
	to: number,
	num: number
): string[][] {
	if (num === 0) return newStacks
	// pop first element from stack

	const crate = newStacks[from - 1]?.shift()
	if (!crate) {
		console.log(newStacks, from, to, num)
		throw new Error("No crate to move")
	}
	newStacks[to - 1].unshift(crate)
	return moveCrate(newStacks, from, to, num - 1)
}
// deep copy array
const stacksPart1 = JSON.parse(JSON.stringify(stacks)) as string[][]
// execute the commands
commands.forEach(([num, from, to]) => {
	moveCrate(stacksPart1, from, to, num)
})
console.log("reordered stacks")
console.log(stacksPart1)
console.log(stacksPart1.map((c) => c.filter(Boolean).at(0)).join(""))

// Part 2
// instead, move creates in a group from one stack to another
function moveCrateGroup(
	newStacks: string[][],
	from: number,
	to: number,
	num: number
) {
	console.log("start", newStacks, from, to, num)
	const crates = newStacks[from - 1]?.splice(0, num)
	if (!crates) {
		throw new Error("No crate to move")
	}
	newStacks[to - 1].unshift(...crates)
	console.log("newStacks", newStacks)
}
// deep copy array
const stacksPart2 = JSON.parse(JSON.stringify(stacks)) as string[][]
// execute the commands
commands.forEach(([num, from, to]) => {
	moveCrateGroup(stacksPart2, from, to, num)
})
console.log("reordered stacks2")
console.log(stacksPart2.map((c) => c.filter(Boolean).at(0)).join(""))
