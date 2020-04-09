import {IpAddressView} from "./ipAddress/IpAddressView";
import {GetIpAddressProcess} from "./ipAddress/processes/GetIpAddressProcess";
import {SaveIpAddressDetailsProcess} from "./ipAddress/processes/SaveIpAddressDetailsProcess";

export class App {
	public static async run() {
		const getIpAddressProcess = new GetIpAddressProcess();
		const ipAddress = await getIpAddressProcess.getIpAddress();

		const ipAddressDetails = IpAddressView.getIpAddressDetails(ipAddress);
		IpAddressView.displayIpAddressDetails(ipAddressDetails);

		const saveIpAddressDetailsProcess = new SaveIpAddressDetailsProcess(ipAddressDetails);
		await saveIpAddressDetailsProcess.saveIpAddressDetailsAsFile();
	}
}