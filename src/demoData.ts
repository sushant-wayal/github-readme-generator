export const demoMarkdown = "# Gemini Code Parser\n\nGemini Code Parser is a Node.js library designed to parse the code response generated by Gemini AI in response to user prompts. It extracts information such as file names, paths, contents, and additional metadata provided by the AI, and emits structured events for easy integration into other applications.\n\n## Features\n\n- Streamlined parsing of AI-generated code responses.\n- Emits structured events for real-time processing of files and responses.\n- Easy-to-extend architecture using `EventEmitter`.\n- Integration with Google Generative AI API.\n\n## Installation\n\nEnsure you have Node.js installed on your system. Then, install the package via npm:\n\n```bash\nnpm install gemini-code-parser\n```\n\n## Usage\n\nHere’s how to integrate Gemini Code Parser in your project:\n\n### Step 1: Import and Initialize\n\n```javascript\nimport { GeminiCodeParser } from 'gemini-code-parser';\n\nconst parser = new GeminiCodeParser('<Your_Google_AI_API_Key>');\n```\n\n### Step 2: Generate Parsed Code Stream\n\n```javascript\nconst prompt = \"Write a Node.js application to manage tasks.\";\nparser.generateParsedCodeStream(prompt)\n  .then(parsedCode => {\n    console.log(parsedCode);\n  })\n  .catch(error => {\n    console.error(\"Error generating parsed code:\", error);\n  });\n```\n\n## API Reference\n\n### `GeminiCodeParser`\n\n#### Constructor\n\n```javascript\nnew GeminiCodeParser(apiKey: string)\n```\n- `apiKey`: Google AI API key for accessing the Generative AI service.\n\n#### Methods\n\n- ##### `generateCodeStream(prompt: string)`\n    - Streams the AI-generated content in response to the given prompt.\n    - Returns: `AsyncIterable` of content chunks.\n\n- ##### `generateParsedCodeStream(prompt: string)`\n    - Parses the AI-generated response and returns structured code files and metadata.\n    - Returns: `Promise` resolving to the parsed code object.\n\n## Event Listeners\nGemini Code Parser emits various events to facilitate real-time processing:\n\n- `file-start`: Emitted when a file parsing starts.\n    - Payload: `{ name, path }`\n\n- `file`: Emitted while parsing file content.\n    - Payload: `{ name, path, content }`\n\n- `file-end`: Emitted when a file parsing ends.\n    - Payload: `{}`\n\n- `response`: Emitted for the general AI response.\n    - Payload: `{ response }`\n\n- `response-end`: Emitted when the AI response ends.\n    - Payload: `{}`\n\n- `title`: Emitted for the title of the generated application.\n    - Payload: `{ title }`\n\n## Example \n\nHere’s a full example that listens to emitted events:\n\n```javascript\nimport { GeminiCodeParser } from 'gemini-code-parser';\n\nconst parser = new GeminiCodeParser('<Your_Google_AI_API_Key>');\n\nparser.on('file-start', data => {\n  console.log(\"File start:\", data);\n});\n\nparser.on('file', data => {\n  console.log(\"File content:\", data);\n});\n\nparser.on('file-end', () => {\n  console.log(\"File end.\");\n});\n\nparser.on('response', data => {\n  console.log(\"General response:\", data);\n});\n\nparser.generateParsedCodeStream(\"Create a simple web server using Node.js.\")\n  .then(parsedCode => {\n    console.log(\"Parsed code:\", parsedCode);\n  })\n  .catch(error => {\n    console.error(\"Error:\", error);\n  });\n```\n";