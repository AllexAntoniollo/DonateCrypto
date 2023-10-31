import Web3 from "web3";
import ABI  from "./ABI.json";

const CONTRACT_ADDRESS = "0x1f975D052Ad6BD86a9Ee88B86b3C18B68B0Ec367";

export async function doLogin() {
    if (!window.ethereum) throw new Error("No MetaMask found!");
        
    const web3 = new Web3(window.ethereum);
    const account = await web3.eth.requestAccounts();
    if (!account || !account.length) throw new Error("Wallet not found/allowed.");   
    
    localStorage.setItem("wallet", account[0]);

    return account[0];
}

function getContract() {
    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: localStorage.getItem("wallet") || undefined });
}


export function getLastCampaignId(){
    const contract = getContract();
    return contract.methods.nextId().call();
}

export function addCampaign(campaign : Campaign){
    const contract = getContract();
    return contract.methods.addCampaign(campaign.title, campaign.description, campaign.videosUrl, campaign.imagesUrl, campaign.goal).send();
}

export function getCampaign(id : string) {
    const contract = getContract();
    return contract.methods.campaigns(id).call();
}

export function donate(id : string, donation : string) {
    const contract = getContract();
    return contract.methods.donate(id).send({value: Web3.utils.toWei(donation, "ether")});

}

export type Campaign = {
    title?: string;
    description?: string;
    videosUrl?: string[];
    imagesUrl?: string[];
    goal?: string;
}