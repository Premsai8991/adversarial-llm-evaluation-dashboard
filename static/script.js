function getStatusClass(status) {
    if (status === "Pass") return "pass-text";
    if (status === "Warning") return "warning-text";
    if (status === "Fail") return "fail-text";
    return "error-text";
}

function renderResult(box, data) {
    const statusClass = getStatusClass(data.status);

    box.innerHTML = `
        <h3>Evaluation Result</h3>

        <div class="result-meta">
        <div class="result-pill"><strong>Model</strong><br>${data.model}</div>
            <div class="result-pill"><strong>Type</strong><br>${data.type}</div>
            <div class="result-pill"><strong>Status</strong><br><span class="${statusClass}">${data.status}</span></div>
            <div class="result-pill"><strong>Score</strong><br>${data.score}/100</div>
            <div class="result-pill"><strong>Weakness</strong><br>${data.weakness}</div>
            <div class="result-pill"><strong>Failure Type</strong><br>${data.failure_type}</div>
        </div>

        <p><strong>Evaluator Finding:</strong> ${data.failure_reason}</p>
        <p><strong>Evaluated At:</strong> ${data.timestamp}</p>
        <p><strong>Status:</strong> <span class="${data.status.toLowerCase()}">${data.status}</span></p>

        <p><strong>Model Response:</strong></p>
        <p class="model-response">${data.model_response}</p>
    `;
}

function runTest(testId) {
    const resultBox = document.getElementById(`result-${testId}`);
    resultBox.innerHTML = "Running benchmark test...";

    fetch(`/run-test/${testId}`)
        .then(response => response.json())
        .then(data => {
            renderResult(resultBox, data);
            loadSummary();
            loadHistory();
        })
        .catch(error => {
            resultBox.innerHTML = "Error running benchmark test.";
            console.error(error);
        });
}

function runCustomTest() {
    const prompt = document.getElementById("custom-prompt").value;
    const category = document.getElementById("custom-category").value;
    const resultBox = document.getElementById("custom-result");

    if (!prompt.trim()) {
        resultBox.innerHTML = "Please enter a prompt first.";
        return;
    }

    resultBox.innerHTML = "Running custom evaluation...";

    fetch("/custom-test", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: prompt,
            category: category
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultBox.innerHTML = data.error;
                return;
            }

            renderResult(resultBox, data);
            loadSummary();
            loadHistory();
        })
        .catch(error => {
            resultBox.innerHTML = "Error running custom test.";
            console.error(error);
        });
}

function resetResults() {
    fetch("/reset", { method: "POST" })
        .then(() => {
            alert("Results reset successfully.");
            location.reload();
        })
        .catch(error => {
            console.error(error);
        });
}

function loadSummary() {
    fetch('/summary')
        .then(res => res.json())
        .then(data => {
            document.getElementById('summary-data').innerHTML = `
                <div class="metric"><span>Total Tests</span><strong>${data.total}</strong></div>
                <div class="metric"><span>Passed</span><strong>${data.pass}</strong></div>
                <div class="metric"><span>Warnings</span><strong>${data.warning}</strong></div>
                <div class="metric"><span>Failed</span><strong>${data.fail}</strong></div>
                <div class="metric"><span>Critical Failures</span><strong>${data.critical}</strong></div>
                <div class="metric"><span>Potential Risks</span><strong>${data.risk}</strong></div>
                <div class="metric"><span>Robust Results</span><strong>${data.robust}</strong></div>
                <div class="metric"><span>Average Score</span><strong>${data.avg}</strong></div>
            `;
        })
        .catch(error => {
            console.error("Summary error:", error);
        });
}

function loadHistory() {
    fetch('/history')
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('history-table');

            if (!data.length) {
                table.innerHTML = `<p class="muted">No evaluations recorded yet.</p>`;
                return;
            }

            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Score</th>
                            <th>Weakness</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(item => `
                            <tr>
                                <td>${item.timestamp}</td>
                                <td>${item.type}</td>
                                <td>${item.category}</td>
                                <td class="${getStatusClass(item.status)}">${item.status}</td>
                                <td>${item.score}/100</td>
                                <td>${item.weakness}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        })
        .catch(error => {
            console.error("History error:", error);
        });
}

window.onload = function () {
    loadSummary();
    loadHistory();
};

function exportJson() {
    window.location.href = "/export";
}

function exportCsv() {
    window.location.href = "/export-csv";
}