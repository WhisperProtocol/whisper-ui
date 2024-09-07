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
    }
}

export default utils;