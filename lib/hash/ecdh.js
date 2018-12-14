const crypto = require("crypto");

class ecdh {
	constructor(curve) {
		this._ecdh = crypto.createECDH(curve);
		this._keys = new keys();
	}

	secret(key, {in_encoding, out_encoding} = {}) {
		return this._ecdh.computeSecret(key, in_encoding, out_encoding);
	}

	keys() {
		return this._keys;
	}
}

class keys {
	constructor(ecdh) {
		this._ecdh = ecdh;
	}

	generate({encoding, format} = {}) {
		this._ecdh.generateKeys(encoding, format);
	}

	private(key, {encoding} = {}) {
		if(typeof key === "object") {
			return this._ecdh.getPrivateKey(key.encoding);
		}
		
		this._ecdh.setPrivate(key, encoding);

		return key;
	}

	public({encoding, format} = {}) {
		return this._ecdh.getPublicKey(encoding, format);
	}
}

module.exports = ecdh;