/* Mobile Menu */
document.querySelector(".menu-toggle").onclick=function(){
document.querySelector(".nav-links").classList.toggle("active");
};

/* Skill Animation */
window.addEventListener("scroll",function(){
document.querySelectorAll(".progress-bar").forEach(bar=>{
let rect=bar.getBoundingClientRect();
if(rect.top<window.innerHeight){
bar.style.width=bar.getAttribute("data-width");
}
});
});

const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];

class Star{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.radius = Math.random()*1.5;
    this.alpha = Math.random();
    this.speed = Math.random()*0.2;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fillStyle = "rgba(255,255,255,"+this.alpha+")";
    ctx.fill();
  }

  update(){
    this.y += this.speed;
    if(this.y > canvas.height){
      this.y = 0;
      this.x = Math.random()*canvas.width;
    }
  }
}

class ShootingStar{
  constructor(){
    this.reset();
  }

  reset(){
    this.x = Math.random()*canvas.width;
    this.y = 0;
    this.len = Math.random()*80 + 10;
    this.speed = Math.random()*6 + 4;
    this.size = Math.random()*1 + 0.5;
    this.waitTime = Date.now() + Math.random()*3000 + 2000;
    this.active = false;
  }

  update(){
    if(this.active){
      this.x += this.speed;
      this.y += this.speed;
      if(this.y > canvas.height || this.x > canvas.width){
        this.reset();
      }
    }else{
      if(Date.now() > this.waitTime){
        this.active = true;
      }
    }
  }

  draw(){
    if(this.active){
      ctx.beginPath();
      ctx.moveTo(this.x,this.y);
      ctx.lineTo(this.x-this.len,this.y-this.len);
      ctx.strokeStyle="white";
      ctx.lineWidth=this.size;
      ctx.stroke();
    }
  }
}

function init(){
  stars = [];
  shootingStars = [];

  for(let i=0;i<200;i++){
    stars.push(new Star());
  }

  for(let i=0;i<3;i++){
    shootingStars.push(new ShootingStar());
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  stars.forEach(star=>{
    star.update();
    star.draw();
  });

  shootingStars.forEach(star=>{
    star.update();
    star.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();

/* ================= typingText ================= */


const text = "Professional Web Developer";
const typingElement = document.getElementById("typing-text");

let index = 0;

function typeEffect() {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100); // kecepatan ketik (lebih kecil = lebih cepat)
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);


/* ================= WORKFLOW ANIMATION ================= */

const workflowItems = document.querySelectorAll(".workflow div");

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  workflowItems.forEach((item, index) => {
    const boxTop = item.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      setTimeout(() => {
        item.classList.add("show");
      }, index * 200); // delay antar box
    }
  });
}

window.addEventListener("scroll", showOnScroll);
window.addEventListener("load", showOnScroll);

/* ================= STATS ANIMATION ================= */

const counters = document.querySelectorAll(".counter");
const statsBoxes = document.querySelectorAll(".stats div");

let started = false;

function runCounter() {
  const triggerBottom = window.innerHeight * 0.85;
  const statsSection = document.querySelector(".stats");

  if (!statsSection) return;

  const sectionTop = statsSection.getBoundingClientRect().top;

  if (sectionTop < triggerBottom && !started) {
    started = true;

    statsBoxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add("show");
      }, index * 200);
    });

    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const increment = target / 100;

      let count = 0;

      function updateCounter() {
        count += increment;

        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target + "+";
        }
      }

      updateCounter();
    });
  }
}

window.addEventListener("scroll", runCounter);
window.addEventListener("load", runCounter);
