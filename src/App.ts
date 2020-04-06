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

		const decimalIp = IpAddressParser.getDecimalIpFromIpAddress(ipAddress);
		const binaryIp = IpAddressParser.parseDecimalIpToBinaryIp(decimalIp);
		IpView.displayBinaryIpAsDecimalIp(binaryIp);
		IpView.displayDecimalIpAsBinaryIp(decimalIp);

		const binaryMask = networkCalculator.getMaskBinaryIpFromIpAddress();
		const decimalMask = IpAddressParser.parseBinaryIpToDecimalIp(binaryMask);
		IpView.displayBinaryIpAsDecimalIp(binaryMask);
		IpView.displayDecimalIpAsBinaryIp(decimalMask);
	}
}