const V=THREE.Vector3,$=i=>document.getElementById(i);

const R=new THREE.WebGLRenderer({antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;R.outputEncoding=THREE.sRGBEncoding;document.body.prepend(R.domElement);
const S=new THREE.Scene();S.background=new THREE.Color(0x0d0f12);S.fog=new THREE.Fog(0x0d0f12,22,48);
const C=new THREE.PerspectiveCamera(50,1,.1,80);
function fit(){R.setSize(innerWidth,innerHeight);const a=innerWidth/innerHeight;C.aspect=a;C.fov=a<.7?80:a<1.1?65:50;C.updateProjectionMatrix()}addEventListener('resize',fit);fit();
const M=(c,r=.55,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const WH=M(0xe6e9ed,.85),BK=M(0x0f1114,.5),GR=M(0x2a2e34,.7),GL=new THREE.MeshStandardMaterial({color:0x9fc3ff,roughness:.05,metalness:.1,transparent:true,opacity:.17,depthWrite:false});
function bx(w,h,d,mat,x,y,z,p){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;(p||S).add(m);return m}
function tex(w,h,f){const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return t}
function sign(a,b,w,h,x,y,z,bg,fg){const t=tex(600,Math.round(600*h/w),(g,W,H)=>{g.fillStyle=bg;g.fillRect(0,0,W,H);g.textAlign='center';g.fillStyle=fg;g.font=`800 ${H*.36}px Inter,Arial`;g.fillText(a,W/2,H*.52);g.fillStyle='#8a929b';g.font=`600 ${H*.19}px Inter,Arial`;g.fillText(b,W/2,H*.82)});const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t}));m.position.set(x,y,z);S.add(m)}
function plate(a,b,x,y,z){bx(.6,.17,.03,BK,x,y+.085,z);sign(a,b,.58,.15,x,y+.085,z+.017,'#f4f5f7','#0f1114')}
// lights
S.add(new THREE.HemisphereLight(0xffffff,0x334455,.75));
const dl=new THREE.DirectionalLight(0xffffff,.7);dl.position.set(6,10,8);dl.castShadow=true;dl.shadow.mapSize.set(1024,1024);Object.assign(dl.shadow.camera,{left:-16,right:16,top:14,bottom:-14,far:40});S.add(dl);
[[0,3,2,.5],[7.5,3,-4,.7],[-7,3,0,.5],[0,3,8,.4]].forEach(l=>{const p=new THREE.PointLight(0xdbe8ff,l[3],12);p.position.set(l[0],l[1],l[2]);S.add(p)});
// room
bx(26,.1,19.2,M(0x16191d,.25,.3),0,-.05,0);bx(26,.1,19.2,WH,0,3.45,0);
bx(26,3.4,.2,WH,0,1.7,-9.6);bx(.2,3.4,19.2,WH,-13,1.7,0);bx(.2,3.4,19.2,WH,13,1.7,0);bx(11.8,3.4,.2,WH,-7.1,1.7,9.6);bx(11.8,3.4,.2,WH,7.1,1.7,9.6);bx(2.4,.9,.2,BK,0,2.95,9.6);
sign('RUTHVEEK','STUDIO · WELCOME',2.2,.7,0,2.95,9.71,'#0f1114','#ffffff');
sign('RUTHVEEK','CREATE · BUILD · SHIP',2.6,.8,0,2.1,-9.47,'#0f1114','#ffffff');
for(let i=-2;i<=2;i++)for(let j=-1;j<=1;j++)bx(2,.04,.5,new THREE.MeshBasicMaterial({color:0xeaf2ff}),i*5,3.4,j*5);
const sky=new THREE.Mesh(new THREE.PlaneGeometry(14,2),new THREE.MeshBasicMaterial({color:0x9cc4ff}));sky.position.set(12.88,1.8,3);sky.rotation.y=-Math.PI/2;S.add(sky);for(let i=-3;i<=3;i++)bx(.08,2.1,.1,BK,12.85,1.8,3+i*2);
// helpers
const scr=tex(128,72,(g,W,H)=>{g.fillStyle='#10161f';g.fillRect(0,0,W,H);for(let i=0;i<9;i++){g.fillStyle=i%3?'#6ea8ff':'#e6e9ed';g.fillRect(8+(i%3)*8,6+i*7,20+Math.random()*60,3)}});
function chair(x,z,d=1){const g=new THREE.Group();g.position.set(x,0,z);S.add(g);bx(.48,.07,.48,GR,0,.44,0,g);bx(.46,.55,.05,BK,0,.76,-.26*d,g);bx(.05,.4,.05,BK,0,.22,0,g);bx(.5,.04,.5,BK,0,.03,0,g);return g}
function monitor(x,z,y){bx(.6,.36,.03,BK,x,y+.28,z);bx(.06,.18,.06,BK,x,y+.09,z);const s=new THREE.Mesh(new THREE.PlaneGeometry(.56,.32),new THREE.MeshBasicMaterial({map:scr}));s.position.set(x,y+.28,z-.017);s.rotation.y=Math.PI;S.add(s)}
function plant(x,z){bx(.4,.4,.4,BK,x,.2,z);for(let i=0;i<4;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.28-i*.03,10,8),M(0x2f5d50,.9));s.position.set(x+(i%2-.5)*.15,.7+i*.22,z+(i>1?.1:-.1));S.add(s)}}
function gbox(x0,x1,z0,z1,dx,rug){const cx=(x0+x1)/2,cz=(z0+z1)/2,w=x1-x0,d=z1-z0,a=dx-.8,b=dx+.8;
 bx(w,.02,d,M(rug,.95),cx,.01,cz);bx(.08,3.2,d,GL,x0,1.6,cz);bx(.08,3.2,d,GL,x1,1.6,cz);bx(w,3.2,.08,GL,cx,1.6,z0);bx(a-x0,3,.08,GL,(x0+a)/2,1.5,z1);bx(x1-b,3,.08,GL,(b+x1)/2,1.5,z1);
 [[x0,z0],[x1,z0],[x0,z1],[x1,z1],[a,z1],[b,z1]].forEach(([x,z])=>bx(.12,3.2,.12,BK,x,1.6,z));bx(w,.1,.1,BK,cx,3.15,z1);bx(w,.1,.1,BK,cx,3.15,z0);bx(1.6,.1,.1,BK,dx,2.4,z1)}
