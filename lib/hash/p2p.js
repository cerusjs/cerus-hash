var node_rsa = require("node-rsa");
var crypto = require("crypto");

class p2p {
	constructor(cerus) {
		this._keys = new keys();
		this._cerus = cerus;
	}

	encrypt(data, key, opts = {}) {
		if(typeof key !== "string") {
			throw new TypeError("the parameter key must be a string");
		}

		return crypto.publicEncrypt({
			key: key,
			padding: opts["padding"] || crypto.constants.RSA_PKCS1_PADDING
		}, Buffer.from(data, opts["inenc"] || "utf8")).toString(opts["outenc"] || "base64");
	}

	decrypt(data, opts = {}) {
		return crypto.privateDecrypt(
			{
				key: opts["key"] || this.keys().private(),
				padding: opts["padding"] || crypto.constants.RSA_PKCS1_PADDING
			}, 
			Buffer.from(data, opts["inenc"] || "base64"))
		.toString(opts["outenc"] || "utf8");
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

	generate(opts = {}) {
		var private_size = opts["private"] || 65537;
		var public_size = opts["public"] || 2048;
		var encryption_format = opts["format"] || "pkcs1";

		return this._cerus.promise(function(event) {
			if(this._generated) {
				return event("success");
			}

			this._generated = true;

			var key = new node_rsa.NodeRSA();
			
			key.generateKeyPair(public_size, private_size);
			this._private = key.exportKey(encryption_format + "-private-pem");
			this._public = key.exportKey(encryption_format + "-public-pem");

			event("success");
		});
	}

	private(key) {
		if(typeof key === "string") {
			this._private = key;
		}

		return this._private;
	}

	public(key) {
		if(typeof key === "string") {
			this._public = key;
		}

		return this._public;
	}
}