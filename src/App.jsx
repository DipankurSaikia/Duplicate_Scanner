import React, { useState } from 'react';

function App() {
  const [directory, setDirectory] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse('');

    try {
      const res = await fetch('http://localhost:8080/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: directory }),
      });

      if (!res.ok) throw new Error('Failed to send directory to backend.');

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Application Scanner</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={directory}
            onChange={(e) => setDirectory(e.target.value)}
            placeholder="Enter directory path (e.g., C:/Programs)"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Scan Directory
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-600 text-sm">
            Error: {error}
          </div>
        )}

        {response && (
          <div className="mt-6">
            <h4 className="text-lg font-medium mb-2">Response:</h4>
            <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto whitespace-pre-wrap">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
