import {Bit} from "../binary/Bit";

export const RawBinaryOctetLength = 8;
export const RawBinaryIpLength = RawBinaryOctetLength * 4;

export type BinaryOctet = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit]
export type BinaryIp = [BinaryOctet, BinaryOctet, BinaryOctet, BinaryOctet]
