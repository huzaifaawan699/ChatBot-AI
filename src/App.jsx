import { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function generateAnswer() {
    if (!question.trim()) return; // Prevent generating if the question is empty
    setAnswer("loading...");

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyApRoKI9-oKXp2583R59F7rWKQK_lObIGY",
        method: "post",
        data: {
          contents: [
            { parts: [{ text: question }] },
          ],
        },
      });

      const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        setAnswer(generatedText);
      } else {
        setAnswer("Unexpected response structure");
        console.error("Unexpected response structure:", response.data);
      }

    } catch (error) {
      setAnswer("There was an error with the API request!");
      console.error("There was an error with the API request!", error);
    }
  }

  function clearChat() {
    setQuestion('');
    setAnswer('');
  }

  function newChat() {
    setQuestion('');
    setAnswer('');
  }

  function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function handleQuestionChange(e) {
    const inputText = e.target.value;
    setQuestion(capitalizeFirstLetter(inputText));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents default behavior of adding a new line
      generateAnswer();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <header className="w-full bg-white p-4 shadow-md rounded-b-lg text-center mb-6">
        <p className="text-gray-700 text-sm font-medium">
          Powered by Bolt Company, Founder Huzaifa
        </p>
      </header>
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Chatbot AI</h1>
        <textarea 
          value={question} 
          onChange={handleQuestionChange} 
          onKeyDown={handleKeyDown} // Added event handler for Enter key
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
          placeholder="Ask me anything..."
          rows='5'>
        </textarea>
        <div className="flex gap-4">
          <button 
            onClick={generateAnswer} 
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105">
            Generate Answer
          </button>
          <button 
            onClick={clearChat} 
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105">
            Clear Chat
          </button>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={newChat} 
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105">
            New Chat
          </button>
        </div>
        <div className="w-full p-4 bg-gray-100 rounded-lg shadow-inner text-gray-700 font-mono overflow-auto max-h-96">
          <pre>{answer}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
