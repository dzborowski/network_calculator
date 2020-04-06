import {GetIpAddressProcess} from "./ipAddress/GetIpAddressProcess";
import {NetworkCalculator} from "./networkCalculator/NetworkCalculator";

export class App {
	public async init() {
		const getIpAddressProcess = new GetIpAddressProcess();
		const ipAddress = await getIpAddressProcess.getIpAddress();

		const networkCalculator = new NetworkCalculator(ipAddress);
		console.log(networkCalculator.calculateMaskFromIpAddress());
	}
}