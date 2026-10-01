(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('#yr').textContent=new Date().getFullYear();
// preloader
const bar=$('.ld-bar i'),num=$('.ld-n');let p=0;
const t=setInterval(()=>{p+=Math.random()*9+3;if(p>=100){p=100;clearInterval(t);setTimeout(()=>{$('#loader').classList.add('out');startRoles()},250)}bar.style.width=p+'%';num.textContent=Math.floor(p)},60);
// cursor
const cur=$('#cursor'),dot=$('#dot'),lab=cur.querySelector('span');let mx=0,my=0,cx=0,cy=0;
addEventListener('pointermove',e=>{if(e.pointerType==='mouse')document.body.classList.add('cm');mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
 const w=innerWidth/2,h=innerHeight/2,dx=(e.clientX-w)/w,dy=(e.clientY-h)/h;
 $('.glow').style.transform=`translate(${dx*-25}px,${dy*-18}px)`;$('.photo').style.transform=`translate(${dx*14}px,${dy*8}px)`});
(function ring(){cx+=(mx-cx)*.16;cy+=(my-cy)*.16;cur.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(ring)})();
$$('.pc').forEach(e=>e.dataset.cursor='View');$$('.mail').forEach(e=>e.dataset.cursor='Email');$$('.cert,.jc').forEach(e=>e.dataset.cursor='');
document.addEventListener('pointerover',e=>{const el=e.target.closest('a,button,[data-cursor]');cur.classList.toggle('on',!!el);const l=el&&el.dataset.cursor;lab.textContent=l||'';cur.classList.toggle('lbl',!!l);document.body.classList.toggle('lb',!!l)});
document.addEventListener('pointerdown',()=>cur.classList.add('dn'));document.addEventListener('pointerup',()=>cur.classList.remove('dn'));
document.addEventListener('pointerleave',()=>document.body.classList.remove('cm'));
// magnetic
$$('.mag').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
// tilt + spotlight
$$('.tilt').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
 c.style.setProperty('--x',x*100+'%');c.style.setProperty('--y',y*100+'%');if(!rm)c.style.transform=`perspective(900px) rotateY(${(x-.5)*8}deg) rotateX(${(.5-y)*8}deg)`});
 c.addEventListener('pointerleave',()=>c.style.transform='')});
// scramble roles
const roles=['Java Full Stack Developer','Embedded Software Developer','ECE Final Year Student','Aspiring Software Developer'],chars='<>/{}[]#01*+=';
const role=$('#role');let ri=0;
function scramble(txt){if(rm){role.textContent=txt;return}let f=0;const id=setInterval(()=>{role.textContent=txt.split('').map((c,i)=>i<f/2?c:c===' '?' ':chars[Math.random()*chars.length|0]).join('');if(++f>txt.length*2)clearInterval(id)},28)}
function startRoles(){setInterval(()=>{ri=(ri+1)%roles.length;scramble(roles[ri])},3200)}
// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');
 e.target.querySelectorAll('[data-n]').forEach(b=>{const n=+b.dataset.n;let v=0;const s=setInterval(()=>{b.textContent=++v;if(v>=n)clearInterval(s)},1000/n/1.2)});io.unobserve(e.target)}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));
// glove messages
const msgs=['HELLO','HELP','I NEED FOOD','I NEED WATER','THANK YOU','WATER','GOODBYE','YES','NO','PLEASE','YOU ARE WELCOME','NORMAL'];let mi=0;const m=$('#msg');
setInterval(()=>{mi=(mi+1)%msgs.length;m.style.opacity=0;setTimeout(()=>{m.textContent=msgs[mi];m.style.opacity=1},200)},2200);m.style.transition='opacity .2s';
// menu
const btn=$('#menuBtn'),ov=$('#overlay');
btn.addEventListener('click',()=>{const o=ov.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
ov.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ov.classList.remove('open');btn.setAttribute('aria-expanded',false)}));
})();
(()=>{const st=document.getElementById('stage');if(!st)return;
const cards=[...st.querySelectorAll('.pc')],pds=[...document.querySelectorAll('.pd')],nodes=document.getElementById('nodes'),yrs=['May 2025','Aug 2025','Aug 2025','May 2026'];
const T=[.12,.38,.62,.9];let a=3;
const P=t=>({x:(1-t)**2*40+2*(1-t)*t*500+t*t*960,y:(1-t)**2*260+2*(1-t)*t*-60+t*t*260});
yrs.forEach((y,i)=>{const d=document.createElement('div');d.className='nd';d.innerHTML='<span>'+y+'</span><i></i>';nodes.appendChild(d)});
const nd=[...nodes.children];
function lay(){cards.forEach((c,i)=>{const p=P(T[i]),d=i-a,on=d===0;
 const sc=on?1.28:1-Math.min(Math.abs(d),3)*.06;
 const left=p.x/10,top=(p.y/320)*(100*320/430)+7+(on?10:15);
 c.style.left=(left-9.5)+'%';c.style.top=top+'%';
 c.style.transform=`rotateY(${-d*16}deg) scale(${sc}) translateZ(${on?60:0}px)`;
 c.style.zIndex=on?5:4-Math.abs(d);c.style.filter=on?'none':'brightness(.6) saturate(.8)';c.classList.toggle('act',on);
 const n=nd[i],q=P(T[i]);n.style.left=q.x/10+'%';n.style.top=(q.y/320)*(100*320/430)+7+'%';n.classList.toggle('act',on)});
 pds.forEach(p=>p.classList.toggle('act',+p.dataset.i===a))}
const go=i=>{a=(i+cards.length)%cards.length;lay()};
cards.forEach((c,i)=>c.addEventListener('click',()=>go(i)));
document.getElementById('pp').onclick=()=>go(a-1);document.getElementById('pn').onclick=()=>go(a+1);
st.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(a-1);if(e.key==='ArrowRight')go(a+1)});
let sx=0;st.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});st.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40)go(a+(d<0?1:-1))});
lay();new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){st.classList.add('on');o.disconnect()}}),{threshold:.3}).observe(st);
})();
(()=>{const jt=document.getElementById('jt');if(!jt)return;const fill=document.getElementById('jfill'),es=[...jt.querySelectorAll('.je')];
const io=new IntersectionObserver(l=>l.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.25});es.forEach(e=>io.observe(e));
let tk=0;const upd=()=>{tk=0;const r=jt.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.6-r.top)/r.height));fill.style.height=p*100+'%'};
addEventListener('scroll',()=>{if(!tk)tk=requestAnimationFrame(upd)},{passive:true});upd();
})();

(()=>{const ex=['jpg','jpeg','png','webp'];document.querySelectorAll('.pv[data-img]').forEach(pv=>{const k=pv.dataset.img;let i=0;
 (function t(){if(i>=ex.length)return;const im=new Image();im.alt='';im.onload=()=>{pv.insertBefore(im,pv.firstChild);pv.classList.add('has-img')};im.onerror=()=>{i++;t()};im.src=`assets/projects/${k}.${ex[i]}`})()})})();
(()=>{const n=document.querySelector('.nav');const f=()=>n.classList.toggle('sc',scrollY>60);addEventListener('scroll',f,{passive:true});f()})();
