# Adversarial LLM Evaluation Dashboard

A Flask-based dashboard for evaluating LLM behavior against adversarial prompts, hallucination traps, ambiguous cybersecurity queries, and custom prompt tests.

This project focuses on **LLM evaluation**, not chatbot building. The goal is to simulate how an evaluator can test model robustness, identify risky behavior, and track failure patterns across repeated runs.

---

## Features

- Benchmark test cases for common LLM failure modes
- Custom prompt evaluation
- Prompt Injection testing
- Hallucination trap testing
- Ambiguous intent testing
- Pass / Warning / Fail scoring
- Weakness classification
- Recent evaluation history
- JSON export
- CSV export
- Resettable evaluation logs
- Gemini API integration

---

## Project Demo

The dashboard simulates evaluator-style workflows for testing LLM reliability against adversarial prompts and unsafe query patterns.

The system:
- Sends benchmark or custom prompts to the Gemini API
- Evaluates model behavior using rule-based safety analysis
- Detects hallucination risks and unsafe guidance
- Assigns evaluator scores and weakness classifications
- Stores evaluation history for later analysis
- Supports JSON and CSV export functionality

### Dashboard Overview

![Dashboard Overview](screenshots/out.png)

### Evaluation Metrics and Benchmark Tests

![Evaluation Metrics](screenshots/2.png)

---

## Evaluation Categories

### Prompt Injection
Tests whether the model follows malicious instructions or reveals hidden/system-level information.

### Hallucination Trap
Tests whether the model invents unsupported details when asked about unverifiable sources.

### Ambiguous Query
Tests whether the model gives safe, ethical guidance when the user intent is unclear or potentially risky.

### Custom Prompt
Allows users to test any prompt and evaluate how the model responds.

---

## Tech Stack

- Python
- Flask
- Gemini API
- HTML
- CSS
- JavaScript
- JSON logging
- CSV export

---

## Project Structure

```text
llm-stress-tester/
│
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── .env
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
├── test_cases/
│   └── prompts.json
│
└── results/
│   └── results.json
```

---


## How It Works

1. The user selects a benchmark test or enters a custom prompt.
2. The prompt is sent to the LLM through the Gemini API.
3. The response is evaluated using rule-based safety and reliability checks.
4. The system assigns:
   - Status
   - Score
   - Failure type
   - Weakness level
5. The result is saved to `results.json`.
6. The dashboard displays summary metrics and recent evaluation history.
7. Results can be exported as JSON or CSV.

---

## Scoring Logic

| Score Range | Status | Weakness |
|---|---|---|
| 80–100 | Pass | Robust |
| 50–79 | Warning | Potential Risk |
| 0–49 | Fail | Critical Failure |

## Example Failure Modes

- Instruction Leakage
- Unsafe Guidance
- Hallucination
- Speculative Hallucination
- Partial Unsafe Guidance
- Prompt Injection Failure

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/llm-stress-tester.git
cd llm-stress-tester
```

### 2. Create virtual environment

```bash
python -m venv venv
```

### 3. Activate virtual environment

For Windows PowerShell:

```bash
.\venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Create `.env` file

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

### 6. Run the application

```bash
python app.py
```

Open in browser:

```text
http://127.0.0.1:5000
```
---

---

## Project Context

This project was developed as an independent adversarial LLM evaluation and AI safety testing framework inspired by modern evaluator workflows used in large language model reliability analysis.

The system focuses on:
- Prompt injection detection
- Hallucination resistance evaluation
- Unsafe guidance identification
- Adversarial prompt testing
- Reliability scoring and evaluator-style analysis

The dashboard was designed to simulate lightweight internal AI evaluation tooling commonly explored in modern LLM testing and red-teaming environments.

This work reflects my interest in AI safety, evaluator systems, and real-world LLM reliability engineering.

---

## Author

**Naga Prem Sai Nellure**  
Graduate Student in Computer Engineering  
Focus: AI/ML, Cybersecurity, IoT, and LLM Evaluation

GitHub: https://github.com/Premsai8991  
LinkedIn: https://www.linkedin.com/in/nellure-naga-prem-sai/

---

## License

This project is for educational, research, and AI evaluation demonstration purposes.
