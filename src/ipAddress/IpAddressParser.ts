import {BinaryParser} from "../binary/BinaryParser";
import {Bit} from "../binary/Bit";
import {BinaryIp} from "./BinaryIp";
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
		return binaryIp.map(octet => BinaryParser.binaryToDecimal(octet)) as DecimalIp;
	}

	public static parseDecimalIpToBinaryIp(decimalIp:DecimalIp):BinaryIp {
		return decimalIp.map(octet => {
			return BinaryParser.decimalToBinary(octet, IpAddressConfig.RAW_BINARY_OCTET_LENGTH);
		}) as BinaryIp;
	}

	public static parseRawBinaryIpToBinaryIp(rawBinaryIp:Bit[]):BinaryIp {
	}
}