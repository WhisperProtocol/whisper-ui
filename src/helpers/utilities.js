const ethers = require("ethers");

const utils = {
    // converts a big number of 256bits to binary
    BigNumber256toBinary: (str) => {
        let r = BigInt(str).toString(2);
        let prePadding = "";
        let paddingAmount = 256 - r.length;
        for(var i = 0; i < paddingAmount; i++){
            prePadding += "0";
        }
        return prePadding + r;
    },

    BigNumberToDecimal: (bn) => {
        return ethers.BigNumber.from(bn).toString();
    },

    BigNumber256toHex: (n) => {
        let nstr = BigInt(n).toString(16);
        while(nstr.length < 64){ nstr = "0" + nstr; }
        nstr = `0x${nstr}`;
        return nstr;
    },

    reverseCoordinate: (p) => {
        let r = [0, 0];
        r[0] = p[1];
        r[1] = p[0];
        return r;
    }
}

export default utils;