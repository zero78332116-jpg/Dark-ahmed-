const start = document.getElementById("start");
const logs = document.getElementById("logs");
const bar = document.getElementById("bar");
const result = document.getElementById("result");

const messages = [
  "[SYSTEM] Initializing...",
  "[SCAN] Checking demo environment...",
  "[INFO] Loading simulation modules...",
  "[SYSTEM] Security simulation active...",
  "[SCAN] Analyzing sample data...",
  "[SUCCESS] Simulation completed!"
];

start.onclick = async function() {
  start.disabled = true;
  start.textContent = "SIMULATION RUNNING...";
  logs.innerHTML = "";
  bar.style.width = "0%";
  result.textContent = "PLEASE WAIT...";

  for (let i = 0; i < messages.length; i++) {
    logs.innerHTML += messages[i] + "<br>";
    bar.style.width = ((i + 1) / messages.length * 100) + "%";
    await new Promise(resolve => setTimeout(resolve, 900));
  }

  result.textContent = "ACCESS GRANTED - DEMO ONLY";
  start.textContent = "RUN AGAIN";
  start.disabled = false;
};
const matrixCanvas = document.getElementById("matrix");
const ctx = matrixCanvas.getContext("2d");

const chars = "0123456789ABCDEFアイウエオ";
let drops = [];

function resizeMatrix() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;

  drops = Array(
    Math.floor(matrixCanvas.width / 15)
  ).fill(1);
}

resizeMatrix();
window.addEventListener("resize", resizeMatrix);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  ctx.fillStyle = "#00ff55";
  ctx.font = "15px monospace";

  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];

    ctx.fillText(char, i * 15, y * 15);

    if (y * 15 > matrixCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  });
}

setInterval(drawMatrix, 55);
const commandInput = document.getElementById("commandInput");
const runCommand = document.getElementById("runCommand");

runCommand.onclick = function() {
  const command = commandInput.value.trim().toLowerCase();

  if (!command) return;

  const line = document.createElement("div");
  line.textContent = "> " + command;
  logs.appendChild(line);

  const response = document.createElement("div");

  if (command === "help") {
    response.textContent = "Commands: help, scan, clear, status";
  } else if (command === "scan") {
    response.textContent = "Demo scan completed. No real devices scanned.";
  } else if (command === "status") {
    response.textContent = "SYSTEM ONLINE - SIMULATION MODE";
  } else if (command === "clear") {
    logs.textContent = "";
    commandInput.value = "";
    return;
  } else {
    response.textContent = "Unknown command. Type help.";
  }

  logs.appendChild(response);
  commandInput.value = "";
};

commandInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") runCommand.click();
});