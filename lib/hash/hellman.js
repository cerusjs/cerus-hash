var crypto = require("crypto");

class hellman {
	constructor(prime, opts = {}) {
		if(typeof prime === "string") {
			this._hellman = crypto.createDiffieHellman(prime, opts["enc"], opts["generator"], opts["genenc"]);
		}
		else if(typeof prime === "number") {
			this._hellman = crypto.createDiffieHellman(prime, opts["generator"]);
		}
		else {
			throw new TypeError("the argument prime must be a string or number");
		}
	}

	secret(key, opts = {}) {
		return this._hellman.computeSecret(key, opts["inenc"], opts["outenc"]);
	}

	generate(opts = {}) {
		this._hellman.generateKeys(opts["enc"]);
	}

	generator(opts = {}) {
		return this._hellman.getGenerator(opts["enc"]);
	}

	prime(opts = {}) {
		return this._hellman.getPrime(opts["enc"]);
	}

	private(opts = {}) {
		return this._hellman.getPrivateKey(opts["enc"]);
	}

	public(opts = {}) {
		return this._hellman.getPublicKey(opts["enc"]);
	}
}

module.exports = hellman;