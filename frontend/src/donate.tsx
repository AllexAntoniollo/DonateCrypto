import Footer from "./components/Footer"
import { Campaign, getCampaign, donate } from './services/Web3Service';


import { useState, useEffect } from "react"
export default function Donate(){

    const [id,setId] = useState<number>();
    const [campaign,setCampaign] = useState<Campaign>({} as Campaign)
    const [donation,setDonation] = useState("");
    const [message,setMessage] = useState("");

    

    useEffect(() => {
        console.log("Component re-rendered with campaign:", campaign);
      }, [campaign]);

      

    async function btnSearchClick() {
        setMessage("Buscando...Aguarde...");

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
        setMessage("Doando...Aguarde...");

        if (id !== undefined) {
            donate(id, donation)
                .then(tx => setMessage("Doação realizada, obrigado. Em alguns minutos o saldo será atualizado."))
                .catch(err => setMessage(err.message))
        } else {
            setMessage("ID da campanha não está definido. Certifique-se de buscar uma campanha antes de doar.");
        }
    }

    return(
        <>
            <div className="container">
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

                    <p>Verifique se esta é a campanha certa antes de finalizar a doação.</p>
                    <hr />
                    <div className="row flex-lg-row-reverse align-items-center g-5">
                        <div className="col-7">
                            {
                                                                //<iframe width='100%' title={campaign.title} height='480' src={campaign.videosUrls[0]}></iframe>
                            
                
                                (campaign.imagesUrl && campaign.imagesUrl.length > 0)
                                ?                     <>
                                {campaign.imagesUrl.map(item => (
                                    <img src={item} className="d-block mx-lg-auto img-fluid" alt={item}></img>
                                ))}
                              </>
                                :<></>
                            }

 


                        </div>
                        <div className="col-5 mb-5 " style={{height: 480, overflow: "auto"}}>
                            <h2>Title: {campaign.title}</h2>
                            <p><strong>Autor: </strong>{campaign.author}</p>
                            <p className="mb-3">Description: {campaign.description}</p>
                            {
                                campaign.videosUrl
                                ?<p>Assista ao video ao lado para entender mais sobre nossa campanha.</p>
                                :<></>

                            }
                            <p className="mb-3">Goal: {campaign.goal}</p>
                            <p className="mb-3">Active: {campaign.active}</p>
                            <p className="mb-3">Donors: {campaign.donors}</p>



                            <p className="mb-3 fst-italic mt-5">E aí, o que achou do projeto? Já foi arrecadado {Number(campaign.balance)} WEI nesta campanha. O quanto você quer doar (em ETH)?</p>

                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input type="number" id="donation" className="form-control" onChange={onChangeValue} value={donation}/>
                                <span className="input-group-text">ETH</span>
                                <input type="button" value="Donate" className="btn btn-primary p-3 w-25" onClick={btnDonateClick}/>
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