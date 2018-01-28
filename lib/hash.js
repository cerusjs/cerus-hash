var crypto = require("crypto");
var p2p = require("./hash/p2p");
var hellman = require("./hash/hellman");
var ecdh = require("./hash/ecdh");
var base64_ = new base64();

class hash {
	constructor(cerus) {
		this._cerus = cerus;
	}

	hash(data, algorithm = "sha256") {
		if(typeof data !== "string") {
			throw new TypeError("argument data must be a string");
		}

		return crypto.createHash(algorithm).update(data).digest("hex");
	}

	encrypt(data, key, algorithm = "sha256") {
		if(typeof data !== "string") {
			throw new TypeError("argument data must be a string");
		}

		if(typeof key !== "string") {
			throw new TypeError("argument key must be a string");
		}

		var cipher = crypto.createCipher(algorithm, key);

		return cipher.update(data, "utf8", "hex") + cipher.final("hex");
	}

	decrypt(data, key, algorithm = "sha256") {
		if(typeof data !== "string") {
			throw new TypeError("argument data must be a string");
		}

		if(typeof key !== "string") {
			throw new TypeError("argument key must be a string");
		}

		var cipher = crypto.createDecipher(algorithm, key);

		return cipher.update(data, "hex", "utf8") + cipher.final("utf8");
	}

	base64() {
		return base64_;
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
		if(typeof data !== "string") {
			throw new TypeError("the argument data must be a string");
		}

		return Buffer.from(data).toString("base64");
	}

	decrypt(data) {
		if(typeof data !== "string") {
			throw new TypeError("the argument data must be a string");
		}

		return Buffer.from(data).toString("utf8");
	}
}
