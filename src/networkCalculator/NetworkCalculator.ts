import {BitValue} from "../binary/Bit";
import {BinaryIp, BinaryOctet, RawBinaryIpLength, RawBinaryOctetLength} from "../ipAddress/BinaryIp";
import {IpAddress} from "../ipAddress/IpAddress";

export class NetworkCalculator {
	constructor(protected ipAddress:IpAddress) {}

	public calculateMaskFromIpAddress():BinaryIp {
		const mask:BinaryIp = [
			new Array(RawBinaryOctetLength).fill(BitValue.Positive) as BinaryOctet,
			new Array(RawBinaryOctetLength).fill(BitValue.Positive) as BinaryOctet,
			new Array(RawBinaryOctetLength).fill(BitValue.Positive) as BinaryOctet,
			new Array(RawBinaryOctetLength).fill(BitValue.Positive) as BinaryOctet,
		];

		const rawMask = new Array(RawBinaryIpLength).fill(BitValue.Positive);

		for (let i = 0; i < RawBinaryIpLength; i++) {
			if (i < this.ipAddress.mask)
				rawMask[i] = BitValue.Negative;
		}

		mask.forEach((octet, i) => mask[i] = rawMask.splice(0, 8) as BinaryOctet);

		return mask;
	}
}