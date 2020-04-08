import {isEqual} from "lodash";
import {BitValue} from "../binary/Bit";
import {BinaryIp} from "../ipAddress/interfaces/BinaryIp";
import {DecimalIp} from "../ipAddress/interfaces/DecimalIp";
import {IpAddress} from "../ipAddress/interfaces/IpAddress";
import {IpAddressConfig} from "../ipAddress/IpAddressConfig";
import {NetworkClass} from "./NetworkClass";

export class NetworkCalculator {
	constructor(protected ipAddress:IpAddress) {}

	public getMaskBinaryIpFromIpAddress():BinaryIp {
		const maskBinaryIp = this.getPositiveInitialBinaryIp();

		for (let i = 0; i < IpAddressConfig.BINARY_IP_LENGTH; i++) {
			if (i < this.ipAddress.mask)
				maskBinaryIp[i] = BitValue.NEGATIVE;
		}

		return maskBinaryIp;
	}

	public getNetworkBinaryIp(hostBinaryIp:BinaryIp, maskBinaryIp:BinaryIp):BinaryIp {
		const maskLength = this.getMaskBinaryIpLength(maskBinaryIp);
		const networkBinaryIp = this.getPositiveInitialBinaryIp();

		for (let i = 0; i < IpAddressConfig.BINARY_IP_LENGTH; i++) {
			if (i < maskLength)
				networkBinaryIp[i] = hostBinaryIp[i];
		}

		return networkBinaryIp;
	}

	public getNetworkClass(binaryIp:BinaryIp):NetworkClass {
		if (isEqual(binaryIp.slice(0, 1), [0]))
			return NetworkClass.A;
		else if (isEqual(binaryIp.slice(0, 2), [1, 0]))
			return NetworkClass.B;
		else if (isEqual(binaryIp.slice(0, 3), [1, 1, 0]))
			return NetworkClass.C;
		else if (isEqual(binaryIp.slice(0, 4), [1, 1, 1, 0]))
			return NetworkClass.D;
		else if (isEqual(binaryIp.slice(0, 4), [1, 1, 1, 1]))
			return NetworkClass.E;
		else
			throw new Error("Unknown network class");
	}

	public getBroadcastBinaryIp(hostBinaryIp:BinaryIp, maskBinaryIp:BinaryIp):BinaryIp {
		const maskLength = this.getMaskBinaryIpLength(maskBinaryIp);
		const broadcastBinaryIp = this.getNegativeInitialBinaryIp();

		for (let i = 0; i < IpAddressConfig.BINARY_IP_LENGTH; i++) {
			if (i < maskLength)
				broadcastBinaryIp[i] = hostBinaryIp[i];
		}

		return broadcastBinaryIp;
	}

	public getFirstHostDecimalIp(networkDecimalIp:DecimalIp):DecimalIp {
		const firstHostDecimalIp = [...networkDecimalIp];
		firstHostDecimalIp[3]++;
		return firstHostDecimalIp as DecimalIp;
	}

	public getLastHostDecimalIp(broadcastDecimalIp:DecimalIp):DecimalIp {
		const lastHostDecimalIp = [...broadcastDecimalIp];
		lastHostDecimalIp[3]--;
		return lastHostDecimalIp as DecimalIp;
	}

	public getMaxHostsQuantity(maskBinaryIp:BinaryIp):number {
		const networkAndBroadcastQuantity = 2;
		const maskHostsPart = maskBinaryIp.filter(bit => bit === BitValue.POSITIVE).length;
		return 2 ** maskHostsPart - networkAndBroadcastQuantity;
	}

	protected getMaskBinaryIpLength(maskBinaryIp:BinaryIp):number {
		return maskBinaryIp.filter(bit => bit === BitValue.NEGATIVE).length;
	}

	protected getPositiveInitialBinaryIp():BinaryIp {
		return new Array(IpAddressConfig.BINARY_IP_LENGTH).fill(BitValue.POSITIVE) as BinaryIp;
	}

	protected getNegativeInitialBinaryIp():BinaryIp {
		return new Array(IpAddressConfig.BINARY_IP_LENGTH).fill(BitValue.NEGATIVE) as BinaryIp;
	}
}