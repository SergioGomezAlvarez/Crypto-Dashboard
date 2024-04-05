import React, { useState } from 'react';
import './index.css'
const SearchCoins = ({ coins }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        // Filter de munten op basis van de zoekterm
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
                className="search-bar" // Toegevoegd className
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
