// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDP1qjHw288djBOBElqAHwjAxw-txA3wXo",
  authDomain: "sbdteori.firebaseapp.com",
  databaseURL: "https://sbdteori-default-rtdb.firebaseio.com",
  projectId: "sbdteori",
  storageBucket: "sbdteori.firebasestorage.app",
  messagingSenderId: "720755828840",
  appId: "1:720755828840:web:26fd5592fe691bb40a73dd"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// CANVAS BUBBLE ANIMASI
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
let bubbles = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createBubbles(num=20){
    bubbles = [];
    for(let i=0;i<num;i++){
        bubbles.push({
            x: Math.random()*canvas.width,
            y: canvas.height + Math.random()*200,
            r: 10 + Math.random()*25,
            speed: 0.5 + Math.random()*1.5,
            opacity: 0.4 + Math.random()*0.5
        });
    }
}
createBubbles();

function drawBubbles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    bubbles.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,150,220,${b.opacity})`;
        ctx.fill();
        b.y -= b.speed;
        if(b.y < -50) {
            b.y = canvas.height + 50;
            b.x = Math.random()*canvas.width;
        }
    });
    requestAnimationFrame(drawBubbles);
}
drawBubbles();

// MOOD ACTIVE
const moodLabels = document.querySelectorAll('.mood-bubble label');
moodLabels.forEach(label => {
    label.addEventListener('click', () => {
        moodLabels.forEach(l => l.classList.remove('active'));
        label.classList.add('active');
        label.querySelector('input').checked = true;
    });
});
moodLabels[0].classList.add('active');

// FORM SUBMIT
document.getElementById("diaryForm").addEventListener("submit", function(e){
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const tanggal = document.getElementById("tanggal").value;
    const judul = document.getElementById("judul").value;
    const isi = document.getElementById("isi").value;
    const mood = document.querySelector('input[name="mood"]:checked').value;

    db.ref("diary").push({nama, tanggal, judul, isi, mood});

    alert("Data tersimpan!");
    this.reset();
    moodLabels.forEach(l => l.classList.remove('active'));
    moodLabels[0].classList.add('active');
});
