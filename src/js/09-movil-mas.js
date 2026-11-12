/* ===== v4 · movil: un solo "+" ===== */
function openAddMenu(){
var cx=defType(),B=[['cp','🛒','Compra','A la lista'],['ev','📅','Evento','Con día y hora'],['tk','✅','Tarea','Con fecha límite'],['nt','📌','Nota','Para la familia'],['bz','📮','Buzón','Un mensaje'],['xm','📝','Examen','Fecha señalada']];
openSheet('<h3>Añadir</h3><div class="am">'+B.map(function(b){return '<button type="button" class="'+(b[0]===cx?'ctx':'')+'" data-sh="am" data-v="'+b[0]+'"><span aria-hidden="true">'+b[1]+'</span><b>'+b[2]+'</b><small>'+b[3]+'</small></button>'}).join('')+'</div><div class="acts"><button class="btn ghost" data-sh="close">Cancelar</button></div>',true)}
var QB=[];
function qbDraw(){
var ok=$('#qbOk',sheet);if(ok)ok.innerHTML=QB.slice(-12).map(function(n){return '<span class="chip ok">✓ '+esc(n)+'</span>'}).join('');
var inl={};S.list.forEach(function(x){if(!x.done)inl[norm(x.n)]=1});
$$('#qbFav .qki',sheet).forEach(function(b){var on=!!inl[norm(b.dataset.n)];b.classList.toggle('in',on);b.textContent=(on?'✓ ':'')+b.dataset.n})}
function openQuickBuy(){
QB=[];var fv=favList(),inl={};S.list.forEach(function(x){if(!x.done)inl[norm(x.n)]=1});
openSheet('<h3>🛒 Añadir a la compra</h3><form id="qbForm" class="qb-f" autocomplete="off"><input id="qb-in" placeholder="Leche, pan, 2 yogures…" enterkeyhint="done" aria-label="Qué hay que comprar"><button type="button" class="btn" data-sh="qbmic" aria-label="Dictar">🎤</button><button type="submit" class="btn primary">Añadir</button></form><div class="qb-ok" id="qbOk" aria-live="polite"></div>'+
(fv.length?'<h2 class="eyebrow">Habituales</h2><div class="qb-fav" id="qbFav">'+fv.map(function(x){var on=!!inl[norm(x.c.n)];return '<button type="button" class="qki'+(on?' in':'')+'" data-sh="qbfav" data-n="'+esc(x.c.n)+'">'+(on?'✓ ':'')+esc(x.c.n)+'</button>'}).join('')+'</div>':'')+
'<div class="acts"><button class="btn primary" data-sh="close">Listo</button></div>')}
document.addEventListener('submit',function(e){var f=e.target;if(!f||f.id!=='qbForm')return;e.preventDefault();if(guard())return;var i=$('#qb-in'),q=(i.value||'').trim();if(!q)return;
var tf=document.activeElement===i;var ad=addMany(q);QB=QB.concat(ad);i.value='';render();qbDraw();if(tf)setTimeout(function(){var j=$('#qb-in');if(j)j.focus()},30);else i.blur()});
function fabUpd(){
var f=$('#fab');if(!f)return;var v=S.view,ph=PH(),k=!!S.kid,show;
if(k)show=ph?['home','rutina','cal','tareas','compra'].indexOf(v)>=0:['cal','tareas','compra'].indexOf(v)>=0;
else show=ph?['home','cal','tareas','compra'].indexOf(v)>=0:['cal','tareas','compra'].indexOf(v)>=0;
f.hidden=!show;
var key='a';
if(f.dataset.m!==key){f.dataset.m=key;f.setAttribute('aria-label',k?'Buzón':'Añadir');f.innerHTML=k?'<span class="fe" aria-hidden="true">📮</span>':ic('plus')}}