function mkDoor(hx,z,ry){const g=new THREE.Group();g.position.set(hx,0,z);g.rotation.y=ry;S.add(g);bx(1.55,2.3,.04,GL,.78,1.15,0,g);bx(1.55,.5,.045,new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.55,roughness:.3}),.78,1.3,0,g);bx(.06,2.3,.06,BK,0,1.15,0,g);bx(.06,2.3,.06,BK,1.55,1.15,0,g);bx(1.6,.06,.06,BK,.78,2.3,0,g);bx(.04,.3,.05,M(0xcccccc,.2,1),1.4,1.05,.05,g);bx(.04,.3,.05,M(0xcccccc,.2,1),1.4,1.05,-.05,g);return g}
// security desk
bx(1.7,.95,.7,BK,1.2,.475,8.75);bx(1.8,.05,.8,WH,1.2,.97,8.75);plate('Arjun Mehta','SECURITY',.9,.995,9);const gc=chair(1.2,7.85,1);plant(-2.5,8.7);plant(3.4,8.7);bx(2.4,.45,.9,GR,-8,.23,8.2);bx(2.4,.5,.2,GR,-8,.65,8.6);
// HR cabin
gbox(-2.4,2.4,.6,5.4,0,0x23272d);const dhr=mkDoor(-.8,5.4,0);sign('HR OFFICE','Visitor Check-in',1.4,.42,0,2.77,5.47,'#0f1114','#ffffff');
bx(2.6,.95,.9,BK,0,.475,2.2);bx(2.7,.05,1,WH,0,.97,2.2);plate('Priya Sharma','HR MANAGER',-.5,.995,2.5);monitor(.7,2.05,.97);const hc=chair(0,1.2,1);chair(0,3.4,-1);chair(.8,3.5,-1);plant(2,1.1);
// staff cabin (one big cabin for all employees)
gbox(-12.4,-2.6,-8.4,.4,-3.5,0x23272d);mkDoor(-4.3,.4,1.3);sign('TEAM STUDIO','ALL STAFF',1.5,.45,-3.5,2.77,.47,'#0f1114','#ffffff');
sign('TEAM STUDIO','Design · Build · Ship',2.6,.8,-7.5,2.1,-8.3,'#f4f5f7','#0f1114');plant(-12,-7.6);plant(-3,-7.6);bx(1.2,.9,.6,WH,-2.9+-.5,.45,-7.6);
[[-10,-1],[-7,-1],[-4,-1],[-10,-5],[-7,-5],[-4,-5]].forEach(([x,z])=>{bx(1.6,.05,.8,WH,x,.75,z+.75);bx(.05,.75,.7,GR,x-.75,.375,z+.75);bx(.05,.75,.7,GR,x+.75,.375,z+.75);monitor(x,z+.9,.78);chair(x,z-.02)});
// Ruthveek cabin (door closed)
gbox(3.5,12.5,-8.5,-1.5,6,0x23272d);bx(9,3.4,.15,GR,8,1.7,-8.45);const dr=mkDoor(5.2,-1.5,0);
sign('RUTHVEEK','PRIVATE CABIN',1.5,.45,6,2.77,-1.43,'#0f1114','#ffffff');sign('RUTHVEEK','FULL-STACK DEVELOPER',3,.8,6.5,2.1,-8.35,'#0f1114','#ffffff');
bx(2.5,.06,1.05,BK,7.5,.76,-6.1);bx(.06,.74,.95,GR,6.3,.37,-6.1);bx(.06,.74,.95,GR,8.7,.37,-6.1);bx(2.4,.6,.04,GR,7.5,.4,-5.62);
plate('RUTHVEEK','FULL-STACK DEVELOPER',7.5,.79,-5.78);monitor(7.5,-6.35,.79);
const rc=chair(7.5,-7.15,1);chair(7.5,-4.5,-1);
bx(2.2,2.3,.35,BK,10.9,1.15,-8.2);for(let r=0;r<4;r++)for(let i=0;i<11;i++)bx(.1,.3,.2,M([0xf4f5f7,0x6ea8ff,0x888e96,0x2c333b][(i+r)%4]),10+i*.16,.55+r*.5,-8.05);
bx(1.8,.45,.8,GR,4.7,.23,-7.9);plant(11.9,-2.2);plant(4,-2.3);
// people
const P=[];
function person(o){const g=new THREE.Group(),body=new THREE.Group();g.add(body);
 const sk=M(o.skin,.65),jk=M(o.top,.75),pn=M(o.pants,.8),hc=M(o.hair,.9),wh=M(0xf4f5f7,.8),dk=M(0x15171a,.6);
 const mk=(geo,mat,x,y,z,p)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;(p||body).add(m);return m};
 const Cy=(a,b,h)=>new THREE.CylinderGeometry(a,b,h,16),Sp=r=>new THREE.SphereGeometry(r,18,14);
 const legs=[-1,1].map(s=>{const hip=new THREE.Group();hip.position.set(s*.09,.9,0);body.add(hip);mk(Cy(.08,.062,.45),pn,0,-.225,0,hip);const knee=new THREE.Group();knee.position.y=-.45;hip.add(knee);mk(Sp(.062),pn,0,0,0,knee);mk(Cy(.06,.048,.43),pn,0,-.215,0,knee);const sh=mk(Sp(.05),dk,0,-.44,.05,knee);sh.scale.set(1,.7,2.1);return{hip,knee}});
 mk(Sp(.17),pn,0,.96,0).scale.set(1,.7,.7);mk(Cy(.17,.15,.3),jk,0,1.06,0).scale.z=.66;
 const chest=mk(Sp(.2),jk,0,1.3,0);chest.scale.set(1.05,1.2,.66);
 const v=mk(new THREE.BoxGeometry(.11,.3,.02),wh,0,1.32,.13);if(o.tie)mk(new THREE.BoxGeometry(.035,.25,.02),M(o.tie),0,1.3,.145);
 const arms=[-1,1].map(s=>{const sh=new THREE.Group();sh.position.set(s*.235,1.44,0);body.add(sh);mk(Sp(.07),jk,0,0,0,sh);mk(Cy(.056,.047,.3),jk,0,-.15,0,sh);const el=new THREE.Group();el.position.y=-.3;sh.add(el);mk(Sp(.047),jk,0,0,0,el);mk(Cy(.047,.04,.26),jk,0,-.13,0,el);mk(Cy(.042,.042,.03),wh,0,-.27,0,el);mk(Sp(.045),sk,0,-.3,0,el).scale.set(.9,1.2,.7);return{sh,el}});
 mk(Cy(.048,.055,.1),sk,0,1.56,0);mk(new THREE.BoxGeometry(.15,.03,.1),wh,0,1.53,0);
 const head=new THREE.Group();head.position.y=1.68;body.add(head);
 mk(Sp(.115),sk,0,.01,0,head).scale.set(.93,1.15,1.03);mk(Sp(.085),sk,0,-.05,.02,head).scale.set(1,.9,1);
 [-1,1].forEach(s=>{mk(Sp(.022),sk,s*.108,0,0,head);mk(Sp(.017),M(0xffffff,.3),s*.04,.025,.1,head);mk(Sp(.01),dk,s*.04,.025,.114,head);mk(new THREE.BoxGeometry(.05,.01,.012),hc,s*.04,.062,.108,head).rotation.z=s*-.12;if(o.glasses)mk(new THREE.TorusGeometry(.026,.004,6,18),dk,s*.04,.025,.116,head)});
 const h1=mk(new THREE.SphereGeometry(.125,18,14,0,6.283,0,1.4),hc,0,.03,-.015,head);h1.scale.set(1,1.1,1.1);mk(Sp(.113),hc,0,.0,-.04,head);
 if(o.long)mk(new THREE.BoxGeometry(.22,.34,.07),hc,0,-.14,-.09,head);
 mk(Sp(.018),sk,0,-.01,.118,head);mk(new THREE.BoxGeometry(.05,.009,.01),M(0x8a4545),0,-.058,.108,head);
 if(o.cap){mk(Cy(.13,.13,.07),dk,0,.1,0,head);mk(new THREE.BoxGeometry(.2,.01,.1),dk,0,.07,.12,head)}
 if(o.sc)g.scale.setScalar(o.sc);
 const p={g,body,head,legs,arms,chest,sit:0,sv:0,walk:0,wv:0,typ:0,talk:0,point:0,knock:0,fa:o.fa||0,ph:Math.random()*6};if(o.sit){p.sit=p.sv=1}g.position.set(o.x,0,o.z);g.rotation.y=p.fa;S.add(g);P.push(p);return p}
