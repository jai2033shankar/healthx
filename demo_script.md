# HelixFlow AI - End-to-End Demo Script

## 🎭 The Persona: Sarah, VP of Revenue Cycle Management
**Background:** Sarah oversees the financial health and operational workflow of a mid-sized regional hospital system. She is constantly battling high denial rates, long prior authorization wait times, and unpredictable ED/ICU capacity surges that impact revenue.
**Goal:** Showcase how HelixFlow AI acts as the "Intelligence Layer" to give Sarah predictive insights, automate coding/billing, and provide a conversational AI assistant to navigate complex payer policies.

---

## 🎬 Demo Flow

### Scene 1: The Login & Landing (Set the Stage)
1. **Navigate to:** `http://localhost:3000/`
2. **Action:** Briefly show the landing page. Mention that HelixFlow AI sits between the Hospital EHR (Epic/Cerner) and the Payers/Clearinghouses.
3. **Action:** Click **"Login"** in the top right.
4. **Action:** On the login screen, click **"Sign in to Dashboard"** (credentials are pre-filled).
5. **Talk Track:** *"I'm logging in as Sarah, the VP of Revenue Cycle. Instantly, I'm brought into a secure, HIPAA-compliant environment that has already ingested our FHIR records, historical claims, and active prior authorizations."*

### Scene 2: Selecting the Persona & High-Level Overview
1. **Navigate to:** `http://localhost:3000/dashboard` (Default landing after login).
2. **Action:** Click the **User Avatar** in the top right header. Select **"Demo: VP of Revenue Cycle"** to switch personas.
3. **Action:** Scroll through the main Dashboard cards (Total Collected, Denial Rate, Prior Auths).
4. **Talk Track:** *"Right away, Sarah gets a bird's-eye view of the system. Let's dig into where AI is really moving the needle for her team."*

### Scene 3: AI Revenue Cycle & Leakage Prevention (The Financial Impact)
1. **Navigate to:** Click **"Revenue Cycle"** in the left sidebar (`/dashboard/revenue`).
2. **Action:** Hover over the dynamic chart showing "Historical" vs "Predicted" data. Point out the **AI Prevented Leakage** card at the top.
3. **Talk Track:** *"This is the Revenue Cycle Intelligence hub. HelixFlow's ML model is constantly analyzing historical billing data. Not only does it forecast our cash flow for the next 14 days, but it proactively flags 'Revenue Leakage'—these are claims that our AI scrubbed and corrected before submission, actively preventing denials and saving the hospital thousands of dollars this month."*

### Scene 4: Hospital Operations Twin (Predictive Surges)
1. **Navigate to:** Click **"Hospital Twin"** in the left sidebar (`/dashboard/hospital-twin`).
2. **Action:** Hover over the ICU Capacity and ED Wait Time charts. Point out the predicted surge peaks on the right side of the graphs.
3. **Talk Track:** *"Beyond billing, operational bottlenecks cause revenue delays. This is our Hospital Operations Digital Twin. The system uses a stochastic forecasting model on our live ED and ICU data. Sarah can see that we are predicting a severe surge in ED wait times next Tuesday. With this foresight, she can work with the CMO to preemptively adjust staffing or divert non-critical intake."*

### Scene 5: The Policy Explorer (Knowledge Graph)
1. **Navigate to:** Click **"Policy Explorer"** in the left sidebar (`/dashboard/policy`).
2. **Action:** Show the neo4j-style graph visualization. Click on a node (e.g., *BlueCross MRI Policy*).
3. **Talk Track:** *"When a claim is denied or requires authorization, the rules are often buried in 50-page PDF manuals. HelixFlow ingests payer policies into a Knowledge Graph. Coders can visually explore how a specific Diagnosis maps to a Procedure and exactly what Payer Policy governs it."*

### Scene 6: AI Copilot Console (Conversational Reasoning)
1. **Navigate to:** Click **"AI Copilot"** in the left sidebar (`/dashboard/copilot`).
2. **Action:** Show the chat interface. Note the "Model: Gemma 3 (Local)" status in the header.
3. **Action:** Click the first suggested prompt: *"What is the clinical criteria for an MRI of the lumbar spine (CPT 72148)?"*
4. **Action:** Let the local Ollama LLM stream the response.
5. **Action:** Click the second prompt: *"Draft an appeal letter for denial reason 'CO-4'..."*
6. **Talk Track:** *"Finally, if a complex scenario arises, Sarah's team doesn't have to leave the platform or Google for answers. We have a secure, local LLM running directly within HelixFlow. Let's ask it a clinical criteria question... And because it has context of our payer rules, we can even ask it to instantly draft a highly specific appeal letter for a denied claim. This turns an hour-long task into a 5-second one."*

### Scene 7: Wrap Up
1. **Action:** Click the **User Avatar** -> **Log out**.
2. **Talk Track:** *"HelixFlow AI isn't just a dashboard; it's an active, predictive intelligence layer that reduces friction from patient intake all the way to final payment. Thank you!"*
