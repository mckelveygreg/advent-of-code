import { data } from "./day3data"

// rucksacks is a list of strings, each representing the items in a rucksack
const rucksacks = data.split("\n")

let totalPriority = 0

for (const rucksack of rucksacks) {
	// Split the items in the rucksack into two compartments
	const compartmentSize = rucksack.length / 2
	const compartment1 = rucksack.slice(0, compartmentSize)
	const compartment2 = rucksack.slice(compartmentSize)

	// Find the items that appear in both compartments
	const itemsInCompartment1 = new Set<string>()
	for (const item of compartment1) {
		itemsInCompartment1.add(item)
	}

	let foundPriority = 0
	for (const item of compartment2) {
		if (itemsInCompartment1.has(item)) {
			// Find the priority of the item
			let priority = 0
			if (item >= "a" && item <= "z") {
				priority = item.charCodeAt(0) - "a".charCodeAt(0) + 1
			} else if (item >= "A" && item <= "Z") {
				priority = item.charCodeAt(0) - "A".charCodeAt(0) + 27
			}

			// Only add the priority to the total once
			if (foundPriority === 0) {
				totalPriority += priority
			}
			foundPriority = priority
		}
	}
}

// The total priority is the sum of the priorities of the items that appear in both compartments
console.log(totalPriority)

// part 2
let totalPriority2 = 0

for (let i = 0; i < rucksacks.length; i += 3) {
	// Get the rucksacks in the current group of three Elves
	const rucksack1 = rucksacks[i]
	const rucksack2 = rucksacks[i + 1]
	const rucksack3 = rucksacks[i + 2]

	// Find the items that appear in all three rucksacks
	const itemsInRucksack1 = new Set<string>()
	for (const item of rucksack1) {
		itemsInRucksack1.add(item)
	}

	const itemsInRucksack2 = new Set<string>()
	for (const item of rucksack2) {
		itemsInRucksack2.add(item)
	}

	const itemsInRucksack3 = new Set<string>()
	for (const item of rucksack3) {
		itemsInRucksack3.add(item)
	}

	let foundPriority = 0
	for (const item of rucksack1) {
		if (itemsInRucksack2.has(item) && itemsInRucksack3.has(item)) {
			// Find the priority of the item
			let priority = 0
			if (item >= "a" && item <= "z") {
				priority = item.charCodeAt(0) - "a".charCodeAt(0) + 1
			} else if (item >= "A" && item <= "Z") {
				priority = item.charCodeAt(0) - "A".charCodeAt(0) + 27
			}

			// Only add the priority to the total once
			if (foundPriority === 0) {
				totalPriority2 += priority
			}
			foundPriority = priority
		}
	}
}

console.log(totalPriority2)
