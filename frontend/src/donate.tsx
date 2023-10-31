import { Link } from "react-router-dom";
import Footer from "./components/Footer"
import { getCampaign, donate } from './services/Web3Service';


import { useState } from "react"
export default function Donate(){

    const [campaign,setCampaign] = useState({});
    const [donation,setDonation] = useState("");
    const [message,setMessage] = useState("");


    function btnSearchClick() {
        setMessage("Buscando...Aguarde...");
        getCampaign(campaign.id)
        .then(result => {
            setMessage("");
            result.id = campaign.id;
            setCampaign(result);
        })
       // .catch(err => setMessage(err.message));

    }

    function onChangeId(evt) {
        campaign.id = evt.target.value;
    }

    function onChangeValue(evt) {
        setDonation(evt.target.value);
    }
    
    function btnDonateClick() {
        setMessage("Doando...Aguarde...");
        donate(campaign.id, donation)
            .then(tx => setMessage("Doação realizada, obigado. Em alguns minutos o saldo será atualizado."))
            .catch(err => setMessage(err.message))

    }

    return(
        <>
            <div className="container">
            <h1 className='display-5 fw-bold lh-1 mb-3' style={{ color: "#333", fontFamily: "Euclid Circular B, sans-serif" }}>Donate Crypto</h1>

            {
                !campaign.id
                ?(
                    <>
                    <p className="mb-5">What is the campaign ID you are looking for?
</p>
                    <div className="col-3">
                        <div className="input-group mb-3">
                            <input type="number" id="campaignId" className="form-control" onChange={onChangeId} value={campaign.id}/>
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
                                
                                campaign.videosUrl
                                ?<iframe width='100%' height='480' src={campaign.videosUrl[0]}></iframe>
                                :<></>//<img src={campaign.imagesUrl[0]} className="d-block mx-lg-auto img-fluid" width="640" height="480"></img>
                            }


                        </div>
                        <div className="col-5 mb-5 " style={{height: 480, scrollbars: true}}>
                            <h2>Title: {campaign.title}</h2>
                            <p><strong>Autor: </strong>{campaign.author}</p>
                            <p className="mb-3">Description: {campaign.description}</p>
                            {
                                campaign.videosUrl
                                ?<p>Assista ao video ao lado para entender mais sobre nossa campanha.</p>
                                :<></>

                            }
                            <p className="mb-3 fst-italic mt-5">E aí, o que achou do projeto? Já foi arrecadado {campaign.balance / 10**18} ETH nesta campanha. O quanto você quer doar (em ETH)?</p>

                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input type="number" id="donation" className="form-control" onChange={onChangeValue} value={donation}/>
                                <span className="input-group-text">BNB</span>
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