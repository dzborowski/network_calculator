import {Bit} from "./Bit";

export class BinaryParser {
	protected static readonly RADIX = 2;

	public static binaryToDecimal(binary:Bit[]):number {
		const binaryString = binary.join("");
		return Number.parseInt(binaryString, BinaryParser.RADIX);
	}

	public static decimalToBinary(decimal:number):Bit[] {
		const bits = decimal.toString(BinaryParser.RADIX).split("");
		return bits.map(bit => Number.parseInt(bit));
	}
}