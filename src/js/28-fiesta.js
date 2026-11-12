/* ===== v15 · celebraciones, medallas, mascota, modo mañana, reto de hermanos, interés y cerdito ===== */
function lsG(k,d){try{var v=localStorage.getItem(k);return v===null?d:v}catch(e){return d}}
function lsS(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function cfgO(n){S.cfg=S.cfg||{};S.cfg[n]=S.cfg[n]||{};return S.cfg[n]}
function stat(k){var s=cfgO('stat');s[k]=s[k]||{rt:0,mis:0,rw:0,best:0};return s[k]}
/* ---------- sonido ---------- */
function sndOn(){return lsG('fam_snd','1')==='1'}
var ACX=null;function tone(f,t0,d,v){try{ACX=ACX||new (window.AudioContext||window.webkitAudioContext)();var o=ACX.createOscillator(),g=ACX.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(0,ACX.currentTime+t0);g.gain.linearRampToValueAtTime(v||.18,ACX.currentTime+t0+.01);g.gain.exponentialRampToValueAtTime(.001,ACX.currentTime+t0+d);o.connect(g);g.connect(ACX.destination);o.start(ACX.currentTime+t0);o.stop(ACX.currentTime+t0+d+.05)}catch(e){}}
function sfx(kind){if(!sndOn())return;if(kind==='coin'){tone(988,0,.12);tone(1319,.08,.35)}else if(kind==='tick'){tone(880,0,.08,.08)}else{tone(523,0,.18);tone(659,.12,.18);tone(784,.24,.18);tone(1047,.36,.5)}}
H.tsnd=function(){lsS('fam_snd',sndOn()?'0':'1');toast('Sonidos: '+(sndOn()?'activados 🔊':'apagados 🔇'));if(sndOn())sfx('coin')};
/* ---------- capa de celebración ---------- */
var FXQ=[],FXON=false;
function fxShow(o){FXQ.push(o);if(!FXON)fxNextShow()}
function fxNextShow(){var o=FXQ.shift();if(!o){FXON=false;return}FXON=true;var el=document.getElementById('cel15');if(!el){el=document.createElement('div');el.id='cel15';document.body.appendChild(el)}
var cf='';for(var i=0;i<36;i++){cf+='<i style="left:'+Math.round(Math.random()*100)+'%;animation-delay:'+(Math.random()*.8).toFixed(2)+'s;background:'+['#FFB800','#FF4F9A','#2F7BFF','#34C759','#7B3FF2','#FF9500'][i%6]+';transform:rotate('+Math.round(Math.random()*360)+'deg)"></i>'}
el.className='cel15 on'+(o.k?' k-'+o.k:'');el.innerHTML='<div class="cel15-cf">'+cf+'</div><div class="cel15-c"><div class="cel15-i">'+o.icon+'</div><b>'+o.title+'</b><span>'+o.sub+'</span><button type="button" class="btn primary" id="cel15-ok">¡Genial!</button></div>';
sfx(o.snd||'fan');var cl=function(){el.className='cel15';setTimeout(fxNextShow,250)};$('#cel15-ok').onclick=cl;el.onclick=function(e){if(e.target===el)cl()};clearTimeout(el._t);el._t=setTimeout(cl,o.ms||5000)}
/* rutina: contador, sonido y fiesta al completar el día */
var _rt15=H.rt;H.rt=function(el,e){var k=el.dataset.k,id=el.dataset.id,was=routineStats(k).all,wasD=isDone(k,id);_rt15.apply(this,arguments);var nowD=isDone(k,id),st=stat(k);
if(nowD!==wasD){st.rt=Math.max(0,(st.rt||0)+(nowD?1:-1));if(nowD)sfx('tick')}
if(!was&&routineStats(k).all){fxShow({k:k,icon:'<div class="pig15-drop">'+pigSvg(k,Number(S.purse[k].g)||0,true)+'</div>',title:'¡Día completo, '+esc(KIDS[k].n)+'!',sub:'+'+fm(dayAmt())+' € para tu hucha 🐷 (se cobra el lunes)',snd:'coin'});render()}};
var _ap15=H.ap;H.ap=function(el){var k=el.dataset.k,m=S.mission[k],was=m&&m.st;_ap15(el);if(m&&was!=='ok'&&m.st==='ok'){stat(k).mis++;render()}};
var _sap15=H.sap;if(_sap15)H.sap=function(el){var k=el.dataset.k;_sap15(el);stat(k).mis++};
var _rw15=H.rw;H.rw=function(el){var k=el.dataset.k,p0=S.pts[k];_rw15(el);if(S.pts[k]<p0){stat(k).rw++;render()}};
var _rqok15=H.rqok;H.rqok=function(el){var r=(S.cfg.req||[]).filter(function(x){return x.id===el.dataset.id})[0],was=r&&r.st;_rqok15(el);if(r&&was==='p'&&r.st==='ok'&&r.ty==='r'){stat(r.k).rw++;render()}};
/* ---------- medallas ---------- */
var ACH=[['r3','🔥','Racha de 3 días','3 días seguidos con la rutina completa'],['r7','⚡','Racha de 7','7 días seguidos completos'],['r14','🌟','Racha de 14','14 días seguidos completos'],
['w1','🏆','Semana perfecta','Todos los días en casa completos en una semana'],['w3','👑','Triple corona','3 semanas perfectas'],
['m1','🎯','Primera misión','Tu primera misión aprobada'],['m5','🧭','Explorador','5 misiones aprobadas'],
['p1','🎁','Primer premio','Tu primer premio canjeado'],['t50','✅','50 tareas','50 tareas de rutina marcadas'],['t200','💯','200 tareas','200 tareas de rutina marcadas'],
['h10','🐷','Hucha de 10 €','Juntar 10 € en la hucha'],['h25','💰','Hucha de 25 €','Juntar 25 € en la hucha'],['l3','⬆️','Nivel 3','Llegar al nivel 3'],['l5','🚀','Nivel 5','Llegar al nivel 5'],['c1','🤝','Equipo','Cumplir un reto de hermanos']];
function perfWeeks(k){return ((S.hist||{})[k]||[]).filter(function(x){return x.d&&x.d.some(function(v){return v>=0})&&x.d.every(function(v){return v!==0})}).length}
function achHave(k){var st=stat(k),bs=Math.max(st.best||0,streak(k)),pw=perfWeeks(k),lv=lvOf(k).lv,g=Number(S.purse[k].g)||0,co=(cfgO('coop').won||[]).length;
return {r3:bs>=3,r7:bs>=7,r14:bs>=14,w1:pw>=1,w3:pw>=3,m1:st.mis>=1,m5:st.mis>=5,p1:st.rw>=1,t50:st.rt>=50,t200:st.rt>=200,h10:g>=10,h25:g>=25,l3:lv>=3,l5:lv>=5,c1:co>=1}}
function achUnl(k){var a=cfgO('ach');a[k]=a[k]||{};return a[k]}
function achHtml(k){var u=achUnl(k),n=Object.keys(u).length;return '<div class="ach15"><h2 class="eyebrow">🏅 Medallas <span class="num">'+n+'/'+ACH.length+'</span></h2><div class="ach15-g">'+ACH.map(function(x){var on=!!u[x[0]];return '<div class="ach15-m'+(on?' on':'')+'" title="'+esc(x[3])+'"><span>'+(on?x[1]:'🔒')+'</span><b>'+esc(x[2])+'</b><small>'+esc(x[3])+'</small></div>'}).join('')+'</div></div>'}
/* ---------- mascota ---------- */
var PETST=['Huevo','Huevo a punto','Bebé','Peque','Con alas','Rey'];
function petStage(k){return Math.min(5,lvOf(k).lv-1)}
function petName(k){var p=cfgO('pet');return (p[k]&&p[k].n)||(k==='a'?CONF.pets.a:CONF.pets.e)}
/* ---------- reto de hermanos ---------- */
function coopCfg(){var c=cfgO('coop');if(!c.t)c.t='🍿 Peli en familia el sábado';if(!c.n)c.n=4;c.won=c.won||[];return c}
function coopNeed(){return Math.max(1,Math.min(coopCfg().n,homeDaysWeek()))}
function coopHtml(cls){var ks=KV();if(ks.length<2||homeDaysWeek()<1)return '';var c=coopCfg(),n=coopNeed(),wk=iso(monOf(today())),won=c.won.indexOf(wk)>=0;
return '<div class="co15 '+(cls||'')+(won?' won':'')+'"><span class="co15-i">🤝</span><div class="co15-m"><b>Reto de hermanos'+(won?' · ¡CONSEGUIDO!':'')+'</b><span>Si los dos completáis '+n+(n===1?' día':' días')+' esta semana → '+esc(c.t)+'</span></div><div class="co15-p">'+ks.map(function(k){var e=Math.min(n,earned(k));return '<span class="k-'+k+'"><i style="width:'+Math.round(e/n*100)+'%"></i><b>'+esc(KIDS[k].n)+' '+e+'/'+n+'</b></span>'}).join('')+'</div></div>'}
/* ---------- interés de papá ---------- */
function intInfo(k){var c=cfgO('int');if(!c[k])c[k]={last:iso(today())};var last=c[k].last;((S.cfg.mlog)||[]).forEach(function(x){if(x.k===k&&x.v<0&&x.d>last)last=x.d});c[k].last=last;var due=add(fromIso(last),28);return {last:last,due:due}}
function intCheck(){['a','e'].forEach(function(k){var P=S.purse[k];if(!P)return;var I=intInfo(k);if(today()<I.due)return;var amt=Math.round((Number(P.g)||0)*0.1*10)/10;cfgO('int')[k].last=iso(today());if(amt<0.1)return;
P.g=Math.round(((Number(P.g)||0)+amt)*100)/100;S.cfg.mlog=S.cfg.mlog||[];S.cfg.mlog.push({k:k,v:amt,t:'🌱 Interés de papá (+10 % por ahorrar 4 semanas)',d:iso(today())})})}
function intHtml(k){var P=S.purse[k],I=intInfo(k),g=Number(P.g)||0,amt=Math.round(g*0.1*10)/10,left=Math.max(0,dd(today(),I.due));
return '<div class="in15"><span>🌱</span><div><b>Interés de papá</b><small>'+(g>0?'Si no sacas dinero, en <b>'+left+(left===1?' día':' días')+'</b> ('+I.due.getDate()+'/'+(I.due.getMonth()+1)+') papá te añade <b>+'+fm(amt)+' €</b> (el 10 %).':'Ahorra y cada 4 semanas sin sacar dinero papá te añade un 10 % extra.')+'</small></div><i style="--p:'+Math.round((28-left)/28*100)+'%"></i></div>'}
/* ---------- cerdito ---------- */
function pigSvg(k,g,mini,nt){var full=Math.min(1,g/30),coins='',n=Math.round(full*14);for(var i=0;i<n;i++){var cx=30+(i%5)*11+(Math.floor(i/5)%2)*5,cy=96-Math.floor(i/5)*9;coins+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="7" ry="3.6" fill="#FFC83D" stroke="#C98A00" stroke-width="1.4"/>'}
return '<svg class="pig15" viewBox="0 0 140 120" aria-hidden="true"><defs><clipPath id="pc'+k+(mini?'m':'')+'"><ellipse cx="66" cy="68" rx="48" ry="38"/></clipPath><radialGradient id="pg'+k+(mini?'m':'')+'" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#FFD1E3"/><stop offset="1" stop-color="#FF8DB8"/></radialGradient></defs>'+
'<path d="M112 64 q16 -6 10 -16 q-6 -8 -10 2" fill="none" stroke="#FF8DB8" stroke-width="4" stroke-linecap="round"/>'+
'<rect x="34" y="94" width="13" height="18" rx="5" fill="#FF8DB8"/><rect x="82" y="94" width="13" height="18" rx="5" fill="#FF8DB8"/>'+
'<ellipse cx="66" cy="68" rx="48" ry="38" fill="url(#pg'+k+(mini?'m':'')+')" stroke="#E0648F" stroke-width="3"/>'+
'<g clip-path="url(#pc'+k+(mini?'m':'')+')" opacity=".9"><rect x="18" y="'+(106-full*70)+'" width="100" height="80" fill="rgba(255,255,255,.28)"/>'+coins+'</g>'+
'<path d="M40 36 L34 16 L54 30 Z" fill="#FF8DB8" stroke="#E0648F" stroke-width="3" stroke-linejoin="round"/><path d="M78 30 L92 14 L92 36 Z" fill="#FF8DB8" stroke="#E0648F" stroke-width="3" stroke-linejoin="round"/>'+
'<rect x="54" y="31" width="26" height="6" rx="3" fill="#B83A6B"/>'+
'<ellipse cx="22" cy="70" rx="13" ry="11" fill="#FFB3CF" stroke="#E0648F" stroke-width="3"/><ellipse cx="18" cy="70" rx="2.5" ry="3.5" fill="#B83A6B"/><ellipse cx="26" cy="70" rx="2.5" ry="3.5" fill="#B83A6B"/>'+
'<circle cx="42" cy="54" r="4.5" fill="#3A1F2A"/><circle cx="43.5" cy="52.5" r="1.5" fill="#fff"/>'+
(mini||nt?'':'<text x="72" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="#fff" stroke="#B83A6B" stroke-width="4" paint-order="stroke" font-family="inherit">'+fm(g)+' €</text>')+
'<g class="pig15-coin"><ellipse cx="67" cy="22" rx="9" ry="9" fill="#FFC83D" stroke="#C98A00" stroke-width="2"/><text x="67" y="26.5" text-anchor="middle" font-size="11" font-weight="900" fill="#8a5a00">€</text></g></svg>'}
/* ---------- comprobaciones periódicas: nivel, medallas, reto ---------- */
function fxCheck(){if(!S||!S.cfg||document.hidden||rev<0)return;var init=lsG('fam_fx_init','')!=='1',ch=false;
KV().forEach(function(k){var st=stat(k),s=streak(k);if(s>(st.best||0)){st.best=s;ch=true}
var have=achHave(k),u=achUnl(k);ACH.forEach(function(x){if(have[x[0]]&&!u[x[0]]){u[x[0]]=iso(today());ch=true}});
var lv=lvOf(k).lv,sl=Number(lsG('fam_lv_'+k,'0'));if(init||!sl){lsS('fam_lv_'+k,String(lv))}else if(lv>sl){lsS('fam_lv_'+k,String(lv));var ps=petStage(k);fxShow({k:k,icon:'<span class="cel15-lv">'+lv+'</span>',title:'¡'+esc(KIDS[k].n)+' sube a NIVEL '+lv+'!',sub:lv-1<=5?esc(petName(k))+' ha evolucionado: '+PETST[ps]+' ✨':'¡Sigue así!'})}
var seen=(lsG('fam_ach_'+k,'')||'').split(',');Object.keys(u).forEach(function(id){if(seen.indexOf(id)>=0)return;seen.push(id);if(!init){var a=ACH.filter(function(x){return x[0]===id})[0];if(a)fxShow({k:k,icon:a[1],title:'¡Nueva medalla para '+esc(KIDS[k].n)+'!',sub:'<b>'+esc(a[2])+'</b> · '+esc(a[3])})}});lsS('fam_ach_'+k,seen.join(','))});
if(KV().length>=2){var c=coopCfg(),wk=iso(monOf(today())),n=coopNeed();if(homeDaysWeek()>0&&KV().every(function(k){return earned(k)>=n})&&c.won.indexOf(wk)<0){c.won.push(wk);if(c.won.length>30)c.won.shift();ch=true}
if(c.won.indexOf(wk)>=0&&lsG('fam_coop','')!==wk){lsS('fam_coop',wk);if(!init)fxShow({icon:'🤝',title:'¡Reto de hermanos conseguido!',sub:esc(c.t)+' 🎉'})}}
if(init)lsS('fam_fx_init','1');if(ch){afterChange();renderBanco()}}
setInterval(fxCheck,5000);
/* ---------- modo mañana (tablet) ---------- */
var MM={a:'07:15',b:'08:20'},MMOFF=0;
function mmActive(){if(PH()||S.view!=='home')return false;var t=today();if(!schoolDay(t)||!atHome(t))return false;var nm=nowMin();if(nm<mins(MM.a)||nm>=mins(MM.b))return false;if(Date.now()<MMOFF)return false;
return KV().some(function(k){return activeR(k,t).some(function(x){return x.g==='m'&&!isDone(k,x.id)})})}
function mmRender(){var el=document.getElementById('mm15');if(!mmActive()){if(el)el.className='';return}if(!el){el=document.createElement('div');el.id='mm15';document.body.appendChild(el)}
var t=today(),left=mins(MM.b)-nowMin();
el.className='on';el.innerHTML='<div class="mm15-h"><b>🌅 ¡Buenos días!</b><span class="mm15-t">Salimos en <em class="num">'+left+'</em> min</span><button type="button" class="btn" data-act="mmoff">Ver panel</button></div><div class="mm15-g">'+KV().map(function(k){var L=activeR(k,t).filter(function(x){return x.g==='m'}),p=L.filter(function(x){return !isDone(k,x.id)}),x=p[0];
return '<div class="mm15-k k-'+k+'"><div class="mm15-n">'+avImg(k,54)+'<b>'+esc(KIDS[k].n)+'</b><span class="num">'+(L.length-p.length)+'/'+L.length+'</span></div>'+(x?'<button type="button" class="mm15-task" data-act="rt" data-k="'+k+'" data-id="'+x.id+'"><span class="mm15-e">'+emoTile(x.t)+'</span><b>'+esc(noEmo(x.t))+'</b><span class="mm15-ok">Tocar cuando esté hecho ✓</span></button>'+(p.length>1?'<div class="mm15-next">Después: '+p.slice(1,3).map(function(y){return emoTile(y.t)+' '+esc(noEmo(y.t))}).join(' · ')+'</div>':''):'<div class="mm15-done">✅ ¡Listo para salir!</div>')+'</div>'}).join('')+'</div>'}
H.mmoff=function(){MMOFF=Date.now()+10*60000;mmRender()};
setInterval(mmRender,20000);
