// Matrix Rain Configuration
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height, columns;
const fontSize = 16;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"\'#&_(),.;:?!\\|{}<>[]^~';
let drops = [];

function initMatrix() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * height;
    }
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00FF41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

window.addEventListener('resize', initMatrix);
initMatrix();
setInterval(drawMatrix, 40);

// Smooth Animations for Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .service-card, .pet-card').forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
});

// Terminal Experience
const terminalForm = document.querySelector('.terminal-form');
if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = terminalForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'EXECUTANDO...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Acesso Concedido. O Oráculo entrará em contato.');
            btn.innerText = originalText;
            btn.disabled = false;
            terminalForm.reset();
        }, 1500);
    });
}
