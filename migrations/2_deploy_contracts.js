var SupplierFactory = artifacts.require("./SupplierFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SupplierFactory);
};
