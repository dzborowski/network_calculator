import {IpAddress} from "./ipAddress/IpAddress";
import {IpAddressParser} from "./ipAddress/IpAddressParser";
import {IpView} from "./ipAddress/IpView";
import {NetworkCalculator} from "./networkCalculator/NetworkCalculator";

export class App {
	public async init() {
		// const getIpAddressProcess = new GetIpAddressProcess();
		// const ipAddress = await getIpAddressProcess.getIpAddress();
		const ipAddress:IpAddress = {
			firstOctet: 192,
			secondOctet: 168,
			thirdOctet: 1,
			fourthOctet: 20,
			mask: 24,
		};

		const networkCalculator = new NetworkCalculator(ipAddress);

		const hostDecimalIp = IpAddressParser.getDecimalIpFromIpAddress(ipAddress);
		const hostBinaryIp = IpAddressParser.parseDecimalIpToBinaryIp(hostDecimalIp);
		IpView.displayBinaryIpAsDecimalIp(hostBinaryIp);
		IpView.displayDecimalIpAsBinaryIp(hostDecimalIp);

		const maskBinaryIp = networkCalculator.getMaskBinaryIpFromIpAddress();
		const maskDecimalIp = IpAddressParser.parseBinaryIpToDecimalIp(maskBinaryIp);
		IpView.displayBinaryIpAsDecimalIp(maskBinaryIp);
		IpView.displayDecimalIpAsBinaryIp(maskDecimalIp);

		const networkBinaryIp = networkCalculator.getNetworkBinaryIp(hostBinaryIp, maskBinaryIp);
		const networkDecimalIp = IpAddressParser.parseBinaryIpToDecimalIp(networkBinaryIp);
		IpView.displayBinaryIpAsDecimalIp(networkBinaryIp);
		IpView.displayDecimalIpAsBinaryIp(networkDecimalIp);

		const networkClass = networkCalculator.getNetworkClass(hostBinaryIp);
		console.log("networkClass: ", (networkClass));

		const broadcastBinaryIp = networkCalculator.getBroadcastBinaryIp(hostBinaryIp, maskBinaryIp);
		const broadcastDecimalIp = IpAddressParser.parseBinaryIpToDecimalIp(broadcastBinaryIp);
		IpView.displayBinaryIpAsDecimalIp(broadcastBinaryIp);
		IpView.displayDecimalIpAsBinaryIp(broadcastDecimalIp);

		const firstHostDecimalIp = networkCalculator.getFirstHostDecimalIp(networkDecimalIp);
		const firstHostBinaryIp = IpAddressParser.parseDecimalIpToBinaryIp(firstHostDecimalIp);
		IpView.displayBinaryIpAsDecimalIp(firstHostBinaryIp);
		IpView.displayDecimalIpAsBinaryIp(firstHostDecimalIp);

		const lastHostDecimalIp = networkCalculator.getLastHostDecimalIp(broadcastDecimalIp);
		const lastHostBinaryIp = IpAddressParser.parseDecimalIpToBinaryIp(lastHostDecimalIp);
		IpView.displayBinaryIpAsDecimalIp(lastHostBinaryIp);
		IpView.displayDecimalIpAsBinaryIp(lastHostDecimalIp);
	}
}