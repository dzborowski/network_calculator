import {NetworkCalculator} from "../networkCalculator/NetworkCalculator";
import {BinaryIp} from "./interfaces/BinaryIp";
import {DecimalIp} from "./interfaces/DecimalIp";
import {IpAddress} from "./interfaces/IpAddress";
import {IpAddressDetails} from "./interfaces/IpAddressDetails";
import {IpAddressParser} from "./IpAddressParser";

export class IpAddressView {
	public static getIpAddressDetails(ipAddress:IpAddress):IpAddressDetails {
		const networkCalculator = new NetworkCalculator(ipAddress);

		const hostDecimalIp = IpAddressParser.getDecimalIpFromIpAddress(ipAddress);
		const hostBinaryIp = IpAddressParser.parseDecimalIpToBinaryIp(hostDecimalIp);
		const maskBinaryIp = networkCalculator.getMaskBinaryIpFromIpAddress();
		const maskDecimalIp = IpAddressParser.parseBinaryIpToDecimalIp(maskBinaryIp);
		const networkBinaryIp = networkCalculator.getNetworkBinaryIp(hostBinaryIp, maskBinaryIp);
		const networkDecimalIp = IpAddressParser.parseBinaryIpToDecimalIp(networkBinaryIp);
		const networkClass = networkCalculator.getNetworkClass(hostBinaryIp);
		const broadcastBinaryIp = networkCalculator.getBroadcastBinaryIp(hostBinaryIp, maskBinaryIp);
		const broadcastDecimalIp = IpAddressParser.parseBinaryIpToDecimalIp(broadcastBinaryIp);
		const firstHostDecimalIp = networkCalculator.getFirstHostDecimalIp(networkDecimalIp);
		const firstHostBinaryIp = IpAddressParser.parseDecimalIpToBinaryIp(firstHostDecimalIp);
		const lastHostDecimalIp = networkCalculator.getLastHostDecimalIp(broadcastDecimalIp);
		const lastHostBinaryIp = IpAddressParser.parseDecimalIpToBinaryIp(lastHostDecimalIp);
		const maxHostsQuantity = networkCalculator.getMaxHostsQuantity(maskBinaryIp);

		return {
			hostDecimalIp: IpAddressView.getFormattedDecimalIpFromBinaryIp(hostBinaryIp),
			hostBinaryIp: IpAddressView.getFormattedBinaryIpFromDecimalIp(hostDecimalIp),
			maskDecimalIp: IpAddressView.getFormattedDecimalIpFromBinaryIp(maskBinaryIp),
			maskBinaryIp: IpAddressView.getFormattedBinaryIpFromDecimalIp(maskDecimalIp),
			networkDecimalIp: IpAddressView.getFormattedDecimalIpFromBinaryIp(networkBinaryIp),
			networkBinaryIp: IpAddressView.getFormattedBinaryIpFromDecimalIp(networkDecimalIp),
			networkClass,
			broadcastDecimalIp: IpAddressView.getFormattedDecimalIpFromBinaryIp(broadcastBinaryIp),
			broadcastBinaryIp: IpAddressView.getFormattedBinaryIpFromDecimalIp(broadcastDecimalIp),
			firstHostDecimalIp: IpAddressView.getFormattedDecimalIpFromBinaryIp(firstHostBinaryIp),
			firstHostBinaryIp: IpAddressView.getFormattedBinaryIpFromDecimalIp(firstHostDecimalIp),
			lastHostDecimalIp: IpAddressView.getFormattedDecimalIpFromBinaryIp(lastHostBinaryIp),
			lastHostBinaryIp: IpAddressView.getFormattedBinaryIpFromDecimalIp(lastHostDecimalIp),
			maxHostsQuantity,
		};
	}

	public static displayIpAddressDetails(ipAddressDetails:IpAddressDetails) {
		const formattedIpAddressDetails = IpAddressView.getFormattedIpAddressDetails(ipAddressDetails);
		console.log("Ip address details");
		console.log(formattedIpAddressDetails);
	}

	public static getFormattedIpAddressDetails(ipAddressDetails:IpAddressDetails):string {
		return JSON.stringify(ipAddressDetails, null, 4);
	}

	protected static getFormattedDecimalIpFromBinaryIp(binaryIp:BinaryIp):string {
		const decimalIp = IpAddressParser.parseBinaryIpToDecimalIp(binaryIp);
		return decimalIp.join(".");
	}

	protected static getFormattedBinaryIpFromDecimalIp(decimalIp:DecimalIp):string {
		const binaryIp = IpAddressParser.parseDecimalIpToBinaryIp(decimalIp);
		const binaryOctetsIp = IpAddressParser.parseBinaryIpToBinaryOctetsIp(binaryIp);
		return binaryOctetsIp
			.reduce((binaryOctets, binaryOctet) => [...binaryOctets, binaryOctet.join("")], [])
			.join(".");
	}
}