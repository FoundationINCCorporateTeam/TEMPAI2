async function generateText() {
    const inputText = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('output');

    const apiKey = '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'; // Your actual API key
    const model = 'meta-llama/Llama-2-7b-chat-hf'; // Use a compatible model available in Hugging Face Inference API

    if (inputText.trim() === '') {
        outputDiv.innerText = 'Please enter a prompt.';
        return;
    }

    outputDiv.innerText = 'Generating text...';

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            inputs: inputText,
            parameters: {
                max_new_tokens: 50
            }
        })
    });

    if (!response.ok) {
        outputDiv.innerText = 'Error generating text.';
        return;
    }

    const result = await response.json();
    outputDiv.innerText = result.generated_text || 'No text generated.';
}
