import {BitValue} from "../binary/Bit";
import {BinaryIp} from "../ipAddress/BinaryIp";
import {IpAddress} from "../ipAddress/IpAddress";
import {IpAddressConfig} from "../ipAddress/IpAddressConfig";

export class NetworkCalculator {
	constructor(protected ipAddress:IpAddress) {}

	public getMaskBinaryIpFromIpAddress():BinaryIp {
		const binaryMask = this.getInitialBinaryIp();

		for (let i = 0; i < IpAddressConfig.BINARY_IP_LENGTH; i++) {
			if (i < this.ipAddress.mask)
				binaryMask[i] = BitValue.NEGATIVE;
		}

		return binaryMask;
	}

	public getNetworkBinaryIp(hostBinaryIp:BinaryIp, maskBinaryIp:BinaryIp):BinaryIp {
		const maskLength = maskBinaryIp.filter(bit => bit === BitValue.NEGATIVE).length;
		const networkBinaryIp = this.getInitialBinaryIp();

		for (let i = 0; i < IpAddressConfig.BINARY_IP_LENGTH; i++) {
			if (i < maskLength)
				networkBinaryIp[i] = hostBinaryIp[i];
		}

		return networkBinaryIp;
	}

	protected getInitialBinaryIp():BinaryIp {
		return new Array(IpAddressConfig.BINARY_IP_LENGTH).fill(BitValue.POSITIVE) as BinaryIp;
	}
}