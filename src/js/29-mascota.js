/* ===== v16 · mascota virtual: casita, necesidades, acciones y bocadillos ===== */
var PFOOD=[['🍎','Manzana',20,0],['🥕','Zanahoria',18,0],['🍌','Plátano',22,0],['🥛','Leche',14,6],['🍪','Galleta',10,10]];
function pclamp(v){return Math.max(0,Math.min(100,Math.round(v)))}
function petS(k){var P=cfgO('pet');P[k]=P[k]||{};var p=P[k];if(p.h===undefined){p.h=80;p.f=80;p.c=80;p.t=iso(today())}return p}
function petTick(k){var p=petS(k),t=today(),ti=iso(t);if(!p.t||p.t>=ti){p.t=p.t||ti;return false}var d=add(fromIso(p.t),1),n=0;
while(iso(d)<=ti&&n<21){if(atHome(d)){p.cd=(p.h>=60&&p.f>=60&&p.c>=60)?(p.cd||0)+1:0;if(p.cd>=5&&p.shs===undefined)p.shs=petStage(k);p.h=pclamp(p.h-30);p.f=pclamp(p.f-25);p.c=pclamp(p.c-20)}d=add(d,1);n++}p.t=ti;return true}
function petTickAll(){['a','e'].forEach(petTick)}
function petSleeping(k){var p=petS(k),nm=nowMin(),ti=iso(today());return (p.sl===ti&&nm>=20*60)||(nm<7*60&&p.sl===iso(add(today(),-1)))}
function petMood(k){if(!atHome(today())||petSleeping(k))return 'sleep';var p=petS(k);if(p.h<25)return 'hungry';if(p.c<25)return 'dirty';var a=(p.h+p.f+p.c)/3;return a>=70?'happy':a>=40?'ok':'sad'}
function petMoodTxt(k){var m=petMood(k);if(petStage(k)<=1&&m!=='sleep')return 'Algo se mueve dentro… ¡cuídalo y sube de nivel para que nazca! 🥚';
return {happy:'¡Está feliz! 😄',ok:'Está tranquilo 🙂',sad:'Está triste… necesita cariño 💙',hungry:'¡Tiene hambre! 🍎',dirty:'Necesita un baño 🛁',sleep:atHome(today())?'Está durmiendo 😴':'Descansa hasta que vuelvas 😴'}[m]}
/* ---------- dibujo ---------- */
var PETSVGN=0; // id único por dibujo: un degradado repetido dentro de una vista oculta deja el relleno transparente
function petSvg(k,sz,act,st,noacc){var s=st!==undefined?st:petStage(k),md=act||petMood(k),A=k==='a',P0=petS(k),eq=noacc?{}:(P0.eq||{}),sh=typeof petShiny==='function'&&petShiny(k,s),c1=sh?'#FFD54A':A?'#5EC8FF':'#FF8CC6',c2=sh?'#F59E0B':A?'#2B9BEA':'#E2569A',c3=sh?'#B7791F':A?'#1B6FB8':'#B8336F',bl=sh?'#FFFBE0':A?'#DFF5FF':'#FFE6F2',id='p'+k+s+(sh?'s':'')+'_'+(PETSVGN=(PETSVGN+1)%1e6),h='',g='';
g='<defs><radialGradient id="'+id+'b" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="'+bl+'"/><stop offset=".45" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></radialGradient>'+
'<radialGradient id="'+id+'e" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#FFF6E2"/><stop offset="1" stop-color="#EAD3A8"/></radialGradient></defs>';
var shadow='<ellipse class="pv-sh" cx="100" cy="186" rx="'+(s<=1?34:44+s*3)+'" ry="7" fill="rgba(0,0,0,.18)"/>';
var eyesOpen=function(y,gap,r){var lx=100-gap,rx=100+gap,sad=md==='sad'||md==='hungry';return '<g class="pv-eyes">'+
'<ellipse cx="'+lx+'" cy="'+y+'" rx="'+r+'" ry="'+(r*1.15)+'" fill="#fff"/><ellipse cx="'+rx+'" cy="'+y+'" rx="'+r+'" ry="'+(r*1.15)+'" fill="#fff"/>'+
'<circle cx="'+(lx+1)+'" cy="'+(y+2)+'" r="'+(r*.68)+'" fill="#2A1B3D"/><circle cx="'+(rx+1)+'" cy="'+(y+2)+'" r="'+(r*.68)+'" fill="#2A1B3D"/>'+
'<circle cx="'+(lx+r*.25)+'" cy="'+(y-r*.25)+'" r="'+(r*.28)+'" fill="#fff"/><circle cx="'+(rx+r*.25)+'" cy="'+(y-r*.25)+'" r="'+(r*.28)+'" fill="#fff"/>'+
'<circle cx="'+(lx-r*.3)+'" cy="'+(y+r*.4)+'" r="'+(r*.12)+'" fill="#fff" opacity=".8"/><circle cx="'+(rx-r*.3)+'" cy="'+(y+r*.4)+'" r="'+(r*.12)+'" fill="#fff" opacity=".8"/></g>'+
(sad?'<path d="M'+(lx-r)+' '+(y-r*1.5)+' l'+(r*1.6)+' '+(r*.5)+' M'+(rx+r)+' '+(y-r*1.5)+' l-'+(r*1.6)+' '+(r*.5)+'" stroke="'+c3+'" stroke-width="3.5" stroke-linecap="round"/>':'')};
var eyesClosed=function(y,gap,r){return '<path d="M'+(100-gap-r)+' '+y+' q'+r+' '+(r*.9)+' '+(r*2)+' 0 M'+(100+gap-r)+' '+y+' q'+r+' '+(r*.9)+' '+(r*2)+' 0" stroke="#2A1B3D" stroke-width="4" fill="none" stroke-linecap="round"/>'};
var happyEyes=function(y,gap,r){return '<path d="M'+(100-gap-r)+' '+(y+3)+' q'+r+' -'+(r*1.3)+' '+(r*2)+' 0 M'+(100+gap-r)+' '+(y+3)+' q'+r+' -'+(r*1.3)+' '+(r*2)+' 0" stroke="#2A1B3D" stroke-width="4.5" fill="none" stroke-linecap="round"/>'};
var mouth=function(y){if(md==='eat')return '<ellipse cx="100" cy="'+(y+4)+'" rx="12" ry="11" fill="#7A1F3D"/><ellipse cx="100" cy="'+(y+10)+'" rx="7" ry="4" fill="#FF7A9C"/>';
if(md==='happy'||md==='love')return '<path d="M86 '+y+' q14 16 28 0 z" fill="#7A1F3D"/><path d="M93 '+(y+6)+' q7 5 14 0" fill="#FF7A9C"/>';
if(md==='sad')return '<path d="M89 '+(y+8)+' q11 -9 22 0" stroke="#2A1B3D" stroke-width="4" fill="none" stroke-linecap="round"/>';
if(md==='hungry')return '<path d="M86 '+(y+4)+' q4 -4 7 0 t7 0 t7 0 t7 0" stroke="#2A1B3D" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
if(md==='sleep')return '<ellipse cx="100" cy="'+(y+4)+'" rx="4" ry="3" fill="#7A1F3D"/>';
if(md==='bath')return '<ellipse cx="100" cy="'+(y+4)+'" rx="6" ry="7" fill="#7A1F3D"/>';
return '<path d="M89 '+y+' q11 10 22 0" stroke="#2A1B3D" stroke-width="4" fill="none" stroke-linecap="round"/>'};
var face=function(y,gap,r){var e=md==='sleep'?eyesClosed(y,gap,r):(md==='happy'||md==='love'||md==='eat')?happyEyes(y,gap,r):eyesOpen(y,gap,r);
return e+'<ellipse cx="'+(100-gap-r*.9)+'" cy="'+(y+r*1.6)+'" rx="'+(r*.75)+'" ry="'+(r*.42)+'" fill="#FF6FA0" opacity=".45"/><ellipse cx="'+(100+gap+r*.9)+'" cy="'+(y+r*1.6)+'" rx="'+(r*.75)+'" ry="'+(r*.42)+'" fill="#FF6FA0" opacity=".45"/>'+mouth(y+r*1.9)+
(md==='sad'?'<path class="pv-tear" d="M'+(100+gap+r*.6)+' '+(y+r)+' q4 8 0 12 q-4 -4 0 -12" fill="#7CC7FF"/>':'')};
var dirt=md==='dirty'||((petS(k).c<35)&&md!=='bath'&&md!=='sleep')?'<g opacity=".55"><ellipse cx="72" cy="140" rx="9" ry="6" fill="#8B6B4A"/><ellipse cx="128" cy="118" rx="7" ry="5" fill="#8B6B4A"/><ellipse cx="112" cy="158" rx="5" ry="4" fill="#8B6B4A"/></g><g class="pv-fly"><text x="150" y="80" font-size="14">💨</text></g>':'';
if(s<=1){var crack=s===1?'<path d="M58 112 l12 -9 l10 10 l11 -11 l10 10 l11 -10 l10 9 l11 -8" fill="none" stroke="#8B6B3D" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>':'';
h=shadow+'<g class="pv-body pv-egg"><path d="M100 30 C138 30 156 90 156 126 C156 162 132 182 100 182 C68 182 44 162 44 126 C44 90 62 30 100 30 Z" fill="url(#'+id+'e)" stroke="#D9BE8C" stroke-width="3"/>'+
'<circle cx="78" cy="96" r="10" fill="'+c1+'" opacity=".55"/><circle cx="122" cy="80" r="7" fill="'+c1+'" opacity=".55"/><circle cx="126" cy="146" r="13" fill="'+c1+'" opacity=".55"/><circle cx="74" cy="150" r="6" fill="'+c1+'" opacity=".55"/>'+
'<ellipse cx="82" cy="70" rx="10" ry="18" fill="#fff" opacity=".7" transform="rotate(-20 82 70)"/>'+crack+(s===1?(md==='sleep'?eyesClosed(126,16,8):eyesOpen(126,16,8)):'')+'</g>'}
else{var sc=[0,0,.78,.9,1,1.05][s],tf='translate(100 120) scale('+sc+') translate(-100 -120)';
var wings=s>=4?'<g class="pv-wings"><path d="M44 112 C10 96 8 60 32 72 C24 54 48 58 52 86 Z" fill="#fff" stroke="'+c2+'" stroke-width="3" stroke-linejoin="round"/><path d="M156 112 C190 96 192 60 168 72 C176 54 152 58 148 86 Z" fill="#fff" stroke="'+c2+'" stroke-width="3" stroke-linejoin="round"/></g>':'';
var ears=s>=3?'<path d="M60 80 C46 46 58 34 76 62 Z" fill="url(#'+id+'b)" stroke="'+c3+'" stroke-width="3" stroke-linejoin="round"/><path d="M140 80 C154 46 142 34 124 62 Z" fill="url(#'+id+'b)" stroke="'+c3+'" stroke-width="3" stroke-linejoin="round"/><path d="M63 70 C58 54 62 50 70 62 Z" fill="#FFB3D1"/><path d="M137 70 C142 54 138 50 130 62 Z" fill="#FFB3D1"/>':'';
var cape=s>=5?'<path d="M58 96 C40 150 52 182 100 184 C148 182 160 150 142 96 Z" fill="#C0263F" stroke="#7A1426" stroke-width="3"/>':'';
var feet='<ellipse cx="78" cy="178" rx="15" ry="9" fill="'+c2+'" stroke="'+c3+'" stroke-width="3"/><ellipse cx="122" cy="178" rx="15" ry="9" fill="'+c2+'" stroke="'+c3+'" stroke-width="3"/>';
var arms=s>=3?'<ellipse class="pv-arm l" cx="50" cy="132" rx="10" ry="15" fill="url(#'+id+'b)" stroke="'+c3+'" stroke-width="3" transform="rotate(25 50 132)"/><ellipse class="pv-arm r" cx="150" cy="132" rx="10" ry="15" fill="url(#'+id+'b)" stroke="'+c3+'" stroke-width="3" transform="rotate(-25 150 132)"/>':'';
var body='<path d="M100 62 C144 62 160 98 160 130 C160 164 134 182 100 182 C66 182 40 164 40 130 C40 98 56 62 100 62 Z" fill="url(#'+id+'b)" stroke="'+c3+'" stroke-width="3.5"/>'+
'<ellipse cx="100" cy="148" rx="34" ry="26" fill="#fff" opacity=".42"/><ellipse cx="74" cy="88" rx="14" ry="9" fill="#fff" opacity=".5" transform="rotate(-25 74 88)"/>';
var sprout=s===2?'<path d="M64 76 l10 -14 l10 10 l10 -14 l12 14 l10 -10 l10 14 C130 66 70 66 64 76 Z" fill="url(#'+id+'e)" stroke="#D9BE8C" stroke-width="3" stroke-linejoin="round"/>':'<path d="M100 62 C98 48 104 40 112 38" stroke="'+c3+'" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="114" cy="37" r="6" fill="'+(s>=4?'#FFD43B':c1)+'" stroke="'+c3+'" stroke-width="3"/>';
var crown=s>=5?'<path d="M74 66 L80 38 L92 54 L100 30 L108 54 L120 38 L126 66 Z" fill="#FFCC33" stroke="#C98A00" stroke-width="3" stroke-linejoin="round"/><circle cx="100" cy="40" r="4" fill="#FF4F7A"/><circle cx="80" cy="44" r="3" fill="#5EC8FF"/><circle cx="120" cy="44" r="3" fill="#5EC8FF"/>':'';
var AX=typeof accSvg==='function'?accSvg:function(){return ''};if(eq.head)crown='';
h=shadow+'<g transform="'+tf+'"><g class="pv-body">'+AX(eq.back,c3)+cape+wings+ears+arms+feet+body+(s<5&&!eq.head?sprout:'')+crown+face(116,20,11)+dirt+AX(eq.neck,c3)+AX(eq.eyes,c3)+AX(eq.head,c3)+(sh?'<g class="pv-sp"><text x="44" y="78" font-size="16">✨</text><text x="150" y="100" font-size="13">✨</text><text x="60" y="170" font-size="11">✨</text></g>':'')+'</g></g>'}
return '<svg class="pv16 md-'+md+' st-'+s+(sh?' shiny':'')+'" viewBox="0 0 200 200" width="'+sz+'" height="'+sz+'" aria-hidden="true">'+g+h+'</svg>'}
/* ---------- bocadillos ---------- */
function petLines(k){var t=today(),p=petS(k),n=KIDS[k].n,L=[],nm=nowMin(),md=petMood(k);
if(!atHome(t)){var nh=nextHome();return ['Zzz… te espero '+(nh?'el '+nh:'pronto')+' 💤','Estoy soñando con galletas 🍪']}
if(md==='sleep')return ['Zzz… 💤','Buenas noches, '+n+' 🌙'];
if(nm>=21*60+30)L.push('Tengo sueño… ¿apagas la luz? 💡');
if(nm<11*60)L.push('¡Buenos días, '+n+'! ☀️');
if(p.h<40)L.push('Tengo hambre… ¿me das algo? 🍎');if(p.c<40)L.push('Huelo un poco raro… ¡baño! 🛁');if(p.f<40)L.push('¿Me haces mimos? 🥺');
var pend=activeR(k,t).filter(function(x){return !isDone(k,x.id)});
if(pend.length)L.push('Aún te falta: '+emoTile(pend[0].t)+' '+noEmo(pend[0].t));else if(activeR(k,t).length)L.push('¡Hoy lo has hecho genial! 🌟');
var m=S.mission[k];if(m&&m.t&&m.st==='todo')L.push('Tu misión: '+noEmo(m.t)+' 🎲');
var c=cdList()[0];if(c&&c.n<=5)L.push(c.n===0?'¡Hoy es '+c.t+'! 🎉':'¡Faltan '+c.n+(c.n===1?' día':' días')+' para '+c.t+'! '+c.i);
L.push('¡Te quiero, '+n+'! 💖');return L}
/* ---------- casita ---------- */
var PR=null;
function prTod(){var nm=nowMin();return nm<8*60?'morning':nm<18*60?'day':nm<20*60+30?'eve':'night'}
function prBar(ic,lab,v,cl){return '<div class="pr16-bar '+cl+(v<30?' low':'')+'"><span class="pr16-bi">'+ic+'</span><div class="pr16-bt"><b>'+lab+'</b><div class="pr16-bf"><i style="width:'+v+'%"></i></div></div></div>'}
function prHtml(k){var p=petS(k),s=petStage(k),lv=lvOf(k).lv,sl=petSleeping(k),L=petLines(k),line=L[(PR&&PR.li||0)%L.length];
return '<div class="pr16-scene"><div class="pr16-win"><i class="pr16-sun"></i><i class="pr16-cloud c1"></i><i class="pr16-cloud c2"></i><i class="pr16-stars"></i></div><div class="pr16-shelf"><span>📚</span><span>🧸</span><span>🏆</span></div><div class="pr16-plant">🪴</div><div class="pr16-lamp"></div><div class="pr16-floor"></div><div class="pr16-rug"></div><div class="pr16-night"></div></div>'+
'<header class="pr16-h"><button type="button" class="pr16-x" data-act="prclose" aria-label="Cerrar">✕</button><div class="pr16-name"><b>'+esc(petName(k))+'</b><span>'+PETST[s]+' · Nivel '+lv+(s<5?' · evoluciona en el '+(lv+1):'')+'</span>'+shinyChip(k)+'</div><button type="button" class="pr16-ren" data-act="pralbum" aria-label="Álbum">📸</button><button type="button" class="pr16-ren" data-act="petname" data-k="'+k+'" aria-label="Cambiar nombre">✏️</button></header>'+
'<div class="pr16-bars">'+prBar('🍎','Comida',p.h,'h')+prBar('😊','Felicidad',p.f,'f')+prBar('🛁','Limpieza',p.c,'c')+'</div>'+
'<div class="pr16-stage"><div class="pr16-bub" data-act="prtalk">'+esc(line)+'</div><button type="button" class="pr16-pet" data-act="prpat">'+petSvg(k,PH()?230:300)+'</button><div class="pr16-fx" id="pr16fx"></div></div>'+
'<div class="pr16-tray" id="pr16tray">'+PFOOD.map(function(f,i){return '<button type="button" data-act="prfood" data-i="'+i+'"><span>'+f[0]+'</span><small>'+f[1]+'</small></button>'}).join('')+'<i class="pr16-tsep"></i>'+FOODX.map(function(f,i){return '<button type="button" class="sp" data-act="prfoodx" data-i="'+i+'"><span>'+f[0]+'</span><small>'+f[1]+'</small><em>⭐ '+f[2]+'</em></button>'}).join('')+'<button type="button" class="pr16-tx" data-act="prtray">✕</button></div><div id="pr17x"></div>'+
'<div class="pr16-dock">'+(sl?'<button type="button" class="pr16-a sleep wide" data-act="prsleep"><span>☀️</span><b>Despertar</b></button>':
'<button type="button" class="pr16-a eat" data-act="prtray"><span>🍎</span><b>Comer</b></button><button type="button" class="pr16-a pat" data-act="prpat"><span>🤲</span><b>Mimos</b></button><button type="button" class="pr16-a bath" data-act="prbath"><span>🛁</span><b>Baño</b></button><button type="button" class="pr16-a play" data-act="prgame"><span>🎮</span><b>Jugar</b></button><button type="button" class="pr16-a tienda" data-act="prshop"><span>🛍️</span><b>Tienda</b></button><button type="button" class="pr16-a sleep" data-act="prsleep"><span>💡</span><b>Dormir</b></button>')+'</div>'}
function prOpen(k){petTick(k);PR={k:k,li:0};var el=document.getElementById('pr16');if(!el){el=document.createElement('div');el.id='pr16';document.body.appendChild(el)}prDraw();el.classList.add('on');afterChange()}
function prDraw(act){if(!PR)return;var el=document.getElementById('pr16'),k=PR.k;el.className='pr16 on k-'+k+' tod-'+prTod()+(petSleeping(k)?' lights-off':'')+((petS(k).eq||{}).bg?' bg-'+petS(k).eq.bg:'');el.innerHTML=prHtml(k);if(act)prAct(act)}
function prAct(a){var pv=document.querySelector('#pr16 .pv16');if(!pv)return;pv.classList.add('do-'+a);var t=document.querySelector('#pr16 .pr16-pet');if(a==='eat'||a==='bath'||a==='love'){var md=a;var html=petSvg(PR.k,PH()?230:300,md);t.innerHTML=html;t.firstChild.classList.add('do-'+a);clearTimeout(PR.tm);PR.tm=setTimeout(function(){var x=document.querySelector('#pr16 .pr16-pet');if(x)x.innerHTML=petSvg(PR.k,PH()?230:300)},1500)}}
function prFx(chars,n,cls){var fx=document.getElementById('pr16fx');if(!fx)return;for(var i=0;i<n;i++){var e=document.createElement('i');e.className='pr16-p '+(cls||'');e.textContent=chars[i%chars.length];e.style.left=(30+Math.random()*40)+'%';e.style.animationDelay=(i*0.08)+'s';e.style.setProperty('--dx',(Math.random()*80-40)+'px');fx.appendChild(e);setTimeout(function(x){return function(){x.remove()}}(e),1800)}}
function prSay(t){var b=document.querySelector('#pr16 .pr16-bub');if(b){b.textContent=t;b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')}}
function prBars(){var p=petS(PR.k),b=document.querySelector('#pr16 .pr16-bars');if(b)b.innerHTML=prBar('🍎','Comida',p.h,'h')+prBar('😊','Felicidad',p.f,'f')+prBar('🛁','Limpieza',p.c,'c')}
H.petroom=function(el){prOpen(el.dataset.k)};
H.prclose=function(){var el=document.getElementById('pr16');if(el)el.classList.remove('on');PR=null;render()};
H.prtalk=function(){if(!PR)return;PR.li++;var L=petLines(PR.k);prSay(L[PR.li%L.length])};
H.prpat=function(){if(!PR)return;var k=PR.k;if(petSleeping(k)){prSay('Zzz… 💤');return}var p=petS(k);p.f=pclamp(p.f+6);prFx(['💖','💕','💗'],5);prAct('love');prBars();prSay(p.f>=100?'¡Soy la mascota más feliz del mundo! 🥰':['¡Jijiji! 😊','¡Más, más! 💕','¡Qué gustito! 🥰'][Math.floor(Math.random()*3)]);if(sndOn()){tone(1175,0,.09,.1);tone(1568,.07,.14,.1)}afterChange()};
H.prtray=function(){if(!PR)return;if(petSleeping(PR.k)){prSay('Zzz… 💤');return}var t=document.getElementById('pr16tray');if(t)t.classList.toggle('on')};
H.prfood=function(el){if(!PR)return;var k=PR.k,f=PFOOD[Number(el.dataset.i)],p=petS(k);var t=document.getElementById('pr16tray');if(t)t.classList.remove('on');
if(p.h>=100){prSay('¡Estoy llenísimo! 😵');return}p.h=pclamp(p.h+f[2]);if(f[3])p.f=pclamp(p.f+f[3]);prFx([f[0]],1,'food');setTimeout(function(){prAct('eat');prFx(['✨','⭐'],3)},450);prBars();
prSay(['¡Ñam ñam! 😋','¡Qué rico! '+f[0],'¡Gracias, '+KIDS[k].n+'! 💖'][Math.floor(Math.random()*3)]);if(sndOn()){tone(330,.45,.08,.12);tone(392,.6,.08,.12);tone(330,.75,.08,.12)}afterChange()};
H.prbath=function(){if(!PR)return;var k=PR.k;if(petSleeping(k)){prSay('Zzz… 💤');return}var p=petS(k);p.c=100;p.f=pclamp(p.f+4);prFx(['🫧','🫧','🫧','✨'],10,'bub');prAct('bath');prBars();prSay('¡Qué fresquito! ✨🛁');if(sndOn()){for(var i=0;i<5;i++)tone(700+Math.random()*500,i*.09,.07,.06)}afterChange()};
H.prsleep=function(){if(!PR)return;var k=PR.k,p=petS(k),ti=iso(today()),nm=nowMin();
if(petSleeping(k)){p.sl='';prDraw();prSay('¡Buenos días! ☀️');afterChange();return}
if(nm<20*60&&nm>=7*60){prSay('¡Aún es pronto para dormir! Vuelve por la noche 🌙');return}
p.sl=nm<7*60?iso(add(today(),-1)):ti;if(p.sn!==ti){p.f=pclamp(p.f+10);p.sn=ti}prDraw();if(sndOn()){[523,659,587,523].forEach(function(f,i){tone(f,i*.32,.3,.08)})}afterChange()};
/* rutina → energía para la mascota */
var _rt16=H.rt;H.rt=function(el,e){var k=el.dataset.k,id=el.dataset.id,wasD=isDone(k,id),was=routineStats(k).all;_rt16.apply(this,arguments);var nowD=isDone(k,id);if(nowD===wasD)return;var p=petS(k),sg=nowD?1:-1;p.h=pclamp(p.h+6*sg);p.f=pclamp(p.f+3*sg);var all=routineStats(k).all;if(!was&&all){p.h=pclamp(p.h+25);p.f=pclamp(p.f+15)}else if(was&&!all){p.h=pclamp(p.h-25);p.f=pclamp(p.f-15)}};
function petCard(k){var p=petS(k),s=petStage(k),lv=lvOf(k).lv;return '<div class="pet15-c"><button type="button" class="pet15-b" data-act="petroom" data-k="'+k+'">'+petSvg(k,130)+'</button><div class="pet15-t"><b>'+esc(petName(k))+'</b><span class="pet15-s">'+PETST[s]+'</span><span>'+petMoodTxt(k)+'</span>'+
'<div class="pet16-mini"><span>🍎<i style="width:'+p.h+'%"></i></span><span>😊<i style="width:'+p.f+'%"></i></span><span>🛁<i style="width:'+p.c+'%"></i></span></div><button type="button" class="btn sm primary" data-act="petroom" data-k="'+k+'">🏠 Entrar en su casa</button></div></div>'}
setInterval(function(){if(PR&&document.getElementById('pr16')&&!document.hidden){var el=document.getElementById('pr16'),c='pr16 on k-'+PR.k+' tod-'+prTod()+(petSleeping(PR.k)?' lights-off':'')+((petS(PR.k).eq||{}).bg?' bg-'+petS(PR.k).eq.bg:'');if(el.className!==c&&!document.querySelector('#pr17x .on'))prDraw()}},60000);
var _petok16=SH.petok;SH.petok=function(el){_petok16(el);if(PR)prDraw()};
