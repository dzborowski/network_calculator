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
}