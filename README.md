<div align="center">
  <img src="https://lucide.dev/icons/bot.svg" width="80" height="80" alt="HelixFlow AI Logo">
  <h1>HelixFlow AI</h1>
  <p><strong>The Operating System for Healthcare Administration</strong></p>
  <p>Build a production-grade, multi-tenant SaaS platform for healthcare workflow automation that sits securely between providers and payers.</p>
</div>

<br />

## 🌟 Overview
HelixFlow AI is an advanced administrative automation platform targeting the $400B+ healthcare administrative sector. By combining deep clinical NLP, multi-agent reasoning, knowledge graphs, and digital twin simulations, HelixFlow actively predicts denials, accelerates prior authorizations, and uncovers revenue leakage before it disrupts hospital operations.

Features like the **Low-Code Rules Engine**, **Integrations Hub** (for EHRs & Clearinghouses), and the **Developer Marketplace** make it simple for domain experts to manage complex, end-to-end automation workflows securely out-of-the-box.

---

## 🚀 Core Features & Dashboards

### 🛡️ Authorization Command Center
Track all pending prior authorizations in one place. Using our mock **Clinical NLP + Policy Reasoning LLM**, the platform assesses patient data against requirements to provide real-time approval probabilities, highlighting documentation gaps.

### 📄 Claims Intelligence Hub
A proactive claims engine. Validate CPT/ICD coding against coverage rules prior to submission. High-risk claims are flagged with AI-identified issues, reducing denial rates and minimizing recovery overhead.

### 💰 Revenue Cycle Dashboard
A unified financial view utilizing `Recharts` for dynamic data visualization. Track Total Revenue vs. AI-Prevented Revenue Leakage, First-Pass Yields, and Accounts Receivable Aging.

### 🧠 Payer Policy Explorer
An interactive mock interface into a **Neo4j Knowledge Graph**. It links Diagnosis Codes, Procedure Codes, and specific Payer Policies (e.g., BlueCross MRI conservative therapy rules) so coders accurately understand prerequisites visually.

### 🏥 Hospital Operations Twin
A digital simulation of hospital flow leveraging ML predictive models and real-time EHR data. Monitors ED Wait Times, ICU Capacities, and OR Utilization, providing AI-driven operational recommendations (e.g., "Surge nursing capacity required in 2 hours").

### 🤖 AI Copilot Console
A conversational, natural language interface powered by a fine-tuned Healthcare LLM. Users can query medical guidelines, optimize coding combinations, or generate automated denial appeal letters based on EHR records.

---

## 🛠️ Advanced Platform Capabilities

### 🔌 Integrations Hub
Easily connect and manage integrations across the healthcare ecosystem. Designed with FHIR R4 and EDI/X12 standards in mind. Toggles provide native connections to:
- **EHR Providers**: Epic, Oracle Cerner, Athenahealth
- **Payers**: BlueCross BlueShield, UnitedHealthcare
- **Clearinghouses**: Availity, Change Healthcare

### ⚙️ Rules Engine (Low-Code)
Domain experts can embed business rationale over AI recommendations without writing code. Use the visual builder to establish conditionals such as:
> `IF [Claim Amount] < $250` AND `[AI Confidence] > 90%` `THEN [Auto-Submit to Payer]`

### 💻 Developer Portal & App Marketplace
A dedicated area for creating robust, extensible healthcare applications.
- **API Keys**: Manage production OAuth/API credentials securely.
- **Webhooks**: Register HTTPS callbacks for real-time claim/authorization decisions (e.g., `claim.approved`).
- **Marketplace**: Publish or install domain-specific AI agents such as the `Smart Coding Mapper` or the `Clinical Denial Recovery Agent`.

---

## 🏗️ Architecture Stack

- **Experience Layer**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS, Shadcn UI, Recharts, Lucide Icons
- **Data Layer (Schemas)**: PostgreSQL 15, Faker.js (Synthetic Seeding)
- **API Layer**: Next.js Serverless Routes
- **Deployment & Infra**: Docker Compose, GitHub Actions (Ready)

### Database Schemas Included
The repository contains robust SQL definitions for:
`Tenants`, `Users`, `Patients`, `Prior Authorizations`, `Claims`, and `Denials`.

---

## 🚦 Getting Started

### Prerequisites
Make sure you have Node 18+ and Docker (to run the PostgreSQL database locally) installed.

### 1. Clone & Install
```bash
git clone https://github.com/jai2033shankar/healthx.git
cd healthx
npm install
```

### 2. Database Setup & Synthetic Data Seeding
Start the local PostgreSQL container and seed thousands of realistic FHIR-like records using Faker.js:
```bash
# Start Postgres via Docker Compose
docker-compose up -d

# Run the seeding script
npx tsx scripts/seed_synthetic_data.ts
```

### 3. Start Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view HelixFlow AI.

---

## 🛡️ Security & Compliance
*(Note: Current state is a frontend/schema skeleton for demonstration)*
When advancing to production, HelixFlow AI architecture plans for:
- HIPAA / SOC2 / HITECH Compliance
- SMART on FHIR scopes & OAuth2 via Keycloak
- TLS 1.3 / AES-256 Encryption
- Immutable Audit Logs for all continuous AI agent reasoning

---

> Built with precision for the modern healthcare enterprise.
