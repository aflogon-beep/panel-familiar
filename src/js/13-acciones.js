/* ===== acciones ===== */
var H={
nav:function(el){go(el.dataset.v)},alerts:function(){openAlerts()},more:function(){openMore()},agmore:function(){AGN+=14;renderAgl()},micq:function(){dictTo($('#qk-in'),function(){var f=$('#qkForm');if(f.requestSubmit)f.requestSubmit()})},
rt:function(el,e){
var k=el.dataset.k,id=el.dataset.id,dk=iso(today());
var r=S.rdone[dk]=S.rdone[dk]||{};var L=r[k]=r[k]||[];
var was=routineStats(k).all,i=L.indexOf(id);
if(i>=0)L.splice(i,1);else L.push(id);
var all=routineStats(k).all;render();if(i<0)celebrate(k,e,!was&&all);
if(!was&&all)toast('¡'+KIDS[k].n+' ha completado el día! +'+fm(dayAmt())+' €');
},
mis:function(el){
var m=S.mission[el.dataset.k];if(m.st==='ok'){toast('Esta misión ya está aprobada');return}
m.st=m.st==='todo'?'pending':'todo';m.day=iso(today());if(m.st==='pending')toast('Misión hecha. Falta que un adulto la apruebe');render();
},
sob:function(el){if(guard())return;var P=S.purse[el.dataset.k];if(P.g<1){toast('No hay euros en Gastar para mover');return}P.g-=1;P[el.dataset.s]+=1;toast('1 € movido de Gastar a '+(el.dataset.s==='s'?'Ahorrar':'Regalo'));render()},
ap:function(el){if(guard())return;var k=el.dataset.k,m=S.mission[k];m.st='ok';m.day=iso(today());S.pts[k]+=m.pts;toast('Misión aprobada: +'+m.pts+' puntos para '+KIDS[k].n);render()},
rw:function(el){
if(guard())return;var k=el.dataset.k,r=S.rewards.filter(function(x){return x.id===el.dataset.id})[0];
if(!r)return;if(S.pts[k]<r.c){toast('Faltan '+(r.c-S.pts[k])+' puntos');return}
S.pts[k]-=r.c;toast(KIDS[k].n+' canjea: '+r.t);render();
},
tk:function(el){if(guard())return;var x=S.tasks.filter(function(t){return t.id===el.dataset.id})[0];if(!x)return;x.done=!x.done;render()},
ev:function(el){openEvent(el.dataset.id,el.dataset.d)},
wk:function(el){
if(guard())return;var key=el.dataset.wk,sat=fromIso(key),nw=wkSt(sat)==='us'?'them':'us';
undoable(rangeLabel(sat)+': '+(nw==='us'?'con peques 🎉🥳':'sin peques 😢'),'Deshacer',function(){if(nw===autoSt(sat))delete S.custody.over[key];else S.custody.over[key]=nw;render()});
},
aj:function(el){if(guard())return;ajInit(el.dataset.t||'pag');ajOpen()},
wkall:function(){if(guard())return;openWkAll()},fltp:function(el){FLT=(FLT===el.dataset.v)?'all':el.dataset.v;try{localStorage.setItem('fam_flt',FLT)}catch(e){}draw();toast('Viendo: '+fltName())},fs:function(){fsGo();setTimeout(draw,400)},flt:function(){openFlt()},buz:function(){openBuz()},hor:function(el){openHor(el.dataset.k)},ntdel:function(el){if(guard())return;S.notes=(S.notes||[]).filter(function(n){return n.id!==el.dataset.id});render()},ntnew:function(){if(guard())return;openAdd('nt')},menushop:function(){if(guard())return;openMenuShop()},wkrange:function(){if(guard())return;openRange()},
calprev:function(){S.calOff--;renderCal();awayMark()},calnext:function(){S.calOff++;renderCal();awayMark()},caltoday:function(){S.calOff=0;renderCal();awayMark()},
menuprev:function(){S.menuOff--;renderMenu()},menunext:function(){S.menuOff++;renderMenu()},menutoday:function(){S.menuOff=0;renderMenu()},
me:function(el){if(guard())return;openMenuEdit(el.dataset.d,el.dataset.s)},
sup:function(){openSupx()},sxclose:function(){closeSupx()},catt:function(){CATOPEN=!CATOPEN;renderCompra()},whoami:function(){var m=ME()==='al'?'ju':'al';try{localStorage.setItem('fam_me',m)}catch(e){}renderCompra();toast('Ahora eres '+WHO[m])},aisle:function(){openAisle()},
micadd:function(){dictTo($('#addInp'),function(){var f=$('#addForm');if(f.requestSubmit)f.requestSubmit()})},sxmic:function(){dictTo($('#sx-in'),function(){var f=$('#sxForm');if(f.requestSubmit)f.requestSubmit()})},
sxclear:function(){if(guard())return;S.list=S.list.filter(function(x){return !x.done});closeSupx();toast('Compra terminada 🎉');render()},
ci:function(el){
if(guard())return;var c=allCat().filter(function(x){return x.n===el.dataset.n})[0];if(!c)return;
var r=addItem(c.n,c.sec,c.img);
if(el.classList.contains('sg')){$('#addInp').value='';renderSug()}
toast(r==='más'?'Otra unidad de '+c.n.toLowerCase():'«'+c.n+'» en la lista');render();
},
newsec:function(el){
if(guard())return;var q=$('#addInp').value.trim();if(!q)return;
addItem(q,el.dataset.sec);$('#addInp').value='';renderSug();toast('«'+q+'» guardado en '+secOf(el.dataset.sec).n);render();
},
li:function(el){if(guard())return;var x=S.list.filter(function(i){return i.id===el.dataset.id})[0];if(!x)return;x.done=!x.done;if(x.done){S.freq=S.freq||{};var fk=norm(x.n);S.freq[fk]=(S.freq[fk]||0)+1}render()},
lirm:function(el){if(guard())return;S.list=S.list.filter(function(i){return i.id!==el.dataset.id});render()},
tkrm:function(el){if(guard())return;S.tasks=S.tasks.filter(function(x){return x.id!==el.dataset.id});render()},
cc:function(el,e){
var m=el.dataset.m,p=Number(el.dataset.p)||0,kid=m==='a'||m==='e';
if(S.kid&&!kid){toast('Eso lo hacen los mayores');return}
var on=cToggle(el.dataset.key,m,p);
var all=on&&cAssign(today()).filter(function(x){return x.m===m}).every(function(x){return x.done});
render();
if(on&&kid){celebrate(m,e||{},all);toast((p?'+'+p+' puntos para ':'¡Bien hecho, ')+KIDS[m].n+(all?' · ¡todo hecho hoy!':''))}
else if(on)toast(all?'¡Todo hecho por hoy! 👏':'¡Hecho!');
},
crot:function(){if(guard())return;undoable('Tareas rotadas','Deshacer',function(){S.cfg=S.cfg||{};S.cfg.cshift=(S.cfg.cshift||0)+1;render()})},
cedit:function(){if(guard())return;openCasaEdit()},
wsum:function(){openSum(true)},
fridge:function(){slMan=true;slShow()},
clear:function(){if(guard())return;var n=S.list.filter(function(x){return x.done}).length;S.list=S.list.filter(function(x){return !x.done});toast(n?n+' comprados quitados de la lista':'No hay nada marcado');render()},
csec:function(el){catSec=el.dataset.sec;renderCompra()},
qm:function(el){if(guard())return;var x=S.list.filter(function(i){return i.id===el.dataset.id})[0];if(x&&x.q>1){x.q--;render()}},
qp:function(el){if(guard())return;var x=S.list.filter(function(i){return i.id===el.dataset.id})[0];if(x&&x.q<99){x.q++;render()}},
liedit:function(el){if(guard())return;openLi(el.dataset.id)},
off:function(el){if(guard())return;var o=OFF[+el.dataset.i];if(!o)return;
if(!allCat().some(function(c){return norm(c.n)===norm(o.n)}))S.catalog.push(C(o.n,o.sec,o.img));
addItem(o.n,o.sec,o.img);$('#addInp').value='';offHtml='';OFF=[];offQ='';renderSug();toast('«'+o.n+'» en '+secOf(o.sec).n);render()},
mic:function(){if(guard())return;openMic()},
kid:function(){if(!S.kid){S.kid=true;go('rutina');render();toast('Modo niños: pueden marcar la rutina y usar el buzón')}else{PIN='';drawPin()}},
theme:function(){var d=isDark()?'light':'dark';document.documentElement.dataset.theme=d;try{localStorage.setItem('fam_theme',d)}catch(e){}renderRail()}
};
document.addEventListener('click',function(e){
if(sheet.contains(e.target))return;
var el=e.target.closest('[data-act]');if(!el)return;
var fn=H[el.dataset.act];if(fn)fn(el,e);
});
document.addEventListener('keydown',function(e){
if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('[role="button"][data-act]')){e.preventDefault();e.target.click()}
});
(function(){
var LAB={lirm:'Producto quitado',clear:'Comprados quitados',sxclear:'Compra terminada',ntdel:'Nota borrada',tkrm:'Tarea quitada'},SLAB={evdel:'Evento quitado',evdel1:'Quitado ese día',lidel:'Producto quitado',bzdel:'Mensaje borrado'};
var wrap=function(O,k,lab){var f=O[k];if(!f)return;O[k]=function(el){var before=syJ();f(el);undoTo(lab,'Deshacer',before)}};
Object.keys(LAB).forEach(function(k){wrap(H,k,LAB[k])});Object.keys(SLAB).forEach(function(k){wrap(SH,k,SLAB[k])});
['li','tk'].forEach(function(k){var f=H[k];if(!f)return;H[k]=function(el){f(el);try{if(navigator.vibrate)navigator.vibrate(12)}catch(e){}}});
var nb=document.createElement('div');nb.id='netbar';nb.setAttribute('role','status');nb.textContent='Sin conexión · se guardará al volver';nb.hidden=navigator.onLine!==false;document.body.appendChild(nb);
window.addEventListener('offline',function(){nb.hidden=false});window.addEventListener('online',function(){nb.hidden=true;toast('Conexión recuperada')});
})();
(function(){
var CFG=[{s:'.sxr',r:'li',l:'lirm'},{s:'.li',r:'li',l:'lirm'},{s:'.tk',r:'tk',l:'tkrm'},{s:'.cc',r:'cc',l:''}];
var st=null,supp=0,hinted=false;
try{hinted=localStorage.getItem('fam_swh')==='1'}catch(e){}
function find(t){if(!t||!t.closest)return null;for(var i=0;i<CFG.length;i++){var r=t.closest(CFG[i].s);if(r&&r.dataset.act)return {row:r,c:CFG[i]}}return null}
function reset(row){row.classList.remove('sw','sw-r','sw-l','sw-ok','sw-go');row.style.transform='';row.style.boxShadow='';row.style.opacity='';row.style.removeProperty('--sw')}
document.addEventListener('pointerdown',function(e){
if(e.pointerType==='mouse'||e.isPrimary===false)return;
if(e.target.closest('.qty button,.rm,input,select,textarea'))return;
var f=find(e.target);if(!f)return;
st={row:f.row,c:f.c,x:e.clientX,y:e.clientY,id:e.pointerId,on:false,dx:0};
},true);
document.addEventListener('pointermove',function(e){
if(!st||e.pointerId!==st.id)return;
var dx=e.clientX-st.x,dy=e.clientY-st.y;
if(!st.on){
if(Math.abs(dy)>12&&Math.abs(dy)>Math.abs(dx)){st=null;return}
if(Math.abs(dx)<12||Math.abs(dx)<Math.abs(dy)*1.3)return;
if((dx>0&&!st.c.r)||(dx<0&&!st.c.l)){if(Math.abs(dx)>24)st=null;return}
st.on=true;try{st.row.setPointerCapture(e.pointerId)}catch(x){}
st.row.classList.add('sw');
}
dx=Math.max(-150,Math.min(150,dx));if(dx>0&&!st.c.r)dx=0;if(dx<0&&!st.c.l)dx=0;
st.dx=dx;var row=st.row;
row.style.transform='translateX('+dx+'px)';row.style.setProperty('--sw',dx+'px');
row.style.boxShadow=dx?(-dx)+'px 0 0 0 '+(dx>0?'#2a9d5c':'#d6453d'):'';
row.classList.toggle('sw-r',dx>0);row.classList.toggle('sw-l',dx<0);row.classList.toggle('sw-ok',Math.abs(dx)>=80);
e.preventDefault();
},{capture:true,passive:false});
function end(e,cancel){
if(!st||e.pointerId!==st.id)return;
var s=st;st=null;
if(!s.on)return;
supp=Date.now();
var row=s.row,dx=s.dx,act=Math.abs(dx)>=80&&!cancel?(dx>0?s.c.r:s.c.l):'';
if(!act){row.classList.add('sw-go');row.style.transform='';row.style.boxShadow='';setTimeout(function(){reset(row)},200);return}
var ev={clientX:e.clientX,clientY:e.clientY};
if(dx<0){row.classList.add('sw-go');row.style.transform='translateX(-110%)';row.style.opacity='0';setTimeout(function(){reset(row);if(H[act])H[act](row,ev)},170)}
else{reset(row);if(H[act])H[act](row,ev)}
}
document.addEventListener('pointerup',function(e){end(e,false)},true);
document.addEventListener('pointercancel',function(e){end(e,true)},true);
document.addEventListener('click',function(e){
if(Date.now()-supp<450){e.stopPropagation();e.preventDefault();return}
if(!hinted&&e.target.closest&&e.target.closest('.li,.sxr')){hinted=true;try{localStorage.setItem('fam_swh','1')}catch(x){}setTimeout(function(){toast('Truco: desliza → para tachar y ← para quitar')},600)}
},true);
})();
$('#addForm').addEventListener('submit',function(e){
e.preventDefault();if(guard())return;
var q=$('#addInp').value.trim();if(!q)return;
if(/[,;]|\sy\s|^\d|^(un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\s/i.test(q)||catSeg(q).length>1){var ad=addMany(q);$('#addInp').value='';renderSug();toast('Añadido: '+ad.join(', '));render();return}
var m=matches(q),ex=m.filter(function(c){return norm(c.n)===norm(q)})[0]||m[0];
if(ex){addItem(ex.n,ex.sec,ex.img);$('#addInp').value='';renderSug();toast('«'+ex.n+'» en la lista');render()}
else toast('Elige la sección para «'+q+'»');
});
$('#addInp').addEventListener('input',function(){renderSug();offSearch(this.value)});
$('#calScroll').addEventListener('scroll',function(){if(S.view==='cal')calY=this.scrollTop},{passive:true});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener&&window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',renderRail);
function tick(){renderClock();renderHome();updateNowLine()}
