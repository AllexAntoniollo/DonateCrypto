//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IDonateCrypto {
    
    function addCampaign(string calldata title, string calldata description, string[] calldata videosUrl,string[] calldata imagesUrl, uint256 goal) external;

    function getDonors(uint256 id) external view returns(address[] memory);

    function donate(uint256 id) external payable;

    function withdrawOwner() external;

    function changeFee(uint256 newFee) external;
    
}