import {IpAddressValidator} from "../src/ipAddress/IpAddressValidator";

describe("IpAddressValidator tests", () => {
	const validIpAddresses = [
		"0.0.0.0/0",
		"1.1.1.1/24",
		"255.255.255.255/32",
		"8.8.8.8/24",
		"192.168.1.20/20",
	];

	for (const validIpAddress of validIpAddresses) {
		test(`should detect valid ip address while input is ${validIpAddress}`, () => {
			const ipAddressValidator = new IpAddressValidator(validIpAddress);
			const isValid = ipAddressValidator.isIpAddressValid();
			expect(isValid).toBe(true);
		});
	}

	const invalidIpAddresses = [
		"",
		"cxzcxz",
		"4324234",
		"255.255.255.300/33",
		"-2321.255.3232.255/32",
		"192.1683.1.20/20",
		"192.1683.1.20/-32",
	];

	for (const invalidIpAddress of invalidIpAddresses) {
		test(`should detect invalid ip address while input is ${invalidIpAddress}`, () => {
			const ipAddressValidator = new IpAddressValidator(invalidIpAddress);
			const isValid = ipAddressValidator.isIpAddressValid();
			expect(isValid).toBe(false);
		});
	}
});