const guard=person({x:1.2,z:7.95,skin:0xc68642,top:0x15181c,pants:0x15181c,hair:0x111111,cap:1,sc:1.05,sit:1});
const hr=person({x:0,z:1.25,skin:0xe0ac69,top:0x1c1f24,pants:0x1c1f24,hair:0x1a1210,long:1,sc:.96,sit:1});
const ru=person({x:7.5,z:-7,skin:0xc68642,top:0x14171b,pants:0x14171b,hair:0x0c0c0c,tie:0x6ea8ff,glasses:1,sit:1});
const SK=[0xf1c7a0,0xc68642,0x8d5524,0xe0ac69,0xffdbac,0xa8754f];
[[-10,-1,0],[-7,-1,1],[-4,-1,2],[-10,-5,3],[-7,-5,4],[-4,-5,5]].forEach(([x,z,i])=>{const f=i==1||i==4;const w=person({x,z,skin:SK[i],top:[0xe6e9ed,0x3a4350,0x1c1f24,0x8a929b,0xf4f5f7,0x2b3340][i],pants:0x1c1f24,hair:[0x151515,0x2a1a10,0x0c0c0c,0x3a2a1a,0x1a1210,0x0c0c0c][i],long:f,glasses:i==2,sc:f?.95:1,sit:1});w.typ=1;w.ph=i*1.7});
// engine
const jobs=[],ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,sleep=ms=>new Promise(r=>setTimeout(r,ms)),wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
let look=new V(1.2,1.4,8),ab=false,mode='intro';
const K=async p=>{const r=await p;if(ab)await new Promise(()=>{});return r};
function tween(ms,fn){return new Promise(r=>{const t0=performance.now();jobs.push(()=>{const k=Math.min(1,(performance.now()-t0)/ms);fn(ease(k));if(k>=1){r();return true}})})}
const slide=(o,z,ms=1000)=>{const z0=o.position.z;return tween(ms,k=>o.position.z=z0+(z-z0)*k)};
function cam(pos,lk,ms){const p0=C.position.clone(),l0=look.clone(),a=new V(...pos),b=new V(...lk);return tween(ms,k=>{C.position.lerpVectors(p0,a,k);look.lerpVectors(l0,b,k)})}
function walk(p,pts,sp,fol){return new Promise(res=>{let i=0;p.walk=1;const g=p.g;jobs.push(dt=>{const tg=new V(pts[i][0],0,pts[i][1]),d=tg.clone().sub(g.position);d.y=0;const L=d.length(),st=sp*dt;if(L<=st){g.position.copy(tg);if(++i>=pts.length){p.walk=0;res();return true}}else{g.position.addScaledVector(d,st/L);p.fa=Math.atan2(d.x,d.z)}
 if(fol){const f=g.rotation.y,k=Math.min(1,dt*1.8);C.position.lerp(g.position.clone().add(new V(-Math.sin(f)*3.4,1.75,-Math.cos(f)*3.4)),k);look.lerp(g.position.clone().add(new V(Math.sin(f)*1.2,1.35,Math.cos(f)*1.2)),Math.min(1,dt*2.5))}})})}
