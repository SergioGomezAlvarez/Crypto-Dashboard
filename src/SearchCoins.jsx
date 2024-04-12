import React, { useState } from 'react';
import './index.css'
import Dashboard from './Dashboard';


const SearchCoins = ({ coins }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        const results = coins.filter(coin =>
            coin.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search Coins..."
                value={searchTerm}
                onChange={handleChange}
                className="search-bar"
            />
            {searchTerm && (
                <ul className="coin-search-list">
                    {searchResults.map((coin, index) => (
                        <li className='item' key={index}>{coin.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchCoins;
