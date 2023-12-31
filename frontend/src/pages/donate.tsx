import { ethers } from "ethers";
import Footer from "../components/Footer"
import { Campaign, getCampaign, donate } from '../services/Web3Service';
import { useState } from "react"
import Confetti from 'react-confetti'

export default function Donate(){

    const [id,setId] = useState<number>();
    const [campaign,setCampaign] = useState<Campaign>({} as Campaign)
    const [donation,setDonation] = useState("");
    const [message,setMessage] = useState("");
    const [confettiActive, setConfettiActive] = useState(false);
    const [confettiOpacity, setConfettiOpacity] = useState(1); // Inicialmente, a opacidade é 1 (totalmente visível)



    const confetti = () => {

        return (
            <Confetti
                style={{position: "fixed", top:"0", left:"0", opacity: confettiOpacity}}
                recycle={confettiActive}                
                width={window.innerWidth}
                height={window.innerHeight}
            />
            
        )

    }

    


      

    async function btnSearchClick() {
        setMessage("Searching...wait...");

        if(id !== null && id !== undefined){
            
            await getCampaign(id)
            .then(result => {
                setMessage("");                
                setCampaign(result);     
 
                     
            })    
            .catch(err => setMessage(err.message));

        }
            
            
    }

    function onChangeId(evt : React.ChangeEvent<HTMLInputElement>) {
        setId(parseInt(evt.target.value));
    }

    function onChangeValue(evt : React.ChangeEvent<HTMLInputElement>) {
        setDonation(evt.target.value);
    }
    
    function btnDonateClick() {
        setMessage("Donating...wait...");

        if (id !== undefined) {
            donate(id, donation)
                .then(tx => {setMessage("The donation was made successfully, thanks. In some minutes the campaign balance will be increased.")
                setConfettiActive(true);
                let opacity = 1;
                const interval = setInterval(() => {
                    opacity -= 0.01; 
                    setConfettiOpacity(opacity);

                    if (opacity <= 0) {
                        setConfettiActive(false);
                        clearInterval(interval);
                    }
                }, 100);})
                .catch(err => setMessage(err.message))


        } else {
            setMessage("Capaign id is undefined. Make sure you search for the correct campaign before donating.");
        }
    }
    return(
        <>

            <div className="container">
            {confettiActive && confetti()}

            <h1 className='display-5 fw-bold lh-1 mb-3 mt-3' style={{ color: "#333", fontFamily: "Euclid Circular B, sans-serif" }}>Donate Crypto</h1>

            {
                Object.keys(campaign).length === 0
                ?(
                    <>

                    <p className="mb-5">What is the campaign ID you are looking for?
   
</p>
                    <div className="col-3">
                        <div className="input-group mb-3">
                            <input type="number" id="campaignId" className="form-control" onChange={onChangeId} value={id}/>
                            <input type="button" value="Search" className="btn btn-primary p-3" onClick={btnSearchClick}/>

                        </div>
                    </div>
                    </>
                )
                :(
                    <>

                    <p>Please make sure this is the correct campaign before donating.</p>
                    <hr />
                    <div className="row flex-lg-row-reverse align-items-center g-5">
                        <div className="col-5">
                            {
                            
                
                                (campaign.imagesUrl && campaign.imagesUrl.length > 0)
                                ?                     <>
                                {campaign.imagesUrl.map(item => (
                                    <img src={item} className="d-block mx-lg-auto img-fluid mt-4" alt={item} width={300}></img>
                                ))}
                              </>
                                :<></>
                            }

 


                        </div>
                        <div className="col-7 mb-5 " style={{height: 500, overflow: "auto"}}>
                            <h2>Title: {campaign.title}</h2>
                            <p><strong>Author: </strong>{campaign.author}</p>
                            <p className="mb-3">Description: {campaign.description}</p>
                            {

                                campaign.videosUrl
                                ?<>
                                {campaign.videosUrl.map(item => (
                                    <iframe allowFullScreen style={{width: "100%", minHeight: "300px"}} className="mt-3" title={campaign.title} src={item}></iframe>
                                    ))}
                              </>
                                :<></>

                            }
                            <p className="mb-3 fw-bold">Goal: {ethers.formatEther(campaign.goal)} ETH</p>
                            <p className="mb-3">Active: {campaign.active ? "This campaign is active." : "This campaign is closed."}</p>


                            <p className="mb-3 fst-italic mt-5">
So, what did you think of the project? Has already been collected {ethers.formatEther(campaign.balance)} ETH in this campaign. How much do you want to donate (in ETH)?</p>

                            <p className="mb-3">Donors: {campaign.donors
                                                        ? <>
                                                        {campaign.donors.map((item, index) => (
                                                            <p key={index}>#{index + 1} - {item}</p>
                                                        ))}
                                                        </>
                                                        : <></>
                            
                            }
                            
                            </p>

                        </div>
                        <div className="mb-3">
                            <div className="input-group">

                                <input disabled={!campaign.active} type="number" id="donation" className="form-control" onChange={onChangeValue} value={donation}/>
                                <span className="input-group-text">ETH</span>
                                <input disabled={!campaign.active} type="button" value="Donate" className="btn btn-primary p-3 w-25" onClick={btnDonateClick}/>
                            </div>
                        </div>
                    </div>
                    </>
                )
            }

                {
                    message
                    ? <div className="alert alert-success p-3 col-6" role="alert">{message}</div>
                    :<></>
                }

                <Footer></Footer>
            </div>

        </>
    )
}