import {IpAddressConfig} from "./IpAddressConfig";
import {IpAddressParser} from "./IpAddressParser";

export class IpAddressValidator {
	constructor(protected ipAddress:string) {}

	public isIpAddressValid():boolean {
		return this.isIpAddressBaseStructureValid() && this.isIpAddressDeepStructureValid();
	}

	protected isIpAddressBaseStructureValid():boolean {
		const ipAddressBaseStructure = "^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\/[0-9]{1,2}$";
		return new RegExp(ipAddressBaseStructure).test(this.ipAddress);
	}

	protected isIpAddressDeepStructureValid():boolean {
		const parsedIpAddress = IpAddressParser.getParsedIpAddress(this.ipAddress);
		return (
			this.isIpOctetValid(parsedIpAddress.firstOctet) &&
			this.isIpOctetValid(parsedIpAddress.secondOctet) &&
			this.isIpOctetValid(parsedIpAddress.thirdOctet) &&
			this.isIpOctetValid(parsedIpAddress.fourthOctet) &&
			this.isIpMaskValid(parsedIpAddress.mask)
		);
	}

	protected isIpOctetValid(octet:number):boolean {
		return octet >= IpAddressConfig.MIN_IP_OCTET_VALUE && octet <= IpAddressConfig.MAX_IP_OCTET_VALUE;
	}

	protected isIpMaskValid(mask:number):boolean {
		return mask >= IpAddressConfig.MIN_IP_MASK_VALUE && mask <= IpAddressConfig.MAX_IP_MASK_VALUE;
	}
}