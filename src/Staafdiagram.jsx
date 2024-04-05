import axios from 'axios';
import App from './App';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';


const Staafdiagram = ({ }) => {

    const [crypto, setCrypto] = useState();
    const [bitc, setBitc] = useState();
    const [tether, setTeth] = useState();
    const [binance, setBinance] = useState();
    const [solana, setSolana] = useState();
    const [coins, setCoins] = useState([]);

    const [historicalData, setHistoricalData] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('bitcoin');

    const COLORS = ['#f7931a', '#343434', '#28a17c', '#28a17c', '#4790c1']; // Define COLORS array


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
        axios.get(`https://api.coincap.io/v2/assets/${selectedCurrency}/history?interval=d1`)
            .then(response => {
                const data = response.data.data.slice(6).map(item => ({
                    time: new Date(item.time).toLocaleDateString(),
                    price: parseFloat(item.priceUsd)
                }));
                setHistoricalData(data);
            })
            .catch(error => {
                console.error('Error fetching historical data:', error);
            });
    }, [selectedCurrency]);

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
    };

    const getLineColor = (currency) => {
        const colors = {
            bitcoin: "#f7931a",
            ethereum: "#343434",
            tether: "#28a17c",
            binance: "#28a17c",
            solana: "#4790c1"
        };
        console.log(colors[currency]);
        return colors[currency] || "#888888"; // Standaard kleur
    };

    useEffect(() => {
        axios.get('https://api.coincap.io/v2/assets')
            .then(response => {
                const bitcoin = response.data.data.find(coin => coin.id === "bitcoin");
                setBitc(bitcoin);
            })
            .catch(error => {
                console.error('Error fetching Bitcoin data:', error);
            });
    }, []);

    if (!bitc) {
        return <div>Loading...</div>;
    }

    const pieChartData = [
        { name: 'bitcoin', value: parseFloat(bitc.priceUsd) },
        { name: 'ethereum', value: parseFloat(crypto.priceUsd) },
        { name: 'tether', value: parseFloat(tether.priceUsd) },
        { name: 'binance', value: parseFloat(binance.priceUsd) },
        { name: 'solana', value: parseFloat(solana.priceUsd) }
    ];

    return (
        <>
            <div className="container-main">
                <div className="container-dashboard">
                    <div className="blocks-container">
                        <div className="info-block-large-1">
                            <div className="block-info-container">
                                <h1 className="block-info-text-trending-coins">Trending Coins 🔥</h1>
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
                                <div className="header-container-graph">
                                    <h1 className="block-info-text">Prize Chart (USD)</h1>
                                    <div class="dropdown">
                                        <button class="dropbtn">Selecteer een munteenheid</button>
                                        <div class="dropdown-content">
                                            <a href="#" onClick={() => handleCurrencyChange('bitcoin')}>Bitcoin</a>
                                            <a href="#" onClick={() => handleCurrencyChange('ethereum')}>Ethereum</a>
                                            <a href="#" onClick={() => handleCurrencyChange('tether')}>Tether</a>
                                            <a href="#" onClick={() => handleCurrencyChange('binance-coin')}>BNB</a>
                                            <a href="#" onClick={() => handleCurrencyChange('solana')}>Solana</a>
                                        </div>
                                    </div>
                                </div>
                                <LineChart width={750} height={250} data={historicalData}>
                                    <Line type="monotone" dataKey="price" stroke={getLineColor(selectedCurrency)} dot={false} />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </div>
                        </div>

                    </div>
                    <div className="blocks-container">
                        <div className="info-block-large">
                            <div className="block-info-container">
                                <h1 className="block-info-text">Trending Coins Overview</h1>
                                <PieChart className="pie-chart" width={250} height={250}>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="48%"
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                        labelLine={false}
                                    >
                                        {
                                            pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))
                                        }
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
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