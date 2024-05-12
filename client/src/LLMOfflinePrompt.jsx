import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './LLMOfflinePrompt.css'; // Import the CSS file

const LLMOfflinePrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Access your API key as an environment variable
  const apiKey = "AIzaSyCkERTH5hc32P_vyPQFuEA9uYCqHc6XKtg";

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!apiKey) {
      setError('Please');
      setIsLoading(false);
      return;
    }

    if (!prompt) {
      setError('Please enter a prompt for the LLM.');
      setIsLoading(false);
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResponse(response.text());
    } catch (err) {
      console.error('Error generating response:', err);
      setError('An error occurred while generating the response. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="llm-offline-prompt">
      <h2>Offline LLM Interaction</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Enter your query:</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Type your question for the LLM"
          required
        />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Ask LLM (Offline)'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>

      {response && (
        <div className="llm-response">
          <h3>LLM Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default LLMOfflinePrompt;


