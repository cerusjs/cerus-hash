const crypto = require("crypto");
const p2p = require("./hash/p2p");
const hellman = require("./hash/hellman");
const ecdh = require("./hash/ecdh");

class hash {
	constructor(cerus) {
		this._cerus = cerus;
	}

	hash(data, {algorithm = "sha256", out_encoding} = {}) {
		if(typeof data !== "string") {
			throw new TypeError("argument data must be a string");
		}

		return crypto.createHash(algorithm).update(data).digest(out_encoding);
	}

	encrypt(data, key, {algorithm = "sha256", in_encoding = "utf8", out_encoding = "hex"} = {}) {
		const cipher = crypto.createCipher(algorithm, key);

		return cipher.update(data, in_encoding, out_encoding) + cipher.final(out_encoding);
	}

	decrypt(data, key, {algorithm = "sha256", in_encoding = "hex", out_encoding = "utf8"} = {}) {
		const cipher = crypto.createDecipher(algorithm, key);

		return cipher.update(data, in_encoding, out_encoding) + cipher.final(out_encoding);
	}

	base64() {
		return new base64();
	}

	p2p() {
		return new p2p(this._cerus);
	}

	ciphers() {
		return crypto.getCiphers();
	}

	curves() {
		return crypto.getCurves();
	}

	hashes() {
		return crypto.getHashes();
	}

	hellman(...args) {
		return new hellman(...args);
	}

	ecdh(...args) {
		return new ecdh(...args);
	}
}

module.exports = hash;

class base64 {
	encrypt(data) {
		return Buffer.from(data).toString("base64");
	}

	decrypt(data, {encoding = "utf8"} = {}) {
		return Buffer.from(data).toString(encoding);
	}
}