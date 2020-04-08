import {DecimalIp} from "../src/ipAddress/interfaces/DecimalIp";
import {IpAddressParser} from "../src/ipAddress/IpAddressParser";

describe("IpAddressParser tests", () => {
	const decimalIpToBinaryIp = [
		{
			decimalIp: [0, 0, 0, 0],
			expectedBinaryIp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		},
		{
			decimalIp: [1, 1, 1, 1],
			expectedBinaryIp: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
		},
		{
			decimalIp: [255, 255, 255, 255],
			expectedBinaryIp: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		},
	];

	for (const {decimalIp, expectedBinaryIp} of decimalIpToBinaryIp) {
		it(`should correctly parse ${decimalIp.join(".")} to binary ip`, () => {
			const binaryIp = IpAddressParser.parseDecimalIpToBinaryIp(decimalIp as DecimalIp);
			expect(binaryIp).toEqual(expectedBinaryIp);
		});
	}
});