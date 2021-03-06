import {Bit, BitValue} from "./Bit";

export class BinaryParser {
	protected static readonly RADIX = 2;

	public static binaryToDecimal(binary:Bit[]):number {
		const binaryString = binary.join("");
		return Number.parseInt(binaryString, BinaryParser.RADIX);
	}

	public static decimalToBinary(decimal:number, fillTo:number):Bit[] {
		const binary = decimal.toString(BinaryParser.RADIX).split("");
		const parsedBinary = binary.map(bit => Number.parseInt(bit));

		if (parsedBinary.length >= fillTo)
			return parsedBinary;

		const missingBinaryQuantity = fillTo - parsedBinary.length;
		const missingBinary = new Array(missingBinaryQuantity).fill(BitValue.POSITIVE);

		return [...missingBinary, ...parsedBinary];
	}
}