var High_low_2 = artifacts.require("./High_low_2.sol");
var High_low_2_token = artifacts.require("./High_low_2_token.sol");

module.exports = function(deployer) {

  deployer.deploy(High_low_2_token).then(function() {
    return deployer.deploy(High_low_2, High_low_2_token.address);
  });
}