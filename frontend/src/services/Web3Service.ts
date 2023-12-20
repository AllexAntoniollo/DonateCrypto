import ABI  from "./ABI.json";
import { ethers } from 'ethers';


const ADAPTER_ADDRESS = `${process.env.REACT_APP_ADAPTER_ADDRESS}`;



function getProvider(): ethers.BrowserProvider {
    if (!window.ethereum) throw new Error("No MetaMask found");
    return new ethers.BrowserProvider(window.ethereum);
}

function getContract(provider?: ethers.BrowserProvider): ethers.Contract {
    if (!provider) provider = getProvider();
    return new ethers.Contract(ADAPTER_ADDRESS, ABI as ethers.InterfaceAbi, provider);
}

async function getContractSigner(provider?: ethers.BrowserProvider): Promise<ethers.Contract> {
    if (!provider) provider = getProvider();
    const signer = await provider.getSigner(localStorage.getItem("account") || undefined);
    const contract = new ethers.Contract(ADAPTER_ADDRESS, ABI as ethers.InterfaceAbi, provider);
    return contract.connect(signer) as ethers.Contract;
}


export async function doLogin() {
    const provider = getProvider()
    const account = await provider.send("eth_requestAccounts", []);

    if (!account || !account.length) throw new Error("Wallet not found/allowed.");   
    
    localStorage.setItem("wallet", account[0]);

    return account[0]
    
}

export function getLastCampaignId(){
    const contract = getContract();
    return contract.nextId();
}
/*
export function addCampaign(campaign : Campaign){
    const contract = getContract();
    return contract.addCampaign(campaign.title, campaign.description, campaign.videosUrl, campaign.imagesUrl, campaign.goal).send();
}*/

export function getCampaign(id : string) {
    const contract = getContract();
    return contract.campaigns(id);
}
/*
export async function donate(id : string, donation : string) {
    const contract = await getContractSigner();
    return contract.donate(id).send({value: Web3.utils.toWei(donation, "ether")});

}*/

export type Campaign = {
    id? : string
    title?: string;
    description?: string;
    videosUrls?: string[];
    imagesUrls?: string[];
    goal?: string;
    author?: string;
    balance?: BigInt;
}