const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    rinkeby: {
    	provider: function() {
        return new HDWalletProvider("snap sister route butter analyst gain food concert donor hurry address plug", "https://rinkeby.infura.io/v3/a2e374ab89124948a683277311c6e91e")
    	},
    	network_id: 4
    }
  }
};
