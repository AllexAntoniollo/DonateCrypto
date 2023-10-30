const DonateCrypto = artifacts.require("DonateCrypto");

contract('DonateCrypto', function(accounts) {
  campaign = {
    title: "Campaign",
    description: "Description of the campaign.",
    videosUrl: [],
    imagesUrl: [],
    goal: 10000
  }
  beforeEach(async () => {
    contract = await DonateCrypto.new()

  })



  it("Should add campaign", async () => {

    await contract.addCampaign(campaign.title,campaign.description,campaign.videosUrl,campaign.imagesUrl,campaign.goal)

    const nextId = await contract.nextId()
    assert(nextId.toNumber() === 1,"The campaign is not added.")
  });


  it("Should get campaign", async () => {

    await contract.addCampaign(campaign.title,campaign.description,campaign.videosUrl,campaign.imagesUrl,campaign.goal)

    const campaignAdded = await contract.campaigns(0)
    assert(campaignAdded.title === campaign.title,"The campaign do not exists.")
  });


  it("Should donate", async () => {

    await contract.addCampaign(campaign.title,campaign.description,campaign.videosUrl,campaign.imagesUrl,campaign.goal)
    await contract.donate(0,{from: accounts[1], value: 1000})

    const campaignAdded = await contract.campaigns(0)
    assert(campaignAdded.balance == 1000,"Donation is not possible.")
  });

   //it("Should get donor", async () => {

    //await contract.addCampaign(campaign.title,campaign.description,campaign.videosUrl,campaign.imagesUrl,campaign.goal)
    //await contract.donate(0,{from: accounts[1], value: 1000})

    //const campaignAdded = await contract.campaigns(0)
   // assert(campaignAdded.donors[0] == accounts[1],"Donation is not possible.")
  //});

  
});
