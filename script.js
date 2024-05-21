async function generateText() {
    const inputText = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('output');

    const apiKey = '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'; // Your actual API key
    const model = 'gpt2'; // Use GPT-2 model available in Hugging Face Inference API

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
        const error = await response.json();
        outputDiv.innerText = `Error: ${error.error}`;
        return;
    }

    const result = await response.json();
    outputDiv.innerText = result[0]?.generated_text || 'No text generated.';
}
