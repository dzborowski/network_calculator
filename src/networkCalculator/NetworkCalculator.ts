import {BinaryOctet} from "../binary/BinaryOctet";
import {BitValue} from "../binary/Bit";
import {BinaryIp} from "../ipAddress/BinaryIp";
import {IpAddress} from "../ipAddress/IpAddress";
import {IpAddressConfig} from "../ipAddress/IpAddressConfig";

export class NetworkCalculator {
	constructor(protected ipAddress:IpAddress) {}

	public getBinaryMaskFromIpAddress():BinaryIp {
		const rawBinaryMask = new Array(IpAddressConfig.RAW_BINARY_IP_LENGTH).fill(BitValue.POSITIVE);

		for (let i = 0; i < IpAddressConfig.RAW_BINARY_IP_LENGTH; i++) {
			if (i < this.ipAddress.mask)
				rawBinaryMask[i] = BitValue.NEGATIVE;
		}

		const binaryMask:BinaryIp = [
			new Array(IpAddressConfig.RAW_BINARY_OCTET_LENGTH).fill(BitValue.POSITIVE) as BinaryOctet,
			new Array(IpAddressConfig.RAW_BINARY_OCTET_LENGTH).fill(BitValue.POSITIVE) as BinaryOctet,
			new Array(IpAddressConfig.RAW_BINARY_OCTET_LENGTH).fill(BitValue.POSITIVE) as BinaryOctet,
			new Array(IpAddressConfig.RAW_BINARY_OCTET_LENGTH).fill(BitValue.POSITIVE) as BinaryOctet,
		];

		binaryMask.forEach((octet, i) => binaryMask[i] = rawBinaryMask.splice(0, 8) as BinaryOctet);
		return binaryMask;
	}
}