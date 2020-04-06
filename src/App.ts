import {IpAddress} from "./ipAddress/IpAddress";
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
		const binaryMask = networkCalculator.getBinaryMaskFromIpAddress();
		IpView.displayBinaryIpAsDecimal(binaryMask);
		IpView.displayDecimalIpAsBinary([255, 255, 255, 255]);
	}
}