let tm;const dlg=$('dlg');
function say(p,name,role,text,opts){return new Promise(res=>{$('who').textContent=name;$('role').textContent=role;const btns=$('btns');btns.innerHTML='';dlg.classList.add('on');let i=0;p.talk=1;clearInterval(tm);const fin=()=>{clearInterval(tm);$('txt').textContent=text;p.talk=0;if(btns.children.length)return;opts.forEach(o=>{const b=document.createElement('button');b.textContent=o;b.onclick=()=>{dlg.classList.remove('on');res(opts.indexOf(o))};btns.appendChild(b)})};$('txt').onclick=fin;tm=setInterval(()=>{$('txt').textContent=text.slice(0,++i);if(i>=text.length)fin()},20)})}
function tick(p,dt,t){const g=p.g,k=Math.min(1,dt*8),ls=(a,b)=>a+(b-a)*k;
 g.rotation.y+=wrap(p.fa-g.rotation.y)*Math.min(1,dt*6);p.sv+=(p.sit-p.sv)*Math.min(1,dt*3);p.wv+=(p.walk-p.wv)*Math.min(1,dt*5);
 const sv=p.sv,wv=p.wv,ph=t*7;
 p.legs.forEach((l,i)=>{const s=Math.sin(ph+i*Math.PI);l.hip.rotation.x=-1.5*sv+s*.5*wv*(1-sv);l.knee.rotation.x=1.5*sv+Math.max(0,-s)*.8*wv*(1-sv)});
 p.arms.forEach((a,i)=>{let sx=0,ex=-.1;const s=Math.sin(ph+i*Math.PI);
  if(p.typ){sx=-.75+Math.sin(t*13+i*2)*.04;ex=-.55+Math.sin(t*17+i)*.07}
  else if(p.point&&i==1){sx=-1.45;ex=-.05}
  else if(p.knock&&i==1){sx=-1.2;ex=-.9+Math.sin(t*16)*.35}
  else if(wv>.1){sx=-s*.45;ex=-.2-Math.max(0,s)*.3}
  else if(sv>.5){sx=-.5;ex=-.7}
  a.sh.rotation.x=ls(a.sh.rotation.x,sx);a.el.rotation.x=ls(a.el.rotation.x,ex);a.sh.rotation.z=(i?1:-1)*.05});
 p.body.position.y=-.44*sv+Math.abs(Math.sin(ph))*.025*wv;p.body.rotation.y=Math.sin(ph)*.09*wv;p.chest.scale.y=1.2+Math.sin(t*1.6+p.ph)*.012;
 p.head.rotation.x=(p.talk?Math.sin(t*9)*.05:0)+Math.sin(t*.8+p.ph)*.02;p.head.rotation.y=Math.sin(t*.6+p.ph)*.1}
