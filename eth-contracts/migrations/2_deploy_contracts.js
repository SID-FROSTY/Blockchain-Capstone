// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const fs = require('fs');

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier).then(()=>{
    deployer.deploy(SolnSquareVerifier, SquareVerifier.address).then(()=>{
      let object={};
      object.SolnSquareVerifier = SolnSquareVerifier.address;
      object.SquareVerifier = SquareVerifier.address;
      fs.writeFile("./contractAddresses.json",JSON.stringify(object),(err)=>{
          if(err){
            console.log(err);
          }else{
            console.log("address are saved in a file");
          }
      });
    });
  })
  
};
