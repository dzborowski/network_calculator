import {BinaryOctet} from "../binary/BinaryOctet";
import {Bit, BitValue} from "../binary/Bit";
import {BinaryIp} from "../ipAddress/BinaryIp";
import {IpAddress} from "../ipAddress/IpAddress";
import {IpAddressConfig} from "../ipAddress/IpAddressConfig";

export class NetworkCalculator {
	constructor(protected ipAddress:IpAddress) {}

	public getMaskBinaryIpFromIpAddress():BinaryIp {
		const rawBinaryMask = this.getRawBinaryIp();

		for (let i = 0; i < IpAddressConfig.RAW_BINARY_IP_LENGTH; i++) {
			if (i < this.ipAddress.mask)
				rawBinaryMask[i] = BitValue.NEGATIVE;
		}

		const binaryMask:BinaryIp = [
			this.getRawBinaryOctet() as BinaryOctet,
			this.getRawBinaryOctet() as BinaryOctet,
			this.getRawBinaryOctet() as BinaryOctet,
			this.getRawBinaryOctet() as BinaryOctet,
		];

		binaryMask.forEach((octet, i) => binaryMask[i] = rawBinaryMask.splice(0, 8) as BinaryOctet);
		return binaryMask;
	}

	// public getNetworkBinaryIp(hostBinaryIp:BinaryIp, maskBinaryIp:BinaryIp):BinaryIp {
	public getNetworkBinaryIp(hostBinaryIp:BinaryIp, maskBinaryIp:BinaryIp) {
		const maskLength = maskBinaryIp.flat().filter(bit => bit === BitValue.NEGATIVE).length;
		const hostRawBinaryIp = hostBinaryIp.flat() as Bit[];
		const networkRawBinaryIp = this.getRawBinaryIp();

		for (let i = 0; i < IpAddressConfig.RAW_BINARY_IP_LENGTH; i++) {
			if (i < maskLength)
				networkRawBinaryIp[i] = hostRawBinaryIp[i];
		}
	}

	protected getRawBinaryIp():Bit[] {
		return new Array(IpAddressConfig.RAW_BINARY_IP_LENGTH).fill(BitValue.POSITIVE);
	}

	protected getRawBinaryOctet():Bit[] {
		return new Array(IpAddressConfig.RAW_BINARY_OCTET_LENGTH).fill(BitValue.POSITIVE);
	}
}