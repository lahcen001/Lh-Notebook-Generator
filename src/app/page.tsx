'use client';

import { useState } from 'react';
import { generatePDF } from '@/utils/pdfGenerator';
import NotebookForm from '@/components/NotebookForm';
import Preview from '@/components/Preview';

export default function Home() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (topic: string, sections: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, sections }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }
      
      setContent(data.content);
    } catch (error) {
      console.error('Error generating content:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    try {
      generatePDF(content);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setError('Failed to download PDF');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            AI Notebook Generator
          </h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <NotebookForm onGenerate={handleGenerate} />
          </div>
          
          {(loading || content) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <Preview 
                content={content} 
                loading={loading} 
                onDownload={handleDownload} 
              />
            </div>
          )}
        </div>
      </main>
      
      <footer className="text-center py-4 text-gray-600">
        <p>Powered by Abacus AI</p>
      </footer>
    </div>
  );
} 