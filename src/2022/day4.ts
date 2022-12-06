import { data } from "./day4data"

function fullyContains(a1: string, a2: string): boolean {
	// Split the assignments into start and end values.
	const [start1, end1] = a1.split("-").map((x) => parseInt(x, 10))
	const [start2, end2] = a2.split("-").map((x) => parseInt(x, 10))
	// count2 < 20 &&
	// 	console.log(start1, end1, start2, end2, start1 <= start2 && end1 >= end2)
	// count2++
	// Check if the first assignment fully contains the second assignment.
	return (
		(start1 <= start2 && end1 >= end2) || (start2 <= start1 && end2 >= end1)
	)
}

// Sample input.
const assignments = data.split("\n")
console.log(assignments)

// Count the number of pairs that fully contain each other.
let count = 0
for (const a of assignments) {
	const [a1, a2] = a.split(",")
	if (fullyContains(a1, a2)) {
		count += 1
	}
}

// Print the result.
console.log("part1: ", count)

// Part 2

// Find the number of assignments that have any overlap at all.
let count2 = 0
for (const a of assignments) {
	const [a1, a2] = a.split(",")
	const [start1, end1] = a1.split("-").map((x) => parseInt(x, 10))
	const [start2, end2] = a2.split("-").map((x) => parseInt(x, 10))
	if (
		(start1 <= start2 && start2 <= end1) ||
		(start1 <= end2 && end2 <= end1) ||
		(start2 <= start1 && start1 <= end2) ||
		(start2 <= end1 && end1 <= end2)
	) {
		count2 += 1
		console.log(a1, a2)
	}
}

// Print the result.
console.log("part2: ", count2)
