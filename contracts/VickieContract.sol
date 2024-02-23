// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18; // Updated to version  0.8.18

import "erc721a/contracts/ERC721A.sol";

contract VickieContract is ERC721A { 

    // Maximum number of tokens that can be minted
    uint256 public maxQuantity =   10;

    // Mapping of token ID to nickname string
    mapping (uint => string) public nicknames;

    // Constructor with additional parameters for royalty settings
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721A(_name, _symbol) {}
    
    // Function to mint NFT which only owner can perform
    function mint(uint256 quantity) external payable {
        require(totalSupply() + quantity <= maxQuantity, "You can not mint more than 10");
        _mint(msg.sender, quantity);
    }

    // Function to set a new nickname for a token
    function setNickname(uint _tokenId, string calldata _nickname) external {
        nicknames[_tokenId] = _nickname;
    }

    // Override the baseURI function to return the base URL for the NFTs
    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmTQMZ1fS5RK9rXg2jfgp6YTWoa5qAta153Vu4o8jkbkQL/";
    }

    // Return the URL for the prompt description
    function promptDescription() external pure returns (string memory) {
        return "Eagle soaring image";
    }
}
