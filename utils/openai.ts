const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/facebook/opt-1.3b";

export async function generateText(prompt: string) {
  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false,
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate text');
    }

    const result = await response.json();
    return Array.isArray(result) ? result[0].generated_text : result.generated_text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
} 