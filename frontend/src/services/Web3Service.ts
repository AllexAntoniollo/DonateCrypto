import Web3 from "web3";
import ABI  from "./ABI.json";
import { Contract } from "web3-eth-contract";

const CONTRACT_ADDRESS = "0xd33d635962A3988D68A06dEdAE72519ce5661832";



function getWeb3(): Web3 {
    if (!window.ethereum) throw new Error(`No MetaMask found.`);
    return new Web3(window.ethereum);
}

function getContract(web3? : Web3) : Contract<Abi> {
    if (!web3) web3 = getWeb3();
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: localStorage.getItem("wallet") || undefined });
}


export async function doLogin() {
    const web3 = getWeb3()
    const account = await web3.eth.requestAccounts();
    if (!account || !account.length) throw new Error("Wallet not found/allowed.");   
    
    localStorage.setItem("wallet", account[0]);

    return account[0];
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