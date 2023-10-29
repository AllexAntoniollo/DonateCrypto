//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;



contract DonateCrypto{

    address public immutable owner;
    uint256 public fee = 100;
    uint256 public nextId = 0;

    struct Campaign{
        address author;
        string tittle;
        string description;
        string[] videosUrl;
        string[] imagesUrl;
        uint256 balance;
        uint256 goal;
        bool active;
        address[] donors;
    }

    constructor(){
        owner = msg.sender;
    }

    mapping(uint256 => Campaign) public campaigns;

    function addCampaign(string calldata tittle, string calldata description, string[] calldata videosUrl,string[] calldata imagesUrl, uint256 goal) external {
        Campaign memory newCampaign;

        newCampaign.tittle = tittle;
        newCampaign.description = description;
        newCampaign.videosUrl = videosUrl;
        newCampaign.imagesUrl = imagesUrl;
        newCampaign.goal = goal;
        newCampaign.active = true;
        newCampaign.author = msg.sender;

        nextId++;
        campaigns[nextId] = newCampaign;
    }

    function donate(uint256 id) external payable{
        require(msg.value > 0, "You must send a donation value > 0");
        require(campaigns[id].active == true, "Cannot donate to this campaign");
        campaigns[id].donors.push(msg.sender);
        campaigns[id].balance += msg.value;

        if (campaigns[id].balance >= campaigns[id].goal){

            address payable recipient = payable(campaigns[id].author);
            recipient.call{value: campaigns[id].balance - fee}("");

            campaigns[id].active = false;
        }
    }

    function withdraw(uint256 id) external{

        Campaign storage campaign = campaigns[id];

        require(campaign.active == true, "This campaign is closed");
        require(campaign.author == msg.sender, "You do not have permission");
        require(campaign.balance > fee, "This campaign does not have enough balance");

        address payable recipient = payable(campaign.author);
        recipient.call{value: campaign.balance - fee}("");

        campaigns[id].active = false;

    }

    function withdrawOwner() external restricted{

        address payable recipient = payable(owner);
        recipient.call{value: address(this).balance}("");

    }

    function changeFee(uint256 newFee) external restricted{
        fee = newFee;
    }

    modifier restricted(){
        require(owner == msg.sender, "You do not have permission");
        _;
    }

}
