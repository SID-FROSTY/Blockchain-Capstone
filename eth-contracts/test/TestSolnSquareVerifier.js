
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var SquareVerifier = artifacts.require('SquareVerifier');
var proof_ = require('../../zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];

    describe("Test solution square verifier",()=>{
        beforeEach(async function(){
            this.verifier = await SquareVerifier.new({ from: account_one });
            this.contract = await SolnSquareVerifier.new(this.verifier.address, { from: account_one });
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Test if a new solution can be added for contract', async function () {
            const { proof: { a, b, c }, inputs: inputs } = proof_;
            
            let key = await this.contract.getVerifierKey.call(a, b, c, inputs);

            let result = await this.contract.addSolution(2, account_two, key);

            // Test event is emitted
            assert.equal(result.logs.length, 1, "No events were triggered.");
        })

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier      
        it('Test if an ERC721 token can be minted for contract', async function () {
            const { proof: { a, b, c }, inputs: inputs } = proof_;
            
            let totalSupply = (await this.contract.totalSupply.call()).toNumber();
            let isCorrect = await this.contract.mintToken(account_two, 5, a, b, c, inputs, {from: account_one});
            let newTotalSupply = (await this.contract.totalSupply.call()).toNumber();

            assert.equal(totalSupply + 1, newTotalSupply, "Invalid proof result");
        })  
    })


})