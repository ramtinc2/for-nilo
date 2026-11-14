const envelope = document.getElementById('openEnvelope');

function beginExperience(){
  envelope.classList.add('open');
  startMusic();
  setTimeout(()=>document.getElementById('story').scrollIntoView({behavior:'smooth'}),650);
}
envelope.addEventListener('click',beginExperience);
document.getElementById('startBtn').addEventListener('click',beginExperience);

// Every next button reveals the next chapter, so the page feels like a little journey.
document.querySelectorAll('.next-btn').forEach(button=>{
  button.addEventListener('click',()=>{
    const target=document.getElementById(button.dataset.next);
    if(target) target.scrollIntoView({behavior:'smooth',block:'center'});
  });
});

// Floating hearts and sparkles.
const particles=document.getElementById('particles');
for(let i=0;i<24;i++){
  const p=document.createElement('span');
  p.className='particle'; p.textContent=['♡','✧','·','♥'][i%4];
  p.style.left=Math.random()*100+'%';
  p.style.animationDuration=(13+Math.random()*17)+'s';
  p.style.animationDelay=(-Math.random()*25)+'s';
  p.style.fontSize=(10+Math.random()*15)+'px';
  particles.appendChild(p);
}

const response=document.getElementById('response');
document.getElementById('yesBtn').addEventListener('click',()=>{
  response.textContent='پس به سلامتیِ فصل جدیدمون؛ آروم، قشنگ و با کلی لبخند. ♡';
  burstHearts();
});
document.getElementById('laterBtn').addEventListener('click',()=>{
  response.textContent='هر وقت دلت خواست. هیچ عجله‌ای نیست؛ همین که خوندیش برای من قشنگه. ♡';
});
function burstHearts(){
  for(let i=0;i<18;i++){
    const h=document.createElement('span'); h.textContent='♡'; h.className='particle';
    h.style.left=(35+Math.random()*30)+'%'; h.style.bottom='25%';
    h.style.animationDuration=(2+Math.random()*2)+'s'; h.style.fontSize=(14+Math.random()*20)+'px';
    particles.appendChild(h); setTimeout(()=>h.remove(),4500);
  }
}

// Autoplay is attempted on page load. If the browser blocks audible autoplay,
// retry automatically on the first user interaction (opening the envelope / tapping).
const audio=document.getElementById('bgMusic');
let musicStarted=false;
async function startMusic(){
  if(musicStarted || !audio) return;
  try{
    await audio.play();
    musicStarted=true;
  }catch(error){
    // Browser autoplay policy may require a user gesture; beginExperience retries.
  }
}
window.addEventListener('DOMContentLoaded',startMusic);
document.addEventListener('pointerdown',startMusic,{once:true});
document.addEventListener('keydown',startMusic,{once:true});
