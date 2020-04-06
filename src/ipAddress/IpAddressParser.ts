import {BinaryParser} from "../binary/BinaryParser";
import {BinaryIp} from "./BinaryIp";
import {DecimalIp} from "./DecimalIp";
import {IpAddress} from "./IpAddress";

export class IpAddressParser {
	public static getParsedIpAddress(ipAddress:string):IpAddress {
		const [octets, mask] = ipAddress.split("/");
		const parsedOctets = octets.split(".").map(octet => Number.parseInt(octet));

		return {
			firstOctet: parsedOctets[0],
			secondOctet: parsedOctets[1],
			thirdOctet: parsedOctets[2],
			fourthOctet: parsedOctets[3],
			mask: Number.parseInt(mask),
		};
	}

	public static parseBinaryIpToDecimalIp(binaryIp:BinaryIp):DecimalIp {
		return binaryIp.map(octet => BinaryParser.binaryToDecimal(octet)) as DecimalIp;
	}

	public static parseDecimalIpToBinaryIp(decimalIp:DecimalIp):BinaryIp {
		return decimalIp.map(octet => BinaryParser.decimalToBinary(octet)) as BinaryIp;
	}
}