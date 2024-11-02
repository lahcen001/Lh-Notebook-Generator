import { NextResponse } from 'next/server';
import { generateText } from '../../../utils/openai';

export async function POST(req: Request) {
  try {
    const { topic, sections } = await req.json();

    const prompt = `Create a detailed educational notebook about ${topic}. 
    Structure it with ${sections} main sections, including:
    - An introduction explaining the topic
    - ${sections} well-organized main sections
    - A conclusion summarizing the key points
    
    Make it detailed and educational, using clear headings for each section.`;

    const content = await generateText(prompt);

    // Clean up the response if needed
    const cleanedContent = content.trim().replace(/^Assistant:|^AI:|^Bot:/, '').trim();

    return NextResponse.json({ content: cleanedContent });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Error generating content. Please try again later.' 
    }, { status: 500 });
  }
} 