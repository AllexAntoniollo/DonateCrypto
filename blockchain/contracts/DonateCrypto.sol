//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


contract DonateCrypto{

    address payable public immutable owner;
    uint256 public fee = 100;
    uint256 public nextId = 0;
    uint256 public feesGenerated = 0;
    mapping(uint256 => Campaign) public campaigns;

    struct Campaign{
        address author;
        string title;
        string description;
        string[] videosUrl;
        string[] imagesUrl;
        uint256 balance;
        uint256 goal;
        bool active;
        address[] donors;
    }


    constructor(){
        owner = payable(msg.sender);
    }


    function addCampaign(string calldata title, string calldata description, string[] calldata videosUrl,string[] calldata imagesUrl, uint256 goal) external {
        
        Campaign memory newCampaign;

        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.videosUrl = videosUrl;
        newCampaign.imagesUrl = imagesUrl;
        newCampaign.goal = goal;
        newCampaign.active = true;
        newCampaign.author = msg.sender;
        
        campaigns[nextId] = newCampaign;
        nextId++;


    }


    function getDonors(uint256 id) external view returns(address[] memory){
        return campaigns[id].donors;
    }


    function donate(uint256 id) external payable{
        require(msg.value > 0, "You must send a donation value > 0");
        require(campaigns[id].active == true, "Cannot donate to this campaign");
        
        campaigns[id].donors.push(msg.sender);
        campaigns[id].balance += msg.value;

        if (campaigns[id].balance >= campaigns[id].goal){
            withdraw(id);
        }
    }


    function withdraw(uint256 id) public{

        require(campaigns[id].active == true, "This campaign is closed");
        require(campaigns[id].balance > fee, "This campaign does not have enough balance");

        payable(campaigns[id].author).transfer(campaigns[id].balance-fee);
        feesGenerated += fee;

        campaigns[id].active = false;

    }


    function withdrawOwner() external restricted{
        require(feesGenerated > 0, "No fees to withdraw");
        owner.transfer(feesGenerated);
        feesGenerated = 0;
    }


    function changeFee(uint256 newFee) external restricted{
        fee = newFee;
    }


    modifier restricted(){
        require(owner == msg.sender, "You do not have permission");
        _;
    }

}
