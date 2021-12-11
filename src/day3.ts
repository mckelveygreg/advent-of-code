import { day3data } from "./day3data"

type Bit = "0" | "1"
type Data =
	`${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}${Bit}`
const data = day3data as Data[]

// part 1
// find most common bit
const gammaBinary = data
	.reduce((all, curr) => {
		const bits = curr.split("") as Bit[]
		bits.forEach((bit, i) => {
			if (bit === "1") {
				all[i] = (all[i] || 0) + 1
			}
		})
		return all
	}, [] as number[])
	.map(n => (n >= data.length / 2 ? 1 : 0))
	.join("")
const gamma = parseInt(gammaBinary, 2)
const epsilonBinary = gammaBinary
	.split("")
	.map(bit => (bit === "1" ? "0" : "1"))
	.join("")
const epsilon = parseInt(epsilonBinary, 2)

// part 2
// filter data by each gamma bit
const bitCount = (d: Data[], index: number) => {
	return d
		.map(curr => curr[index])
		.reduce((all, curr) => {
			all["1"] = (all["1"] || 0) + (curr === "1" ? 1 : 0)
			all["0"] = (all["0"] || 0) + (curr === "0" ? 1 : 0)
			return all
		}, {} as { ["1"]: number; ["0"]: number })
}
const filterData = (
	d: Data[],
	bit: Bit,
	index: number,
	findMin?: boolean
): string => {
	const filteredD = d.filter(curr => curr[index] === bit)

	if (filteredD.length === 1) {
		return filteredD[0]
	}
	const nextIndex = index + 1
	const bits = bitCount(filteredD, nextIndex)

	if (findMin) {
		const nextBit = bits["0"] <= bits["1"] ? "0" : "1"
		return filterData(filteredD, nextBit, nextIndex, findMin)
	} else {
		const nextBit = bits["0"] > bits["1"] ? "0" : "1"
		return filterData(filteredD, nextBit, nextIndex)
	}
}
const bits = bitCount(data, 0)
const maxFirstBit = bits["0"] > bits["1"] ? "0" : "1"
const oxygenData = filterData(data, maxFirstBit, 0)

const oxygen = parseInt(oxygenData, 2)

const minFirstBit = bits["0"] <= bits["1"] ? "0" : "1"
const c02Data = filterData(data, minFirstBit, 0, true)

const c02 = parseInt(c02Data, 2)
export const day3 = {
	data: {
		gammaBinary,
		epsilonBinary,
	},
	part1: {
		gamma,
		epsilon,
		answer: gamma * epsilon,
	},
	part2: {
		oxygen,
		c02,
		answer: oxygen * c02,
	},
}
