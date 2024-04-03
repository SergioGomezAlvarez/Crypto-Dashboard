import axios from 'axios';
import App from './App';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


const Staafdiagram = ({ }) => {

    const [crypto, setCrypto] = useState();
    const [bitc, setBitc] = useState();
    const [tether, setTeth] = useState();
    const [binance, setBinance] = useState();
    const [solana, setSolana] = useState();
    const [coins, setCoins] = useState([]);
    const [example, setExample] = useState(
        {
            favcoin: 'x',
            faccoin2: 'y'
        }

    );
    const [historicalData, setHistoricalData] = useState([]);

    // const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 100, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },];



    useEffect(() => {
        axios.get('https://api.coincap.io/v2/assets').then(function (response) {
            setCoins(response.data.data)
            const bitcoin = response.data.data.find(coins => coins.name === "Bitcoin")
            setBitc(bitcoin)
            const ethereum = response.data.data.find(coins => coins.symbol === "ETH");
            setCrypto(ethereum);
            console.log(response.data.data)
            const tether = response.data.data.find(coins => coins.name === "Tether");
            setTeth(tether);
            const binance = response.data.data.find(coins => coins.name === "BNB");
            setBinance(binance);
            const solana = response.data.data.find(coins => coins.name === "Solana")
            setSolana(solana);
        });
    }, []);

    useEffect(() => {
        axios.get('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1')
            .then(response => {
                const data = response.data.data.slice(6).reverse(); // Dit zal de eerste 6 items uit de array verwijderen en de volgorde van de resterende items omkeren
                setHistoricalData(data);
            })
            .catch(error => {
                console.error('Error fetching historical data:', error);
            });
    }, []);

    
    return (
        <>
            <div className="container-main">
                <div className="container-dashboard">
                    <div className="blocks-container">
                        <div className="info-block-large-1">
                            <div className="block-info-container">
                                <h1 className="block-info-text-trending-coins">Trending Coins</h1>
                                <h1 className="price-btc-text">
                                    <img className="btc-logo" src="images/bitcoin-logo-big.png"></img> : {!bitc ? null : Number(bitc.priceUsd).toFixed(2)}
                                </h1>
                                <h1 className="price-btc-text">
                                    <img className="eth-logo" src="images/ethereum-logo-big.png"></img> : {!crypto ? null : Number(crypto.priceUsd).toFixed(2)}
                                </h1>
                                <h1 className="price-btc-text">
                                    <img className="tether-logo" src="images/tether-logo-big.png"></img> : {!tether ? null : Number(tether.priceUsd).toFixed(2)}
                                </h1>
                                <h1 className="price-btc-text">
                                    <img className="binance-logo" src="images/binance-logo-big.png"></img> : {!binance ? null : Number(binance.priceUsd).toFixed(2)}
                                </h1>
                                <h1 className="price-btc-text">
                                    <img className="solana-logo" src="images/solana-logo-big.png"></img> : {!solana ? null : Number(solana.priceUsd).toFixed(2)}
                                </h1>
                                {/* {coins && coins.map((item, index) => {
                                       return   <div><FontAwesomeIcon icon={faBitcoin} size="xl" /> {item.id}</div>
                                })} */}
                            </div>
                        </div>
                        <div className="info-block-large-graph">
                            <div className="block-info-container-graph">
                                <h1 className="block-info-text">Graph</h1>
                                <LineChart width={750} height={250} data={[bitc].filter(Boolean)}>
                                    <Line type="monotone" dataKey="priceUsd" stroke="#0059ff    " />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                </LineChart>
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