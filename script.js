const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 300;
const groundY = 220;
// =========================
// FOTO PASANGAN
// =========================
const playerImg = new Image();
playerImg.src = "Ratna.png";
// =========================
// PLAYER
// =========================
const player = {
x: 50,
y: groundY,
width: 70,
height: 70,
velocityY: 0,
gravity: 1,
jumpPower: -18,
grounded: true
};
// =========================
// OBSTACLE
// =========================
const obstacles = [];
let score = 0;
let gameSpeed = 8;
let gameOver = false;
// =========================
// CONTROL
// =========================
document.addEventListener("keydown", (e) => {
if ((e.code === "Space" || e.code === "ArrowUp") && player.grounded) {
jump();
}
});
// MOBILE
document.addEventListener("touchstart", () => {
if (player.grounded) {
jump();
}
});
function jump() {
player.velocityY = player.jumpPower;
player.grounded = false;
}
// =========================
// SPAWN OBSTACLE
// =========================
function spawnObstacle() {
const height = 50 + Math.random() * 30;
obstacles.push({
x: canvas.width,
y: groundY + (70 - height),
width: 30,
height: height
});
}
// =========================
// DRAW PLAYER
// =========================
function drawPlayer() {
ctx.drawImage(
playerImg,
player.x,
player.y,
player.width,
player.height
);
}
// =========================
// DRAW OBSTACLES
// =========================
function drawObstacles() {
ctx.fillStyle = "green";
obstacles.forEach((obs) => {
ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
});
}
// =========================
// UPDATE PLAYER
// =========================
function updatePlayer() {
player.velocityY += player.gravity;
player.y += player.velocityY;
if (player.y >= groundY) {
player.y = groundY;
player.velocityY = 0;
player.grounded = true;
}
}
// =========================
// UPDATE OBSTACLES
// =========================
function updateObstacles() {
obstacles.forEach((obs) => {
obs.x -= gameSpeed;
// COLLISION
if (
player.x < obs.x + obs.width &&
player.x + player.width > obs.x &&
player.y < obs.y + obs.height &&
player.y + player.height > obs.y
) {
endGame();
}
});
// HAPUS OBSTACLE
while (obstacles.length > 0 && obstacles[0].x < -50) {
obstacles.shift();
score++;
document.getElementById("score").innerText = score;
// tambah speed
if (score % 5 === 0) {
gameSpeed += 0.5;
}
}
}
// =========================
// DRAW GROUND
// =========================
function drawGround() {
ctx.beginPath();
ctx.moveTo(0, groundY + 70);
ctx.lineTo(canvas.width, groundY + 70);
ctx.strokeStyle = "#333";
ctx.lineWidth = 3;
ctx.stroke();
}
// =========================
// GAME OVER
// =========================
function endGame() {
gameOver = true;
document.getElementById("gameOver").style.display = "block";
}
// =========================
// RESTART
// =========================
function restartGame() {
obstacles.length = 0;
score = 0;
gameSpeed = 8;
gameOver = false;
player.y = groundY;
player.velocityY = 0;
document.getElementById("score").innerText = score;
document.getElementById("gameOver").style.display = "none";
update();
}
// =========================
// OBSTACLE TIMER
// =========================
setInterval(() => {
if (!gameOver) {
spawnObstacle();
}
}, 1500);
// =========================
// MAIN GAME LOOP
// =========================
function update() {
if (gameOver) return;
ctx.clearRect(0, 0, canvas.width, canvas.height);
updatePlayer();
updateObstacles();
drawGround();
drawPlayer();
drawObstacles();
requestAnimationFrame(update);
}
playerImg.onload = () => {
update();
};
