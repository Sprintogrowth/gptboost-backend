GPTBoost Backend

This repository contains the backend implementation for a custom GPT-powered chat system.
It exposes a secure API endpoint that connects a frontend to the OpenAI API, while keeping API keys private and supporting multiple GPT configurations via prompts.

Overview
The backend is designed to:

1. Provide a single chat API endpoint
2. Securely communicate with the OpenAI API
3. Dynamically handle multiple GPT behaviors using prompt configurations
4. Enforce basic per-user usage limits
5. Be deployment-ready for serverless platforms (e.g. Vercel, Netlify)

Features
1. Custom Chat Endpoint
2. Dynamic GPT Selection via Prompt Configuration
3. Secure API Key Handling (Environment Variables Only)
4. Basic Usage Limiting
5. Clean, Maintainable Repository Structure

Environment Variables
This project uses environment variables for all sensitive data.

Required Variables
Create a .env file locally using .env.example as a reference.

GPT Configuration (Dynamic Prompt Handling)
Multiple GPT behaviors are supported via a configuration-based approach.
Location: config/gpts.js

Adding a New GPT
To add a new GPT behavior:
1. Add a new entry in config/gpts.js
2. Assign it a unique ID
3. Define its system prompt (and optionally model)
4. Reference the ID in the chat request payload
No endpoint changes are required.

Chat Endpoint
Endpoint: POST /api/chat
Fields
1. message (required): User’s message
2. gptId (optional): GPT configuration ID (defaults to default)
3. userId (optional): Used for basic usage limiting

Usage Limits
The backend includes a basic in-memory usage limiter per user.
This is intended as a lightweight safeguard and can be extended later with persistent storage (Redis, database, etc.) if required.

Install Dependencies: npm install
Run Locally: npm run local

The server will start and expose the /api/chat endpoint locally.