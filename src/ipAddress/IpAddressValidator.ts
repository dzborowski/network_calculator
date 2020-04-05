import {IpAddressParser} from "./IpAddressParser";

export class IpAddressValidator {
	protected readonly MIN_IP_OCTET_VALUE = 0;
	protected readonly MAX_IP_OCTET_VALUE = 255;
	protected readonly MIN_IP_MASK_VALUE = 0;
	protected readonly MAX_IP_MASK_VALUE = 32;

	constructor(protected ipAddress:string) {

	}

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
		return octet >= this.MIN_IP_OCTET_VALUE && octet <= this.MAX_IP_OCTET_VALUE;
	}

	protected isIpMaskValid(mask:number):boolean {
		return mask >= this.MIN_IP_MASK_VALUE && mask <= this.MAX_IP_MASK_VALUE;
	}
}