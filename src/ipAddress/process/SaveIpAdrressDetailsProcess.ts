import {IpAddressDetails} from "../interfaces/IpAddressDetails";
import {IpView} from "../IpView";

export class SaveIpAdrressDetailsProcess {
	public static async save(ipAddressDetails:IpAddressDetails) {
		const formattedIpAddressDetails = IpView.getFormattedIpAddressDetails(ipAddressDetails);
	}

	// protected generateFileName():string {
	//
	// }
}