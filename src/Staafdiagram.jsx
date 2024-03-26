import axios from 'axios';
import App from './App';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'




const Staafdiagram = ({ }) => {

    const [crypto, setCrypto] = useState();
    const [bitc, setBitc] = useState();
    const [coins, setCoins] = useState([]);
    const [example, setExample] = useState(
        {
            favcoin: 'x',
            faccoin2: 'y'
        }

    );

    useEffect(() => {
        axios.get('https://api.coincap.io/v2/assets').then(function (response) {
            setCoins(response.data.data)
            const bitcoin = response.data.data.find(coins => coins.name === "Bitcoin")
            setBitc(bitcoin)
            const ethereum = response.data.data.find(coins => coins.symbol === "ETH"); // Zoek Ethereum op basis van het symbool
            setCrypto(ethereum);
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
                                <h1 className="block-info-text">Trending Coins</h1>
                                <h1 className="price-btc-text">
                                    <FontAwesomeIcon icon={faBitcoin} size="2xl" style={{ color: "#f7931a" }} /> : {!bitc ? null : Number(bitc.priceUsd).toFixed(2)}
                                </h1>
                                <h1 className="price-btc-text">
                                    <FontAwesomeIcon icon={faEthereum} size="2xl" style={{ color: "#9da7da", }} /> : {!crypto ? null : Number(crypto.priceUsd).toFixed(2)}
                                </h1>
                                {/* {coins && coins.map((item, index) => {
                                       return   <div><FontAwesomeIcon icon={faBitcoin} size="xl" /> {item.id}</div>
                                })} */}
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