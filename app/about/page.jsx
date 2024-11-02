'use client';

import React from 'react';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto p-8 relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
              About Lh Notebook Generator
            </h1>

            <div className="space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
                Lh Notebook Generator is a powerful tool designed to create beautiful, customized notebooks 
                for students and professionals. Each notebook is uniquely generated with random 
                professional designs and patterns, making every creation special and personal.
              </p>

              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Created by Lahcen El Hanchir
                </h2>
                <p className="mb-2">
                  Full-stack developer and digital creator passionate about building tools that make a difference.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://lahcen.click" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                  >
                    Visit Website
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Features
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Custom cover designs</li>
                    <li>Professional patterns</li>
                    <li>Student information fields</li>
                    <li>Lined pages for notes</li>
                    <li>Automatic page numbering</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Technology
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Next.js</li>
                    <li>React</li>
                    <li>PDF-Lib</li>
                    <li>TailwindCSS</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8 pt-6 border-t">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} Lh Notebook Generator by Lahcen El Hanchir. 
                  All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 