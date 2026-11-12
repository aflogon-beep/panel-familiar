/* ===== resumen de la semana ===== */
function sumMon(){return add(monOf(today()),7*SUMW)}
function sumData(mon){
var e6=add(mon,6),k6=iso(e6),D={mon:mon,sun:e6,days:[],exn:[],tk:[],bd:[],buy:S.list.filter(function(x){return !x.done}).length,sat:add(mon,5),st:wkSt(add(mon,5)),casa:cAssign(mon)};
for(var i=0;i<7;i++){var dt=add(mon,i),k=iso(dt),ad=allDay(k);
D.days.push({d:dt,k:k,ev:allEv(k),ad:ad.filter(function(a){return a.k!=='b'}),ex:S.exams.filter(function(x){return x.date===k})});
ad.forEach(function(a){if(a.k==='b')D.bd.push({d:dt,t:a.t,i:a.i})})}
D.exn=S.exams.filter(function(x){return x.date>k6&&dd(e6,fromIso(x.date))<=14}).sort(function(a,b){return a.date<b.date?-1:1});
D.tk=S.tasks.filter(function(x){return !x.done&&x.due<=k6}).sort(function(a,b){return a.due<b.due?-1:1});
return D}
function sumRange(D){return D.mon.getDate()+' '+MONS[D.mon.getMonth()]+' – '+D.sun.getDate()+' '+MONS[D.sun.getMonth()]}
function sumWho(w){return w&&w!=='all'&&WHO[w]?' · '+WHO[w]:''}
function sumHtml(D){
var h='<h3>📋 Resumen de la semana</h3><div class="sumtg"><button type="button" class="cetg'+(SUMW===0?' on':'')+'" data-sh="sumw" data-v="0">Esta semana</button><button type="button" class="cetg'+(SUMW===1?' on':'')+'" data-sh="sumw" data-v="1">La próxima</button></div><p class="muted ajn">'+sumRange(D)+'</p>';
h+='<div class="sumb '+D.st+'">'+(D.st==='us'?'🎉 Fin de semana CON peques':'😢 Fin de semana SIN peques')+' · '+rangeLabel(D.sat)+'</div>';
D.days.forEach(function(x,i){
var r=[];
x.ad.forEach(function(a){r.push('<span>'+a.i+' '+esc(a.t)+'</span>')});
x.ex.forEach(function(e){r.push('<span>📝 Examen de '+esc(e.t)+esc(sumWho(e.w))+'</span>')});
x.ev.forEach(function(e){r.push('<span><b class="num">'+e.s+'</b> '+evIcon(e.t)+' '+esc(e.t)+esc(sumWho(e.w))+'</span>')});
h+='<div class="sumd"><b>'+cap(DOWS[i])+' '+x.d.getDate()+'</b><div>'+(r.length?r.join(''):'<small>Nada apuntado</small>')+'</div></div>'});
if(D.bd.length)h+='<h4 class="eyebrow">🎂 Cumpleaños</h4>'+D.bd.map(function(b){return '<div class="sumx">'+b.i+' '+esc(b.t)+' · '+cap(DOW[dow(b.d)])+' '+b.d.getDate()+'</div>'}).join('');
if(D.exn.length)h+='<h4 class="eyebrow">📝 Exámenes que se acercan</h4>'+D.exn.map(function(x){return '<div class="sumx">'+esc(x.t)+esc(sumWho(x.w))+' · '+dl(fromIso(x.date))+'</div>'}).join('');
if(D.tk.length)h+='<h4 class="eyebrow">✅ Tareas pendientes</h4>'+D.tk.map(function(x){return '<div class="sumx">'+evIcon(x.t,'✅')+' '+esc(x.t)+esc(sumWho(x.w))+' · '+(x.due<iso(today())?'vencida':dl(fromIso(x.due)))+'</div>'}).join('');
if(D.casa.length)h+='<h4 class="eyebrow">🏠 Casa esta semana</h4>'+CMEM.map(function(m){var L=D.casa.filter(function(x){return x.m===m});return L.length?'<div class="sumx">'+avImg(m,20)+' <b>'+esc(WHO[m])+'</b>: '+L.map(function(x){return esc(((x.c.i||'')+' '+x.c.t).trim())+(x.c.f==='w'?' (semana)':'')}).join(', ')+'</div>':''}).join('');
h+='<h4 class="eyebrow">🛒 Compra</h4><div class="sumx">'+(D.buy?D.buy+(D.buy===1?' producto':' productos')+' en la lista':'La lista está vacía')+'</div>';
h+='<div class="acts"><button class="btn" data-sh="sumsh">Compartir</button><button class="btn primary" data-sh="close">Cerrar</button></div>';
return h}
function sumText(D){
var L=['📋 *Semana del '+sumRange(D)+'*','',(D.st==='us'?'🎉 Fin de semana CON peques':'😢 Fin de semana SIN peques')+' ('+rangeLabel(D.sat)+')',''];
D.days.forEach(function(x,i){
var r=[];
x.ad.forEach(function(a){r.push('   '+a.i+' '+a.t)});
x.ex.forEach(function(e){r.push('   📝 Examen de '+e.t+sumWho(e.w))});
x.ev.forEach(function(e){r.push('   • '+e.s+' '+e.t+sumWho(e.w))});
L.push('*'+cap(DOW[i])+' '+x.d.getDate()+'*');
if(r.length)L=L.concat(r);else L.push('   —')});
if(D.bd.length){L.push('','🎂 Cumpleaños');D.bd.forEach(function(b){L.push('   '+b.i+' '+b.t+' · '+cap(DOW[dow(b.d)])+' '+b.d.getDate())})}
if(D.exn.length){L.push('','📝 Exámenes que se acercan');D.exn.forEach(function(x){L.push('   '+x.t+sumWho(x.w)+' · '+dl(fromIso(x.date)))})}
if(D.tk.length){L.push('','✅ Tareas pendientes');D.tk.forEach(function(x){L.push('   '+x.t+sumWho(x.w)+' · '+(x.due<iso(today())?'vencida':dl(fromIso(x.due))))})}
if(D.casa.length){L.push('','🏠 Casa');CMEM.forEach(function(m){var q=D.casa.filter(function(x){return x.m===m});if(q.length)L.push('   '+WHO[m]+': '+q.map(function(x){return ((x.c.i||'')+' '+x.c.t).trim()+(x.c.f==='w'?' (semana)':'')}).join(', '))})}
L.push('','🛒 Compra: '+(D.buy?D.buy+(D.buy===1?' producto':' productos'):'lista vacía'));
return L.join('\n')}
function openSum(reset){if(reset)SUMW=dow(today())>=5?1:0;var y=sheet.scrollTop;openSheet(sumHtml(sumData(sumMon())));sheet.scrollTop=reset?0:y;if(document.activeElement&&document.activeElement.blur)document.activeElement.blur()}
function sumShare(){
var tx=sumText(sumData(sumMon()));
if(navigator.share){navigator.share({title:'Resumen de la semana',text:tx}).catch(function(){})}
else if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(tx).then(function(){toast('Resumen copiado: pégalo donde quieras')},function(){toast('No se pudo copiar')})}
else toast('Este navegador no permite compartir')}

