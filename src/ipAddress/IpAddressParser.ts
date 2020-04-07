import {BinaryParser} from "../binary/BinaryParser";
import {BinaryIp, BinaryOctetIp} from "./BinaryIp";
import {DecimalIp} from "./DecimalIp";
import {IpAddress} from "./IpAddress";
import {IpAddressConfig} from "./IpAddressConfig";

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

	public static getDecimalIpFromIpAddress(ipAddress:IpAddress):DecimalIp {
		return Object.values(ipAddress).slice(0, 4) as DecimalIp;
	}

	public static parseBinaryIpToDecimalIp(binaryIp:BinaryIp):DecimalIp {
		const binaryOctetsIp = IpAddressParser.parseBinaryIpToBinaryOctetsIp(binaryIp);
		return binaryOctetsIp.map(binaryOctet => BinaryParser.binaryToDecimal(binaryOctet)) as DecimalIp;
	}

	public static parseDecimalIpToBinaryIp(decimalIp:DecimalIp):BinaryIp {
		return decimalIp.map(octet => {
			return BinaryParser.decimalToBinary(octet, IpAddressConfig.BINARY_OCTET_LENGTH);
		}).flat() as BinaryIp;
	}

	public static parseBinaryIpToBinaryOctetsIp(binaryIp:BinaryIp):BinaryOctetIp {
		const binaryIpCopy = [...binaryIp];
		const binaryOctetsIp = [];

		while (binaryIpCopy.length)
			binaryOctetsIp.push(binaryIpCopy.splice(0, IpAddressConfig.BINARY_OCTET_LENGTH));

		return binaryOctetsIp as BinaryOctetIp;
	}
}