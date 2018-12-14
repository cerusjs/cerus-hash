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

	keys() {
		return this._keys;
	}
}

class keys {
	constructor(hellman) {
		this._hellman = hellman;
	}

	generate({encoding} = {}) {
		this._hellman.generateKeys(encoding);
	}

	private({encoding} = {}) {
		return this._hellman.getPrivateKey(encoding);
	}

	public({encoding} = {}) {
		return this._hellman.getPublicKey(encoding);
	}

	generator({encoding} = {}) {
		return this._hellman.getGenerator(encoding);
	}

	prime({encoding} = {}) {
		return this._hellman.getPrime(encoding);
	}
}

module.exports = hellman;