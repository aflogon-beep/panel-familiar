/* ===== v7 · panel hibrido: cabecera en una linea, HOY con avisos, compra rapida ===== */
function dHeadHtml(){
var t=today(),n=new Date(),a=alertsList(),bad=a.filter(function(x){return x.c==='bad'}).length,nb=unreadBuz();
var st=a.length?'<button type="button" class="h7-st'+(bad?' bad':'')+'" data-act="alerts">'+(bad?'⚠️':'🔔')+' '+a.length+'<span class="h7-stl">'+(a.length===1?' aviso':' avisos')+'</span></button>':'<span class="h7-st ok">✓ Todo en orden</span>';
return '<div class="h7-date"><b>'+cap(DOW[dow(t)])+'</b><span>'+t.getDate()+' de '+MONTH[t.getMonth()]+'</span></div>'+
'<div class="d-clk" aria-hidden="true"><b class="num">'+pad(n.getHours())+':'+pad(n.getMinutes())+'</b></div>'+
'<div class="d-wx" id="dWx">'+dWxHtml()+'</div><span class="h7-sp"></span><span id="dBat">'+batHtml()+'</span>'+st+
'<div class="h7-tools"><button type="button" class="tb'+(FLT!=='all'?' on':'')+'" data-act="flt" aria-label="Ver: '+esc(fltName())+'"><span aria-hidden="true">👀</span>'+(FLT!=='all'?'<b>'+esc(fltName())+'</b>':'')+'</button>'+
'<button type="button" class="tb" data-act="buz" aria-label="Buzón'+(nb?', '+nb+' nuevos':'')+'"><span aria-hidden="true">📮</span>'+(nb?'<i class="bzn">'+nb+'</i>':'')+'</button>'+
'<button type="button" class="tb" data-act="more" aria-label="Más opciones">'+ic('more')+'</button>'+
'<button type="button" class="tb primary adult-only kid-ok" data-act="add" aria-label="Añadir">'+ic('plus','sm')+'<b>Añadir</b></button></div>'}
function h6Side(){
var a=alertsList();
var rows=a.map(function(x){var at=x.a?' data-act="'+x.a+'"'+(x.v?' data-v="'+x.v+'"':'')+' role="button" tabindex="0"':'';return '<span class="fi al h7-a '+x.c+'"'+at+'>'+x.h+'</span>'}).join('');
return momHtml()+'<div class="h6-st">Avisos de hoy</div><div class="fitbox h6-il">'+(rows||'<div class="h6-none">✓ Todo en orden por hoy</div>')+'</div>'}
function dMenuHtml(){
var t=today(),tI=iso(t),tom=iso(add(t,1)),m=S.menu[tI]||{},m2=S.menu[tom]||{};
var meal=function(slot,lab,icn){var v=m[slot];return '<button type="button" class="fi dm'+(v?'':' empty')+'" data-act="'+(v?'nav':'me')+'" data-v="menu" data-d="'+tI+'" data-s="'+slot+'"><span class="mi">'+ic(icn,'sm')+'</span><span><small>'+lab+'</small><b>'+(v?esc(v):'+ Añadir')+'</b></span></button>'};
var tm=[m2.c,m2.d].filter(Boolean);
return dcHead('menu','Comida','','menu')+'<div class="dc-b">'+meal('c','Comida','sol')+meal('d','Cena','luna')+'</div>'+(tm.length?'<div class="dc-f"><b>Mañana</b><span>'+esc(tm.join(' · '))+'</span></div>':'')}
function dCmpHtml(){
var buy=S.list.filter(function(x){return !x.done});
var rows=buy.map(function(x){return '<button type="button" class="fi c7-r" data-act="li" data-id="'+x.id+'"><span class="c7-cb"></span><b>'+esc(x.n)+'</b>'+(x.q>1?'<small class="num">×'+x.q+'</small>':'')+'</button>'}).join('');
return dcHead('compra','Compra','<span class="chip num">'+buy.length+'</span>','compra')+
'<form class="c7-f adult-only kid-ok" id="dqForm" autocomplete="off"><input id="dq-in" placeholder="Añadir…" enterkeyhint="done" aria-label="Añadir a la compra"><button class="btn primary sm" type="submit" aria-label="Añadir">'+ic('plus','sm')+'</button></form>'+
'<div class="dc-b fitbox c7-l">'+(rows||'<div class="h6-none">No falta nada 🎉</div>')+'</div>'}
function renderDash(){
if(!$('#dash'))return;
put($('#dHead'),dHeadHtml());
var c=$('#dCmp'),keep=null;if(c){var i0=$('#dq-in',c);if(i0&&document.activeElement===i0)keep=i0.value}
put($('#dHoy'),dHoyHtml());put($('#dSem'),dSemHtml());put($('#dMenu'),dMenuHtml());
put($('#dTk'),dTkHtml());put($('#dCasa'),dCasaHtml());put($('#dKids'),dKidsHtml());
if(c&&keep===null)put(c,dCmpHtml());else if(c){var L=$('.c7-l',c),tmp=document.createElement('div');tmp.innerHTML=dCmpHtml();var nl=$('.c7-l',tmp);if(L&&nl)L.innerHTML=nl.innerHTML}
awayMark();if(!FITQ){FITQ=1;requestAnimationFrame(function(){FITQ=0;fitDash();gkFit()})}}
document.addEventListener('submit',function(e){var f=e.target;if(!f||f.id!=='dqForm')return;e.preventDefault();if(guard())return;var i=$('#dq-in'),q=(i.value||'').trim();if(!q)return;var ad=addMany(q);toast('Añadido: '+ad.join(', '));i.value='';render();setTimeout(function(){var j=$('#dq-in');if(j)j.focus()},40)});
function isOff(d){return allDay(iso(d)).some(function(a){return a.k==='h'||a.k==='v'})}
function horPick(){var t=today(),n=nowMin();if(dow(t)<5&&n<14*60&&!isOff(t))return {d:t,l:'hoy'};var d=add(t,1),i=0;while((dow(d)>=5||isOff(d))&&i<30){d=add(d,1);i++}return {d:d,l:dd(t,d)===1?'mañana':DOW[dow(d)]}}
function horDay(k,d){return ((S.hor||{})[k]||{})[dow(d)]||[]}
function horBring(L){var o=[],s={};L.forEach(function(x){(x.b||'').split(',').forEach(function(p){p=p.trim();if(p&&!s[norm(p)]){s[norm(p)]=1;o.push(p)}})});return o}
function horTxt(k){var p=horPick(),L=horDay(k,p.d);if(!L.length)return null;return {l:p.l,s:L.map(function(x){return x.t}).join(' · '),b:horBring(L)}}
function horStrip(k){var x=horTxt(k);if(!x){var any=S.hor&&S.hor[k]&&Object.keys(S.hor[k]).length;return any?'':'<button class="hor adult-only" data-act="aj" data-t="hor">🎒 Añade el horario del cole…</button>'}return '<button class="hor" data-act="hor" data-k="'+k+'">🎒 <b>'+cap(x.l)+'</b>: '+esc(x.s)+(x.b.length?'<small>Llevar: '+esc(x.b.join(', '))+'</small>':'')+'</button>'}
function openHor(k){var t=today(),h='<h3>🎒 Horario de '+esc(KIDS[k].n)+'</h3><div class="horg">';for(var i=0;i<5;i++){var L=((S.hor||{})[k]||{})[i]||[];h+='<div class="hord'+(dow(t)===i?' t':'')+'"><h4>'+cap(DOW[i])+'</h4>'+(L.length?L.map(function(x){return '<div>'+esc(x.t)+(x.b?'<br><small>'+esc(x.b)+'</small>':'')+'</div>'}).join(''):'<small>Sin apuntar</small>')+'</div>'}h+='</div><div class="acts">'+(S.kid?'':'<button class="btn ghost" data-sh="horedit" data-k="'+k+'">Editar</button>')+'<button class="btn primary" data-sh="close">Cerrar</button></div>';openSheet(h)}
var toAd=function(to){return to==='all'||!!ADU[to]};
var bzTo=function(x){return x.to||'adults'};
var bzVis=function(x){var to=bzTo(x);if(FLT==='all')return true;if(FLT==='ad')return !!ADU[x.w]||!!ADU[to]||to==='all';if(FLT==='al'||FLT==='ju')return x.w===FLT||to===FLT||x.w==='adults'||to==='adults'||to==='all';return x.w===FLT||to===FLT||to==='all'};
var bzN=function(w){return w==='adults'?'Adultos':w==='all'?'Todos':WHO[w]};
function unreadBuz(){return (S.buz||[]).filter(function(x){var to=bzTo(x);return !x.done&&bzVis(x)&&(S.kid?(to==='a'||to==='e'||to==='all'):(toAd(to)&&x.w!==BZ.aw))}).length}
function renderFlt(){['rutina','cal','tareas','banco'].forEach(function(v){var vh=$('#v-'+v+' .vhead');if(!vh)return;var b=$('.fltb',vh);if(!b){b=document.createElement('button');b.className='chip fltb';b.dataset.act='flt';vh.appendChild(b)}b.textContent='👀 Ver: '+fltName();b.classList.toggle('on',FLT!=='all')})}
function openFlt(){var o=[['all','Todos','Todo lo de la familia'],['a',KIDS.a.n,'Lo suyo y lo de todos'],['e',KIDS.e.n,'Lo suyo y lo de todos'],['al',WHO.al,'Lo suyo, lo de adultos y de todos'],['ju',WHO.ju,'Lo suyo, lo de adultos y de todos'],['ad',WHO.al+' y '+WHO.ju,'Solo cosas de adultos y de todos']];openSheet('<h3>👀 Qué quieres ver</h3><p class="muted ajn">Afecta a agenda, tareas, exámenes, notas, avisos, rutina y paguita. Solo en este dispositivo.</p><div class="fltl">'+o.map(function(x){return '<button type="button" data-sh="fltset" data-v="'+x[0]+'" class="'+(FLT===x[0]?'on':'')+'">'+avImg(x[0],30)+esc(x[1])+'<small style="display:block;font-weight:700;opacity:.75;font-size:13px">'+x[2]+'</small></button>'}).join('')+'</div><div class="acts"><button class="btn primary" data-sh="close">Cerrar</button></div>')}
var BZ={w:'a',t:'',to:'adults',ato:'all',aw:'al'};try{BZ.aw=localStorage.getItem('fam_me')==='ju'?'ju':'al'}catch(e){}
var BZQ=['Necesito material para el cole','Se ha acabado…','Quiero hablar contigo','Tengo un examen','Necesito dinero para una excursión','No me encuentro bien','¿Podemos hacer un plan?'];
function openBuz(){
var L=(S.buz||[]).slice().reverse(),h,kid=S.kid;
var sg=function(sh,opts,sel){return '<div class="seg">'+opts.map(function(o){return '<button type="button" data-sh="'+sh+'" data-v="'+o[0]+'" class="'+(sel===o[0]?'on':'')+'">'+avImg(o[0],22)+' '+esc(o[1])+'</button>'}).join('')+'</div>'};
var msg=function(x,btn){return '<div class="bzm'+(x.done?' done':'')+'"><span class="tx"><small class="muted" style="display:block">'+avImg(x.w,20)+' '+esc(bzN(x.w))+' → Para '+avImg(bzTo(x),20)+' '+esc(bzN(bzTo(x)))+' · '+dl(fromIso(x.d))+'</small>'+esc(x.t)+'</span>'+btn+'</div>'};
var okb=function(x){return '<button class="btn sm primary" data-sh="bzok" data-id="'+x.id+'">Visto ✓</button>'};
var st=function(x){return '<span class="chip'+(x.done?' ok':'')+'">'+(x.done?'Visto ✓':'Enviado')+'</span>'};
if(kid){
var o=BZ.w==='a'?'e':'a';if(BZ.to===BZ.w)BZ.to='adults';
var inbox=L.filter(function(x){var to=bzTo(x);return !x.done&&(to===BZ.w||(to==='all'&&x.w!==BZ.w))}),mine=L.filter(function(x){return x.w===BZ.w}).slice(0,3);
h='<h3>📮 Buzón</h3>'+(inbox.length?'<h2 class="eyebrow">Mensajes para '+esc(KIDS[BZ.w].n)+'</h2>'+inbox.map(function(x){return msg(x,okb(x))}).join(''):'')+'<div class="fld">¿Quién escribe?'+sg('bzwho',[['a',KIDS.a.n],['e',KIDS.e.n]],BZ.w)+'</div><div class="fld">¿Para quién es?'+sg('bzto',[['adults',WHO.al+' y '+WHO.ju],['al',WHO.al],['ju',WHO.ju],[o,KIDS[o].n],['all','Todos']],BZ.to)+'</div><div class="mschips">'+BZQ.map(function(q,i){return '<button type="button" class="msc" data-sh="bzpick" data-i="'+i+'">'+esc(q)+'</button>'}).join('')+'</div><label class="fld">Tu mensaje<input id="bz-in" value="'+esc(BZ.t)+'" autocomplete="off" placeholder="Escribe aquí…"></label>'+(mine.length?'<h2 class="eyebrow" style="margin-top:10px">Tus últimos mensajes</h2>'+mine.map(function(x){return msg(x,st(x))}).join(''):'')+'<div class="acts"><button class="btn ghost" data-sh="close">Cerrar</button><button class="btn primary" data-sh="bzsend">Enviar 📮</button></div>';
}else{
var me=BZ.aw,pa=me==='al'?'ju':'al';if(BZ.ato===me)BZ.ato='all';
var inb=L.filter(function(x){return !x.done&&toAd(bzTo(x))&&x.w!==me&&bzVis(x)}),sent=L.filter(function(x){return x.w===me&&bzVis(x)}).slice(0,4),seen=L.filter(function(x){return x.done&&toAd(bzTo(x))&&x.w!==me&&bzVis(x)}).slice(0,5);
h='<h3>📮 Buzón</h3><div class="fld">¿Quién eres?'+sg('bzaw',[['al',WHO.al],['ju',WHO.ju]],me)+'</div><div class="fld">Dejar un mensaje a…'+sg('bzato',[['a',KIDS.a.n],['e',KIDS.e.n],[pa,WHO[pa]],['all','Todos']],BZ.ato)+'</div><label class="fld">Mensaje<input id="bz-in" value="'+esc(BZ.t)+'" autocomplete="off" placeholder="Escribe aquí…"></label><button type="button" class="btn sm primary" data-sh="bzsend">Enviar 📮</button><h2 class="eyebrow" style="margin-top:14px">Para ti</h2>'+(inb.length?inb.map(function(x){return msg(x,okb(x))}).join(''):'<div class="empty">No hay mensajes nuevos</div>')+(sent.length?'<h2 class="eyebrow" style="margin-top:12px">Enviados por ti</h2>'+sent.map(function(x){return msg(x,st(x)+'<button class="ib" data-sh="bzdel" data-id="'+x.id+'" aria-label="Borrar">✕</button>')}).join(''):'')+(seen.length?'<h2 class="eyebrow" style="margin-top:12px">Vistos</h2>'+seen.map(function(x){return msg(x,'<button class="ib" data-sh="bzdel" data-id="'+x.id+'" aria-label="Borrar">✕</button>')}).join(''):'')+'<div class="acts"><button class="btn primary" data-sh="close">Cerrar</button></div>';
}
openSheet(h);if(kid&&document.activeElement&&document.activeElement.blur)document.activeElement.blur()}
var AB=null,ABL=false;
function abLoad(){if(ABL)return;ABL=true;fetch('/api/backups',{headers:{'X-Family-Key':KEY}}).then(function(r){return r.json()}).then(function(j){AB=j.items||[];ABL=false;if(AJ&&AJ.tab==='gen'&&!scrim.hidden){ajCollect();ajOpen()}}).catch(function(){ABL=false;AB=[]})}
function abHtml(){if(AB===null)abLoad();var h='<div class="ajc"><h4>🛟 Copias automáticas</h4><p class="muted ajn">Cada noche el panel guarda una copia en el servidor (las últimas 14). Si algo se rompe, restaura una aquí.</p>';if(AB===null)h+='<p class="muted ajn">Cargando…</p>';else if(!AB.length)h+='<p class="muted ajn">Todavía no hay copias.</p>';else h+=AB.map(function(b){var d=new Date(b.ts);return '<div class="ajr"><span style="flex:1;font-weight:700">'+dl(d)+' · '+pad(d.getHours())+':'+pad(d.getMinutes())+'</span><button type="button" class="btn sm" data-sh="abrest" data-id="'+b.id+'">Restaurar</button></div>'}).join('');return h+'<button type="button" class="btn sm" data-sh="abnow">Hacer copia ahora</button></div>'}
function secHtml(){return '<div class="ajc"><h4>🔐 Seguridad</h4><p class="muted ajn">Cambia la contraseña del panel (mínimo 12 caracteres; mejor una frase larga). Al cambiarla, los demás dispositivos pedirán la nueva.</p><label class="fld ajf">Nueva contraseña<input id="sec-p1" type="password" autocomplete="new-password"></label><label class="fld ajf">Repítela<input id="sec-p2" type="password" autocomplete="new-password"></label><button type="button" class="btn sm primary" data-sh="pwgo">Cambiar contraseña</button><p class="muted ajn" style="margin-top:12px">Si pierdes un dispositivo, cierra la sesión en todos (se pedirá la contraseña en cada uno).</p><div class="row"><button type="button" class="btn sm" data-sh="lgall">Cerrar sesión en todos</button><button type="button" class="btn sm" data-sh="lgone">Cerrar sesión aquí</button></div></div>'}
function secPost(path,body,okMsg){fetch(path,{method:'POST',headers:{'X-Family-Key':KEY,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined}).then(function(r){return r.json().then(function(j){return {s:r.status,j:j}})}).then(function(x){if(x.s===200&&x.j.token){KEY=x.j.token;try{localStorage.setItem('fam_key',KEY)}catch(e){}toast(okMsg)}else if(x.j&&x.j.error==='nopass')toast('Primero cambia la contraseña');else if(x.j&&x.j.error==='short')toast('Mínimo 12 caracteres');else toast('No se pudo')}).catch(function(){toast('Sin conexión')})}
function hList(){AJ.ho[AJ.hk]=AJ.ho[AJ.hk]||{};return AJ.ho[AJ.hk][AJ.hd]=AJ.ho[AJ.hk][AJ.hd]||[]}
var FXN=['confeti','fuegos','estrellas','cohete','globos','corazones','arcoiris','trofeo','unicornio','baile'],FXB=[],FXL='';
var FXP=['¡Genial','¡Bien hecho','¡Eso es','¡Imparable','¡Así se hace','¡Lo bordas','¡Qué máquina','¡Súper','¡Brutal','¡Otra más'];
var fxr=function(a,b){return a+Math.random()*(b-a)};
function fxNext(){if(!FXB.length){FXB=FXN.slice().sort(function(){return Math.random()-.5});if(FXB[FXB.length-1]===FXL)FXB.unshift(FXB.pop())}FXL=FXB.pop();return FXL}
function fxHtml(n,x,y,W,Hh){
var COL=['#ff3b30','#ff9500','#ffcc00','#34c759','#00c7be','#007aff','#af52de','#ff2d92'],h='',i,j;
var em=function(ch,st){return '<div class="fxe" style="'+st+'">'+ch+'</div>'};
if(n==='confeti'){for(i=0;i<46;i++)h+='<i class="fxp" style="left:'+x+'px;top:'+y+'px;--dx:'+fxr(-320,320)+'px;--dy:'+fxr(-380,260)+'px;--r:'+fxr(-720,720)+'deg;--t:'+fxr(1.1,1.9)+'s;background:'+COL[i%8]+'"></i>'}
else if(n==='fuegos'){for(j=0;j<3;j++){var cx=fxr(W*.2,W*.8),cy=fxr(Hh*.15,Hh*.5),c=COL[Math.floor(fxr(0,8))];for(i=0;i<22;i++){var a=i/22*6.283,r=fxr(80,170);h+='<i class="fxp" style="left:'+cx+'px;top:'+cy+'px;width:8px;height:8px;border-radius:50%;--dx:'+Math.cos(a)*r+'px;--dy:'+Math.sin(a)*r+'px;--r:0deg;--t:1.2s;--d:'+j*.35+'s;background:'+c+'"></i>'}}}
else if(n==='estrellas'){var S=['⭐','✨','🌟'];for(i=0;i<22;i++)h+=em(S[i%3],'left:'+fxr(2,96)+'%;--s:'+fxr(26,48)+'px;--t:'+fxr(2.2,3.2)+'s;--d:'+fxr(0,.8)+'s')}
else if(n==='cohete'){h+=em('🚀','left:-6vw;top:100%;--s:70px;--a:fxr;--t:1.7s');for(i=0;i<8;i++)h+=em('✨','left:'+fxr(10,80)+'%;top:'+fxr(10,70)+'%;--s:30px;--a:fxs2;--t:1.6s;--d:'+fxr(.3,1)+'s')}
else if(n==='globos'){for(i=0;i<14;i++)h+=em('🎈','left:'+fxr(2,92)+'%;top:100%;--s:'+fxr(40,64)+'px;--a:fxu;--dx:'+fxr(-40,40)+'px;--t:'+fxr(2.6,3.4)+'s;--d:'+fxr(0,.7)+'s')}
else if(n==='corazones'){var Hs=['💖','💙','💜','💚','🧡'];for(i=0;i<16;i++)h+=em(Hs[i%5],'left:'+x+'px;top:'+y+'px;--s:'+fxr(26,44)+'px;--a:fxh;--dx:'+fxr(-220,220)+'px;--dy:'+fxr(-380,-120)+'px;--t:'+fxr(1.4,2.2)+'s')}
else if(n==='arcoiris')h+=em('🌈','left:50%;top:48%;--s:48vmin;--a:fxc;--t:2.4s');
else if(n==='trofeo'){h+=em('🏆','left:50%;top:50%;--s:36vmin;--a:fxc;--t:2.4s');for(i=0;i<20;i++)h+='<i class="fxp" style="left:50%;top:50%;--dx:'+fxr(-380,380)+'px;--dy:'+fxr(-320,300)+'px;--r:'+fxr(-540,540)+'deg;--t:'+fxr(1.2,2)+'s;--d:.3s;background:'+COL[i%8]+'"></i>'}
else if(n==='unicornio')h+=em('🦄','left:-14vw;top:52%;--s:90px;--a:fxs;--t:2.3s')+em('✨','left:-10vw;top:46%;--s:40px;--a:fxs;--t:2.3s;--d:.12s')+em('🌈','left:-22vw;top:55%;--s:60px;--a:fxs;--t:2.3s;--d:-.1s');
else{h+=em('💃','left:30%;top:0;--s:84px;--a:fxd;--t:2.6s')+em('🕺','left:62%;top:0;--s:84px;--a:fxd;--t:2.6s;--d:.2s');for(i=0;i<10;i++)h+=em('🎶','left:'+fxr(10,90)+'%;top:'+fxr(40,90)+'%;--s:32px;--a:fxh;--dx:'+fxr(-60,60)+'px;--dy:-160px;--t:1.6s;--d:'+fxr(.2,1.2)+'s')}
return h}
function celebrate(k,e,big){
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var W=window.innerWidth,Hh=window.innerHeight,x=e&&e.clientX?e.clientX:W/2,y=e&&e.clientY?e.clientY:Hh/2;
var root=$('#fx');if(!root){root=document.createElement('div');root.id='fx';document.body.appendChild(root)}
var w=document.createElement('div');w.className='fxw';
var h=fxHtml(fxNext(),x,y,W,Hh);if(big)h+=fxHtml(fxNext(),x,y,W,Hh);
var nm=(KIDS[k]||{}).n||'';
h+='<div class="fxt">'+(big?'¡Día completo, '+esc(nm)+'! 🎉':FXP[Math.floor(Math.random()*FXP.length)]+', '+esc(nm)+'!')+'</div>';
w.innerHTML=h;root.appendChild(w);setTimeout(function(){w.remove()},3600)}
function openWkAll(keep){
var y=keep?sheet.scrollTop:0,sat=satOf(today()),end=new Date(2028,11,31),h='<h3>Fines de semana hasta 2028</h3><p class="muted ajn">Toca un fin de semana para cambiarlo entre «con peques» y «sin peques». Los demás siguen alternándose solos; lo que cambies queda como excepción.</p>',cm=-1,n1=0,n0=0;
while(sat<=end){var st=wkSt(sat),mk=sat.getFullYear()*12+sat.getMonth();if(mk!==cm){if(cm!==-1)h+='</div>';h+='<h4 class="wkh">'+cap(MONTH[sat.getMonth()])+' '+sat.getFullYear()+'</h4><div class="wkall">';cm=mk}
h+='<button type="button" class="wkchip '+st+'" data-sh="wkt" data-wk="'+iso(sat)+'"><span>'+rangeLabel(sat)+'</span><small>'+(st==='us'?'Con peques 🎉🥳😄':'Sin peques 😢')+'</small></button>';if(st==='us')n1++;else n0++;sat=add(sat,7)}
h+='</div><div class="acts"><button class="btn primary" data-sh="close">Listo</button></div>';
openSheet(h.replace('</p>','</p><p class="muted ajn"><b>'+n1+'</b> con peques · <b>'+n0+'</b> sin peques</p>'));sheet.scrollTop=y}
function renderRutina(){
var t=today();$('#rutDate').textContent=cap(DOW[dow(t)])+' '+t.getDate()+' de '+MONTH[t.getMonth()];
var h='';
KV().forEach(function(k){
var rs=routineStats(k),m=S.mission[k];
if(!atHome(t)){var nh=nextHome();h+='<div class="rp k-'+k+'"><div class="rp-h">'+avImg(k,52)+'<h2>'+KIDS[k].n+'</h2></div><div class="rp-list">'+histBtns(k)+'<div class="empty">Hoy no toca rutina'+(nh?' · próximo día: '+nh:'')+'<br><small>Hoy no cuenta para la paguita</small></div></div></div>';return}
h+='<div class="rp k-'+k+'"><div class="rp-h">'+avImg(k,52)+'<div class="rp-n"><h2>'+KIDS[k].n+'</h2>'+paySub(k,rs)+'</div><span class="sp"></span>'+ptsChip(k)+'<div class="rwrap">'+ring(rs.p,64)+'<div class="c num">'+rs.d+'/'+rs.t+'</div></div></div><div class="rp-list">'+horStrip(k)+wxHintK(k)+notesHtml(k);
var items=activeR(k,t),grp=items.some(function(x){return x.g});
[['m','🌅 Mañana'],['t','🌙 Tarde y noche'],['','Todo el día']].forEach(function(G){var LL=items.filter(function(x){return (x.g||'')===G[0]});if(!LL.length)return;if(grp)h+='<div class="rg">'+G[1]+'</div>';LL.forEach(function(x){h+='<button class="chk w-'+k+(isDone(k,x.id)?' done':'')+'" data-act="rt" data-k="'+k+'" data-id="'+x.id+'"><span class="em14">'+emoTile(x.t,'✨')+'</span><span class="tx">'+esc(noEmo(x.t))+'</span><span class="cb">'+ic('check')+'</span></button>'})});
var cls=m.st==='ok'?' ok':m.st==='pending'?' pending':'';
h+=casaKid(k);h+='<button class="chk mis'+cls+(m.sp?' spm':'')+'" data-act="mis" data-k="'+k+'"><span class="cb">'+ic('check')+'</span><span class="tx"><small>'+(m.sp?'🏆 Misión especial':'🎲 Misión sorpresa')+' de la semana · +'+m.pts+' puntos</small>'+esc(m.t)+'</span>'+(m.st==='pending'?'<span class="chip warn">Esperando OK</span>':m.st==='ok'?'<span class="chip ok">¡Hecha! Nueva el lunes</span>':'')+'</button>'+histBtns(k)+'</div>';
if(rs.all)h+='<div class="donebar">'+ic('check')+'¡Día completo! +'+fm(dayAmt())+' € para la paguita</div>';
h+='</div>';
});
if(!KV().length)h='<div class="card"><div class="empty">Vista de adultos: las rutinas son de los peques</div></div>';put($('#rut'),h);
}
var CAL={HH:44,H0:8,H1:22};
function updateNowLine(){
var l=$('#nowLine');if(!l)return;
var m=nowMin()-CAL.H0*60;
if(m<0||m>(CAL.H1-CAL.H0)*60){l.style.display='none';return}
l.style.display='block';l.style.top=(m*CAL.HH/60)+'px';
}
function calLay(L,HH){
var vm=Math.round(44*60/HH),it=L.map(function(e){var s=mins(e.s),en=mins(e.e);return {e:e,s:s,v:Math.max(en,s+vm)}}).sort(function(p,q){return p.s-q.s||q.v-p.v});
var out=[],cols=[],cl=[],ce=-1;
var flush=function(){cl.forEach(function(x){x.n=cols.length});out=out.concat(cl);cl=[];cols=[]};
it.forEach(function(x){
if(cl.length&&x.s>=ce)flush();
var c=0;while(cols[c]!==undefined&&cols[c]>x.s)c++;
cols[c]=x.v;x.c=c;cl.push(x);ce=Math.max(ce,x.v)});
flush();return out}
function renderCal(){
var sc=$('#calScroll'),y=sc.scrollTop;
var mon=add(monOf(today()),7*S.calOff),tI=iso(today()),sun=add(mon,6);
$('#calRange').textContent=mon.getDate()+' '+MONS[mon.getMonth()]+' – '+sun.getDate()+' '+MONS[sun.getMonth()];
var HH=CAL.HH,H0=8,H1=22,i,d,k,oldH0=CAL.H0,wev=[];
for(i=0;i<7;i++)wev.push(eventsOn(iso(add(mon,i))));
wev.forEach(function(L){L.forEach(function(e){var s0=mins(e.s),e0=Math.max(mins(e.e),s0+60);H0=Math.min(H0,Math.floor(s0/60));H1=Math.max(H1,Math.ceil(e0/60))})});
H0=Math.max(0,H0);H1=Math.min(24,Math.max(H1,H0+6));CAL.H0=H0;CAL.H1=H1;y+=(oldH0-H0)*HH;
var top='<div class="cal-top"><div class="cal-row"><div></div>';
for(i=0;i<7;i++){
d=add(mon,i);var isT=iso(d)===tI,chipH;
if(i>=5){var sat=satOf(d),st=wkSt(sat);chipH='<button class="wkc '+st+'" data-act="wk" data-wk="'+iso(sat)+'">'+(st==='us'?'Con peques 🎉🥳😄':'Sin peques 😢')+'</button>'}
else chipH='<span class="wkc" style="visibility:hidden">·</span>';
top+='<div class="hd-c'+(isT?' today':'')+'"><span class="dw">'+DOWS[i]+'</span><span class="dn num">'+d.getDate()+'</span>'+chipH+'</div>';
}
top+='</div><div class="cal-row ad"><div class="ad-l">Todo el día</div>';
for(i=0;i<7;i++){k=iso(add(mon,i));top+='<div class="ad-c">'+allDay(k).map(function(a){return '<span class="chip ad-'+a.k+'" title="'+esc(a.t)+'"><span style="overflow:hidden;text-overflow:ellipsis">'+a.i+' '+esc(a.t)+'</span></span>'}).join('')+S.exams.filter(function(x){return x.date===k&&vis(x.w)}).map(function(x){return '<span class="chip warn" title="Examen de '+esc(x.t)+' ('+WHO[x.w]+')"><i class="dot k-'+x.w+'"></i><span style="overflow:hidden;text-overflow:ellipsis">📝 '+esc(x.t)+' · '+WHO[x.w]+'</span></span>'}).join('')+'</div>'}
top+='</div></div>';
var body='<div class="cal-body" style="--hh:'+HH+'px;height:'+((H1-H0)*HH)+'px"><div class="hcol">';
for(var h=H0;h<H1;h++)body+='<div class="hl" style="top:'+((h-H0)*HH)+'px">'+pad(h)+':00</div>';
body+='</div>';
for(i=0;i<7;i++){
d=add(mon,i);k=iso(d);
body+='<div class="day-col'+(i>=5?' '+wkSt(satOf(d)):'')+'">';
calLay(wev[i],HH).forEach(function(x){
var e=x.e,a=mins(e.s)-H0*60,b=mins(e.e)-H0*60,n=x.n,c=x.c;
body+='<button class="cev w-'+e.w+(n>2?' nar':'')+'" style="top:'+(a*HH/60)+'px;height:'+Math.max(44,(b-a)*HH/60-3)+'px'+(n>1?';left:calc('+(c*100/n)+'% + 3px);right:auto;width:calc('+(100/n)+'% - 6px)':'')+'" data-act="ev" data-id="'+e.id+'" data-d="'+e.date+'"><span class="n">'+evIcon(e.t)+' '+esc(e.t)+'</span><small class="num">'+e.s+'–'+e.e+' · '+WHO[e.w]+'</small></button>';
});
if(k===tI)body+='<div class="now-line" id="nowLine"></div>';
body+='</div>';
}
body+='</div>';
sc.innerHTML='<div class="cal-inner">'+top+body+'</div>';
sc.scrollTop=y;updateNowLine();renderAgl();
}
function renderTareas(){
var t=today();
var open=S.tasks.filter(function(x){return !x.done&&vis(x.w)}).map(function(x){return {x:x,n:dd(t,fromIso(x.due))}}).sort(function(a,b){return a.n-b.n});
var soon=open.filter(function(o){return o.n<=2}),later=open.filter(function(o){return o.n>2}),done=S.tasks.filter(function(x){return x.done&&vis(x.w)});
var card=function(x,n){
var dueC='';
if(!x.done){dueC=n<0?'<span class="chip bad">Vencida</span>':n<=1?'<span class="chip warn">'+(n===0?'Hoy':'Mañana')+'</span>':'<span class="chip">'+dl(fromIso(x.due))+'</span>'}
return '<div class="tkw"><button class="tk'+(x.done?' done':'')+'" data-act="tk" data-id="'+x.id+'"><span class="cb">'+ic('check','sm')+'</span><b>'+evIcon(x.t,'✅')+' '+esc(x.t)+'</b><span class="meta"><span class="chip '+x.w+'">'+WHO[x.w]+'</span>'+dueC+'</span></button><button type="button" class="tk-ed" data-act="tkedit" data-id="'+x.id+'" aria-label="Editar tarea">✏️</button></div>';
};
var col=function(title,n,inner,emptyTxt){return '<div class="bcol"><h2>'+title+'<span class="n num">'+n+'</span></h2>'+(inner||'<div class="empty">'+emptyTxt+'</div>')+'</div>'};
var ex=S.exams.filter(function(x){return vis(x.w)}).map(function(x){return {x:x,n:dd(t,fromIso(x.date))}}).filter(function(o){return o.n>=0}).sort(function(a,b){return a.n-b.n});
var exH=ex.map(function(o){
var big=o.n===0?'<b>¡Hoy!</b><small>examen</small>':'<b class="num">'+o.n+'</b><small>'+(o.n===1?'día':'días')+'</small>';
return '<div class="xm'+(o.n<=3?' soon':'')+'" data-act="xmedit" data-id="'+o.x.id+'" role="button" tabindex="0"><div class="big">'+big+'</div><div><b>📝 '+esc(o.x.t)+'</b><small class="d">'+dl(fromIso(o.x.date))+' · <span class="chip '+o.x.w+'">'+WHO[o.x.w]+'</span></small></div><span class="xm-ed">✏️</span></div>';
}).join('');
put($('#board'),
col('Vence pronto',soon.length,soon.map(function(o){return card(o.x,o.n)}).join(''),'Nada para estos días')+
col('Más adelante',later.length,later.map(function(o){return card(o.x,o.n)}).join(''),'Nada más por ahora')+
col('Hechas',done.length,done.map(function(x){return card(x,0)}).join(''),'Aún no hay tareas hechas')+
col('Exámenes',ex.length,exH,'Sin exámenes a la vista'));
$('#tkInfo').textContent=open.length+' pendientes · '+ex.length+' exámenes';
}
