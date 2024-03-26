import axios from 'axios';
import App from './App';
import { useState, useEffect } from 'react';



const Staafdiagram = ({ }) => {
    
const [Crypto, setCrypto] = useState([]);
const [Coins, setCoins] = useState([]);

useEffect(() => {
  axios.get('https://api.coincap.io/v2/assets').then(function (response) {
    setCoins(response.data.data)
    const bitcoin = response.data.data.find(coins => coins.name === "Bitcoin")
    setCrypto(bitcoin)
    console.log(response.data.data)
  });
}, []);

    return (
        <>
            <div className="container-main">
                <div className="container-dashboard">
                    <div className="blocks-container">
                        <div className="info-block-large">
                            <div className="block-info-container">
                                <h1 className="block-info-text">Total Balance</h1>
                                <h1 className="price-btc-text">Bitcoin price:</h1>
                                <h1 className="price-btc-text">{Number(Crypto.priceUsd).toFixed(2)}</h1>
                            </div>
                        </div>
                        <div className="info-block-large">
                            <div className="block-info-container">
                                <h1 className="block-info-text">Burn</h1>
                            </div>
                        </div>
                        <div className="info-block-large">
                            <div className="block-info-container">
                                <h1 className="block-info-text">Expenses</h1>
                            </div>
                        </div>

                    </div>
                    <div className="blocks-container">
                        <div className="info-block-large">
                            <div className="block-info-container">
                                <h1 className="block-info-text">Solvency</h1>
                            </div>
                        </div>
                        <div className="info-block-small">
                            <div className="block-info-small-container">
                                <h1 className="block-info-text">Debtors</h1>
                            </div>
                        </div>
                        <div className="info-block-large">
                            <div className="block-info-container">
                                <h1 className="block-info-text">Debtors (past 6 months)</h1>
                            </div>
                        </div>
                        <div className="info-block-small">
                            <div className="block-info-small-container">
                                <h1 className="block-info-text">Total Balance</h1>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="footer-ad-container">
                    <div className="logo-container">
                        <img className="logo" src="./images/Serg Logo White Backg.png"></img>
                    </div>
                    <div className="cashflow-text-container">
                        <h1 className="cashflow-text">Cashflow Dashboard</h1>
                    </div>
                    <div className="cashflow-text-container">
                        <h1 className="powered-by-text">Powered By Sergio Gomez Alvarez</h1>
                    </div>
                    <div className="time-container">
                        <App />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Staafdiagram;