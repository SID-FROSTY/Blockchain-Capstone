pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "../../zokrates/code/square/verifier.sol";
import "./ERC721Mintable.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";

contract SquareVerifier is Verifier{

}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete
{

    SquareVerifier public verifier;

    constructor(address verifierAddress) ERC721MintableComplete() public{
        verifier = SquareVerifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution{
        uint256 index;
        address address_;
    }


    // TODO define an array of the above struct
    Solution[] solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => address) public uniqueSolutions;


    // TODO Create an event to emit when a solution is added
    event solutionAdded(uint index, address address_);

    function getVerifierKey
                            (
                                uint[2] memory a,
                                uint[2][2] memory b, 
                                uint[2] memory c, 
                                uint[2] memory input
                            )
                            pure
                            public
                            returns(bytes32) 
        {
            return keccak256(abi.encodePacked(a, b, c, input));
        }

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint index, address address_, bytes32 key) public {
        Solution memory sol = Solution({
            index: index,
            address_: address_
        });
        solutions.push(sol);
        uniqueSolutions[key] = address_;
        emit solutionAdded(index, address_);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintToken(address to, uint256 tokenId, uint[2] memory a,
                uint[2][2] memory b, uint[2] memory c, uint[2] memory input)
                public
    {
        bytes32 key = getVerifierKey(a, b, c, input);
        require(uniqueSolutions[key] == address(0), "Solution must be unique to mint a token.");
        require(verifier.verifyTx(a,b,c,input), "Solution isn't correct.");
        addSolution(tokenId, to, key);
        super.mint(to, tokenId);
    }

}











