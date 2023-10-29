const DonateCrypto = artifacts.require("DonateCrypto");

contract('DonateCrypto', function(accounts) {

  beforeEach(async () => {
    contract = await DonateCrypto.new()
  })

  it("should put 10000 MetaCoin in the first account", async () => {

  });
  
});
