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
    const signer = await provider.getSigner(localStorage.getItem("wallet") || undefined);
    const contract = new ethers.Contract(ADAPTER_ADDRESS, ABI as ethers.InterfaceAbi, provider);
    return contract.connect(signer) as ethers.Contract;
}

export async function upgrade(address: string): Promise<ethers.Transaction> {
    const contract = await getContractSigner();
    return contract.upgrade(address) as Promise<ethers.Transaction>;
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
    return contract.getLastId();
}

export async function addCampaign(campaign : Campaign){
    const contract = await getContractSigner();
    return contract.addCampaign(campaign.title, campaign.description, campaign.videosUrl, campaign.imagesUrl, campaign.goal)  as Promise<ethers.Transaction>;;
}

export async function getCampaign(id : number) {
    
    const contract = getContract();
    return contract.getCampaign(id);
}

export async function donate(id : number, donation : string) : Promise<ethers.Transaction> {
    const contract = await getContractSigner();
    const value = ethers.toBigInt(donation)
    return contract.donate(id, {value}) as Promise<ethers.Transaction>
}

export type Campaign = {
    title: string;
    description: string;
    videosUrl: string[];
    imagesUrl: string[];
    goal: string;
    author: string;
    balance: BigInt;
    donors: string[];
    active: boolean;
}