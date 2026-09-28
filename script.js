let states = [];
let alphabet = [];

// Generate DFA transition table
function generateTable() {

    states = document
        .getElementById("states")
        .value
        .split(",")
        .map(state => state.trim())
        .filter(state => state !== "");

    alphabet = document
        .getElementById("alphabet")
        .value
        .split(",")
        .map(symbol => symbol.trim())
        .filter(symbol => symbol !== "");

    if (states.length === 0 || alphabet.length === 0) {
        alert("Please enter states and alphabet.");
        return;
    }

    let html = "<table>";

    // Header
    html += "<tr>";
    html += "<th>State</th>";

    alphabet.forEach(symbol => {
        html += `<th>${symbol}</th>`;
    });

    html += "</tr>";

    // Rows
    states.forEach((state, stateIndex) => {

        html += `<tr>`;
        html += `<td><strong>${state}</strong></td>`;

        alphabet.forEach((symbol, symbolIndex) => {

            html += `
                <td>
                    <input
                        type="text"
                        id="transition-${stateIndex}-${symbolIndex}"
                        placeholder="Next state"
                    >
                </td>
            `;
        });

        html += "</tr>";
    });

    html += "</table>";

    document.getElementById("transitionTable").innerHTML = html;

    document.getElementById("transitionSection").style.display = "block";

    document.getElementById("nfaSection").style.display = "none";
}


// Convert DFA to NFA
function convertToNFA() {

    let html = "<table>";

    // Header
    html += "<tr>";
    html += "<th>State</th>";

    alphabet.forEach(symbol => {
        html += `<th>${symbol}</th>`;
    });

    html += "</tr>";

    // Rows
    states.forEach((state, stateIndex) => {

        html += "<tr>";

        html += `<td><strong>${state}</strong></td>`;

        alphabet.forEach((symbol, symbolIndex) => {

            const input = document.getElementById(
                `transition-${stateIndex}-${symbolIndex}`
            );

            const nextState = input.value.trim();

            if (nextState === "") {
                html += "<td>∅</td>";
            } else {

                // DFA transition becomes a set in NFA
                html += `<td>{${nextState}}</td>`;
            }
        });

        html += "</tr>";
    });

    html += "</table>";

    document.getElementById("nfaTable").innerHTML = html;

    document.getElementById("nfaSection").style.display = "block";
}