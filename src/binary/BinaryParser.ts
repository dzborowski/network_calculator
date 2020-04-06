import {Bit} from "./Bit";

export class BinaryParser {
	public static readonly radix = 2;

	public static bitsToNumber(bits:Bit[]):number {
		const binaryString = bits.join("");
		return Number.parseInt(binaryString, BinaryParser.radix);
	}

	public static numberToBits(num:number):Bit[] {
		const bits = num.toString(BinaryParser.radix).split("");
		return bits.map(bit => Number.parseInt(bit));
	}
}