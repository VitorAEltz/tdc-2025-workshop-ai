# TDC 2025 Workshop - AI Agent with MCP Server

A comprehensive AI workshop project demonstrating how to build and deploy an AI-powered security agent using LangGraph, Model Context Protocol (MCP), and Azion Edge Computing. This repository contains three interconnected projects that work together to create a full-stack AI chatbot application.

## 🏗️ Architecture Overview

This workshop consists of three main components:

1. **Backend** - AI Agent API powered by LangGraph and Hono
2. **Frontend** - Vue3 chatbot widget interface
3. **MCP Server** - Model Context Protocol server for extending AI capabilities

```
┌─────────────────┐
│   Frontend      │
│   (Vue3)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌─────────────────┐
│   Backend       │◄────►│   MCP Server    │
│   (LangGraph)   │      │   (Tools)       │
└─────────────────┘      └─────────────────┘
         │
         ▼
┌─────────────────┐
│   Azion         │
│ (SQL Database)  │
└─────────────────┘
```

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** (v18 or higher) and **Yarn** installed
- **Azion CLI** installed ([Installation Guide](https://www.azion.com/en/documentation/products/azion-cli/overview/))
  ```bash
  brew install azion   # For macOS
  ```
- **API Keys** from:
  - [Azion Console](https://console.azion.com/) - For edge deployment
  - [OpenAI](https://platform.openai.com/) - For AI models
  - [LangSmith](https://smith.langchain.com/) (Optional) - For request tracing

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tdc-2025-workshop-ai
```

### 2. Setup Each Project

Follow the setup instructions for each component in order:

1. [Backend Setup](#-backend-setup)
2. [MCP Server Setup](#-mcp-server-setup)
3. [Frontend Setup](#-frontend-setup)

---

## 🔧 Backend Setup

The backend is an AI agent built with LangGraph framework, deployed on Azion Edge Computing.

### Installation

```bash
cd backend
yarn install
```

### Environment Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Required
AZION_TOKEN=your_azion_token
OPENAI_API_KEY=your_openai_api_key

# Optional - Model Configuration
OPENAI_MODEL=gpt-4o
EMBEDDING_MODEL=text-embedding-3-small

# Optional - LangSmith Tracing
LANGSMITH_API_KEY=your_langsmith_key
LANGCHAIN_PROJECT=your_project_name
LANGCHAIN_TRACING_V2=false

# Database Configuration
MESSAGE_STORE_DB_NAME=your_messagestore_db
MESSAGE_STORE_TABLE_NAME=messages
VECTOR_STORE_DB_NAME=your_vectorstore_db
VECTOR_STORE_TABLE_NAME=vectors
```

### Database Setup

1. **Initialize the database:**
   ```bash
   yarn setup-db
   ```

2. **Upload documents for RAG:**
   ```bash
   yarn upload-docs
   ```
   
   This will process files from `migrations/files/` (supports PDF, MD, JSON, TXT).

### Local Development

```bash
# Build the project
azion build

# Run locally
azion dev
```

The server will start at `http://localhost:3333`

### Testing

```bash
# Test the agent locally
curl 'http://localhost:3333/' \
  --data-raw '{"messages":[{"role":"user","content":"Hello"}],"stream":false}'
```

### Deployment

```bash
azion deploy
```

After deployment, test with:
```bash
curl 'https://<your-domain>/' \
  --data-raw '{"messages":[{"role":"user","content":"Hello"}],"stream":false}'
```

### Available Scripts

- `yarn upload-docs` - Upload documents to vector database
- `yarn setup-db` - Initialize database schema
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix linting issues
- `yarn type-check` - TypeScript type checking

---

## 🔌 MCP Server Setup

The MCP (Model Context Protocol) server provides additional tools and capabilities for the AI agent.

### Installation

```bash
cd mcp-server
yarn install
```

### Local Development

```bash
# Build the server
azion build

# Run locally
azion dev
```

### Available Tools

- **Calculator** - Perform basic arithmetic operations (add, subtract, multiply, divide)

### Extending the Server

To add new tools, edit `src/core/tools.ts` and follow the MCP protocol specifications.

### Deployment

```bash
azion deploy
```

---

## 🎨 Frontend Setup

A Vue3-based chatbot widget that provides the user interface for interacting with the AI agent.

### Installation

```bash
cd frontend
yarn install
```

### Environment Configuration

Create a `.env` file in the `frontend` directory based on `.env.example`:

```env
# Backend Configuration
VITE_BACKEND_COPILOT_ENDPOINT_TESTAGENTV3=https://your-backend-url

# UI Configuration
VITE_THEME=dark
VITE_TITLE=Security Agent + MCP Server
VITE_SUBTITLE=Make your Agent with MCP Server
VITE_PREVIEW_TEXT=Hello
VITE_FOOTER_DISCLAIMER=

# Suggestion Options (customize as needed)
VITE_SUGGESTION_1_TITLE=List the latest HTTP events for my application.
VITE_SUGGESTION_1_CONTEXT=List the latest HTTP events for my application.
```

### Local Development

```bash
# Start development server
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
yarn build
```

### Deployment

```bash
azion deploy
```

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

---

## 📚 Project Structure

```
tdc-2025-workshop-ai/
├── backend/                 # AI Agent Backend
│   ├── src/                # Source code
│   ├── migrations/         # Database migrations and setup
│   ├── azion.config.ts     # Azion configuration
│   └── package.json
│
├── frontend/               # Vue3 Chatbot Widget
│   ├── src/               # Vue components and logic
│   ├── public/            # Static assets
│   ├── azion.config.mjs   # Azion configuration
│   └── package.json
│
├── mcp-server/            # Model Context Protocol Server
│   ├── src/              # MCP server implementation
│   ├── azion.config.ts   # Azion configuration
│   └── package.json
│
└── README.md             # This file
```

---

## 🔍 Monitoring & Evaluation

### Request Tracing with LangSmith

Monitor your AI agent's requests and responses through LangSmith:

1. Set up LangSmith environment variables in backend `.env`
2. Enable tracing: `LANGCHAIN_TRACING_V2=true`
3. View traces in your [LangSmith dashboard](https://smith.langchain.com/)

### RAG Evaluation

The backend includes capabilities for evaluating:

1. **Retrieval Quality** - Document relevance and retriever performance
2. **Hallucination Detection** - LLM adherence to source material
3. **Answer Relevance** - Response quality to questions
4. **Reference Answers** - Comparison against ground truth

For detailed evaluation guides, see [LangSmith Evaluation Tutorials](https://docs.smith.langchain.com/evaluation/tutorials).

---

## 🛠️ Tech Stack

### Backend
- **LangGraph** - AI agent framework
- **Hono** - Web framework
- **OpenAI** - Language models
- **Azion EdgeSQL** - Vector database
- **TypeScript** - Programming language

### Frontend
- **Vue 3** - Frontend framework
- **PrimeVue** - UI components
- **TailwindCSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client

### MCP Server
- **Model Context Protocol SDK** - MCP implementation
- **Hono** - Web framework
- **Zod** - Schema validation

---

## 📖 Additional Resources

- [Azion Documentation](https://www.azion.com/en/documentation/)
- [LangGraph Introduction Course](https://academy.langchain.com/courses/intro-to-langgraph)
- [LangSmith Documentation](https://docs.smith.langchain.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Azion EdgeSQL Shell](https://github.com/aziontech/edgesql-shell)

---

## 🤝 Contributing

This is a workshop project. Feel free to experiment and extend the functionality!

---

## 📝 License

ISC License - See individual project package.json files for details.

---

## 🆘 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Verify `AZION_TOKEN` is set correctly
   - Ensure databases are created with `yarn setup-db`

2. **OpenAI API errors**
   - Check `OPENAI_API_KEY` is valid
   - Verify you have sufficient API credits

3. **Build failures**
   - Clear node_modules and reinstall: `rm -rf node_modules && yarn install`
   - Ensure you're using Node.js v18 or higher

4. **Frontend can't connect to backend**
   - Verify `VITE_BACKEND_COPILOT_ENDPOINT_TESTAGENTV3` points to correct backend URL
   - Check CORS settings if deploying to different domains

---

## 📧 Support

For issues related to:
- **Azion Platform**: [Azion Support](https://www.azion.com/en/support/)
- **LangChain/LangGraph**: [LangChain Discord](https://discord.gg/langchain)

---

**Happy Building! 🚀**
