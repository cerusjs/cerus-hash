const crypto = require("crypto");

class ecdh {
	constructor(curve) {
		this._ecdh = crypto.createECDH(curve);
		this._keys = new keys();
	}

	secret(key, {in_encoding, out_encoding} = {}) {
		return this._ecdh.computeSecret(key, in_encoding, out_encoding);
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