import {IpAddress} from "./ipAddress/interfaces/IpAddress";
import {IpView} from "./ipAddress/IpView";

export class App {
	public async run() {
		// const getIpAddressProcess = new GetIpAddressProcess();
		// const ipAddress = await getIpAddressProcess.getIpAddress();
		const ipAddress:IpAddress = {
			firstOctet: 192,
			secondOctet: 168,
			thirdOctet: 1,
			fourthOctet: 20,
			mask: 24,
		};
		const ipAddressDetails = IpView.getIpAddressDetails(ipAddress);
		IpView.displayIpAddressDetails(ipAddressDetails);
	}
}