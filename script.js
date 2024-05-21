async function generateText() {
    const inputText = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('output');

    const apiKey = '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'; // Your actual API key
    const model = 'microsoft/DialoGPT-large'; // Use Microsoft's DialoGPT-large model

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
                max_new_tokens: 150 // Increase token limit for a longer response
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
