/* ===== hojas ===== */
var scrim=$('#scrim'),sheet=$('#sheet');
var lastFoc=null;
function openSheet(html,nf){if(scrim.hidden)lastFoc=document.activeElement;sheet.innerHTML=html;scrim.hidden=false;var h=$('h3',sheet);sheet.setAttribute('aria-label',h?h.textContent:'Ventana');var i=$('input',sheet);if(i&&!nf)i.focus()}
function closeSheet(){scrim.hidden=true;sheet.innerHTML='';var f=lastFoc;lastFoc=null;if(f&&f!==document.body&&f.focus&&document.contains(f))try{f.focus()}catch(e){}}
var seg=function(name,opts,sel){return '<div class="seg" data-seg="'+name+'">'+opts.map(function(o){return '<button type="button" data-v="'+o[0]+'" class="'+(String(o[0])===String(sel)?'on':'')+'">'+(name==='w'?avImg(o[0],22)+' ':'')+esc(o[1])+'</button>'}).join('')+'</div>'};
var F=null,R=null,M=null,PIN='';
var TYPES=[['ev','Evento'],['tk','Tarea'],['xm','Examen'],['cp','Compra'],['nt','Nota']];
function defType(){return {cal:'ev',tareas:'tk',compra:'cp'}[S.view]||'ev'}
function openAdd(type){F={type:type||defType(),nu:'3',rep:'',days:[],until:'',w:(FLT==='a'||FLT==='e'||FLT==='al'||FLT==='ju'?FLT:FLT==='ad'?'adults':'all'),dur:60,date:iso(today()),time:'17:00',title:'',sec:'fv'};drawAdd()}
function syncForm(){
var g=function(id){var el=$('#'+id,sheet);return el?el.value:null};
var t=g('f-title');if(t!==null)F.title=t;
var d=g('f-date');if(d)F.date=d;
var tm=g('f-time');if(tm)F.time=tm;
}
function drawAdd(){
var T=F.type,f='';if(T==='xm'&&['a','e'].indexOf(F.w)<0)F.w='a';
var lab={ev:'¿Qué hay?',tk:'¿Qué tienen que hacer?',xm:'Asignatura',cp:'Producto',nt:'¿Qué quieres decirles?'}[T];
f+='<label class="fld">'+lab+'<input id="f-title" value="'+esc(F.title)+'" autocomplete="off"></label>';
if(T==='ev')f+='<div class="fld">Día'+dpHtml('f-date',F.date)+'</div><div class="fld">Hora'+tpHtml('f-time',F.time)+'</div><div class="fld">Duración'+seg('dur',[[30,'30 min'],[60,'1 h'],[90,'1 h 30'],[120,'2 h']],F.dur)+'</div>'+repHtml();
if(T==='ev')f+='<div class="fld">Para quién'+seg('w',[['all','Todos'],['a',KIDS.a.n],['e',KIDS.e.n],['al',WHO.al],['ju',WHO.ju],['adults','Ambos']],F.w)+'</div>';
if(T==='tk')f+='<div class="fld">Para quién'+seg('w',[['all','Todos'],['a',KIDS.a.n],['e',KIDS.e.n],['al',WHO.al],['ju',WHO.ju],['adults','Ambos']],F.w)+'</div><div class="fld">Fecha límite'+dpHtml('f-date',F.date)+'</div>';
if(T==='xm')f+='<div class="fld">De quién'+seg('w',[['a',KIDS.a.n],['e',KIDS.e.n]],F.w)+'</div><div class="fld">Día del examen'+dpHtml('f-date',F.date)+'</div>';
if(T==='nt')f+='<div class="fld">Para quién'+seg('w',[['all','Todos'],['a',KIDS.a.n],['e',KIDS.e.n],['al',WHO.al],['ju',WHO.ju],['adults','Ambos']],F.w)+'</div><div class="fld">Se muestra'+seg('nu',[['1','Hoy'],['3','3 días'],['7','1 semana'],['0','Sin fin']],F.nu)+'</div>';
if(T==='cp')f+='<div class="fld">Sección'+seg('sec',SEC.map(function(s){return [s.id,s.n]}),F.sec)+'</div>';
openSheet('<h3>'+(F.edit?'✏️ Editar':'Añadir')+'</h3>'+(F.edit?'':seg('type',TYPES,T).replace('class="seg"','class="seg types"'))+f+'<div class="acts">'+(F.edit&&!S.kid?'<button class="btn ghost" style="color:var(--bad-ink)" data-sh="eddel">Borrar</button>':'')+'<button class="btn ghost" data-sh="close">Cancelar</button><button class="btn primary" data-sh="save">Guardar</button></div>');
}
function saveAdd(){
syncForm();var T=F.type,title=F.title.trim();
if(!title){toast('Escribe un título');return}
if(T==='ev'){var st=mins(F.time||'17:00');var ev0={id:nid('ev'),date:F.date,s:hm(st),e:hm(Math.min(st+F.dur,23*60+59)),t:title,w:F.w};if(F.rep){var rc={f:F.rep};if(F.rep==='w'){var dy=(F.days&&F.days.length?F.days.slice():[dow(fromIso(F.date))]).sort();rc.days=dy;var d0=fromIso(F.date);for(var q0=0;q0<7&&dy.indexOf(dow(d0))<0;q0++)d0=add(d0,1);ev0.date=iso(d0)}var u0=fromIso(F.date);if(F.until==='m1'){u0.setMonth(u0.getMonth()+1);rc.until=iso(u0)}else if(F.until==='m3'){u0.setMonth(u0.getMonth()+3);rc.until=iso(u0)}else if(F.until==='sc'){var yy=u0.getMonth()>=6?u0.getFullYear()+1:u0.getFullYear();rc.until=yy+'-06-23'}ev0.rec=rc}S.events.push(ev0);toast('Evento apuntado')}
if(T==='tk'){S.tasks.push({id:nid('t'),t:title,w:F.w,due:F.date,done:false});toast('Tarea apuntada')}
if(T==='xm'){S.exams.push({id:nid('x'),t:title,w:F.w,date:F.date});toast('Examen apuntado')}
if(T==='nt'){var nu=Number(F.nu||0),nd=nu?iso(add(today(),nu-1)):'';S.notes=S.notes||[];S.notes.push({id:nid('nt'),t:title,w:F.w,until:nd});toast('Nota puesta')}if(T==='cp'){addItem(title,F.sec);toast('«'+title+'» añadido a la compra')}
closeSheet();render();
}
function openEvent(id,date){
var e=S.events.filter(function(x){return x.id===id})[0],ext=false;
if(!e){e=EXT.filter(function(x){return x.id===id})[0];ext=true}
if(!e)return;
var dk=date||e.date,d=fromIso(dk),rec=!!e.rec&&!ext;
var wl=rec?({d:'Se repite cada día',w:'Se repite cada semana',m:'Se repite cada mes'})[e.rec.f]+(e.rec.until?' hasta el '+dl(fromIso(e.rec.until)):''):'';
var tm=e.ad?'Todo el día':e.s+'–'+e.e;
var del=S.kid||ext?'':(rec?'<button class="btn ghost" data-sh="evdel1" data-id="'+id+'" data-d="'+dk+'">Quitar solo este día</button><button class="btn ghost" style="color:var(--bad-ink)" data-sh="evdel" data-id="'+id+'">Quitar toda la serie</button>':'<button class="btn ghost" style="color:var(--bad-ink)" data-sh="evdel" data-id="'+id+'">Quitar</button>');
openSheet('<h3>'+evIcon(e.t)+' '+esc(e.t)+'</h3><p class="muted" style="font-weight:700;font-size:17px">'+cap(DOW[dow(d)])+' '+d.getDate()+' de '+MONTH[d.getMonth()]+' · '+tm+'</p><div><span class="chip '+e.w+'">'+WHO[e.w]+'</span>'+(wl?' <span class="chip">🔁 '+wl+'</span>':'')+(ext?' <span class="chip">📅 '+esc(e.cal||'Calendario')+'</span>':'')+'</div><div class="acts">'+del+(ext?'':'<button class="btn" data-sh="evedit" data-id="'+id+'">✏️ Editar</button>')+'<button class="btn primary" data-sh="close">Cerrar</button></div>');
}
function repHtml(){var h='<div class="fld">Se repite'+seg('rep',[['','No'],['d','Cada día'],['w','Cada semana'],['m','Cada mes']],F.rep)+'</div>';if(F.rep==='w'){h+='<div class="fld">Los días<div class="seg">'+['L','M','X','J','V','S','D'].map(function(l,i){return '<button type="button" data-sh="rdow" data-v="'+i+'" class="'+((F.days||[]).indexOf(i)>=0?'on':'')+'">'+l+'</button>'}).join('')+'</div></div>'}if(F.rep)h+='<div class="fld">Hasta'+seg('until',[['','Sin fin'],['m1','1 mes'],['m3','3 meses'],['sc','Fin de curso']],F.until)+'</div>';return h}
function dpLabel(d){return cap(DOWS[dow(d)])+' '+d.getDate()+' de '+MONTH[d.getMonth()]+' '+d.getFullYear()}
function dpHtml(id,val){return '<div class="dp" data-dp="'+id+'"><input type="hidden" id="'+id+'" value="'+val+'"><button type="button" class="dp-btn" data-sh="dpt" data-id="'+id+'"><span class="dp-i">📅</span><span class="dp-v">'+dpLabel(fromIso(val))+'</span><span class="dp-c">▾</span></button><div class="dp-pop" hidden></div></div>'}
function dpGrid(dp){
var inp=$('input',dp),val=inp.value,m0=dp.dataset.m?fromIso(dp.dataset.m):fromIso(val),m=mk(m0.getFullYear(),m0.getMonth(),1);
dp.dataset.m=iso(m);var id=inp.id,tk=iso(today());
var h='<div class="dp-q">'+[['Hoy',0],['Mañana',1],['En 1 semana',7],['En 2 semanas',14]].map(function(x){return '<button type="button" data-sh="dpq" data-id="'+id+'" data-n="'+x[1]+'">'+x[0]+'</button>'}).join('')+'</div>';
h+='<div class="dp-h"><button type="button" data-sh="dpm" data-id="'+id+'" data-d="-1" aria-label="Mes anterior">‹</button><b>'+cap(MONTH[m.getMonth()])+' '+m.getFullYear()+'</b><button type="button" data-sh="dpm" data-id="'+id+'" data-d="1" aria-label="Mes siguiente">›</button></div>';
h+='<div class="dp-w">'+['L','M','X','J','V','S','D'].map(function(l){return '<i>'+l+'</i>'}).join('')+'</div><div class="dp-g">';
for(var i=0;i<dow(m);i++)h+='<i></i>';
var n=new Date(m.getFullYear(),m.getMonth()+1,0).getDate();
for(var d=1;d<=n;d++){var dt=mk(m.getFullYear(),m.getMonth(),d),k=iso(dt);h+='<button type="button" class="dp-d'+(k===val?' sel':'')+(k===tk?' tod':'')+(dow(dt)>=5?' we':'')+'" data-sh="dpd" data-id="'+id+'" data-v="'+k+'">'+d+'</button>'}
return h+'</div>';
}
function dpSet(id,k,close){var dp=$('.dp[data-dp="'+id+'"]',sheet),pop=$('.dp-pop',dp);$('input',dp).value=k;$('.dp-v',dp).textContent=dpLabel(fromIso(k));dp.dataset.m=k;if(close)pop.hidden=true;else pop.innerHTML=dpGrid(dp);var rg=/^aj-d([ab])-(\d+)$/.exec(id);if(rg){var oid='aj-d'+(rg[1]==='a'?'b':'a')+'-'+rg[2],oi=document.getElementById(oid);if(oi&&(rg[1]==='a'?oi.value<k:oi.value>k))dpSet(oid,k,true)}}
function tpHtml(id,val){var b=function(d,l){return '<button type="button" data-sh="tps" data-id="'+id+'" data-d="'+d+'">'+l+'</button>'};return '<div class="tp" data-tp="'+id+'"><input type="hidden" id="'+id+'" value="'+val+'"><div class="tp-s">'+b(-60,'−1 h')+b(-15,'−15')+'<b class="num">'+val+'</b>'+b(15,'+15')+b(60,'+1 h')+'</div><div class="tp-q">'+['08:00','15:00','16:00','17:00','18:00','19:00'].map(function(t){return '<button type="button" data-sh="tpq" data-id="'+id+'" data-v="'+t+'">'+t+'</button>'}).join('')+'</div></div>'}
function tpSet(id,m){m=Math.max(0,Math.min(23*60+45,Math.round(m/15)*15));var v=hm(m),tp=$('.tp[data-tp="'+id+'"]',sheet);$('#'+id,sheet).value=v;$('b',tp).textContent=v}
function openRange(){var sat=satOf(today());R={from:iso(sat),to:iso(add(sat,21)),st:'them'};drawRange()}
function drawRange(){
openSheet('<h3>Marcar varios fines de semana</h3><p class="muted" style="font-weight:700">Para vacaciones, puentes o cambios de calendario. Se aplica a todos los fines de semana entre las dos fechas.</p><div class="fld">Desde'+dpHtml('r-from',R.from)+'</div><div class="fld">Hasta'+dpHtml('r-to',R.to)+'</div><div class="fld">Los niños están'+seg('rst',[['us','Con peques 🎉🥳😄'],['them','Sin peques 😢']],R.st)+'</div><div class="acts"><button class="btn ghost" data-sh="close">Cancelar</button><button class="btn primary" data-sh="rsave">Aplicar</button></div>');
}
var DISH={'lentejas':['Lentejas','Chorizo','Zanahorias','Patatas','Cebolla'],'macarrones':['Macarrones','Tomate frito','Queso rallado','Carne picada'],'espaguetis':['Espaguetis','Tomate frito','Queso rallado'],'tortilla de patatas':['Huevos','Patatas','Cebolla'],'pizza':['Masa de pizza','Tomate frito','Queso rallado','Jamón york'],'pollo asado':['Pollo entero','Patatas'],'pescado a la plancha':['Pescado blanco','Limones'],'arroz con tomate':['Arroz','Tomate frito','Huevos'],'ensalada y croquetas':['Lechuga','Tomates','Croquetas'],'paella':['Arroz','Pollo','Gambas','Pimientos'],'hamburguesa':['Hamburguesas','Pan de hamburguesa','Queso','Lechuga','Tomates'],'merluza':['Merluza','Limones'],'salmon':['Salmón','Limones'],'pure':['Patatas','Zanahorias','Puerros'],'sopa':['Caldo','Fideos'],'croquetas':['Croquetas'],'huevos fritos':['Huevos','Patatas'],'filetes':['Filetes de ternera','Patatas'],'bocadillo':['Pan de barra','Jamón york','Queso'],'ensalada':['Lechuga','Tomates','Atún en lata'],'albondigas':['Carne picada','Tomate frito','Huevos'],'potaje':['Garbanzos','Verdura para potaje'],'garbanzas':['Garbanzos','Verdura para potaje'],'pasta':['Pasta','Tomate frito','Queso rallado'],'pescado':['Pescado blanco','Limones'],'pollo':['Pollo','Patatas'],'carne':['Carne','Patatas']};
function ingFor(dish){var n=norm(dish||'');if(!n)return [];if(DISH[n])return DISH[n].slice();var ks=Object.keys(DISH).sort(function(a,b){return b.length-a.length});for(var i=0;i<ks.length;i++){if(n.indexOf(ks[i])>=0)return DISH[ks[i]].slice()}return []}
function menuIng(d,s){var m=S.menu[d]||{},v=m[s+'i'];if(!m[s])return [];if(v===undefined)return ingFor(m[s]);return v.split(',').map(function(x){return x.trim()}).filter(function(x){return x})}
function secGuess(name){var n=norm(name),cat=allCat().filter(function(c){return norm(c.n)===n})[0];if(cat)return cat.sec;
var K=[['carne',['pollo','carne','ternera','cerdo','chuleta','salchicha','hamburguesa','chorizo','jamon','pavo']],['pescado',['pescado','merluza','salmon','atun fresco','gamba','dorada','lubina','bacalao','calamar']],['fv',['tomate','lechuga','cebolla','zanahoria','patata','pimiento','calabacin','ajo','limon','fruta','verdura','champi','pepino','aguacate','brocoli','judia','puerro','manzana','platano','naranja']],['lac',['leche','queso','huevo','yogur','nata','mantequilla']],['pan',['pan ','masa','harina']],['cong',['congelad']],['beb',['agua','refresco','zumo','cerveza']]];
for(var i=0;i<K.length;i++){for(var j=0;j<K[i][1].length;j++){if((n+' ').indexOf(K[i][1][j])>=0)return K[i][0]}}return 'des'}
var MSH=[];
function openMenuShop(){
var mon=add(monOf(today()),7*S.menuOff),map={},order=[];
for(var i=0;i<7;i++){var k=iso(add(mon,i));['c','d'].forEach(function(s){menuIng(k,s).forEach(function(nm){var key=norm(nm);if(!map[key]){map[key]={n:nm,on:true,have:false};order.push(key)}})})}
var pend={};S.list.forEach(function(x){if(!x.done)pend[norm(x.n)]=1});
MSH=order.map(function(key){var o=map[key];o.have=!!pend[key];o.on=!o.have;return o});
drawMenuShop();
}
function drawMenuShop(){
var n=MSH.filter(function(x){return x.on}).length;
openSheet('<h3>🛒 Ingredientes de la semana</h3>'+(MSH.length?'<p class="muted ajn">Toca para quitar lo que ya tengáis en casa. Lo que ya está en la lista sale tachado.</p><div class="mschips">'+MSH.map(function(x,i){return '<button type="button" class="msc'+(x.on?' on':'')+(x.have?' have':'')+'" data-sh="mstog" data-i="'+i+'">'+(x.on?'✓ ':'')+esc(x.n)+(x.have?' · ya está':'')+'</button>'}).join('')+'</div>':'<p class="muted" style="font-weight:700">Apunta platos en el menú de esta semana y aquí salen sus ingredientes. En cada plato puedes ajustar los ingredientes.</p>')+'<div class="acts"><button class="btn ghost" data-sh="close">Cerrar</button>'+(MSH.length?'<button class="btn primary" data-sh="msgo">Añadir '+n+' a la compra</button>':'')+'</div>');
}
function notesHtml(k){var L=(S.notes||[]).filter(function(n){return (n.w==='all'||n.w===k)&&(!n.until||n.until>=iso(today()))});return L.length?'<div class="notes">'+L.map(function(n){return '<div class="note">📌 <span>'+esc(n.t)+'</span>'+(n.w==='all'?'<small>para todos</small>':'')+(S.kid?'':'<button class="nx" data-act="ntdel" data-id="'+n.id+'" aria-label="Quitar nota">✕</button>')+'</div>'}).join('')+'</div>':''}
function openMenuEdit(d,s){
M={d:d,s:s};var dt=fromIso(d),cur=(S.menu[d]||{})[s]||'';
var ing=(S.menu[d]||{})[s+'i'];if(ing===undefined)ing=ingFor(cur).join(', ');
var ideas=['Lentejas','Macarrones','Tortilla de patatas','Pizza','Pollo asado','Pescado a la plancha','Arroz con tomate','Ensalada y croquetas'];
openSheet('<h3>'+(s==='c'?'Comida':'Cena')+' · '+dl(dt)+'</h3><label class="fld">Plato<input id="m-in" value="'+esc(cur)+'" autocomplete="off"></label><div class="seg">'+ideas.map(function(x){return '<button type="button" data-sh="mpick" data-v="'+esc(x)+'">'+esc(x)+'</button>'}).join('')+'</div><label class="fld">Ingredientes (para la compra, separados por comas)<input id="m-ing" value="'+esc(ing)+'" placeholder="p. ej. Macarrones, Tomate frito" autocomplete="off"></label><div class="acts">'+(cur?'<button class="btn ghost" data-sh="mclear">Quitar</button>':'')+'<button class="btn ghost" data-sh="close">Cancelar</button><button class="btn primary" data-sh="msave">Guardar</button></div>');
}
var VC=null,VCR=null,BK=null;
var vcN=function(s){return String(s).toLowerCase().normalize('NFD').replace(new RegExp('['+String.fromCharCode(768)+'-'+String.fromCharCode(879)+']','g'),'')};
var VWD={lunes:0,martes:1,miercoles:2,jueves:3,viernes:4,sabado:5,domingo:6};
var VMO={enero:0,febrero:1,marzo:2,abril:3,mayo:4,junio:5,julio:6,agosto:7,septiembre:8,setiembre:8,octubre:9,noviembre:10,diciembre:11};
var VMOR=Object.keys(VMO).join('|');
var VNUM={un:1,una:1,uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6};
var VFILL=['deja','dile','dales','apunta','apuntame','pon','ponme','agenda','anota','recuerdame','tenemos','tiene','tienen','hay','un','una','el','la','los','las','de','del','para','a','que','por','favor','con','en','y','este','proximo','examen','tarea','deberes','prueba','control','mañana'];
function vcMask(m,n,re){var r=new RegExp(re.source,'g'),x;while((x=r.exec(n))){for(var i=x.index;i<x.index+x[0].length;i++)m[i]=1;if(x[0].length===0)r.lastIndex++}}
function vcLeft(txt,m,from,to){var o='';for(var i=from||0;i<(to===undefined?txt.length:to);i++){if(!m[i])o+=txt.charAt(i)}var w=o.split(' ').filter(function(x){return x}),n=function(x){return vcN(x).replace(new RegExp('[^a-z0-9]','g'),'')};while(w.length&&VFILL.indexOf(n(w[0]))>=0)w.shift();while(w.length&&VFILL.indexOf(n(w[w.length-1]))>=0)w.pop();return w.join(' ').replace(new RegExp('^[:,.]+|[:,.]+$','g'),'').trim()}
function vcDate(n,m){
var t=today(),x;
if(/pasado manana/.test(n)){vcMask(m,n,/pasado manana/);return add(t,2)}
if((x=/(?:dentro de|en) (\d+) dias?/.exec(n))){vcMask(m,n,/(?:dentro de|en) \d+ dias?/);return add(t,Number(x[1]))}
if((x=/(lunes|martes|miercoles|jueves|viernes|sabado|domingo)/.exec(n))){vcMask(m,n,/(?:el proximo |el |este |proximo |para el )?(lunes|martes|miercoles|jueves|viernes|sabado|domingo)/);var k=(VWD[x[1]]-dow(t)+7)%7;if(k===0)k=7;return add(t,k)}
if(/(^| )hoy( |$)/.test(n)){vcMask(m,n,/hoy/);return t}
if(/(^| )manana( |$)/.test(n)&&n.indexOf('por la manana')<0&&n.indexOf('de la manana')<0){vcMask(m,n,/manana/);return add(t,1)}
var re=new RegExp('(?:para el dia |para el |el dia |el )(\\d{1,2})(?: de ('+VMOR+'))?');
if((x=re.exec(n))){var day=Number(x[1]);if(day>=1&&day<=31){vcMask(m,n,re);var mo=x[2]?VMO[x[2]]:t.getMonth(),y=t.getFullYear(),d=mk(y,mo,day);if(d<t){d=x[2]?mk(y+1,mo,day):mk(y,mo+1,day)}return d}}
return null}
function vcTime(n,m){
if(/a la una/.test(n)){vcMask(m,n,/a la una/);return 13*60}
var re=/a las? (\d{1,2})(?::(\d{2}))?( y media| y cuarto| menos cuarto)?( de la (tarde|noche|manana))?/,x=re.exec(n);if(!x)return null;
vcMask(m,n,re);var h=Number(x[1]),mi=Number(x[2]||0);
if(x[3]===' y media')mi=30;else if(x[3]===' y cuarto')mi=15;else if(x[3]===' menos cuarto'){h-=1;mi=45}
if(x[5]==='tarde'||x[5]==='noche'){if(h<12)h+=12}else if(!x[5]&&h>=1&&h<=8)h+=12;
if(h>23)return null;return h*60+mi}
function vcWho(n,m,def){
var a=vcN(KIDS.a.n),e=vcN(KIDS.e.n),ha=n.indexOf(a)>=0,he=n.indexOf(e)>=0;
vcMask(m,n,new RegExp('(?:de |para |a |con )?('+a+'|'+e+')'));
if(ha&&he)return 'all';if(ha)return 'a';if(he)return 'e';
if(/los ninos|toda la familia|todos/.test(n)){vcMask(m,n,/los ninos|toda la familia|todos/);return 'all'}
if(/adultos|papa|mama/.test(n)){vcMask(m,n,/(?:para |de )?(?:los )?(adultos|papa|mama)/);return 'adults'}
return def}
function vcOne(txt){
var n=vcN(txt),m={},x,w,d,tm;
if(!n.trim())return null;
if((x=/(cenamos|comemos|cenaremos|comeremos|para cenar|para comer|de cena|de comida)/.exec(n))&&!/examen/.test(n)){
d=vcDate(n,m)||today();var slot=x[1].indexOf('cen')>=0?'d':'c',pre=x[1].indexOf('para')===0||x[1].indexOf('de ')===0;
for(var i=x.index;i<x.index+x[1].length;i++)m[i]=1;
var dish=pre?vcLeft(txt,m,0,x.index):vcLeft(txt,m,x.index+x[1].length);
if(!dish)return {err:'No he pillado qué se come'};
dish=cap(dish);return {k:'mn',date:d,slot:slot,dish:dish,d:(slot==='d'?'🌙 Cena':'☀️ Comida')+' del '+dl(d)+': '+dish}}
if((x=/(examen|control|prueba)/.exec(n))){
w=vcWho(n,m,null);d=vcDate(n,m);tm=vcTime(n,m);
for(var j=x.index;j<x.index+x[1].length;j++)m[j]=1;
var ti=vcLeft(txt,m,0);if(!ti)return {err:'Falta la asignatura del examen'};if(!d)return {err:'Falta el día del examen'};
ti=cap(ti);var ww=w==='a'||w==='e'?w:'a';return {k:'xm',date:d,t:ti,w:ww,d:'📝 Examen de '+ti+' ('+KIDS[ww].n+') el '+dl(d)+(w==='a'||w==='e'?'':' · ¿era de '+KIDS.a.n+'? Si no, cancela')}}
if((x=/(^| )(compra|lista)( |$)/.exec(n))||/^(anade|anadir|necesitamos|necesito|falta|faltan|hay que comprar|comprar)/.test(n)){
var vm=/(anade|anadir|apunta|apuntame|pon|ponme|necesitamos|necesito|faltan|falta|hay que comprar|comprar|compra)\s+/.exec(n);
if(vm){var st=vm.index+vm[0].length,en=n.length,tail=/\s+(a|en|para) la (compra|lista)/.exec(n);if(tail&&tail.index>=st)en=tail.index;
var seg=txt.slice(st,en).replace(new RegExp('por favor','i'),'').trim();
var items=seg.split(new RegExp(',| y | e ')).map(function(s){return s.trim()}).filter(function(s){return s}).map(function(s){var q=1,p=s.split(' '),f=vcN(p[0]);if(VNUM[f]!==undefined&&p.length>1){q=VNUM[f];p.shift()}else if(!isNaN(Number(f))&&p.length>1){q=Math.min(20,Number(f));p.shift()}while(p.length>1&&['un','una','unos','unas','el','la','los','las','mas'].indexOf(vcN(p[0]))>=0)p.shift();return {n:cap(p.join(' ')),q:q}});
if(items.length)return {k:'cp',items:items,d:'🛒 A la compra: '+items.map(function(i){return (i.q>1?i.q+' × ':'')+i.n}).join(', ')}}}
if((x=/(^| )nota( |$)/.exec(n))&&!/examen|compra/.test(n)){
w=vcWho(n,m,'all');vcMask(m,n,/(una )?nota/);var nt=vcLeft(txt,m,0);if(!nt)return {err:'Falta qué poner en la nota'};nt=cap(nt);return {k:'nt',t:nt,w:w,d:'📌 Nota para '+WHO[w].toLowerCase()+': «'+nt+'» (3 días)'}}
if((x=/(tarea|deberes|ficha)/.exec(n))){
w=vcWho(n,m,'all');d=vcDate(n,m)||add(today(),1);vcTime(n,m);
var tt=vcLeft(txt,m,0);tt=cap(tt||'Deberes');return {k:'tk',date:d,t:tt,w:w,d:'✅ Tarea «'+tt+'» ('+WHO[w]+') para el '+dl(d)}}
w=vcWho(n,m,'all');d=vcDate(n,m);tm=vcTime(n,m);
var hasVerb=/^(por favor )?(apunta|apuntame|pon|ponme|agenda|anota|recuerdame|tenemos|tiene|tienen|hay)/.test(n);
var et=vcLeft(txt,m,0);
if(!et||(!d&&tm===null&&!hasVerb))return null;
et=cap(et);d=d||today();var s0=tm===null?17*60:tm;
return {k:'ev',date:d,s:s0,t:et,w:w,d:evIcon(et)+' Evento «'+et+'» · '+dl(d)+' '+hm(s0)+' · '+WHO[w]}}
function vcParse(txt){
var parts=txt.split(new RegExp('[.;]| y (?=apunta|anota|pon |agenda|anade)| ademas ')),acts=[],bad=[];
parts.forEach(function(p){p=p.trim();if(!p)return;var r=vcOne(p);if(!r)bad.push(p);else if(r.err)bad.push(p+' ('+r.err+')');else acts.push(r)});
return {acts:acts,bad:bad}}
function vcShow(txt){
var r=vcParse(txt);VC=r.acts;
var ex='Prueba: «apunta dentista de '+KIDS.e.n+' el jueves a las 5», «añade leche y huevos a la compra», «el sábado cenamos pizza» o «examen de Mates de '+KIDS.a.n+' el 12 de noviembre».';
openSheet('<h3>Esto he entendido</h3><p class="quote">«'+esc(txt)+'»</p>'+(r.acts.length?'<ul>'+r.acts.map(function(a){return '<li>'+esc(a.d)+'</li>'}).join('')+'</ul>':'')+(r.bad.length?'<p class="muted" style="font-weight:700">No he entendido: '+esc(r.bad.join(' / '))+'</p>':'')+(r.acts.length?'':'<p class="muted" style="font-weight:700">'+ex+'</p>')+'<div class="acts"><button class="btn ghost" data-sh="micx">Cancelar</button>'+(r.acts.length?'<button class="btn primary" data-sh="vcgo">Hacerlo</button>':'<button class="btn primary" data-sh="micagain">Reintentar</button>')+'</div>');
}
function vcStop(){if(VCR){try{VCR.onresult=null;VCR.onerror=null;VCR.abort()}catch(e){}VCR=null}}
function openMic(){
vcStop();
var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
openSheet('<div class="mic-p"><div class="pulse">'+ic('mic')+'</div><h3>'+(SR?'Te escucho…':'Dímelo por escrito')+'</h3><p class="muted" id="mic-st" style="font-weight:700">Por ejemplo: «apunta dentista de '+esc(KIDS.e.n)+' el jueves a las 5» o «añade leche y huevos a la compra».</p><label class="fld">'+(SR?'…o escríbelo':'Escribe lo que quieres hacer')+'<input id="mic-in" autocomplete="off" placeholder="Apunta fútbol de '+esc(KIDS.a.n)+' el martes a las 6"></label><div class="acts"><button class="btn ghost" data-sh="micx">Cancelar</button><button class="btn primary" data-sh="micparse">Entender</button></div></div>');
if(!SR)return;
try{
var r=new SR();VCR=r;r.lang='es-ES';r.interimResults=false;r.maxAlternatives=1;
r.onresult=function(e){var t=e.results[0][0].transcript;VCR=null;vcShow(t)};
r.onerror=function(e){var s=$('#mic-st');if(s)s.textContent=e.error==='not-allowed'||e.error==='service-not-allowed'?'No tengo permiso para el micrófono. Actívalo en Chrome (candado de la barra de direcciones) o escribe abajo.':'No te he oído bien. Toca «Voz» otra vez o escríbelo abajo.'};
r.start();
}catch(e){}
}
sheet.addEventListener('change',function(e){var f=e.target;if(f&&f.id==='aj-file'&&f.files&&f.files[0]){var rd=new FileReader();rd.onload=function(){try{var o=JSON.parse(rd.result),d=o.data||o;if(!SY.some(function(k){return d[k]!==undefined})||(d.events!==undefined&&!Array.isArray(d.events)))throw new Error('bad');BK={d:d,t:o.t||''};ajCollect();ajOpen()}catch(x){toast('Ese archivo no es una copia válida')}};rd.readAsText(f.files[0])}});
var DT=null,DR=null,dBtn=document.createElement('button'),vBtn=document.createElement('button');
dBtn.type='button';dBtn.id='dict';dBtn.className='dict';dBtn.hidden=true;dBtn.setAttribute('aria-label','Dictar');dBtn.innerHTML=ic('mic');
vBtn.type='button';vBtn.id='vfab';vBtn.className='vfab adult-only';vBtn.setAttribute('aria-label','Voz');vBtn.setAttribute('data-act','mic');vBtn.innerHTML=ic('mic');
document.body.appendChild(dBtn);
function kbH(){var v=window.visualViewport;return v?Math.max(0,Math.round(innerHeight-v.height-v.offsetTop)):0}
function vvFit(){var h=kbH();scrim.style.bottom=h?h+'px':'';dBtn.style.bottom=(h+14)+'px';if(DT)dBtn.hidden=!(h>120||!window.visualViewport)}
if(window.visualViewport){visualViewport.addEventListener('resize',vvFit);visualViewport.addEventListener('scroll',vvFit)}
function dOk(el){if(!el||!el.tagName)return false;if(el.tagName==='TEXTAREA')return true;if(el.tagName!=='INPUT')return false;return ['text','search','','email','url','tel'].indexOf((el.getAttribute('type')||'').toLowerCase())>=0&&!el.readOnly&&!el.disabled}
function dStop(){if(DR){try{DR.onresult=null;DR.onend=null;DR.onerror=null;DR.abort()}catch(e){}DR=null}dBtn.classList.remove('on')}
document.addEventListener('focusin',function(e){var el=e.target;if(!dOk(el)||el.id==='pw'||/pass|clave|pin/i.test(el.id+el.name+el.autocomplete)){return}DT=el;vvFit();setTimeout(function(){vvFit();if(sheet.contains(el))try{el.scrollIntoView({block:'center',behavior:'smooth'})}catch(x){}},350)});
document.addEventListener('focusout',function(){setTimeout(function(){if(document.activeElement!==DT&&!DR){dBtn.hidden=true;DT=null;vvFit()}},400)});
dBtn.addEventListener('pointerdown',function(e){e.preventDefault()});
dBtn.addEventListener('click',function(){
if(DR){dStop();return}
var SRx=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SRx){toast('Tu navegador no dicta por voz');return}
if(!DT)return;var el=DT;
try{var r=new SRx();DR=r;r.lang='es-ES';r.interimResults=false;r.continuous=false;dBtn.classList.add('on');
r.onresult=function(ev){var t='';for(var i=ev.resultIndex;i<ev.results.length;i++)if(ev.results[i].isFinal)t+=ev.results[i][0].transcript;t=t.trim();if(!t)return;var v=el.value||'';if(!v)t=t.charAt(0).toUpperCase()+t.slice(1);el.value=v+(v&&!/\s$/.test(v)?' ':'')+t;el.dispatchEvent(new Event('input',{bubbles:true}))};
r.onend=function(){dBtn.classList.remove('on');DR=null};
r.onerror=function(ev){dBtn.classList.remove('on');DR=null;toast(ev.error==='not-allowed'||ev.error==='service-not-allowed'?'Activa el micrófono en Chrome (candado de la barra)':'No te he oído, prueba otra vez')};
r.start()}catch(x){dBtn.classList.remove('on');DR=null}});
function vfabUpd(){vBtn.hidden=!scrim.hidden}
new MutationObserver(vfabUpd).observe(scrim,{attributes:true,attributeFilter:['hidden']});vfabUpd();
function fsGo(){var d=document.documentElement,f=d.requestFullscreen||d.webkitRequestFullscreen;try{if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}else if(f){f.call(d)}else toast('Instala la app desde el menú de Chrome')}catch(e){}}
function drawPin(bad){
openSheet('<h3>PIN de adulto</h3><p class="muted" style="font-weight:700">Para salir del modo niños.</p><div class="pin-dots'+(bad?' bad':'')+'">'+[0,1,2,3].map(function(i){return '<i class="'+(i<PIN.length?'f':'')+'"></i>'}).join('')+'</div><div class="keys">'+[1,2,3,4,5,6,7,8,9].map(function(n){return '<button data-sh="pin" data-v="'+n+'">'+n+'</button>'}).join('')+'<button data-sh="close" aria-label="Cancelar">'+ic('x')+'</button><button data-sh="pin" data-v="0">0</button><button data-sh="pinbk" aria-label="Borrar">⌫</button></div>');
}
var SH={
close:closeSheet,am:function(el){var v=el.dataset.v;if(v==='cp'){openQuickBuy();return}if(v==='bz'){openBuz();return}openAdd(v)},
qbfav:function(el){if(guard())return;var c=allCat().filter(function(x){return x.n===el.dataset.n})[0];if(!c)return;addItem(c.n,c.sec,c.img);QB.push(c.n);render();qbDraw()},
qbmic:function(){dictTo($('#qb-in',sheet),function(){var f=$('#qbForm');if(f&&f.requestSubmit)f.requestSubmit()})},
cef:function(el){ceSync();CE[Number(el.dataset.i)].f=el.dataset.v;ceDraw()},
cew:function(el){ceSync();var c=CE[Number(el.dataset.i)],m=el.dataset.v,ix=c.w.indexOf(m);if(ix>=0){if(c.w.length>1)c.w.splice(ix,1);else{toast('Al menos una persona');return}}else c.w.push(m);c.w=CMEM.filter(function(x){return c.w.indexOf(x)>=0});ceDraw()},
cedel:function(el){ceSync();CE.splice(Number(el.dataset.i),1);ceDraw()},
ceadd:function(){ceSync();CE.push({id:nid('h'),t:'',i:'🧽',f:'d',p:2,w:CMEM.slice(),s:iso(today())});ceDraw();var l=$$('.ce-t',sheet);if(l.length)l[l.length-1].focus()},
cesave:function(){ceSync();S.chores=CE.filter(function(c){return c.t.trim()}).map(function(c){var o={id:c.id,t:c.t.trim(),i:c.i.trim(),f:c.f,p:c.p,w:c.w,s:c.s||iso(today())};if(c.f==='n')o.n=c.n||4;if(c.o)o.o=c.o;return o});closeSheet();toast('Tareas de casa guardadas');render()},
sumw:function(el){SUMW=Number(el.dataset.v);openSum(false)},
sumsh:function(){sumShare()},aisup:function(el){aisMove(el.dataset.id,-1)},aisdn:function(el){aisMove(el.dataset.id,1)},mgo:function(el){var d=el.dataset,a=d.a,v=d.v,t=d.t;closeSheet();var f=H[a];if(f)f({dataset:{v:v,t:t,a:a},closest:function(){return null}})},
evdel:function(el){S.events=S.events.filter(function(x){return x.id!==el.dataset.id});closeSheet();toast('Evento quitado');render()},
rsave:function(){
var a=$('#r-from',sheet).value,b=$('#r-to',sheet).value;if(!a||!b){toast('Elige las dos fechas');return}
var da=fromIso(a),db=fromIso(b),n=0;
for(var s=satOf(da);dd(s,db)>=0;s=add(s,7)){var key=iso(s);if(R.st===autoSt(s))delete S.custody.over[key];else S.custody.over[key]=R.st;n++}
closeSheet();toast(n+(n===1?' fin de semana actualizado':' fines de semana actualizados'));render();
},
mpick:function(el){$('#m-in',sheet).value=el.dataset.v;var gi=$('#m-ing',sheet);if(gi)gi.value=ingFor(el.dataset.v).join(', ')},
ajtab:function(el){ajCollect();AJ.tab=el.dataset.t;ajOpen()},
ajrwadd:function(){ajCollect();AJ.rw.push({id:nid('r'),t:'',c:20});ajOpen()},
ajrwdel:function(el){ajCollect();AJ.rw.splice(Number(el.dataset.i),1);ajOpen()},
ajroadd:function(el){ajCollect();AJ.ro[el.dataset.k].push({id:nid('t'),t:''});ajOpen()},
ajrodel:function(el){ajCollect();AJ.ro[el.dataset.k].splice(Number(el.dataset.i),1);ajOpen()},
ajroup:function(el){ajCollect();var L=AJ.ro[el.dataset.k],i=Number(el.dataset.i),j=i+Number(el.dataset.d);if(j<0||j>=L.length)return;var t=L[i];L[i]=L[j];L[j]=t;ajOpen()},
ajcs:function(el){ajCollect();AJ.cs=el.dataset.v;ajOpen()},
ajclr:function(){ajCollect();AJ.clr=!AJ.clr;ajOpen()},
ajicadd:function(){ajCollect();AJ.ic.push(['','']);ajOpen()},
ajicdel:function(el){ajCollect();AJ.ic.splice(Number(el.dataset.i),1);ajOpen()},
ajsl:function(el){ajCollect();SL.on=el.dataset.v==='1';slSave();slWake();if(SL.on)slLockReq();else slLockRel();ajOpen()},
ajslm:function(el){ajCollect();SL.min=Number(el.dataset.v);slSave();ajOpen()},
ajsln:function(el){ajCollect();SL.night=el.dataset.v==='1';slSave();ajOpen()},
ajslt:function(){ajCollect();closeSheet();slMan=true;slShow()},
ajdadd:function(){ajCollect();AJ.dy.push({id:nid('d'),t:'',a:iso(today()),b:iso(today()),k:'v'});ajOpen()},
ajddel:function(el){ajCollect();AJ.dy.splice(Number(el.dataset.i),1);ajOpen()},
ajhol:function(el){ajCollect();AJ.hol=el.dataset.v==='1';ajOpen()},
ajvac:function(el){ajCollect();AJ.vac=el.dataset.v==='1';ajOpen()},
ajcadd:function(){ajCollect();AJ.cl.push({id:nid('c'),n:'',url:'',w:'all'});ajOpen()},
ajcdel:function(el){ajCollect();AJ.cl.splice(Number(el.dataset.i),1);ajOpen()},
evdel1:function(el){var e=S.events.filter(function(x){return x.id===el.dataset.id})[0];if(e){e.ex=e.ex||[];e.ex.push(el.dataset.d)}closeSheet();toast('Quitado ese día');render()},
rdow:function(el){syncForm();var i=Number(el.dataset.v),ix=F.days.indexOf(i);if(ix>=0)F.days.splice(ix,1);else F.days.push(i);drawAdd()},
bkdl:function(){var blob=new Blob([JSON.stringify({app:'panel-familiar',t:iso(today()),data:snap()})],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='panel-familiar-'+iso(today())+'.json';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500);toast('Copia descargada')},
bkgo:function(){if(!BK)return;SY.forEach(function(k){var v=BK.d[k],c=S[k];if(v===undefined||v===null)return;if(c!==undefined&&c!==null&&(Array.isArray(c)!==Array.isArray(v)||typeof c!==typeof v))return;S[k]=v});BK=null;closeSheet();toast('Copia restaurada');render();extLoad(true)},
micx:function(){vcStop();closeSheet()},
micparse:function(){vcStop();vcShow(($('#mic-in',sheet)||{value:''}).value)},
micagain:function(){openMic()},
vcgo:function(){
(VC||[]).forEach(function(a){
var k=a.date?iso(a.date):'';
if(a.k==='ev')S.events.push({id:nid('ev'),date:k,s:hm(a.s),e:hm(Math.min(a.s+60,23*60+59)),t:a.t,w:a.w});
else if(a.k==='xm')S.exams.push({id:nid('x'),t:a.t,w:a.w,date:k});
else if(a.k==='tk')S.tasks.push({id:nid('t'),t:a.t,w:a.w,due:k,done:false});
else if(a.k==='mn'){S.menu[k]=S.menu[k]||{};S.menu[k][a.slot]=a.dish;delete S.menu[k][a.slot+'i']}
else if(a.k==='cp')a.items.forEach(function(it){var cat=allCat().filter(function(c){return norm(c.n)===norm(it.n)})[0];for(var z=0;z<it.q;z++)addItem(it.n,cat?cat.sec:'des',cat?cat.img:undefined)});
});
var n=(VC||[]).length;VC=null;closeSheet();toast(n+(n===1?' cosa hecha':' cosas hechas'));render();
},
fltset:function(el){FLT=el.dataset.v;try{localStorage.setItem('fam_flt',FLT)}catch(e){}closeSheet();draw();toast('Viendo: '+fltName())},
bzwho:function(el){BZ.t=($('#bz-in',sheet)||{}).value||'';BZ.w=el.dataset.v;openBuz()},
bzto:function(el){BZ.t=($('#bz-in',sheet)||{}).value||'';BZ.to=el.dataset.v;openBuz()},
bzato:function(el){BZ.t=($('#bz-in',sheet)||{}).value||'';BZ.ato=el.dataset.v;openBuz()},
bzpick:function(el){var i=$('#bz-in',sheet);i.value=BZQ[Number(el.dataset.i)];BZ.t=i.value;i.focus()},
bzaw:function(el){BZ.t=($('#bz-in',sheet)||{}).value||'';BZ.aw=el.dataset.v;try{localStorage.setItem('fam_me',BZ.aw)}catch(e){}openBuz()},
bzsend:function(){var i=$('#bz-in',sheet),t=((i&&i.value)||'').trim();if(!t){toast('Escribe algo primero');return}S.buz=S.buz||[];var w=S.kid?BZ.w:BZ.aw,to=S.kid?(BZ.to===BZ.w?'adults':BZ.to):BZ.ato;S.buz.push({id:nid('bz'),t:t.slice(0,200),w:w,to:to,d:iso(today()),done:false});BZ.t='';closeSheet();toast('¡Enviado a '+bzN(to)+'! 📮');render()},
bzok:function(el){var x=(S.buz||[]).filter(function(b){return b.id===el.dataset.id})[0];if(x)x.done=true;render();openBuz()},
bzdel:function(el){if(guard())return;S.buz=(S.buz||[]).filter(function(b){return b.id!==el.dataset.id});render();openBuz()},
horedit:function(el){if(guard())return;closeSheet();ajInit('hor');AJ.hk=el.dataset.k;ajOpen()},
ajhk:function(el){ajCollect();AJ.hk=el.dataset.v;ajOpen()},
ajhd:function(el){ajCollect();AJ.hd=Number(el.dataset.v);ajOpen()},
ajhadd:function(){ajCollect();hList().push({t:'',b:''});ajOpen()},
ajhs:function(el){ajCollect();hList().push({t:el.dataset.v,b:''});ajOpen()},
ajhdel:function(el){ajCollect();hList().splice(Number(el.dataset.i),1);ajOpen()},
ajhup:function(el){ajCollect();var L=hList(),i=Number(el.dataset.i),j=i+Number(el.dataset.d);if(j<0||j>=L.length)return;var x=L[i];L[i]=L[j];L[j]=x;ajOpen()},
ajbadd:function(){ajCollect();AJ.bd.push({id:nid('bd'),n:'',d:'1',m:'1',y:'',i:'🎂'});ajOpen()},
ajbdel:function(el){ajCollect();AJ.bd.splice(Number(el.dataset.i),1);ajOpen()},
abrest:function(el){fetch('/api/backups?id='+encodeURIComponent(el.dataset.id),{headers:{'X-Family-Key':KEY}}).then(function(r){return r.json()}).then(function(j){if(!j.data)throw new Error('x');BK={d:j.data,t:(j.ts||'').slice(0,10)};ajCollect();ajOpen();sheet.scrollTop=0}).catch(function(){toast('No pude cargar esa copia')})},
abnow:function(){fetch('/api/backups',{method:'POST',headers:{'X-Family-Key':KEY}}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(){AB=null;ajCollect();ajOpen();toast('Copia hecha')}).catch(function(){toast('No pude hacer la copia')})},
pwgo:function(){var a=($('#sec-p1',sheet)||{}).value||'',b=($('#sec-p2',sheet)||{}).value||'';if(a.length<12){toast('Mínimo 12 caracteres');return}if(a!==b){toast('No coinciden');return}secPost('/api/passwd',{p:a},'Contraseña cambiada');if($('#sec-p1',sheet)){$('#sec-p1',sheet).value='';$('#sec-p2',sheet).value=''}},
lgall:function(){secPost('/api/logout-all',null,'Sesión cerrada en los demás dispositivos')},
lgone:function(){KEY='';try{localStorage.removeItem('fam_key')}catch(e){}location.reload()},
wkt:function(el){var key=el.dataset.wk,sat=fromIso(key),nw=wkSt(sat)==='us'?'them':'us';if(nw===autoSt(sat))delete S.custody.over[key];else S.custody.over[key]=nw;render();openWkAll(true)},
ajsave:ajSave,
mstog:function(el){var y=sheet.scrollTop;MSH[Number(el.dataset.i)].on=!MSH[Number(el.dataset.i)].on;drawMenuShop();sheet.scrollTop=y},
msgo:function(){var n=0;MSH.forEach(function(it){if(!it.on)return;var cat=allCat().filter(function(c){return norm(c.n)===norm(it.n)})[0];addItem(it.n,cat?cat.sec:secGuess(it.n),cat?cat.img:undefined);n++});closeSheet();toast(n+(n===1?' producto añadido':' productos añadidos')+' a la compra');render()},
dpt:function(el){var dp=$('.dp[data-dp="'+el.dataset.id+'"]',sheet),pop=$('.dp-pop',dp);if(pop.hidden){dp.dataset.m='';pop.innerHTML=dpGrid(dp);pop.hidden=false}else pop.hidden=true},
dpq:function(el){dpSet(el.dataset.id,iso(add(today(),Number(el.dataset.n))))},
dpm:function(el){var dp=$('.dp[data-dp="'+el.dataset.id+'"]',sheet),m=fromIso(dp.dataset.m);dp.dataset.m=iso(mk(m.getFullYear(),m.getMonth()+Number(el.dataset.d),1));$('.dp-pop',dp).innerHTML=dpGrid(dp)},
dpd:function(el){dpSet(el.dataset.id,el.dataset.v,true)},
tps:function(el){tpSet(el.dataset.id,mins($('#'+el.dataset.id,sheet).value)+Number(el.dataset.d))},
tpq:function(el){tpSet(el.dataset.id,mins(el.dataset.v))},
lq:function(el){var b=$('#l-q',sheet);b.textContent=Math.max(1,Math.min(99,Number(b.textContent)+Number(el.dataset.d)))},
lisave:function(){
var x=S.list.filter(function(i){return i.id===LI})[0];if(!x){closeSheet();return}
x.q=Number($('#l-q',sheet).textContent);x.note=$('#l-note',sheet).value.trim();
var on=$('[data-seg="lsec"] .on',sheet),ns=on?on.dataset.v:x.sec;
if(ns!==x.sec){x.sec=ns;var k=norm(x.n),ex=S.catalog.filter(function(c){return norm(c.n)===k})[0];if(ex)ex.sec=ns;else S.catalog.push(C(x.n,ns,x.img))}
closeSheet();render();
},
lidel:function(){S.list=S.list.filter(function(i){return i.id!==LI});closeSheet();toast('Quitado de la lista');render()},
msave:function(){var v=$('#m-in',sheet).value.trim();S.menu[M.d]=S.menu[M.d]||{};S.menu[M.d][M.s]=v;S.menu[M.d][M.s+'i']=($('#m-ing',sheet)||{value:''}).value.trim();closeSheet();toast(v?'Menú actualizado':'Plato quitado');render()},
mclear:function(){S.menu[M.d]=S.menu[M.d]||{};S.menu[M.d][M.s]='';delete S.menu[M.d][M.s+'i'];closeSheet();render()},
pin:function(el){
PIN+=el.dataset.v;
if(PIN.length<4){drawPin();return}
if(PIN===S.pin){PIN='';closeSheet();S.kid=false;render();toast('Modo adultos activado')}
else{PIN='';drawPin(true)}
},
pinbk:function(){PIN=PIN.slice(0,-1);drawPin()}
};
sheet.addEventListener('click',function(e){
var sb=e.target.closest('[data-seg] button');
if(sb&&F&&sheet.contains(sb)){
var wrap=sb.parentNode,name=wrap.dataset.seg,v=sb.dataset.v;
if(name==='rep'){syncForm();F.rep=v;if(v==='w'&&!(F.days&&F.days.length))F.days=[dow(fromIso(F.date))];drawAdd();return}if(name==='type'){syncForm();F.type=v;if(v==='xm'&&['a','e'].indexOf(F.w)<0)F.w='a';drawAdd();return}
F[name]=name==='dur'?Number(v):v;
$$('button',wrap).forEach(function(b){b.classList.toggle('on',b===sb)});return;
}
if(sb&&R&&wrap_is(sb,'rst')){R.st=sb.dataset.v;$$('button',sb.parentNode).forEach(function(b){b.classList.toggle('on',b===sb)});return}
var el=e.target.closest('[data-sh]');
if(el&&SH[el.dataset.sh])SH[el.dataset.sh](el);
});
function wrap_is(btn,name){return btn.parentNode&&btn.parentNode.dataset.seg===name}
scrim.addEventListener('click',function(e){if(e.target===scrim)closeSheet()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!scrim.hidden)closeSheet()});
