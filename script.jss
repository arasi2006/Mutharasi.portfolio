// =========================
// Smooth Scroll
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({
            behavior:"smooth"
        });
    });
});


// =========================
// Sticky Navbar Shadow
// =========================

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

header.classList.toggle("sticky",window.scrollY>50);

});


// =========================
// Scroll Reveal Animation
// =========================

const cards=document.querySelectorAll(".card,.skill-card,.project-card,.certificate-card");

window.addEventListener("scroll",()=>{

cards.forEach(card=>{

const top=card.getBoundingClientRect().top;

if(top<window.innerHeight-100){

card.style.opacity="1";
card.style.transform="translateY(0px)";

}

});

});

cards.forEach(card=>{

card.style.opacity="0";
card.style.transform="translateY(50px)";
card.style.transition=".8s";

});


// =========================
// Back To Top Button
// =========================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.bottom="20px";
topBtn.style.right="20px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.borderRadius="50%";
topBtn.style.border="none";
topBtn.style.background="#2e7d32";
topBtn.style.color="#fff";
topBtn.style.fontSize="22px";
topBtn.style.cursor="pointer";
topBtn.style.display="none";

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


// =========================
// Dark Mode
// =========================

const darkBtn=document.createElement("button");

darkBtn.innerHTML="🌙";

darkBtn.style.position="fixed";
darkBtn.style.bottom="80px";
darkBtn.style.right="20px";
darkBtn.style.width="50px";
darkBtn.style.height="50px";
darkBtn.style.borderRadius="50%";
darkBtn.style.border="none";
darkBtn.style.cursor="pointer";
darkBtn.style.background="#111";
darkBtn.style.color="#fff";

document.body.appendChild(darkBtn);

let dark=false;

darkBtn.onclick=()=>{

dark=!dark;

if(dark){

document.body.style.background="#111";
document.body.style.color="#fff";
darkBtn.innerHTML="☀";

}else{

document.body.style.background="#f5f7fa";
document.body.style.color="#222";
darkBtn.innerHTML="🌙";

}

};


// =========================
// Contact Form
// =========================

const form=document.querySelector("form");

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank You 😊\nYour message has been sent successfully.");

form.reset();

});
