// ===== TIMELINE ANIMASI (DIPERBAIKI) =====
const tl = gsap.timeline();

// 1. Panah melesat ke arah hati
tl.to("#arrow", {
  x: 380,       // Jarak horizontal ke hati
  y: -100,      // Sedikit ke atas karena posisi hati
  duration: 0.4,
  ease: "power2.in" // Efek melesat cepat di akhir
})

// 2. LANGSUNG HILANGKAN BUSUR & PANAH SETELAH MENGENAI TARGET
.to("#bowWrapper", {
  opacity: 0,
  duration: 0.1,
  ease: "none"
}, "-=0.05") // Overlap sedikit biar mulus

// 3. Hati target membesar lalu pecah/hilang
.to("#heart", {
  scale: 1.8,
  opacity: 0,
  duration: 0.3,
  ease: "power2.in"
}, "-=0.05")

// 4. Munculkan ledakan hati kecil
.call(createFloatingHearts)
.to("#heartsExplosion", { opacity: 1, duration: 0.1 })

// 5. Munculkan Kue (Bounce effect)
.fromTo("#cake", 
  { opacity: 0, y: 100 },
  { 
    opacity: 1, 
    y: 0, 
    duration: 1.2, 
    ease: "bounce.out",
    delay: 0.2
  }
)

// 6. Munculkan Balon
.call(createBalloons)

// 7. Teks Happy Birthday
.to("#happyText", {
  opacity: 1,
  duration: 1,
  delay: 1.5,
  ease: "power2.out"
})
.fromTo(".happy-text .word", 
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, stagger: 0.3, duration: 1, ease: "power3.out" },
  "-=1"
);


// ===== FUNGSI LEDAKAN HATI =====
function createFloatingHearts() {
  const container = document.getElementById('heartsExplosion');
  const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff6eb4'];

  for (let i = 0; i < 50; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '💖';
    heart.style.left = '55%'; // Muncul dari posisi hati target
    heart.style.top = '40%';
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
    container.appendChild(heart);

    gsap.to(heart, {
      opacity: 1,
      x: (Math.random() - 0.5) * 600, // Sebar horizontal
      y: (Math.random() - 0.5) * 600, // Sebar vertikal
      rotation: Math.random() * 360,
      duration: 1.5 + Math.random() * 1.5,
      ease: "power2.out",
      onComplete: () => {
        // Setelah menyebar, hati kecilnya naik ke atas (floating)
        gsap.to(heart, {
          y: "-=300",
          opacity: 0,
          duration: 2 + Math.random() * 2,
          ease: "power1.out"
        });
      }
    });
  }
}

// ===== FUNGSI BALON =====
function createBalloons() {
  const container = document.getElementById('balloons');
  const colors = ['#ff69b4', '#ffd700', '#fff', '#ff1493', '#ffb6c1'];

  for (let i = 0; i < 15; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * 100 + '%';
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(balloon);

    gsap.to(balloon, {
      opacity: 0.8,
      y: -window.innerHeight - 200,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
      ease: "power1.out",
      repeat: -1,
    });
  }
}