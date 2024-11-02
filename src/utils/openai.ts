const ABACUS_API_URL = "https://api.cloud.abacus.ai/v0/prediction";

export async function generateText(prompt: string) {
  try {
    const response = await fetch(ABACUS_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.ABACUS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelName: "GPT-JT-6B-v1",
        deploymentName: "GPT-JT",
        input: {
          prompt: prompt,
          max_tokens: 1000,
          temperature: 0.7,
        }
      }),
    });

    const result = await response.json();
    return result.prediction.generated_text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
} 