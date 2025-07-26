import { ref } from 'vue';

export function useOpenAI() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const response = ref('');
  const error = ref<any>(null);
  const loading = ref(false);

  const sendMessage = async (prompt: string) => {
    loading.value = true;
    response.value = '';
    error.value = null;

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      response.value = data.choices[0]?.message?.content || 'No response from AI.';
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    sendMessage,
    response,
    error,
    loading,
  };
}
