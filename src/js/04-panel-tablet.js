/* ===== v4 · panel de tablet (Inicio) ===== */
function whoTag(w,px){
if(w==='all')return '<span class="chip all">Todos</span>';
var L=AVC[w]?[w]:w==='adults'?['al','ju']:[];
if(!L.length)return '';
return '<span class="avs'+(L.length>1?' stk':'')+'" title="'+esc(WHO[w]||'')+'">'+L.map(function(m){return avImg(m,px||28)}).join('')+'</span>'}
function dcHead(icn,title,sub,v){
return '<div class="dc-h"><button type="button" class="dc-t" data-act="nav" data-v="'+v+'">'+ic(icn)+'<span>'+title+'</span>'+ic('chr','sm')+'</button>'+(sub?'<span class="dc-x">'+sub+'</span>':'')+'</div>'}
function dWxHtml(){
if(!WXC)return '<span class="dw-l">Cargando el tiempo…</span>';
return '<span class="dw-i" aria-hidden="true">'+WXC.i+'</span><span class="dw-m"><b class="num">'+WXC.t+'°</b><small>'+esc(WXC.d)+' · '+WXC.a+'°–'+WXC.b+'°</small>'+(WXC.tn!==undefined?'<small>Mañana '+WXC.ti+' '+WXC.tn+'°–'+WXC.tx+'°</small>':'')+'</span>'}
function renderWx(){var a=$('#dWx');if(a)a.innerHTML=dWxHtml();var b=$('#hWx');if(b)b.innerHTML=hWxHtml()}
function hWxHtml(){return WXC?'<span aria-hidden="true">'+WXC.i+'</span>'+WXC.t+'°<small>'+WXC.a+'–'+WXC.b+'°</small>':''}
function dTkHtml(){
var t=today(),it=[],buy=S.list.filter(function(x){return !x.done}).length;
S.exams.filter(function(x){return vis(x.w)}).forEach(function(x){var n=dd(t,fromIso(x.date));if(n>=0&&n<=14)it.push({k:'x',n:n,x:x})});
S.tasks.filter(function(x){return !x.done&&vis(x.w)}).forEach(function(x){var n=dd(t,fromIso(x.due));if(n<=14)it.push({k:'t',n:n,x:x})});
it.sort(function(a,b){return a.n-b.n||(a.k==='x'?-1:1)});
var rows=it.map(function(o){var x=o.x;
if(o.k==='x')return '<button type="button" class="fi dt xm'+(o.n<=3?' soon':'')+'" data-act="nav" data-v="tareas"><span class="xd">'+(o.n===0?'¡Hoy!':'<i class="num">'+o.n+'</i><small>'+(o.n===1?'día':'días')+'</small>')+'</span><b>📝 '+esc(x.t)+'</b><small>Examen · '+esc(WHO[x.w])+'</small></button>';
var cls=o.n<0?'bad':o.n<=1?'warn':'';
return '<button type="button" class="fi dt" data-act="tk" data-id="'+x.id+'"><span class="cb">'+ic('check','sm')+'</span><b>'+evIcon(x.t,'✅')+' '+esc(x.t)+'</b><small class="'+cls+'">'+whoTag(x.w,18)+esc(whenLbl(o.n,'t'))+'</small></button>'}).join('');
if(!rows)rows='<div class="dc-empty"><b>Todo al día</b><span>Nada pendiente 🎉</span></div>';
return dcHead('tareas','Tareas y exámenes','','tareas')+'<div class="dc-b fitbox">'+rows+'</div>'}
function dCasaHtml(){
var A=cAssign(today()),tot=A.length,dn=A.filter(function(x){return x.done}).length,ord=cOrder();
if(!tot)return dcHead('casa','Casa hoy','','casa')+'<div class="dc-b"><div class="dc-empty">'+((S.chores||[]).length&&!atHome(today())?'<b>Hoy no toca</b><span>Próximo día: '+esc(nextHome())+'</span>':'<b>Sin tareas de casa</b><span class="adult-only">Se apuntan desde Casa › Tareas</span>')+'</div></div>';
A=A.slice().sort(function(a,b){return (a.done-b.done)||(ord.indexOf(a.m)-ord.indexOf(b.m))});
var rows=A.map(function(x){return '<button type="button" class="fi dt'+(x.done?' done':'')+'" data-act="cc" data-key="'+esc(x.key)+'" data-m="'+x.m+'" data-p="'+(Number(x.c.p)||0)+'"><span class="cb">'+ic('check','sm')+'</span><b>'+esc(((x.c.i||'')+' '+x.c.t).trim())+'</b><small>'+avImg(x.m,18)+esc(WHO[x.m])+(x.c.f==='w'?' · esta semana':'')+'</small></button>'}).join('');
return dcHead('casa','Casa hoy','<span class="chip num '+(dn===tot?'ok':'')+'">'+dn+'/'+tot+'</span>','casa')+'<div class="dc-b fitbox">'+rows+'</div>'}
function fitAlerts(){
var box=$('#dAl');if(!box||!box.clientWidth||innerWidth<900)return;
var chips=$$(':scope>.al:not(.al-more)',box),n=chips.length;if(n<2)return;
var avail=box.clientWidth,sum=0,k=0,moreW=116;
for(var i=0;i<n;i++){var need=sum+chips[i].offsetWidth+(i?8:0);if(need+(i<n-1?moreW+8:0)<=avail||(i===n-1&&need<=avail)){sum=need;k=i+1}else break}
if(k<1)k=1;
if(k<n){for(var j=k;j<n;j++)chips[j].remove();var m=document.createElement('button');m.type='button';m.className='al al-more';m.dataset.act='alerts';m.textContent='+'+(n-k)+' avisos';box.appendChild(m)}}
function fitDash(){
var v=$('#v-home');if(!v||!v.classList.contains('on')||PH())return;
$$('#dash .fitbox').forEach(fitBox);fitAlerts()}
function openAlerts(){var a=alertsList();openSheet('<h3>🔔 Avisos</h3><div class="alsh">'+(a.length?a.map(function(x){return alertChip(x,true)}).join(''):'<div class="empty">Todo en orden por hoy ✓</div>')+'</div><div class="acts"><button class="btn primary" data-sh="close">Cerrar</button></div>',true)}
var rzT=0;window.addEventListener('resize',function(){clearTimeout(rzT);rzT=setTimeout(function(){if(!PH())renderDash()},160)});
try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){if(!PH())renderDash()})}catch(e){}