let last=performance.now();
(function loop(now){requestAnimationFrame(loop);const dt=Math.min(.05,(now-last)/1000);last=now;const t=now/1000;
 for(let i=0;i<jobs.length;i++)if(jobs[i](dt))jobs.splice(i--,1);
 P.forEach(p=>tick(p,dt,t));
 if(mode==='site'){C.position.set(7.5+Math.sin(t*.2)*.5,1.25+Math.sin(t*.3)*.03,-4.3);look.set(7.5+Math.sin(t*.17)*.4,1.35,-7)}
 C.lookAt(look);R.render(S,C)})(performance.now());
function openSite(){ab=true;mode='site';dlg.classList.remove('on');$('skip').style.display='none';$('site').classList.add('on');document.body.classList.add('ready');initPortfolio()}
$('skip').onclick=openSite;
// story
(async()=>{
 C.position.set(-.5,1.7,16);
 await K(cam([-.5,1.65,11.8],[1.2,1.35,8.2],3400));
 await K(sleep(600));guard.sit=0;slide(gc,7.25);await K(sleep(1400));
 await K(say(guard,'Arjun Mehta','Security','Good morning, and welcome to Ruthveek’s office. Please check in at the HR office just ahead.',['Thank you']));
 guard.fa=Math.PI;guard.point=1;await K(sleep(1500));
 await K(cam([0,1.6,6.8],[0,1.4,2],2400));guard.point=0;guard.fa=0;guard.sit=1;slide(gc,7.85);await K(sleep(300));
 await K(tween(1300,k=>dhr.rotation.y=1.3*k));await K(sleep(200));
 await K(cam([0,1.55,3.8],[0,1.35,1.25],1600));
 hr.sit=0;slide(hc,.75);await K(sleep(500));
 await K(say(hr,'Priya Sharma','HR Manager','Good morning! Welcome to Ruthveek’s office. Please, have a seat.',['Take a seat']));
 await K(cam([0,1.22,3.3],[0,1.35,1.25],1000));
 hr.sit=1;slide(hc,1.2);await K(sleep(500));
 const a=await K(say(hr,'Priya Sharma','HR Manager','What brings you to our office today?',['I’d like to meet Ruthveek','I’m here to explore his work','I have a business inquiry']));
 const rep=['Of course. Let me check whether Ruthveek is free. Please follow me to his cabin.','Wonderful! The best guide to his work is Ruthveek himself. Let me take you to his cabin.','Excellent, he’ll be glad to hear it. Let me check if he’s free. Please follow me.'];
 await K(say(hr,'Priya Sharma','HR Manager',rep[a],['Follow HR']));
 await K(cam([.3,1.55,3.8],[0,1.35,1.25],700));
 hr.sit=0;slide(hc,.75);await K(sleep(400));
 let trackHR=true;jobs.push(dt=>{if(!trackHR||ab)return true;look.lerp(hr.g.position.clone().add(new V(0,1.35,0)),Math.min(1,dt*4))});
 await K(walk(hr,[[-1.7,1.25],[-1.7,3.8],[0,4.4],[0,6.5]],1.5,false));trackHR=false;
 await K(cam([0,1.6,5.8],[6,1.4,6.5],1000));
 await K(walk(hr,[[6,6.5],[6,-.45]],1.6,true));
 hr.fa=Math.PI;await K(sleep(700));hr.knock=1;await K(sleep(2200));hr.knock=0;
 await K(cam([4.8,1.7,1.6],[7,1.3,-5],1800));
 await K(say(hr,'Priya Sharma','HR Manager','Excuse me, Ruthveek. A visitor would like to meet you. May I come in?',['…']));
 await K(say(ru,'Ruthveek','Full-Stack Developer','Yes, of course. Please, come in.',['Enter']));
 await K(tween(1600,k=>dr.rotation.y=1.3*k));
 await K(walk(hr,[[6,-3.3]],1.5,true));hr.fa=Math.PI;
 await K(cam([6.6,1.6,-1.9],[7.5,1.4,-6.8],1900));
 ru.sit=0;slide(rc,-7.75);await K(sleep(1300));
 await K(say(ru,'Ruthveek','Full-Stack Developer','Welcome! It’s great to meet you. Please, have a seat. Let me show you what I’ve been building.',['Take a seat']));
 walk(hr,[[6,-1],[6,6.5],[0,6.5],[0,4.3],[-1.7,3.9],[-1.7,1.25],[0,1.25]],1.6).then(()=>{hr.fa=0;hr.sit=1;slide(hc,1.2);tween(1400,k=>dhr.rotation.y=1.3*(1-k))});
 sleep(3500).then(()=>tween(1600,k=>dr.rotation.y=1.3*(1-k)));
 await K(cam([7.5,1.2,-4.3],[7.5,1.4,-7],2600));
 ru.sit=1;slide(rc,-7.15);await K(sleep(1200));openSite()})();

