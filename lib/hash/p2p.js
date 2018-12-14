const node_rsa = require("node-rsa");
const crypto = require("crypto");

class p2p {
	constructor(cerus) {
		this._keys = new keys(cerus);
	}

	encrypt(data, key, {padding = crypto.constants.RSA_PKCS1_PADDING, in_encoding = "utf8", out_encoding = "base64"} = {}) {
		return crypto.publicEncrypt({key, padding}, Buffer.from(data, in_encoding).toString(out_encoding));
	}

	decrypt(data, {key = this.keys().private(), padding = crypto.constants.RSA_PKCS1_PADDING, in_encoding = "base64", out_encoding = "utf8"} = {}) {
		return crypto.privateDecrypt({key, padding}, Buffer.from(data, in_encoding).toString(out_encoding));
	}

	keys() {
		return this._keys;
	}
}

module.exports = p2p;

class keys {
	constructor(cerus) {
		this._private = undefined;
		this._public = undefined;
		this._generated = false;
		this._cerus = cerus;
	}

	generate({private_size = 65537, public_size = 2048, format = "pkcs1"} = {}) {
		return this._cerus.promise(event => {
			if(this._generated) return event("success");

			this._generated = true;

			const key = new node_rsa.NodeRSA();
			
			key.generateKeyPair(public_size, private_size);
			this._private = key.exportKey(`${format}-private-pem`);
			this._public = key.exportKey(`${format}-public-pem`);

			event("success");
		});
	}

	private(key) {
		if(key === undefined) return this._private;
		
		return this._private = key;
	}

	public(key) {
		if(key === undefined) return this._public;
		
		return this._public = key;
	}
}