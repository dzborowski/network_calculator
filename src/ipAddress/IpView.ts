import {BinaryIp} from "./BinaryIp";
import {DecimalIp} from "./DecimalIp";
import {IpAddressParser} from "./IpAddressParser";

export class IpView {
	public static displayBinaryIpAsDecimalIp(binaryIp:BinaryIp) {
		const formattedDecimalIp = IpView.getFormattedDecimalIpFromBinaryIp(binaryIp);
		console.log(formattedDecimalIp);
	}

	protected static getFormattedDecimalIpFromBinaryIp(binaryIp:BinaryIp):string {
		const decimalIp = IpAddressParser.parseBinaryIpToDecimalIp(binaryIp);
		return decimalIp.join(".");
	}

	public static displayDecimalIpAsBinaryIp(decimalIp:DecimalIp) {
		const formattedBinaryIp = IpView.getFormattedBinaryIpFromDecimalIp(decimalIp);
		console.log(formattedBinaryIp);
	}

	protected static getFormattedBinaryIpFromDecimalIp(decimalIp:DecimalIp):string {
		const binaryIp = IpAddressParser.parseDecimalIpToBinaryIp(decimalIp);
		const binaryOctetsIp = IpAddressParser.parseBinaryIpToBinaryOctetsIp(binaryIp);
		return binaryOctetsIp
			.reduce((binaryOctets, binaryOctet) => [...binaryOctets, binaryOctet.join("")], [])
			.join(".");
	}
}