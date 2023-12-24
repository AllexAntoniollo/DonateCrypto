import { Link } from "react-router-dom";
import Footer from "./components/Footer"
import { Campaign, getLastCampaignId, addCampaign } from './services/Web3Service';
import { ChangeEvent } from 'react';
import { useState } from "react"
export default function Create(){

    const [campaign,setCampaign] = useState<Campaign>({} as Campaign);
    const [message,setMessage] = useState("");


    function onInputChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { id, value } = evt.target;
        
        setCampaign((prevState) => ({
            ...prevState,
            [id]: id === "imagesUrl" || id === "videosUrl" ? value.split(",") : value,
        }));
    }

    function btnSaveClick() {
        setMessage("Salvando...Aguarde...");

        addCampaign(campaign)
            .then(tx => getLastCampaignId())
            .then(id => {setMessage(`Campanha salva com ID ${id}. Avise seus amigos e passe a eles esse número.`)
                    
            })
            .catch(err => {
                console.error(err);
                setMessage(err.message)
            })
    }

    return(
        <>
            <div className="container">
            <h1 className='display-5 fw-bold lh-1 mt-3 mb-3' style={{ color: "#333", fontFamily: "Euclid Circular B, sans-serif" }}>Donate Crypto</h1>
                <p style={{ color: "#333", fontFamily: "Euclid Circular B, sans-serif" }}>Fill in the fields to include your campaign on the platform.</p>
                <hr className="mb-4"></hr>
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input type="text" id="title" className="form-control" value={campaign.title} onChange={onInputChange}></input>
                        <label htmlFor="title">Title:</label>
                    </div>
                    <div className="form-floating mb-3">
                    <textarea id="description" className="form-control" defaultValue={campaign.description} onChange={onInputChange}></textarea>
                        <label htmlFor="description">Description:</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input id="imagesUrl" className="form-control" value={campaign.imagesUrl.join(",")} onChange={onInputChange}></input>
                        <label htmlFor="imagesUrl">Images Urls:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="videosUrl" className="form-control" value={campaign.videosUrl.join(",")} onChange={onInputChange}></input>
                        <label htmlFor="videosUrl">Videos Urls:</label>
                    </div>
        

                    <div className="form-floating mb-3">
                        <input min="100" type="number" id="goal" className="form-control" value={Number(campaign.goal)} onChange={onInputChange}></input>
                        <label htmlFor="goal">Goals:</label>
                    </div>
                    
                </div>   
                <div className="col-6 mb-3">
                    <input type="button" className="btn btn-primary col-12 p-3" value="Save Campaign" onClick={btnSaveClick}/>
                </div>
                <div className="col-6 mb-3">
                    <Link to="/" className="btn btn-secondary col-12 p-3" >To go back</Link>
                </div>
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