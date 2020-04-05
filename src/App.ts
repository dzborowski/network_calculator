import {GetIpAddressProcess} from "./ipAddress/GetIpAddressProcess";

export class App {
	public async init() {
		const getIpAddressProcess = new GetIpAddressProcess();
		const ipAddress = await getIpAddressProcess.getIpAddress();
	}
}