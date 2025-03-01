const socket = io();
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", (event) => {
    if (event.touches.length === 2) {
        const { clientX: x, clientY: y } = event;
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x, y, 24, 4, Math.PI * 2);
        ctx.fill();
    }
});

function draw(event) {
    if (!drawing) return;

    const { clientX: x, clientY: y } = event;
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2); // Reduced radius for thinner stroke
    ctx.fill();

    socket.emit("draw", { x, y });
}

socket.on("draw", (data) => {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(data.x, data.y, 5, 0, Math.PI * 2); // Reduced radius for thinner stroke
    ctx.fill();
});

function addStickyNote() {
    const stickyNote = document.createElement("div");
    stickyNote.style.width = "100px";
    stickyNote.style.height = "100px";
    stickyNote.style.backgroundColor = "yellow";
    stickyNote.style.position = "absolute";
    stickyNote.style.top = `${Math.random() * (canvas.height - 100)}px`;
    stickyNote.style.left = `${Math.random() * (canvas.width - 100)}px`;
    stickyNote.style.border = "1px solid black";
    stickyNote.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.3)"
    stickyNote.style.zIndex = 10;
    canvas.parentElement.appendChild(stickyNote);

    const textBox = document.createElement("textarea");
    textBox.style.width = "90%";
    textBox.style.height = "70%";
    textBox.style.border = "none";
    textBox.style.backgroundColor = "transparent";
    textBox.style.fontSize = "14px";
    textBox.style.resize = "none";
    textBox.style.overflow = "hidden";
    textBox.placeholder = "Write here...";
    stickyNote.appendChild(textBox);
}

const sticky = document.getElementById("sticky");

const stickynotes = new CustomEvent("stickynote");

// Dispatch the event when clicking the "sticky" button
sticky.addEventListener("click", () => {
    document.dispatchEvent(stickynotes);
});

// Listen for the custom event
document.addEventListener("stickynote", addStickyNote);
