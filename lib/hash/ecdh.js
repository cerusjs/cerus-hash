var crypto = require("crypto");

class ecdh {
	constructor(curve) {
		if(typeof curve !== "string") {
			throw new TypeError("the argument curve must be a string");
		}
		this._ecdh = crypto.createECDH(curve);
	}

	secret(key, opts = {}) {
		return this._ecdh.computeSecret(key, opts["inenc"], opts["outenc"]);
	}

	generate(opts = {}) {
		this._ecdh.generateKeys(opts["enc"], opts["format"]);
	}

	private(key = {}, opts = {}) {
		if(typeof key === "string") {
			this._ecdh.setPrivate(key, opts["enc"]);
			
			return;
		}

		return this._ecdh.getPrivateKey(key["enc"]);
	}

	public(opts = {}) {
		return this._ecdh.getPublicKey(opts["enc"], opts["format"]);
	}
}

module.exports = ecdh;