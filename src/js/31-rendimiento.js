/* ===== v18 · rendimiento: sin layouts forzados en put y vistas perezosas ===== */
document.addEventListener('scroll',function(e){var t=e.target;if(t&&t.nodeType===1)t.__sy=t.scrollTop},{capture:true,passive:true});
var VDIRTY={},VREN={home:function(){renderHome();renderCasaCard()},rutina:renderRutina,cal:function(){renderCal();renderAg9()},tareas:renderTareas,compra:renderCompra,menu:renderMenu,banco:renderBanco,casa:renderCasa};
function drawView(v){var f=VREN[v];if(f){f();VDIRTY[v]=false;awayMark()}}
function fitBox(box){
if(!box||!box.clientHeight)return;
var items=$$(':scope>.fi',box);if(!items.length)return;var ch=box.clientHeight,over=box.scrollHeight-ch;if(over<=1)return;
var gap=parseFloat(getComputedStyle(box).rowGap)||0,hs=items.map(function(e){return e.offsetHeight+gap}),rm=[],hid=0;
if(box.dataset.fit==='past'){while(over>1&&items.length>1&&items[0].classList.contains('past')){over-=hs.shift();rm.push(items.shift())}
while(over>1&&items.length>1&&items[items.length-1].classList.contains('opt')){over-=hs.pop();rm.push(items.pop())}
var l=items[items.length-1];if(l&&l.classList.contains('dv-h')){over-=hs.pop();rm.push(items.pop())}}
var mh=30;while(over+(over>1||hid?mh:0)>1&&items.length>1){over-=hs.pop();rm.push(items.pop());hid++}
rm.forEach(function(e){e.remove()});
if(hid){var short=box.dataset.more==='short',m=document.createElement('div');m.className='dc-more';box.appendChild(m);var lab=function(){m.textContent='+'+hid+(short?'':' más')};lab();
while(box.scrollHeight>box.clientHeight+1&&items.length>1){items.pop().remove();hid++;lab()}}}
var FITQ=0;
(function(){if(!('serviceWorker' in navigator))return;var last=Date.now(),pend=false;['pointerdown','keydown','touchstart'].forEach(function(t){document.addEventListener(t,function(){last=Date.now()},{passive:true,capture:true})});
navigator.serviceWorker.addEventListener('message',function(e){if(e.data==='panel-upd')pend=true});
var mine=(document.querySelector('meta[name=build]')||{}).content;setTimeout(function(){if(!navigator.serviceWorker.controller||!mine)return;fetch(location.pathname,{cache:'no-store'}).then(function(r){return r.ok?r.text():''}).then(function(t){var m=/<meta name="build" content="([^"]+)"/.exec(t);if(m&&m[1]!==mine)pend=true}).catch(function(){})},6000);
setInterval(function(){if(!pend)return;var sc=$('#scrim'),ae=document.activeElement,occ=(sc&&!sc.hidden)||document.querySelector('#pr16.on,#cel15.on')||(ae&&/INPUT|TEXTAREA|SELECT/.test(ae.tagName));if(!occ&&Date.now()-last>15000){pend=false;location.reload()}},3000)})();
function start(){$('#login').hidden=true;cacheLoad();pull().then(function(){extLoad()});}
$('#loginForm').addEventListener('submit',function(e){
e.preventDefault();var v=$('#loginKey').value.trim();if(!v)return;
fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({k:v})}).then(function(r){return r.json().then(function(j){return {s:r.status,j:j}})}).then(function(x){
if(x.s===200&&x.j.token){KEY=x.j.token;try{localStorage.setItem('fam_key',KEY)}catch(e2){}$('#loginKey').value='';rev=-1;start()}
else if(x.s===429)showLogin('Demasiados intentos. Espera unos minutos.');
else showLogin('Contraseña incorrecta')}).catch(function(){showLogin('Sin conexión: inténtalo de nuevo')});
});
document.addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='IMG'&&t.parentNode)t.replaceWith(document.createTextNode(String.fromCodePoint(128722)))},true);
document.addEventListener('visibilitychange',function(){if(!document.hidden)pull()});
setInterval(pull,30000);
