'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateNotebook = async () => {
    if (!prompt || !name) {
      setError('Please provide both name and notebook description');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, name, school, major, className }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.pdfUrl) {
        throw new Error('No PDF URL received');
      }

      // Create PDF download link
      const link = document.createElement('a');
      link.href = data.pdfUrl;
      link.download = `notebook-${name.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      link.click();

    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate notebook. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-20 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      </div>

      <nav className="bg-white/80 backdrop-blur-sm shadow-sm fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Lh Notebook
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-blue-50"
              >
                Home
              </Link>
              
              <Link
                href="/about"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                About
              </Link>

              <a
                href="https://lahcen.click"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Developer
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Generate Your Notebook
        </h1>
        
        <div className="space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name 1s
              </label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your school"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Major
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your major"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Name
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Class name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notebook Description
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Math Notes, Daily Journal, Meeting Notes..."
              className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={generateNotebook}
            disabled={loading || !prompt || !name}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            {loading ? 'Generating...' : 'Create Notebook'}
          </button>

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
        </div>

        <footer className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">Crafted with ❤️ by <a 
            href="https://lahcen.click" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            Lahcen El Hanchir
          </a></p>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} All rights reserved</p>
        </footer>
      </div>
    </main>
  );
} 