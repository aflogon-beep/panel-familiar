/* ===== v13 · rutinas con fecha de inicio, semanas congeladas, hucha y peticiones ===== */
/* -- fecha de alta de cada tarea (sale del id: nid = prefijo + timestamp base36 + 4 aleatorios) -- */
var RSC={};
function rStart(x){if(x.s)return x.s;var id=x.id||'';if(RSC[id]!==undefined)return RSC[id];var v='',pl=id.length-12;
if((pl===1||pl===2)&&/^[a-z]+$/.test(id.slice(0,pl))&&/^[0-9a-z]+$/.test(id.slice(pl))){var ts=parseInt(id.slice(pl,pl+8),36);if(ts>1.7e12&&ts<Date.now()+864e5)v=iso(new Date(ts))}RSC[id]=v;return v}
var _aR13=activeR;activeR=function(k,date){var di=iso(date);return _aR13(k,date).filter(function(x){var s=rStart(x);return !s||s<=di})};
/* -- semanas ya cobradas: resultado congelado -- */
function frozenWeek(k,mon){var w=iso(mon),H=(S.hist||{})[k]||[];for(var i=H.length-1;i>=0;i--)if(H[i].w===w)return H[i];return null}
var _dd13=dayDone;dayDone=function(k,i,mon){mon=mon||monOf(today());var f=frozenWeek(k,mon);if(f&&f.d)return f.d[i]===1;return _dd13(k,i,mon)};
function dayDoneD(k,d){return dayDone(k,dow(d),monOf(d))}
/* -- migracion: una sola hucha -- */
function huchaMig(){S.cfg=S.cfg||{};if(S.cfg.hu1)return;['a','e'].forEach(function(k){var P=S.purse[k];if(!P)return;P.g=(Number(P.g)||0)+(Number(P.s)||0)+(Number(P.r)||0);P.s=0;P.r=0});S.cfg.req=S.cfg.req||[];S.cfg.mlog=S.cfg.mlog||[];S.cfg.hu1=1}
/* -- peticiones (dinero y premios) -- */
function reqs(k,ty){return ((S.cfg&&S.cfg.req)||[]).filter(function(r){return r.st==='p'&&(!k||r.k===k)&&(!ty||r.ty===ty)})}
function rwById(id){return (S.rewards||[]).filter(function(r){return r.id===id})[0]}
function rqAlerts(a){reqs().forEach(function(r){var rw=r.ty==='r'?rwById(r.rid):null;a.push({n:-7,c:'warn',a:'nav',v:'banco',h:(r.ty==='m'?'🙋 '+esc(KIDS[r.k].n)+' pide '+fm(r.amt)+' €'+(r.why?' · '+esc(r.why):''):'🎁 '+esc(KIDS[r.k].n)+' quiere: '+esc(rw?rw.t:'un premio'))})})}
function rqAppr(ty){return reqs(null,ty).map(function(r){var rw=r.ty==='r'?rwById(r.rid):null;
return '<div class="appr rq13">'+(r.ty==='m'?'🙋':'🎁')+'<span>'+esc(KIDS[r.k].n)+(r.ty==='m'?' pide <b>'+fm(r.amt)+' €</b> de su hucha'+(r.why?' para «'+esc(r.why)+'»':''):' quiere canjear <b>«'+esc(rw?rw.t:'?')+'»</b> ('+(rw?rw.c:'?')+' ⭐)')+'</span><span style="flex:1"></span><button class="btn sm ghost adult-only" data-act="rqno" data-id="'+r.id+'">Rechazar</button><button class="btn sm adult-only" data-act="rqok" data-id="'+r.id+'">Aprobar</button></div>'}).join('')}
H.rqok=function(el){if(guard())return;var r=(S.cfg.req||[]).filter(function(x){return x.id===el.dataset.id})[0];if(!r||r.st!=='p')return;var P=S.purse[r.k];
if(r.ty==='m'){var a=Math.min(Number(r.amt)||0,Number(P.g)||0);if(a<=0){toast('No tiene dinero en la hucha');return}P.g=Math.round((P.g-a)*100)/100;S.cfg.mlog.push({k:r.k,v:-a,t:r.why||'Retirada',d:iso(today())});if(S.cfg.mlog.length>200)S.cfg.mlog.shift();r.st='ok';toast('Entregados '+fm(a)+' € a '+KIDS[r.k].n)}
else{var rw=rwById(r.rid);if(!rw){r.st='no';render();return}if((S.pts[r.k]||0)<rw.c){toast('Le faltan '+(rw.c-S.pts[r.k])+' puntos');return}S.pts[r.k]-=rw.c;r.st='ok';toast(KIDS[r.k].n+' canjea: '+rw.t)}
r.dd=iso(today());render()};
H.rqno=function(el){if(guard())return;var r=(S.cfg.req||[]).filter(function(x){return x.id===el.dataset.id})[0];if(!r)return;r.st='no';r.dd=iso(today());toast('Petición rechazada');render()};
function rqPrune(){var c=S.cfg;if(!c||!c.req)return;c.req=c.req.filter(function(r){return r.st==='p'||!r.dd||dd(fromIso(r.dd),today())<=14})}
H.preq=function(el){var k=el.dataset.k,P=S.purse[k];if(!(P.g>0)){toast('La hucha está vacía de momento');return}
openSheet('<h3>🙋 Pedir dinero a papá</h3><p class="muted">'+esc(KIDS[k].n)+', tienes <b>'+fm(P.g)+' €</b> en tu hucha.</p><div class="pq13"><label>¿Cuánto?<input id="pq-a" type="number" inputmode="decimal" min="0.5" step="0.5" max="'+P.g+'" value="'+Math.min(5,P.g)+'"></label><label>¿Para qué? (opcional)<input id="pq-w" maxlength="60" placeholder="Chuches, cartas, ahorrar…" autocomplete="off"></label></div><div class="acts"><button class="btn ghost" data-sh="close">Cancelar</button><button class="btn primary" data-sh="pqok" data-k="'+k+'">Pedir</button></div>')};
SH.pqok=function(el){var k=el.dataset.k,P=S.purse[k],a=Math.round(Number(($('#pq-a',sheet).value||'').replace(',','.'))*100)/100,w=($('#pq-w',sheet).value||'').trim();
if(!(a>0)){toast('Pon una cantidad');return}if(a>P.g){toast('Solo tienes '+fm(P.g)+' €');return}
S.cfg.req.push({id:nid('q'),ty:'m',k:k,amt:a,why:w,st:'p',t:iso(today())});closeSheet();toast('Petición enviada a papá 📨');render()};
H.rreq=function(el){var k=el.dataset.k,rw=rwById(el.dataset.id);if(!rw)return;if((S.pts[k]||0)<rw.c){toast('Te faltan '+(rw.c-S.pts[k])+' ⭐');return}
if(reqs(k,'r').some(function(r){return r.rid===rw.id})){toast('Ya lo has pedido. Espera a que papá lo apruebe');return}
S.cfg.req.push({id:nid('q'),ty:'r',k:k,rid:rw.id,st:'p',t:iso(today())});toast('Pedido: '+rw.t+' 📨');render()};
/* -- pestañas -- */
var PGT='h';try{PGT=localStorage.getItem('fam_pgt')||'h'}catch(e){}
H.pgt=function(el){PGT=el.dataset.v;try{localStorage.setItem('fam_pgt',PGT)}catch(e){}renderBanco()};
/* -- historial semanal -- */
function histHtml(k){var H=((S.hist||{})[k]||[]).slice(-7),cur={w:iso(monOf(today())),n:earned(k),v:earned(k)*dayAmt(),cur:true},arr=H.concat([cur]);
var mx=Math.max(1,homeDaysWeek());arr.forEach(function(x){if(x.d)mx=Math.max(mx,x.d.filter(function(v){return v>=0}).length)});
return '<div><h2 class="eyebrow" style="margin-bottom:8px">Últimas semanas</h2><div class="hist">'+arr.map(function(x){var d=fromIso(x.w);return '<button type="button" class="hb'+(x.cur?' cur':'')+'" data-act="hwk" data-k="'+k+'" data-w="'+x.w+'"><div class="hbar"><i style="height:'+Math.max(4,Math.round(x.n/mx*100))+'%"></i></div><b class="num">'+fm(x.v)+' €</b><span>'+d.getDate()+'/'+(d.getMonth()+1)+'</span></button>'}).join('')+'</div><p class="muted wdh12">👆 Toca una semana para ver sus días</p></div>'}
H.hwk=function(el){var k=el.dataset.k,mon=fromIso(el.dataset.w),f=frozenWeek(k,mon),L=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'],n=0;
var rows=L.map(function(l,i){var d=add(mon,i),st=!atHome(d)?-1:dayDone(k,i,mon)?1:(d>today()?-2:0);if(st===1)n++;return '<button type="button" class="wdd-r'+(st===1?' ok':st===0?' no':'')+'" data-sh="wdo" data-k="'+k+'" data-d="'+iso(d)+'"><span>'+(st===1?'✅':st===0?'❌':st===-1?'—':'·')+'</span><b>'+l+' '+d.getDate()+'</b><small>'+(st===1?'+'+fm(dayAmt())+' €':st===0?'0 €':st===-1?'fuera':'')+'</small></button>'}).join('');
var fix=f&&!f.d&&n>f.n?'<div class="wdd-fx">⚠️ Ahora salen <b>'+n+' días</b> completos pero se cobraron '+f.n+'. Faltan <b>'+fm((n-f.n)*dayAmt())+' €</b>.'+(S.kid?' Pídele a papá que lo revise.':'<button class="btn primary" data-sh="hfix" data-k="'+k+'" data-w="'+el.dataset.w+'">➕ Abonar '+fm((n-f.n)*dayAmt())+' € a la hucha</button>')+'</div>':'';
openSheet('<h3>'+esc(KIDS[k].n)+' · semana del '+mon.getDate()+'/'+(mon.getMonth()+1)+'</h3><div class="wdd-s'+(f?' ok':'')+'">'+(f?'Cobrado el lunes: '+fm(f.v)+' € ('+f.n+(f.n===1?' día':' días')+')'+(f.d?' · semana cerrada':''):'Semana en curso: '+n+(n===1?' día completo':' días completos')+' por ahora')+'</div>'+fix+'<div class="wdd-l wk14">'+rows+'</div><div class="acts"><button class="btn primary" data-sh="close">Cerrar</button></div>')};
SH.hfix=function(el){if(guard())return;var k=el.dataset.k,mon=fromIso(el.dataset.w),f=frozenWeek(k,mon);if(!f||f.d)return;var ds=[],n=0;for(var i=0;i<7;i++){var d=add(mon,i),dn=_dd13(k,i,mon);ds.push(atHome(d)?(dn?1:0):-1);if(dn)n++}
var diff=n-f.n;if(diff<=0)return;var v=diff*dayAmt(),P=S.purse[k];P.g=Math.round(((Number(P.g)||0)+v)*100)/100;if(f.v0===undefined)f.v0=f.v;f.n=n;f.v=n*dayAmt();f.d=ds;
S.cfg.mlog=S.cfg.mlog||[];S.cfg.mlog.push({k:k,v:v,t:'Ajuste semana del '+mon.getDate()+'/'+(mon.getMonth()+1),d:iso(today())});toast('Abonados '+fm(v)+' € a '+KIDS[k].n+' 🐷');render();H.hwk({dataset:{k:k,w:el.dataset.w}})};
/* -- movimientos de la hucha -- */
H.rppts=function(){PGT='p';lsS('fam_pgt','p');VDIRTY.banco=true;go('banco')};
function movHtml(k){var M=((S.cfg&&S.cfg.mlog)||[]).filter(function(x){return x.k===k}).map(function(x){return {d:x.d,v:x.v,t:x.t}});
((S.hist||{})[k]||[]).forEach(function(x){var pv=x.v0!==undefined?x.v0:x.v;if(pv>0)M.push({d:iso(add(fromIso(x.w),7)),v:pv,t:'Paga de la semana del '+fromIso(x.w).getDate()+'/'+(fromIso(x.w).getMonth()+1)})});
M.sort(function(a,b){return a.d<b.d?1:-1});M=M.slice(0,6);if(!M.length)return '';
return '<div><h2 class="eyebrow" style="margin-bottom:8px">Movimientos</h2><div class="mv13">'+M.map(function(x){var d=fromIso(x.d);return '<div class="mv13-r'+(x.v<0?' out':'')+'"><b class="num">'+(x.v>0?'+':'−')+fm(Math.abs(x.v))+' €</b><span>'+esc(x.t)+'</span><small>'+d.getDate()+'/'+(d.getMonth()+1)+'</small></div>'}).join('')+'</div></div>'}
/* -- cofre: peques piden, adultos canjean -- */
function rwHtml(k){var p=Number(S.pts[k])||0,L=(S.rewards||[]).slice().sort(function(a,b){return a.c-b.c}),pend=reqs(k,'r').map(function(r){return r.rid}),h='';
RWT.forEach(function(T,ti){var lo=ti?RWT[ti-1][0]:-1,G=L.filter(function(r){return r.c>lo&&r.c<=T[0]});if(!G.length)return;
h+='<div class="rw12-t t-'+T[1]+'">'+T[2]+'</div>'+G.map(function(r){var ok=p>=r.c,pc=Math.min(100,Math.round(p/r.c*100)),pd=pend.indexOf(r.id)>=0;
return '<div class="rw rw12 t-'+T[1]+(ok?' ok':' lock')+'"><span class="rw12-ic">'+(ok?'🔓':'🔒')+'</span><span class="rw14-e">'+emoTile(r.t,'🎁')+'</span><span class="tx"><span class="rw14-a">'+esc(r.t)+'</span><span class="rw14-b">'+esc(noEmo(r.t))+'</span>'+(ok?'':'<span class="rw12-bar"><i style="width:'+pc+'%"></i></span><small class="rw12-f num">Faltan '+(r.c-p)+' ⭐</small>')+'</span><span class="chip num rw12-c">'+r.c+' ⭐</span>'+
(pd?'<span class="chip warn">⏳ Pedido</span>':'<button class="btn sm kid-only" data-act="rreq" data-k="'+k+'" data-id="'+r.id+'"'+(ok?'':' disabled')+'>Lo quiero</button>')+'<button class="btn sm adult-only" data-act="rw" data-k="'+k+'" data-id="'+r.id+'"'+(ok?'':' disabled')+'>Canjear</button></div>'}).join('')});
return h}
/* -- pantalla Paguita -- */
function renderBanco(){$('#bankChip').textContent=fm(dayAmt())+' € por día completo en casa';
var nm=reqs(null,'m').length,np=reqs(null,'r').length+KV().filter(function(k){return S.mission[k].st==='pending'}).length,bd=function(n){return n?' <i class="pg13-n">'+n+'</i>':''};
var h='<div class="pg13-tabs" role="tablist"><button type="button" role="tab" data-act="pgt" data-v="h" class="'+(PGT==='h'?'on':'')+'">🐷 Hucha'+bd(nm)+'</button><button type="button" role="tab" data-act="pgt" data-v="p" class="'+(PGT==='p'?'on':'')+'">⭐ Puntos y premios'+bd(np)+'</button></div>';
h+=rqAppr(PGT==='h'?'m':'r');if(PGT!=='h')KV().forEach(function(k){h+=spmAppr(k);if(S.mission[k].st==='pending')h+='<div class="appr">'+ic('check')+'<span>'+KIDS[k].n+' ha hecho su misión «'+esc(S.mission[k].t)+'» (+'+S.mission[k].pts+' pts)</span><span style="flex:1"></span><button class="btn sm adult-only" data-act="ap" data-k="'+k+'">Aprobar</button></div>'});
var ti=dow(today()),L=['L','M','X','J','V','S','D'],mon0=monOf(today());
if(PGT==='h')h+=payRulesHtml();else h+=coopHtml('pg');
h+='<div class="bk">';
KV().forEach(function(k){var P=S.purse[k],e=earned(k);
h+='<div class="bkc k-'+k+'"><div class="bkc-h">'+avImg(k,48)+'<h2>'+KIDS[k].n+'</h2></div>';
if(PGT==='h'){var st=streak(k),pm=reqs(k,'m');
var dots=L.map(function(l,i){var dn=dayDone(k,i);return '<span class="wd'+(dn?' on':'')+(i===ti?' t':'')+(atHome(add(mon0,i))?'':' off')+'" data-act="wday" data-k="'+k+'" data-i="'+i+'" role="button" tabindex="0"><i>'+ic('check','sm')+'</i>'+l+'<small class="wd-v">'+wdVal(k,i,ti,mon0)+'</small></span>'}).join('');
h+='<div class="hu13"><div class="hu13-pig" aria-hidden="true">'+pigSvg(k,Number(P.g)||0,false,true)+'</div><div class="hu13-m"><small>En tu hucha</small><b class="num">'+fm(P.g)+' €</b><span>Esta semana llevas <b class="num">'+fm(e*dayAmt())+' €</b> de '+fm(homeDaysWeek()*dayAmt())+' € · se cobra el lunes</span></div><button type="button" class="btn hu13-b" data-act="preq" data-k="'+k+'">🙋 Pedir<br> dinero</button></div>'+intHtml(k)+
(pm.length?pm.map(function(r){return '<div class="pq13-p">⏳ Has pedido '+fm(r.amt)+' €'+(r.why?' para «'+esc(r.why)+'»':'')+' · esperando a papá</div>'}).join(''):'')+

coinsHtml(k)+'<div class="wdh12">👆 Toca una moneda para ver qué hizo ese día</div>'+
'<div style="display:flex;gap:8px;flex-wrap:wrap"><span class="chip'+(st>=3?' ok':'')+'">🔥 Racha: '+st+(st===1?' día':' días')+'</span></div>'+movHtml(k)+histHtml(k)}
else h+=xpHtml(k,true)+petCard(k)+achHtml(k)+'<div><h2 class="eyebrow" style="margin-bottom:8px">Cofre de premios</h2><div class="rew">'+rwHtml(k)+'</div></div>';
h+='</div>'});
h+='</div>';
if(!KV().length)h='<div class="card"><div class="empty">Vista de adultos: la paguita es de los peques</div></div>';put($('#bank'),h)}
/* -- emojis en el editor de rutinas -- */
var EMO=['🛏️','🦷','🧴','🚿','🧼','👕','🧦','🎒','📚','✏️','🎹','🎵','🧹','🧺','🗑️','🍽️','🥪','💧','🍎','🥛','🐜','🐶','🌱','💊','👓','⏰','📵','🛁','💤','⚽','🏀','🎨'];
var EMK=[['crema','🧴'],['diente','🦷'],['ducha','🚿'],['baño','🛁'],['mano','🧼'],['cama','🛏️'],['ropa','👕'],['calcet','🧦'],['mochila','🎒'],['debere','📚'],['estudi','📚'],['leer','📚'],['piano','🎹'],['música','🎵'],['barr','🧹'],['basura','🗑️'],['mesa','🍽️'],['táper','🥪'],['botella','💧'],['fruta','🍎'],['hormig','🐜'],['perro','🐶'],['planta','🌱'],['medic','💊'],['gafas','👓'],['pantalla','📵'],['dormir','💤'],['fútbol','⚽'],['balonc','🏀']];
var EMRX=/^(\p{Extended_Pictographic}|\p{Regional_Indicator})(️|‍|\p{Extended_Pictographic}|\p{Emoji_Modifier})*\s*/u;
function emoOf(t){var m=EMRX.exec(t||'');return m?m[0].trim():''}
function emoSug(t){t=(t||'').toLowerCase();for(var i=0;i<EMK.length;i++)if(t.indexOf(EMK[i][0])>=0)return EMK[i][1];return ''}
var AJEMO=null;
function emoBtn(k,i,t){var e=emoOf(t);return '<button type="button" class="ib emo13" data-sh="ajemo" data-k="'+k+'" data-i="'+i+'" aria-label="Elegir emoticono">'+(e||'😀')+'</button>'}
function emoGrid(k,i,t){if(!AJEMO||AJEMO.k!==k||AJEMO.i!==i)return '';var sg=emoSug(t);return '<div class="emo13-g">'+(sg?'<button type="button" class="sg13" data-sh="ajemop" data-k="'+k+'" data-i="'+i+'" data-e="'+sg+'">'+sg+' <small>sugerido</small></button>':'')+EMO.map(function(e){return '<button type="button" data-sh="ajemop" data-k="'+k+'" data-i="'+i+'" data-e="'+e+'">'+e+'</button>'}).join('')+'<button type="button" data-sh="ajemop" data-k="'+k+'" data-i="'+i+'" data-e="">✕</button></div>'}
SH.ajemo=function(el){ajCollect();var k=el.dataset.k,i=Number(el.dataset.i);AJEMO=(AJEMO&&AJEMO.k===k&&AJEMO.i===i)?null:{k:k,i:i};ajOpen()};
SH.ajemop=function(el){ajCollect();var x=AJ.ro[el.dataset.k][Number(el.dataset.i)];if(x){var t=(x.t||'').replace(EMRX,'');x.t=(el.dataset.e?el.dataset.e+' ':'')+t}AJEMO=null;ajOpen()};
SH.wdo=function(el){openSheet(wdayHtml(el.dataset.k,el.dataset.d))};
function misMig7(){S.cfg=S.cfg||{};if(S.cfg.mis7)return;var A=['a','e'],P=function(id,t,w,sp){return {id:id,t:t,pts:sp?15:10,w:w||A,sp:!!sp}};
S.cfg.mpool=[P('n1','🐜 Limpiar el hormiguero a fondo con papá',['a']),P('n2','🧽 Limpiar la mesa del cuarto con flis y ordenar el escritorio y los cajones'),P('n3','🚰 Limpiar el baño: lavabo y espejo'),
P('n4','🍳 Ayudar a hacer la cena de principio a fin y recoger la cocina'),P('n5','🥞 Preparar el desayuno del finde para todos y recogerlo'),P('n6','🛒 Ayudar a hacer la compra en el Mercadona: lista, carro y colocar las cosas en casa'),
P('n7','🛋️ Ordenar el salón entero y pasar la aspiradora'),P('n8','🪟 Limpiar la ventana de tu cuarto, cristal y marco'),
P('x1','🧹 Ordenar el cuarto a fondo: armario, cajones y debajo de la cama',A,1),P('x2','🚗 Lavar el coche (Copito o Blue) con ayuda',A,1),P('x3','🧊 Limpiar la nevera por dentro con ayuda',A,1)];
S.cfg.mused={a:[],e:[]};
['a','e'].forEach(function(k){var m=S.mission[k];if(!m||m.st==='ok')return;var same=S.cfg.mpool.filter(function(x){return x.id===m.id||/hormiguero/i.test(m.t||'')&&x.id==='n1'})[0];
if(same&&(same.w||A).indexOf(k)>=0){m.id=same.id;m.t=same.t;m.pts=same.pts;m.sp=same.sp;S.cfg.mused[k].push(same.id)}else{var st=m.st;misNext(k);if(st==='pending')m.st='todo'}});
S.cfg.mis7=1}