// ==========================================
// Portfolio Integration (from Netlify)
// ==========================================
let portfolioInited = false;
function initPortfolio() {
  if (portfolioInited) return;
  portfolioInited = true;

  const PRO_PROJECTS = [
    [
      "Arogya Narayan",
      "Hospital Management System",
      "Client",
      "Secure admin dashboards for patient records with validation, error handling and async REST APIs (filtering, pagination). Reusable React components and role-based access.",
      ["React", "Role-based access", "REST API"],
      ""
    ],
    [
      "SAMS",
      "School Management System",
      "Client",
      "Responsive school website simplifying admissions, with modules for details, sports, activities and testimonials.",
      ["HTML", "CSS", "Bootstrap", "React.js"],
      ""
    ],
    [
      "Library System",
      "Management app",
      "Practice",
      "Stores book records in browser Local Storage behind a clean management UI.",
      ["HTML", "CSS", "Bootstrap", "JS"],
      ""
    ],
    [
      "Lens & Lights Media",
      "Advertisement landing page",
      "Web",
      "Responsive advertisement landing page with a modern design.",
      ["HTML", "CSS", "JS"],
      ""
    ],
    [
      "SecurXperts Ads",
      "Company landing page",
      "Web",
      "Responsive company advertisement landing page for SecurXperts Technologies.",
      ["HTML", "CSS", "JS"],
      ""
    ]
  ];

  const PER_PROJECTS = [
    [
      "DHRUVANTHEERA",
      "Constructions website",
      "Personal",
      "Premium construction website with a cinematic video intro, architectural portfolio, testimonials and a booking and enquiry system.",
      ["HTML5", "CSS3", "JavaScript"],
      "https://grshetty.github.io/DC/"
    ],
    [
      "Trinetra",
      "Shopping website",
      "Next.js",
      "Modern e-commerce platform with sleek UI and dynamic product displays.",
      ["Next.js"],
      "https://my-app-gilt-nu-80.vercel.app/"
    ],
    [
      "SkillSwapper",
      "Skill exchange platform",
      "Web",
      "Connects people to exchange skills. User and Admin panels are in progress with React.js.",
      ["HTML", "CSS", "JS"],
      "https://skill-swapper-seven.vercel.app/"
    ],
    [
      "Sales Register",
      "Sales tracker with charts",
      "Web",
      "Authentication, daily sales logging and bar and pie chart visualization.",
      ["JS", "Chart.js"],
      "https://grshetty.github.io/SalesRegister/"
    ],
    [
      "Secured Login",
      "VAPT-minded login form",
      "UI",
      "Input sanitation, password visibility controls and response validation.",
      ["HTML", "CSS", "JS"],
      "https://grshetty.github.io/loginform/"
    ],
    [
      "Animated Login",
      "Glassmorphism login UI",
      "UI",
      "Floating labels, hover glow transitions and dynamic focus effects.",
      ["HTML", "CSS", "JS"],
      "https://grshetty.github.io/AnimatedLoginForm/"
    ],
    [
      "Archery Game",
      "Browser sports game",
      "Game",
      "Particle collisions and haptic feedback on bullseyes, with 20 starting arrows.",
      ["HTML", "CSS", "JS"],
      "https://grshetty.github.io/ArcheryGame/"
    ],
    [
      "Snake Game",
      "Arcade classic",
      "Game",
      "Speed levels, food spawning and persistent high scores.",
      ["HTML", "CSS", "JS"],
      "https://grshetty.github.io/SnakeGame/"
    ],
    [
      "Road Crossing",
      "Arcade game",
      "Game",
      "Multi-lane obstacles with progressive speed scaling and high scores.",
      ["HTML", "CSS", "JS"],
      "https://grshetty.github.io/RoadCrossGame/"
    ]
  ];

  let pIdx = 0;
  const projectMap = [];

  function renderRows(id, arr) {
    const el = $(id);
    if (!el) return;
    el.innerHTML = arr.map(p => {
      const i = pIdx++;
      projectMap[i] = p;
      const n = ('0' + (i + 1)).slice(-2);
      return `<div class="pr rv" data-i="${i}">` +
        `<span class="n">${n}</span>` +
        `<h3 class="serif">${p[0]}</h3>` +
        `<span class="k">${p[1]}</span>` +
        `<span class="ar">→</span>` +
        `<p class="d">${p[3]}</p>` +
        `</div>`;
    }).join('');
  }

  renderRows('pro', PRO_PROJECTS);
  renderRows('per', PER_PROJECTS);

  // Hover Preview Card
  const pv = $('pv');
  const pt = $('pt');
  const pd = $('pd');
  const pg = $('pg');
  let px = 0, py = 0, tx = 0, ty = 0;
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  document.querySelectorAll('.pr').forEach(r => {
    const p = projectMap[+r.dataset.i];
    if (!p) return;

    r.addEventListener('mouseenter', () => {
      const h = (+r.dataset.i * 47 + 12) % 360;
      if (pt) {
        pt.style.background = `linear-gradient(135deg,hsl(${h},80%,55%),hsl(${h + 50},80%,40%))`;
        pt.textContent = ('0' + (+r.dataset.i + 1)).slice(-2);
      }
      if (pd) pd.textContent = p[3];
      if (pg) {
        pg.innerHTML = p[4].map(t => `<span>${t}</span>`).join('');
      }
      if (pv) pv.classList.add('on');
    });

    r.addEventListener('mouseleave', () => {
      if (pv) pv.classList.remove('on');
    });

    r.addEventListener('mousemove', e => {
      tx = e.clientX + 24;
      ty = e.clientY - 90;
      if (tx + 310 > innerWidth) tx = e.clientX - 314;
      if (ty < 80) ty = 80;
      if (ty + 290 > innerHeight) ty = innerHeight - 290;
    });

    if (p[5]) {
      r.style.cursor = 'pointer';
      r.addEventListener('click', () => {
        window.open(p[5], '_blank', 'noopener');
      });
    }
  });

  (function movePv() {
    px += (tx - px) * 0.15;
    py += (ty - py) * 0.15;
    if (pv) {
      pv.style.left = px + 'px';
      pv.style.top = py + 'px';
    }
    requestAnimationFrame(movePv);
  })();

  // Skills Badges
  const skList = [
    "React.js", "Next.js", "JavaScript", "HTML5", "CSS3",
    "Tailwind CSS", "Bootstrap", "Git & GitHub", "Vercel",
    "Postman", "Figma", "REST APIs"
  ];
  const skEl = $('sk');
  if (skEl) {
    skEl.innerHTML = skList.map(s => `<span>${s}</span>`).join('');
  }

  // Infinite Marquee
  const mqWords = ["React", "Next.js", "Tailwind", "JavaScript", "Figma to code", "Responsive", "REST APIs", "Clean UI"];
  const trEl = $('tr');
  if (trEl) {
    trEl.innerHTML = mqWords.concat(mqWords).map(s => `<span>${s}</span>`).join('');
  }

  // Live IST Clock
  function updateClk() {
    try {
      const clkEl = $('clk');
      if (clkEl) {
        clkEl.textContent = new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata'
        }) + ' IST';
      }
    } catch (e) {}
  }
  updateClk();
  setInterval(updateClk, 30000);

  // Counter animation
  function countUp(el) {
    const n = +el.dataset.n;
    let t0 = null;
    function f(t) {
      if (!t0) t0 = t;
      const progress = Math.min((t - t0) / 1500, 1);
      el.textContent = Math.round(n * (1 - Math.pow(1 - progress, 3))) + (progress === 1 ? '+' : '');
      if (progress < 1) requestAnimationFrame(f);
    }
    if (reduce) {
      el.textContent = n + '+';
    } else {
      requestAnimationFrame(f);
    }
  }

  // Scroll Reveal Observer
  const siteEl = $('site');
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
        e.target.querySelectorAll('[data-n]').forEach(countUp);
      }
    });
  }, { root: siteEl, threshold: 0.08 });

  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  // Theme Toggle (Dark / Light)
  const root = document.documentElement;
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) root.setAttribute('data-theme', savedTheme);
  } catch (e) {}

  const tgBtn = $('tg');
  if (tgBtn) {
    tgBtn.onclick = () => {
      const cur = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
    };
  }

  // Back to Top Button
  const up = $('up');
  function onScroll() {
    if (!up) return;
    const top = siteEl ? siteEl.scrollTop : (window.pageYOffset || document.documentElement.scrollTop);
    up.classList.toggle('show', top > 350);
  }
  if (siteEl) siteEl.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (up) {
    up.onclick = () => {
      if (siteEl) siteEl.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    };
  }

  // Smooth scroll for nav anchor links inside #site
  if (siteEl) {
    siteEl.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const hash = a.getAttribute('href');
        if (!hash || hash === '#') return;
        const target = $(hash.slice(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        }
      });
    });
  }

  // Mobile Menu Toggle
  const mb = $('mb');
  const mm = $('mm');
  function toggleMenu(open) {
    if (!mm || !mb) return;
    mm.classList.toggle('open', open);
    mb.setAttribute('aria-expanded', open);
    mb.textContent = open ? 'Close' : 'Menu';
  }
  if (mb && mm) {
    mb.onclick = () => toggleMenu(!mm.classList.contains('open'));
    mm.addEventListener('click', e => {
      if (e.target.tagName === 'A') toggleMenu(false);
    });
    window.addEventListener('resize', () => {
      if (innerWidth > 760) toggleMenu(false);
    });
  }
}

// Pre-populate portfolio DOM immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
