import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const jsonInput = JSON.parse(input);
            const res = await axios.post('https://your-backend-api/bfhl', jsonInput);
            setResponse(res.data);
            setError('');
        } catch (error) {
            setError('Invalid JSON input');
            setResponse(null);
        }
    };

    const handleFilterChange = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSelectedFilters(selected);
    };

    const renderFilteredResponse = () => {
        if (!response) return null;

        let filteredResponse = {};
        if (selectedFilters.includes('alphabets')) {
            filteredResponse.alphabets = response.alphabets;
        }
        if (selectedFilters.includes('numbers')) {
            filteredResponse.numbers = response.numbers;
        }
        if (selectedFilters.includes('highest_alphabet')) {
            filteredResponse.highest_alphabet = response.highest_alphabet;
        }

        return (
            <div>
                {Object.keys(filteredResponse).map(key => (
                    <div key={key}>
                        <strong>{key}:</strong> {filteredResponse[key].join(', ')}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>ABCD123</h1> {/* Replace with your roll number */}
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter JSON input, e.g., { "data": ["M", "1", "334", "4", "B"] }'
                rows={5}
                cols={50}
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {response && (
                <div>
                    <h3>Filter Response</h3>
                    <select multiple onChange={handleFilterChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                    <div style={{ marginTop: '20px' }}>
                        <h4>Filtered Response</h4>
                        {renderFilteredResponse()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;