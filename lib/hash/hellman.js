const crypto = require("crypto");

class hellman {
	constructor(prime, {encoding, generator, generator_encoding} = {}) {
		this._keys = new keys();

		if(typeof prime === "string") {
			this._hellman = crypto.createDiffieHellman(prime, encoding, generator, generator_encoding);
		}
		else if(typeof prime === "number") {
			this._hellman = crypto.createDiffieHellman(prime, generator);
		}
	}

	secret(key, {in_encoding, out_encoding} = {}) {
		return this._hellman.computeSecret(key, in_encoding, out_encoding);
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