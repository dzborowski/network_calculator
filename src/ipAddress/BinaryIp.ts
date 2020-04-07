import {BinaryOctet} from "../binary/BinaryOctet";
import {Bit} from "../binary/Bit";

export type BinaryOctetIp = [BinaryOctet, BinaryOctet, BinaryOctet, BinaryOctet]
export type BinaryIp = [
	Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit,
	Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit,
	Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit,
	Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit,
]