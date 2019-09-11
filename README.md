# Real Estate Marketplace
This project uses ERC721 token standred to create unique tokens (non-fungible).A minted token will represent title to the properties. Before minting a token, it will verify that the property is owned by that person.It uses zk-SNARKs to create a verification system which can prove that the person has title to the property without revealing that specific information on the property. This project is integrated with OpenSea to expose the application to user so that transactions can be carried out on token.



# Testing
Open in the repo directory and change directory to contract directory i.eeth-contract

```
cd ./eth-contracts

truffle develop

truffle compile
```
```
test
```
# Contract details

SolnSquareVerifier (ERC721MintableComplete) 
```
0x04E9b55bd703343B6c244a160318c6c59273eE35
```

SquareVerifier (Verifier): 
```
0x20c051734B37Ce10Fb70fa9268a033Bb923af7B9
```

* [SolnSquareVerifier Abi](https://raw.githubusercontent.com/SID-FROSTY/Blockchain-Capstone/master/eth-contracts/solnSquareVerifierAbi.json)

* [Verifier Abi](https://raw.githubusercontent.com/SID-FROSTY/Blockchain-Capstone/master/eth-contracts/verifierAbi.json)

* [store front link](https://rinkeby.opensea.io/assets/real-estate-token-5)
```
https://rinkeby.opensea.io/assets/real-estate-token-5

```
* [Sold Token Transactions](https://rinkeby.opensea.io/assets/0x04e9b55bd703343b6c244a160318c6c59273ee35/9)

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