var secChoice=null;
var SECI={fv:'🥬',carne:'🥩',pescado:'🐟',pan:'🥖',lac:'🥛',des:'🥫',cong:'❄️',beb:'🥤',limp:'🧴'};
var LI=null;
function favList(){var f=S.freq||{},by={};allCat().forEach(function(c){by[norm(c.n)]=c});return Object.keys(f).map(function(k){return {c:by[k],n:f[k]}}).filter(function(x){return x.c}).sort(function(a,b){return b.n-a.n}).slice(0,12)}
function openLi(id){
var x=S.list.filter(function(i){return i.id===id})[0];if(!x)return;LI=id;
if(!F)F={type:'cp',w:'all',dur:60,date:iso(today()),time:'17:00',title:'',sec:'fv'};
openSheet('<h3>'+pic(x.img)+' '+esc(x.n)+'</h3><div class="fld">Cantidad<div class="qbig"><button type="button" data-sh="lq" data-d="-1">−</button><b id="l-q" class="num">'+x.q+'</b><button type="button" data-sh="lq" data-d="1">+</button></div></div><label class="fld">Nota (opcional)<input id="l-note" value="'+esc(x.note||'')+'" placeholder="p. ej. 2 kg, sin lactosa, otra marca…" autocomplete="off"></label><div class="fld">Sección'+seg('lsec',SEC.map(function(s){return [s.id,SECI[s.id]+' '+s.n]}),x.sec)+'</div><div class="acts"><button class="btn ghost" style="color:var(--bad-ink)" data-sh="lidel">Quitar de la lista</button><button class="btn ghost" data-sh="close">Cancelar</button><button class="btn primary" data-sh="lisave">Guardar</button></div>');
}
function renderCompra(){
var tot=S.list.length,got=S.list.filter(function(x){return x.done}).length,pending=tot-got;
$('#cmpInfo').textContent=pending+' por comprar · '+got+' en el carro';
$('#shop').classList.toggle('sup',S.sup);
$('#supBtn').textContent=S.sup?'Salir del modo súper':'Modo súper';
$('#supBtn').classList.toggle('primary',S.sup);
var h='<div class="cprog card"><div class="cp-t"><b class="num">'+got+'</b><span> de '+tot+' en el carro</span></div><div class="bar"><i style="width:'+(tot?Math.round(got/tot*100):0)+'%;--c:var(--us)"></i></div></div>';
secOrder().forEach(function(s){
var items=S.list.filter(function(x){return x.sec===s.id}).sort(function(a,b){return (a.done?1:0)-(b.done?1:0)});
if(!items.length)return;
var left=items.filter(function(x){return !x.done}).length;
h+='<div class="sec" style="--sc:'+s.c+'"><div class="sec-h"><span class="sec-i">'+SECI[s.id]+'</span>'+s.n+'<span class="n num">'+left+(left<items.length?' / '+items.length:'')+'</span></div>';
items.forEach(function(x){
h+='<div class="li'+(x.done?' done':'')+'" data-act="li" data-id="'+x.id+'" role="button" tabindex="0"><span class="li-img">'+pic(x.img)+'</span><span class="li-t"><span class="li-n">'+(x.by?avImg(x.by,18)+' ':'')+esc(x.n)+'</span>'+(x.note?'<small>'+esc(x.note)+'</small>':'')+'</span><span class="qty'+(x.q===1?' q1':'')+'"><button data-act="qm" data-id="'+x.id+'" aria-label="Menos">−</button><b class="num">'+x.q+'</b><button data-act="qp" data-id="'+x.id+'" aria-label="Más">+</button></span><span class="cb">'+ic('check','sm')+'</span><button class="rm adult-only kid-ok" data-act="liedit" data-id="'+x.id+'" aria-label="Editar '+esc(x.n)+'">'+ic('more','sm')+'</button></div>';
});
h+='</div>';
});
put($('#shopR'),tot?h:'<div class="card empty cempty"><div style="font-size:44px">🛒</div><b>La lista está vacía</b><span>Toca un producto de la izquierda o búscalo arriba.</span></div>');
var qIn={},cnt={};
S.list.forEach(function(x){if(!x.done){qIn[norm(x.n)]=(qIn[norm(x.n)]||0)+x.q;cnt[x.sec]=(cnt[x.sec]||0)+1}});
var tile=function(c,cl){var s=secOf(c.sec),n=qIn[norm(c.n)];return '<button class="'+cl+'" style="--sc:'+s.c+'" data-act="ci" data-n="'+esc(c.n)+'"><span class="ct-img">'+pic(c.img)+'</span><span>'+esc(c.n)+'</span>'+(n?'<i class="in">×'+n+'</i>':'')+'</button>'};
var fv=favList();
$('#favsBox').innerHTML=fv.length?'<h2 class="eyebrow">⭐ Más comprados</h2><div class="favs">'+fv.map(function(o){return tile(o.c,'ct')}).join('')+'</div>':'';
if(SUPX)renderSupx();var ai=$('#addInp');if(ai)ai.placeholder=PH()?'Añadir…':'Añadir a la compra…';var mb=$('#meBtn');if(mb)mb.innerHTML=avImg(ME(),18)+' Soy '+WHO[ME()];$('#shop').classList.toggle('catclosed',PH()&&!CATOPEN);
$('#csecs').innerHTML=SEC.map(function(s){return '<button type="button" class="sg'+(s.id===catSec?' on':'')+'" data-act="csec" data-sec="'+s.id+'" style="--sc:'+s.c+'">'+SECI[s.id]+' '+s.n+(cnt[s.id]?' <small class="num">'+cnt[s.id]+'</small>':'')+'</button>'}).join('');
put($('#cat'),allCat().filter(function(c){return c.sec===catSec}).map(function(c){return tile(c,'ct')}).join(''));
}
function matches(q){var nq=norm(q);if(!nq)return [];return allCat().filter(function(c){return norm(c.n).indexOf(nq)>-1}).slice(0,8)}
function renderSug(){
var q=$('#addInp').value,box=$('#sug');
if(!q.trim()){offHtml='';box.innerHTML='';return}
var m=matches(q),h=m.map(function(c){return '<button type="button" class="sg" data-act="ci" data-n="'+esc(c.n)+'">'+pic(c.img)+' '+esc(c.n)+'</button>'}).join('');
h+=offHtml||(offLoad&&q.trim().length>=3?'<div class="sub offl" style="width:100%">Buscando productos con foto…</div>':'');
if(!m.some(function(c){return norm(c.n)===norm(q)})){
h+='<div class="newq"><span>«'+esc(q.trim())+'» es nuevo. ¿En qué sección va? La próxima vez lo recordaré.</span><div class="secs">'+SEC.map(function(s){return '<button type="button" class="sg" data-act="newsec" data-sec="'+s.id+'" style="--sc:'+s.c+'">'+s.n+'</button>'}).join('')+'</div></div>';
}
box.innerHTML=h;
}
function addItem(n,secId,img,q){
var ex=S.list.filter(function(x){return norm(x.n)===norm(n)&&!x.done})[0];
if(ex){ex.q=Math.min(99,ex.q+(q||1));return 'más'}
var cat=allCat().filter(function(c){return norm(c.n)===norm(n)})[0];
if(!cat){cat=C(n,secId,img||'🛒');S.catalog.push(cat)}
var nl=li(cat.n,cat.sec,cat.img,q);nl.by=ME();S.list.push(nl);return 'nuevo';
}
var ME=function(){var m='al';try{m=localStorage.getItem('fam_me')==='ju'?'ju':'al'}catch(e){}return m};
var CATOPEN=false,SUPX=false,SUPWL=null;
function secOrder(){var o=S.aisle||[],out=[];o.forEach(function(id){var s=SEC.filter(function(x){return x.id===id})[0];if(s&&out.indexOf(s)<0)out.push(s)});SEC.forEach(function(s){if(out.indexOf(s)<0)out.push(s)});return out}
function aisMove(id,d){if(guard())return;var L=secOrder().map(function(s){return s.id}),i=L.indexOf(id),j=i+d;if(i<0||j<0||j>=L.length)return;var t=L[i];L[i]=L[j];L[j]=t;S.aisle=L;openAisle();render()}
function openAisle(){var L=secOrder();openSheet('<h3>↕ Orden del súper</h3><p class="muted ajn">Pon las secciones en el orden en que recorres tu súper. La lista y el modo súper siguen este orden.</p><div class="aisl">'+L.map(function(s,i){return '<div class="aisr" style="--sc:'+s.c+'"><span>'+SECI[s.id]+' '+s.n+'</span><button class="ib" data-sh="aisup" data-id="'+s.id+'"'+(i?'':' disabled')+' aria-label="Subir">▲</button><button class="ib" data-sh="aisdn" data-id="'+s.id+'"'+(i<L.length-1?'':' disabled')+' aria-label="Bajar">▼</button></div>'}).join('')+'</div><div class="acts"><button class="btn primary" data-sh="close">Listo</button></div>')}
var NUMW={un:1,una:1,uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10};
function catSeg(p){var ws=p.trim().split(/\s+/),names={};allCat().forEach(function(c){names[norm(c.n)]=c.n});var res=[],i=0;while(i<ws.length){var f=0;for(var L=Math.min(3,ws.length-i);L>=1;L--){var k=norm(ws.slice(i,i+L).join(' ')),h=names[k]||names[k.replace(/s$/,'')]||names[k+'s'];if(h){res.push(h);i+=L;f=1;break}}if(!f)return [p]}return res}
function splitItems(t){var out=[];t.split(/\s*(?:,|;|\n|\sy\s|\se\s)\s*/i).map(function(x){return x.trim()}).filter(Boolean).forEach(function(p){var q=1,m=p.match(/^(\d{1,2})\s*(?:x|×|uds?\.?)?\s+(.+)$/i),w=p.split(/\s+/);if(m){q=+m[1];p=m[2]}else if(w.length>1&&NUMW[norm(w[0])]){q=NUMW[norm(w[0])];p=w.slice(1).join(' ')}var sg=catSeg(p);if(sg.length>1)sg.forEach(function(s,i){out.push({n:s,q:i?1:q})});else out.push({n:p,q:q})});return out}
function addMany(t){var ad=[];splitItems(t).forEach(function(o){var m=matches(o.n),ex=m.filter(function(c){return norm(c.n)===norm(o.n)})[0]||m[0],n=ex?ex.n:cap(o.n);addItem(n,ex?ex.sec:'des',ex?ex.img:'🛒',o.q);ad.push(n)});return ad}
var VT=0;document.addEventListener('focusin',function(e){var t=e.target;if(Date.now()-VT<2000&&t&&/^(qk-in|addInp|sx-in|qb-in)$/.test(t.id)){t.blur()}},true);
function dictTo(el,cb){var SRx=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SRx||!el){toast('Tu navegador no dicta por voz');return}try{var r=new SRx();r.lang='es-ES';r.interimResults=false;toast('Te escucho…');r.onresult=function(ev){var t=ev.results[0][0].transcript;VT=Date.now();try{if(document.activeElement&&document.activeElement.blur)document.activeElement.blur()}catch(x){}el.value=t;if(cb)cb(t);VT=Date.now()};r.onerror=function(ev){toast(ev.error==='not-allowed'||ev.error==='service-not-allowed'?'Activa el micrófono en Chrome (candado de la barra)':'No te he oído, prueba otra vez')};r.start()}catch(e){}}
var supEl=document.createElement('div');supEl.id='supx';supEl.hidden=true;document.body.appendChild(supEl);
function openSupx(){S.sup=false;SUPX=true;supEl.hidden=false;document.documentElement.classList.add('supon');try{if(navigator.wakeLock)navigator.wakeLock.request('screen').then(function(l){SUPWL=l}).catch(function(){})}catch(e){}renderSupx()}
function closeSupx(){SUPX=false;supEl.hidden=true;document.documentElement.classList.remove('supon');try{if(SUPWL){SUPWL.release();SUPWL=null}}catch(e){}}
function renderSupx(){
if(!SUPX)return;
var old=$('.sx-b',supEl),y=old?old.scrollTop:0,foc=document.activeElement&&document.activeElement.id==='sx-in',val=foc?document.activeElement.value:'';
var pend=S.list.filter(function(x){return !x.done}),got=S.list.filter(function(x){return x.done}),tot=S.list.length;
var row=function(x,d){return '<button type="button" class="sxr'+(d?' done':'')+'" data-act="li" data-id="'+x.id+'"><span class="sx-cb">'+(d?ic('check','sm'):'')+'</span><span class="sx-n"><b>'+esc(x.n)+'</b>'+(x.note?'<small>'+esc(x.note)+'</small>':'')+'</span>'+(x.q>1?'<span class="sx-q">×'+x.q+'</span>':'')+(x.by?avImg(x.by,26):'')+'</button>'};
var h='<div class="sx-h"><button type="button" class="sx-x" data-act="sxclose" aria-label="Salir">✕</button><div class="sx-t"><b>'+(pend.length?pend.length+' por comprar':'¡Todo en el carro!')+'</b><div class="bar"><i style="width:'+(tot?Math.round(got.length/tot*100):0)+'%;--c:var(--us)"></i></div></div></div>';
h+='<form id="sxForm" class="sx-f" autocomplete="off"><input id="sx-in" placeholder="Añadir…" enterkeyhint="done"><button type="button" class="btn" data-act="sxmic" aria-label="Dictar">🎤</button><button class="btn primary" type="submit">+</button></form><div class="sx-b">';
if(!tot)h+='<div class="empty" style="padding:30px 0">La lista está vacía</div>';
secOrder().forEach(function(s){var it=pend.filter(function(x){return x.sec===s.id});if(!it.length)return;h+='<div class="sx-s" style="--sc:'+s.c+'"><div class="sx-sh">'+SECI[s.id]+' '+s.n+'<span class="num">'+it.length+'</span></div>'+it.map(function(x){return row(x,false)}).join('')+'</div>'});
if(tot&&!pend.length)h+='<div class="sx-win"><div style="font-size:54px">🎉</div><b>¡Compra completa!</b></div>';
if(got.length)h+='<div class="sx-s sx-got"><div class="sx-sh">En el carro<span class="num">'+got.length+'</span></div>'+got.map(function(x){return row(x,true)}).join('')+'<button type="button" class="btn sx-end" data-act="sxclear">Quitar comprados y salir</button></div>';
h+='</div>';
supEl.innerHTML=h;var nb=$('.sx-b',supEl);if(nb)nb.scrollTop=y;if(foc){var ni=$('#sx-in',supEl);if(ni){ni.value=val;ni.focus()}}}
document.addEventListener('submit',function(e){var f=e.target;if(!f||f.id!=='sxForm')return;e.preventDefault();if(guard())return;var i=$('#sx-in'),q=(i.value||'').trim();if(!q)return;var ad=addMany(q);toast('Añadido: '+ad.join(', '));i.value='';render()});
var AGN=14;
function renderAgl(){
var box=$('#agl');if(!box)return;if(!PH()){box.innerHTML='';return}
var t=today(),h='',free=0;
for(var i=0;i<AGN;i++){
var d=add(t,i),k=iso(d),wd=dow(d)>=5,rows='';
allDay(k).forEach(function(a){rows+='<div class="agr ad"><span class="t">'+a.i+'</span><span class="n">'+esc(a.t)+'</span></div>'});
S.exams.filter(function(x){return x.date===k&&vis(x.w)}).forEach(function(x){rows+='<div class="agr ad"><span class="t">📝</span><span class="n">Examen de '+esc(x.t)+'<small>'+WHO[x.w]+'</small></span></div>'});
eventsOn(k).forEach(function(e){rows+='<button type="button" class="agr w-'+e.w+'" data-act="ev" data-id="'+e.id+'" data-d="'+e.date+'"><span class="t">'+e.s+'<small>'+e.e+'</small></span><span class="n">'+evIcon(e.t)+' '+esc(e.t)+'<small>'+avImg(e.w,16)+' '+esc(WHO[e.w])+'</small></span></button>'});
S.tasks.filter(function(x){return !x.done&&x.due===k&&vis(x.w)}).forEach(function(x){rows+='<button type="button" class="agr w-'+x.w+'" data-act="tk" data-id="'+x.id+'"><span class="t">✅</span><span class="n">'+esc(x.t)+'<small>Tarea · '+esc(WHO[x.w])+'</small></span></button>'});
if(!rows&&!wd&&i>0){free++;continue}
var st=wd?wkSt(satOf(d)):'',chip=wd?'<button type="button" class="wkc '+st+'" data-act="wk" data-wk="'+iso(satOf(d))+'">'+(st==='us'?'Con peques 🎉':'Sin peques 😢')+'</button>':'';
h+='<div class="agd"><div class="agd-h"><span class="'+(i===0?'today':'')+'">'+(i===0?'Hoy':i===1?'Mañana':cap(dl(d)))+'</span>'+(i<2?'<span>'+d.getDate()+' '+MONS[d.getMonth()]+'</span>':'')+chip+'</div>'+(rows||'<p class="muted" style="margin:0 4px 6px;font-weight:700">Día libre</p>')+'</div>'}
if(free)h+='<p class="muted" style="text-align:center;font-weight:700">'+free+' días sin planes</p>';
h+='<button type="button" class="btn agm" data-act="agmore">Ver 2 semanas más</button>';
box.innerHTML=h}
var lastPH=PH();window.addEventListener('resize',function(){if(PH()!==lastPH){lastPH=PH();draw()}});
function PH(){return !!(window.matchMedia&&matchMedia('(max-width:640px)').matches)}
document.addEventListener('submit',function(e){var f=e.target;if(!f||f.id!=='qkForm')return;e.preventDefault();if(guard())return;var i=$('#qk-in'),q=(i.value||'').trim();if(!q)return;
var tf=document.activeElement===i;var ad=addMany(q);toast('Añadido: '+ad.join(', '));i.value='';render();if(tf)setTimeout(function(){var j=$('#qk-in');if(j)j.focus()},50);else i.blur()});
(function(){var mb=document.createElement('button');mb.className='nav-btn nav-more';mb.setAttribute('data-act','more');mb.setAttribute('aria-label','Más');mb.innerHTML='<b class="mdots">⋯</b><span>Más</span>';var nm=$('.nav-main');if(nm)nm.appendChild(mb)})();
function openMore(){
var B=[['nav','casa','','🧹','Casa',''],['nav','menu','','🍽️','Menú',''],['nav','banco','','💶','Paguita',''],['wsum','','','📋','Resumen semana',''],['fridge','','','🧊','Modo nevera',''],['buz','','','📮','Buzón',''],['flt','','','👀','Ver…',''],['aj','','rut','⚙️','Ajustes','adult-only'],['mic','','','🎤','Voz','adult-only'],['kid','','','🧒','Modo niños',''],['theme','','','🌓','Tema',''],['tsz','','','🔠','Tamaño: '+SZN[szGet()],PH()?'hidden':''],['tsnd','','','🔊','Sonidos: '+(sndOn()?'Sí':'No'),''],['fs','','','⛶','Pantalla completa','']];
openSheet('<h3>Más</h3><div class="mgo">'+B.map(function(b){return '<button type="button" class="'+b[5]+'" data-sh="mgo" data-a="'+b[0]+'" data-v="'+b[1]+'" data-t="'+b[2]+'"><span>'+b[3]+'</span>'+b[4]+'</button>'}).join('')+'</div><div class="acts"><button class="btn primary" data-sh="close">Cerrar</button></div>')}
