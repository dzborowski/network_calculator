import {IpAddress} from "./ipAddress/interfaces/IpAddress";
import {IpView} from "./ipAddress/IpView";
import {SaveIpAddressDetailsProcess} from "./ipAddress/processes/SaveIpAddressDetailsProcess";

export class App {
	public static async run() {
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

		const saveIpAddressDetailsProcess = new SaveIpAddressDetailsProcess(ipAddressDetails);
		await saveIpAddressDetailsProcess.saveIpAddressDetailsAsFile();
	}
}