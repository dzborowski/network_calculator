import * as appRoot from "app-root-path";
import {promises as fsAsync} from "fs";
import * as path from "path";
import {IpAddressDetails} from "../interfaces/IpAddressDetails";
import {IpAddressView} from "../IpAddressView";

export class SaveIpAddressDetailsProcess {
	protected saveDirectoryName = "saves";

	constructor(protected ipAddressDetails:IpAddressDetails) {}

	public async saveIpAddressDetailsAsFile() {
		await this.createSaveDirectory();
		const formattedIpAddressDetails = IpAddressView.getFormattedIpAddressDetails(this.ipAddressDetails);
		const saveFilePath = this.getSaveFilePath();
		await fsAsync.writeFile(saveFilePath, formattedIpAddressDetails, "utf8");
		console.log(`Ip address details were saved in ${saveFilePath}`);
	}

	protected async createSaveDirectory() {
		const saveDirectoryPath = this.getSaveDirectoryPath();
		await fsAsync.mkdir(saveDirectoryPath, {recursive: true});
	}

	protected getSaveFilePath():string {
		const saveDirectoryPath = this.getSaveDirectoryPath();
		const saveFileName = this.generateSaveFileName();
		const saveFilePath = path.join(saveDirectoryPath, saveFileName);
		return path.normalize(saveFilePath);
	}

	protected getSaveDirectoryPath():string {
		const saveDirectoryPath = path.join(appRoot.path, this.saveDirectoryName);
		return path.normalize(saveDirectoryPath);
	}

	protected generateSaveFileName():string {
		const saveTime = new Date().toISOString();
		const saveFileName = `${this.ipAddressDetails.hostDecimalIp}_${saveTime}`;
		return saveFileName.replace(/(\.|\:|\-)/g, "_") + ".json";
	}
}