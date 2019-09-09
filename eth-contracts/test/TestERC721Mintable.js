var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];
    const account_seven = accounts[6];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two,101,{from: account_one});
            await this.contract.mint(account_three,102,{from: account_one});
            await this.contract.mint(account_four,103,{from: account_one});
            await this.contract.mint(account_five,104,{from: account_one});
        })

        it('should return total supply', async function () { 
            let total = await this.contract.totalSupply.call();
            assert.equal(total.toNumber(), 4, "Incorrect result");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(balance.toNumber(),1,"Not able to get balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let _tokenURI = await this.contract.getTokenURI(101);
            assert.equal(_tokenURI,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/101", "token uri didn't match");
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId=101;
            await this.contract.transferFrom(account_two, account_three, tokenId, {from: account_two});
            // check new owner
            currentOwner = await this.contract.ownerOf.call(tokenId);
            assert.equal(currentOwner, account_three, "new owner didn't match");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let failed = false;
            try {
                await this.contract.mint(account_seven,110,{from: account_six});
              } catch (e) {
                failed = true;
              }
    
              assert.equal(failed, true, "should fail when address is not account owner");
              
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, account_one, "owner didn't match should be account_one");
        })

    });
})