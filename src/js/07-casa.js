/* ===== casa: tareas del hogar rotativas ===== */
var CMEM=['al','ju','a','e'],CEP=new Date(2026,0,5),WXC=null,SUMW=0,CE=null;
function allEv(k){var f=FLT;FLT='all';try{return eventsOn(k)}finally{FLT=f}}
function syJ(){var o={};SY.forEach(function(k){o[k]=JSON.stringify(S[k])});return o}
function undoTo(lab,lab2,before){
var after=syJ(),ch=SY.filter(function(k){return before[k]!==after[k]});
if(!ch.length)return;
toast(lab,lab2,function(){
var now=syJ(),skip=0;
ch.forEach(function(k){if(now[k]===after[k]){if(before[k]===undefined)delete S[k];else S[k]=JSON.parse(before[k])}else skip++});
render();toast(skip?'Alguien cambió algo a la vez: no se pudo deshacer del todo':'Recuperado ✓')})}
function undoable(lab,lab2,fn){var before=syJ();fn();undoTo(lab,lab2,before)}
function cStreak(m){var n=0,t=today();for(var i=0;i<60;i++){var L=cAssign(add(t,-i)).filter(function(x){return x.m===m&&x.c.f!=='w'});if(!L.length)continue;if(L.every(function(x){return x.done}))n++;else if(i>0)break}return n}
function cStar(){
var pm=add(monOf(today()),-7),tot={},dn={};
CMEM.forEach(function(m){tot[m]=0;dn[m]=0});
for(var i=0;i<7;i++){cAssign(add(pm,i)).forEach(function(x){if(x.c.f==='w'&&i>0)return;tot[x.m]++;if(x.done)dn[x.m]++})}
var best=0,ms=[];
CMEM.forEach(function(m){if(!tot[m])return;var r=dn[m]/tot[m];if(r>best+1e-9){best=r;ms=[m]}else if(Math.abs(r-best)<1e-9)ms.push(m)});
return best>=0.6&&ms.length?{ms:ms,r:best}:null}
function cMedals(m){
var s=cStreak(m),n=(S.cn||{})[m]||0,o=[],st=cStar();
if(s>=14)o.push(['🥇','Racha de 14 días']);else if(s>=7)o.push(['🥈','Racha de 7 días']);else if(s>=3)o.push(['🥉','Racha de 3 días']);
if(n>=100)o.push(['🏆','100 tareas hechas']);else if(n>=50)o.push(['🏅','50 tareas hechas']);else if(n>=10)o.push(['⭐','10 tareas hechas']);
if(st&&st.ms.indexOf(m)>=0)o.push(['🌟','Estrella de la semana pasada']);
return o}
function cToggle0(key,m,p){
S.cdone=S.cdone||{};S.cn=S.cn||{};
var kid=function(x){return x==='a'||x==='e'},o=S.cdone[key];
if(o){delete S.cdone[key];S.cn[o]=Math.max(0,(S.cn[o]||0)-1);if(kid(o))S.pts[o]=Math.max(0,(S.pts[o]||0)-p);return false}
S.cdone[key]=m;S.cn[m]=(S.cn[m]||0)+1;if(kid(m))S.pts[m]=(S.pts[m]||0)+p;return true}
function cRow(x,m){var kid=m==='a'||m==='e';return '<button type="button" class="chk cc w-'+(kid?m:'al')+(x.done?' done':'')+'" data-act="cc" data-key="'+esc(x.key)+'" data-m="'+m+'" data-p="'+(Number(x.c.p)||0)+'"><span class="cb">'+ic('check')+'</span><span class="tx"><small>'+(x.c.f==='w'?'Esta semana':x.c.f==='n'?'Estos días':'Hoy')+(kid&&x.c.p?' · +'+x.c.p+' pts':'')+'</small>'+esc(((x.c.i||'')+' '+x.c.t).trim())+'</span></button>'}
function casaKid(k){var L=cAssign(today()).filter(function(x){return x.m===k});if(!L.length)return '';return '<div class="rg">🏠 Casa</div>'+L.map(function(x){return cRow(x,k)}).join('')}
function renderCasa(){
var host=$('#casa');if(!host)return;
var t=today(),mon=monOf(t),sun=add(mon,6),A=cAssign(t),h='',st=cStar();
$('#casaInfo').textContent=mon.getDate()+' '+MONS[mon.getMonth()]+' – '+sun.getDate()+' '+MONS[sun.getMonth()];
if(!(S.chores||[]).length){put(host,'<div class="card empty" style="grid-column:1/-1">Aún no hay tareas de casa<br><button class="btn primary adult-only" data-act="cedit" style="margin-top:12px">Añadir tareas</button></div>');return}
cOrder().forEach(function(m){
var L=A.filter(function(x){return x.m===m}),dn=L.filter(function(x){return x.done}).length,kid=m==='a'||m==='e',sk=cStreak(m),md=cMedals(m);
h+='<div class="cm"><div class="cm-h">'+avImg(m,52)+'<h2>'+esc(WHO[m])+'</h2><span class="sp"></span><div class="rwrap">'+ring(L.length?dn/L.length:0,60)+'<div class="c num">'+dn+'/'+L.length+'</div></div></div>';
h+='<div class="cm-s">'+(sk?'<span class="chip ok">🔥 '+sk+(sk===1?' día':' días')+'</span>':'')+(kid?'<span class="chip num">⭐ '+(S.pts[m]||0)+' pts</span>':'')+md.map(function(x){return '<span class="chip" title="'+esc(x[1])+'">'+x[0]+'</span>'}).join('')+'</div>';
h+=L.length?L.map(function(x){return cRow(x,m)}).join(''):'<div class="empty">Hoy libre 🎉</div>';
h+='</div>'});
if(st)h+='<div class="cstar">🌟 Estrella de la semana pasada: <b>'+st.ms.map(function(m){return esc(WHO[m])}).join(' y ')+'</b> ('+Math.round(st.r*100)+'% hecho)</div>';
put(host,h)}
function renderCasaCard(){
var el=$('#casaCard');if(!el)return;
var A=cAssign(today()),tot=A.length,dn=A.filter(function(x){return x.done}).length;
if(!tot){el.hidden=true;return}
el.hidden=false;
put(el,'<div class="wk-top"><h2>🏠 Casa hoy</h2><button class="chip" data-act="nav" data-v="casa">'+dn+'/'+tot+' · Ver</button></div><div class="cmini">'+CMEM.map(function(m){var L=A.filter(function(x){return x.m===m});return '<button type="button" class="cmi" data-act="nav" data-v="casa" aria-label="'+esc(WHO[m])+'">'+avImg(m,30)+'<span class="cmi-t">'+(L.length?L.map(function(x){return '<i class="'+(x.done?'dn':'')+'">'+esc(x.c.i||'•')+'</i>'}).join(''):'<small>libre</small>')+'</span></button>'}).join('')+'</div>')}
function openCasaEdit(){CE=(S.chores||[]).map(function(c){return {id:c.id,t:c.t,i:c.i||'',f:c.f||'d',p:Number(c.p)||0,w:(c.w&&c.w.length?c.w:CMEM).filter(function(m){return CMEM.indexOf(m)>=0}),s:c.s||'',n:c.n,o:c.o}});ceDraw()}
function ceSync(){if(!CE)return;$$('.cei',sheet).forEach(function(r){var c=CE[Number(r.dataset.i)];if(!c)return;var t=$('.ce-t',r),i2=$('.ce-i',r),p=$('.ce-p',r);if(t)c.t=t.value;if(i2)c.i=i2.value;if(p)c.p=Math.max(0,Math.min(50,Math.round(Number(p.value)||0)));var n2=$('.ce-n',r);if(n2)c.n=Math.max(2,Math.min(60,Math.round(Number(n2.value)||4)))})}
function ceDraw(){
var y=sheet.scrollTop,h='<h3>🏠 Tareas de casa</h3><p class="muted ajn">Solo cuentan los días que los peques están en casa. «Diaria» rota cada día entre los marcados, «Semanal» una vez por semana y «Cada N días» cada cierto tiempo. Los peques ganan puntos para el cofre.</p>';
CE.forEach(function(c,i){
h+='<div class="cei" data-i="'+i+'"><div class="cei-r"><input class="ce-i" value="'+esc(c.i)+'" maxlength="4" aria-label="Icono"><input class="ce-t" value="'+esc(c.t)+'" maxlength="40" placeholder="Nombre de la tarea" aria-label="Nombre"><button type="button" class="btn sm ghost" data-sh="cedel" data-i="'+i+'" aria-label="Quitar tarea">🗑️</button></div><div class="cei-r">'+
[['d','Diaria'],['w','Semanal'],['n','Cada N días']].map(function(o){return '<button type="button" class="cetg'+(c.f===o[0]?' on':'')+'" data-sh="cef" data-i="'+i+'" data-v="'+o[0]+'">'+o[1]+'</button>'}).join('')+
(c.f==='n'?'<label class="cep">Cada <input class="ce-n" type="number" inputmode="numeric" min="2" max="60" value="'+(c.n||4)+'"> días</label>':'')+'<label class="cep">Puntos <input class="ce-p" type="number" inputmode="numeric" min="0" max="50" value="'+c.p+'"></label></div><div class="cei-r">'+
CMEM.map(function(m){return '<button type="button" class="cetg'+(c.w.indexOf(m)>=0?' on':'')+'" data-sh="cew" data-i="'+i+'" data-v="'+m+'" aria-label="'+esc(WHO[m])+'">'+avImg(m,24)+' '+esc(WHO[m])+'</button>'}).join('')+'</div></div>'});
h+='<button type="button" class="btn" data-sh="ceadd">＋ Añadir tarea</button><div class="acts"><button class="btn ghost" data-sh="close">Cancelar</button><button class="btn primary" data-sh="cesave">Guardar</button></div>';
openSheet(h);sheet.scrollTop=y;if(document.activeElement&&document.activeElement.blur)document.activeElement.blur()}

