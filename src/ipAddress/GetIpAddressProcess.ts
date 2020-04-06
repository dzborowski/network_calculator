import * as readline from "readline";
import {IpAddress} from "./IpAddress";
import {IpAddressParser} from "./IpAddressParser";
import {IpAddressValidator} from "./IpAddressValidator";

export class GetIpAddressProcess {
	protected readlineInterface:readline.Interface;

	constructor() {
		this.readlineInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
	}

	public async getIpAddress():Promise<IpAddress> {
		const validIpAddress = await this.getValidIpAddress();
		return IpAddressParser.getParsedIpAddress(validIpAddress);
	}

	protected async getValidIpAddress():Promise<string> {
		let ipAddress = await this.getIpAddressFromUser();
		const ipAddressValidator = new IpAddressValidator(ipAddress);
		let isIpAddressValid = ipAddressValidator.isIpAddressValid();

		while (!isIpAddressValid) {
			console.log("Invalid ip address, please try again");
			ipAddress = await this.getIpAddressFromUser();
			isIpAddressValid = ipAddressValidator.isIpAddressValid();
		}

		this.readlineInterface.close();
		return ipAddress;
	}

	protected getIpAddressFromUser():Promise<string> {
		const question = "Type ip address that will be calculated using 192.168.1.1/24 format: ";
		return new Promise(resolve => this.readlineInterface.question(question, resolve));
	}
}