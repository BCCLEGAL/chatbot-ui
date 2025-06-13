// lib/azure-openai.ts

export async function chatWithAzureOpenAI(messages: any[]) {
  const endpoint = process.env.OPENAI_API_HOST!;
  const apiKey = process.env.OPENAI_API_KEY!;
  const deploymentId = process.env.AZURE_DEPLOYMENT_ID!;
  const apiVersion = process.env.OPENAI_API_VERSION!;

  const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({ messages, max_tokens: 1000, temperature: 0.7 }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Azure OpenAI error: ${res.status} – ${err}`);
  }

  return res.json();
}
