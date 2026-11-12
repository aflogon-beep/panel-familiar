/* ===== v14 · estilo videojuego: Inicio de peques, Rutina y Paguita ===== */
function noEmo(t){return (t||'').replace(EMRX,'')}
function emoTile(t,def){return emoOf(t)||def||'⭐'}
function lvOf(k){var xp=xpGet(k);return {lv:Math.floor(xp/XPL)+1,in_:xp%XPL}}
/* tarjeta grande de cada peque en el Inicio */
function dKidsHtml(){var ks=KV();if(!ks.length)return '<div class="dc-b"><div class="h6-none">Sin peques</div></div>';var t=today();
setTimeout(function(){if(typeof mmRender==='function')mmRender()},0);var top=(typeof coopHtml==='function'?coopHtml('gk'):'');return '<div class="gk14-w">'+(top?'<div class="gk14-top">'+top+'</div>':'')+ks.map(function(k){var rs=routineStats(k),L=lvOf(k),P=S.purse[k],m=S.mission[k],home=atHome(t),N=xpNext(k),pts=Number(S.pts[k])||0;
var pend=home?activeR(k,t).filter(function(x){return !isDone(k,x.id)}):[];
var st=!home?'<div class="gk14-st off">😴 Hoy no toca rutina'+(nextHome()?' · próximo día: '+esc(nextHome()):'')+'</div>':(!rs.all&&nowMin()>=21*60)?'<div class="gk14-st late">🌙 ¡Date prisa! Te falta'+(rs.t-rs.d===1?' <b>1 cosa</b>':'n <b>'+(rs.t-rs.d)+' cosas</b>')+' para el euro de hoy</div>':rs.all?'<div class="gk14-st ok">✅ ¡Día completo! +'+fm(dayAmt())+' € ganado</div>':'<div class="gk14-st">💶 Te falta'+(rs.t-rs.d===1?' <b>1 cosa</b>':'n <b>'+(rs.t-rs.d)+' cosas</b>')+' para ganar '+fm(dayAmt())+' €</div>';
var tasks=pend.slice(0,7).map(function(x){return '<button type="button" class="gk14-t" data-act="rt" data-k="'+k+'" data-id="'+x.id+'"><span class="gk14-e">'+emoTile(x.t)+'</span><span class="gk14-tx">'+esc(noEmo(x.t))+'</span><span class="gk14-c" aria-hidden="true"></span></button>'}).join('')+'<button type="button" class="gk14-more" data-act="nav" data-v="rutina" data-n="'+pend.length+'"'+(pend.length>7?'':' hidden')+'>+'+(pend.length-7)+' más en mi rutina ›</button>';
var nx=N.ok.length?'🎁 ¡Puedes pedir: <b>'+esc(noEmo(N.ok[N.ok.length-1].t))+'</b>!':N.nx?'🎁 Faltan <b>'+(N.nx.c-pts)+' ⭐</b> para '+esc(noEmo(N.nx.t)):'';
var fx='';if(XPFX&&XPFX.k===k&&Date.now()-XPFX.t<1500)fx='<span class="xp12-fl">+'+XPFX.n+' ⭐</span>';
return '<div class="gk14 k-'+k+'"><div class="gk14-h">'+avImg(k,56)+'<div class="gk14-n"><b>'+esc(KIDS[k].n)+'</b><span class="gk14-lv">Nivel '+L.lv+'</span></div><span class="sp"></span><button type="button" class="gk14-pet" data-act="petroom" data-k="'+k+'" aria-label="Mascota">'+(typeof petSvg==='function'?petSvg(k,64):'')+(typeof petMood==='function'?(petMood(k)==='hungry'?'<i class="gk14-pb">🍎</i>':petMood(k)==='dirty'?'<i class="gk14-pb">🛁</i>':petS(k).f<30?'<i class="gk14-pb">💔</i>':''):'')+'</button></div>'+
'<div class="gk14-xp"><button type="button" class="gk14-coin'+(fx?' bump':'')+'" data-act="nav" data-v="banco" aria-label="Puntos">⭐<b class="num">'+pts+'</b>'+fx+'</button><button type="button" class="gk14-pig" data-act="nav" data-v="banco" aria-label="Hucha">🐷<b class="num">'+fm(P.g)+' €</b></button><div class="gk14-xb"><div class="xp12-bar"><i style="width:'+Math.round(L.in_/XPL*100)+'%"></i></div><small class="num">'+L.in_+'/'+XPL+' XP</small></div></div>'+
'<div class="gk14-r"><button type="button" class="gk14-ring" data-act="nav" data-v="rutina"><span class="rwrap">'+ring(rs.p,86)+'<span class="c num">'+(rs.t?rs.d+'/'+rs.t:'—')+'</span></span></button>'+st+'</div>'+
'<div class="gk14-ts">'+tasks+'</div>'+
(m&&m.t?'<button type="button" class="gk14-m'+(m.sp?' sp':'')+(m.st==='ok'?' ok':'')+'" data-act="nav" data-v="rutina">'+(m.sp?'🏆':'🎲')+' <span><small>Misión de la semana · +'+m.pts+' ⭐</small>'+esc(noEmo(m.t))+'</span>'+(m.st==='ok'?'<i>✅</i>':m.st==='pending'?'<i>⏳</i>':'')+'</button>':'')+
'</div>'}).join('')+'</div>'}
// En Inicio caben más o menos tareas según la pantalla: se muestran todas las que quepan y el resto va a «+N más»
function gkFit(){document.querySelectorAll('.gk14-ts').forEach(function(ts){var T=[].slice.call(ts.querySelectorAll('.gk14-t')),more=ts.querySelector('.gk14-more');if(!more||!T.length)return;
var tot=+more.dataset.n,vis=T.length;T.forEach(function(x){x.hidden=false});more.hidden=tot<=vis;
if(ts.clientHeight<40)return;
while(vis>1&&ts.scrollHeight>ts.clientHeight+2){vis--;T[vis].hidden=true;more.hidden=false;more.textContent='+'+(tot-vis)+' más en mi rutina ›'}})}
/* monedas de la semana (Paguita) */
function coinsHtml(k){var mon0=monOf(today()),ti=dow(today()),L=['L','M','X','J','V','S','D'];
return '<div class="cn14">'+L.map(function(l,i){var d=add(mon0,i),h=atHome(d),dn=dayDone(k,i),cls=!h?'off':dn?'on':i<ti?'miss':i===ti?'today':'next';
return '<button type="button" class="cn14-c '+cls+'" data-act="wday" data-k="'+k+'" data-i="'+i+'"><span class="cn14-o">'+(dn?'🪙':!h?'·':i<ti?'✕':'')+'</span><small>'+l+'</small></button>'}).join('')+'</div>'}
function bdMig(){}
