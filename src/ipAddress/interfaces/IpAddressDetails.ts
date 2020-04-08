import {NetworkClass} from "../../networkCalculator/NetworkClass";

export interface IpAddressDetails {
	hostDecimalIp:string;
	hostBinaryIp:string;
	maskDecimalIp:string;
	maskBinaryIp:string;
	networkBinaryIp:string;
	networkDecimalIp:string;
	networkClass:NetworkClass;
	broadcastDecimalIp:string;
	broadcastBinaryIp:string;
	firstHostDecimalIp:string;
	firstHostBinaryIp:string;
	lastHostDecimalIp:string;
	lastHostBinaryIp:string;
	maxHostsQuantity:number;
}