import { useState } from 'react';
import { Link } from "react-router-dom";
import Footer from "./components/Footer"
import { doLogin } from './services/Web3Service';



export default function Home() {

  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");


  function btnLoginClick() {
    doLogin()
      .then(wallet => setWallet(wallet))
      .catch(err => setError(err.message))
    
  }

  return (
    <>
      <div className='container px-4 py-5'>
        <div className='row flex-lg-row-reverse align-items-center py-5 g-5'>
          {
            !wallet
              ?(
                <div className='col-10 col-sm-8 col-lg-6'>
                  <img src='https://cdn.pixabay.com/photo/2020/11/06/19/12/kid-5718703_1280.jpg' className='d-block mx-lg-auto img-fluid' width={700} height={500}></img>
                </div>
              )
              : (
                <div className='col-10 col-sm-8 col-lg-6'>
                  <p className='mb-3'>Welcome {wallet}</p>
                  <p className='mb-3'>What do you want to do?</p>
                  <div className='col-12'>
                    <p><Link to="/donate" className='btn btn-primary col-6 p-3'>I want to make a donation</Link></p>
                    <p><Link to="/create" className='btn btn-secondary col-6 p-3'>I want to create a campaign
</Link></p>

                  </div>
              </div>
              )
          }

        <div className='col-lg-6'>
        <h1 className='display-5 fw-bold lh-1 mb-3' style={{ color: "#333", fontFamily: "Euclid Circular B, sans-serif" }}>Donate Crypto</h1>
          <p className='lead'>Your decentralized donation platform
.</p>
          <p className='lead mb-3'>Authenticate with your wallet, create your campaign or donate to existing campaigns
</p>
          {
          !wallet
          ?(
            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
            <button type='button' className='btn btn-primary btn-lg px-4 me-md-2' onClick={btnLoginClick}>
              <img src='https://raw.githubusercontent.com/luiztools-cursos/web3-week-1/c61b777e37fc45667100e3d49ffa097940b21604/dapp/public/metamask.svg' width={64} className='me-3'></img>
              Connect with MetaMask
            </button>
            {error}
          </div>
          )
          : <></>

          }


        </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}
