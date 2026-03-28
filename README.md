# 🐝 Project ऋत (Rta)
**Intelligence without Impact. Sustainable Generative AI.**

> *"Don't let AI kill your planet. Measure the physical truth of your GenAI stack, audit Joules per Token (JPT), and restore natural order."*

---

## 🌍 The Problem

Generative AI is a localized ecological disaster. A single enterprise LLM query can consume up to 10x the electricity of a standard Google search, and datacenters are draining millions of liters of fresh water for cooling. Companies lack visibility into the physical, environmental cost of their AI workflows.

---

## 💡 The Solution

**Project Rta** is an enterprise-grade sustainability dashboard designed to audit, optimize, and offset the physical footprint of Generative AI. We track Carbon (g CO₂), Water (Liters), and Energy (Joules per Token) to provide real-time, actionable telemetry.

### ✨ Core Features

- **Joules per Token (JPT) Telemetry** — Moving beyond estimation to hardware-level efficiency tracking mapped on a multi-variable Radar chart
- **Auto-Sync Integrations** — Seamless OAuth connection to primary LLM providers (OpenAI, Anthropic) to extract 30-day token usage and billing logs
- **Gemini-Powered Optimization** — Analyzes your specific workload (Region, Model, Request Volume) and generates highly targeted architectural advice to lower your footprint
- **Enterprise Carbon Wallet** — Sync AWS CloudTrail/Billing data to verify your low-impact usage and earn gamified Carbon Credits

---

## 🏗️ Methodology: Prototype vs. Production

Due to hackathon constraints, **Rta** is built as a High-Fidelity Simulated Prototype — demonstrating the exact UX vision and enterprise architecture.

### 1. Auto-Sync Pipeline

| | Approach |
|-|----------|
| **Hackathon Prototype** | A React-based state machine that mimics a secure OAuth 2.0 handshake. Upon "authorization," the system generates a deterministic, large-scale mock payload to demonstrate enterprise-level dashboard scaling |
| **Production Vision** | NextAuth.js managing real OAuth 2.0 flows, pinging provider `/usage` endpoints for precise chronological token consumption. A Node.js background worker aggregates data through the Footprint Engine |

### 2. Hardware Telemetry (JPT)

| | Approach |
|-|----------|
| **Hackathon Prototype** | "Proxy Math" — Base Energy × Tokens × PUE multipliers — to simulate Joules per Token and calculate the Efficiency Radar |
| **Production Vision** | **eBPF (Extended Berkeley Packet Filter)** kernel probes and **Kepler** deployed on AI inference nodes, listening to CPU/GPU power rails in real-time and correlating raw electrical draw with token generation logs for an exact physical audit |

---

## 🛠️ Tech Stack

| Layer | Tools |
|-------|-------|
| **Frontend** | React (Vite), Tailwind CSS, Framer Motion, Recharts |
| **Backend** | Node.js, Express.js |
| **AI Engine** | Google Gemini 2.5 Flash API |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/project-rta.git
cd project-rta
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
GEMINI_API_KEY=your_api_key_here
```

Start the server:
```bash
npm run dev
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
```

> Navigate to `http://localhost:5173` in your browser.

---

## 🤝 The Team

1.Aaryamaan Rai
2.Lavya Jain

---

*Built with ❤️ (and a lot of coffee) for the [Hackathon Name] Hackathon.*
