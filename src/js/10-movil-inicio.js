/* ===== v5 · Inicio del movil (estilo iOS) ===== */
function sq(n,c){return '<span class="sq sq-'+c+'" aria-hidden="true">'+ic(n)+'</span>'}
function put5(el,h){if(el&&el.__h!==h){el.__h=h;el.innerHTML=h}}
function h5Greet(){var h=new Date().getHours();return h<6?'Buenas noches':h<13?'Buenos días':h<21?'Buenas tardes':'Buenas noches'}
function h5Now(){
var ni=nowInfo(),nm=nowMin();
if(ni.k==='none'){var tm=eventsOn(iso(add(today(),1)))[0];return '<button type="button" class="h5-now w-all" data-act="nav" data-v="cal"><span class="h5-k">Hoy</span><b>Sin más planes</b><span class="h5-s">'+(tm?'Mañana: '+tm.s+' · '+esc(tm.t):'Tarde libre')+'</span></button>'}
var e=ni.e,now=ni.k==='now',p=now?Math.max(0,Math.min(1,(nm-mins(e.s))/Math.max(1,mins(e.e)-mins(e.s)))):0;
return '<button type="button" class="h5-now w-'+e.w+(now?' on':'')+'" data-act="ev" data-id="'+e.id+'" data-d="'+e.date+'"><span class="h5-k">'+(now?'Ahora · hasta las '+e.e:'Siguiente · '+e.s+'–'+e.e)+'</span><b>'+evIcon(e.t)+' '+esc(e.t)+'</b><span class="h5-s">'+whoTag(e.w,20)+'<span>'+ni.txt.replace(/, a las .*/,'')+'</span></span>'+(now?'<i class="h5-bar"><i style="width:'+Math.round(p*100)+'%"></i></i>':'')+'</button>'}
function h5Agenda(){
var t=today(),tI=iso(t),nm=nowMin(),te=eventsOn(tI),ad=allDay(tI),me=eventsOn(iso(add(t,1)));
var up=te.filter(function(e){return mins(e.e)>nm});
var row=function(e,lite){return '<button type="button" class="h5-ev w-'+e.w+(lite?' lite':'')+'" data-act="ev" data-id="'+e.id+'" data-d="'+e.date+'"><span class="tm num">'+e.s+(lite?'':'<small>'+e.e+'</small>')+'</span><span class="nm">'+evIcon(e.t)+' '+esc(e.t)+'</span>'+whoTag(e.w,24)+'</button>'};
var h=ad.map(function(x){return '<div class="h5-ad">'+x.i+' '+esc(x.t)+'</div>'}).join('');
h+=up.length?up.slice(0,4).map(function(e){return row(e,false)}).join(''):'<div class="h5-empty">'+(te.length?'Ya no quedan planes hoy':'Hoy no hay planes')+'</div>';
if(up.length>4)h+='<button type="button" class="h5-more" data-act="nav" data-v="cal">'+(up.length-4)+' más hoy</button>';
if(me.length)h+='<div class="h5-sub">Mañana</div>'+me.slice(0,3).map(function(e){return row(e,true)}).join('');
return '<div class="h5-hd"><h2>Agenda</h2><button type="button" class="h5-link" data-act="nav" data-v="cal">Ver todo</button></div><div class="h5-card">'+h+'</div>'}
function h5Alerts(){var a=alertsList();if(!a.length)return '';var n=3;
return '<div class="h5-hd"><h2>Avisos</h2></div><div class="alerts h5-card">'+a.slice(0,n).map(function(x){return alertChip(x)}).join('')+(a.length>n?'<button type="button" class="al al-more" data-act="alerts">+'+(a.length-n)+' avisos más</button>':'')+'</div>'}
function h5Shop(){var buy=S.list.filter(function(x){return !x.done});
return buy.length?'<div class="qkl">'+buy.slice(0,8).map(function(x){return '<button type="button" class="qki" data-act="li" data-id="'+x.id+'">'+esc(x.n)+(x.q>1?' <small>×'+x.q+'</small>':'')+'</button>'}).join('')+(buy.length>8?'<button type="button" class="qki mas" data-act="nav" data-v="compra">+'+(buy.length-8)+'</button>':'')+'</div>':'<p class="h5-empty">No falta nada 🎉</p>'}
function h5Tiles(){
var t=today(),buy=S.list.filter(function(x){return !x.done}).length,soon=S.tasks.filter(function(x){return !x.done&&vis(x.w)&&dd(t,fromIso(x.due))<=2}).length,od=S.tasks.filter(function(x){return !x.done&&vis(x.w)&&dd(t,fromIso(x.due))<0}).length,n=unreadBuz();
var A=cAssign(t),cd=A.filter(function(x){return x.done}).length,ap=KV().filter(function(k){return S.mission[k].st==='pending'}).length,m=S.menu[iso(t)]||{};
var ks=KV(),rt=ks.map(function(k){var r=routineStats(k);return r.d+'/'+r.t}).join(' · ');
var sat=satOf(t),st=wkSt(sat);
var T=function(a,ic2,c,big,lab,extra){return '<button type="button" class="h5-w" '+a+'>'+sq(ic2,c)+'<b class="num">'+big+'</b><small>'+lab+'</small>'+(extra||'')+'</button>'};
return '<div class="qkg h5-grid">'+
T('data-act="nav" data-v="compra"','compra','green',buy,buy===1?'por comprar':'por comprar')+
T('data-act="nav" data-v="tareas"','tareas','orange',od||soon,od?(od===1?'vencida':'vencidas'):'vencen pronto',od?'<i class="h5-dot bad"></i>':'')+
T('data-act="nav" data-v="menu"','menu','pink',m.c?esc(m.c):'—','comida de hoy')+
T('data-act="nav" data-v="casa"','casa','purple',A.length?cd+'/'+A.length:'—','casa hoy')+
(ks.length?T('data-act="nav" data-v="rutina"','rutina','blue',rt,'rutinas de hoy'):'')+
T('data-act="nav" data-v="banco"','banco','yellow',ap||'✓',ap?'para aprobar':'paguita al día')+
T('data-act="buz"','mail','teal',n||'0',n===1?'mensaje nuevo':'mensajes nuevos')+
T('data-act="wk" data-wk="'+iso(sat)+'"',st==='us'?'heart':'away',st==='us'?'red':'gray',st==='us'?'Con peques':'Sin peques','este finde · '+rangeLabel(sat))+
'</div>'}
function h5Init(){
var hub=$('#hub');if(!hub||$('#h5',hub))return;
var d=document.createElement('div');d.id='h5';d.className='h5';
d.innerHTML='<header class="h-top h5-top"><div class="h5-tt"><div class="h5-kick" id="h5Kick"></div><h1 id="h5Title"></h1></div><div class="h5-acts"><span class="h-wx" id="hWx"></span><button type="button" class="h5-av" data-act="whoami" id="h5Me" aria-label="Quién eres"></button></div></header>'+
'<div id="h5Now"></div><div id="h5Mo"></div><div id="h5Cd"></div><div id="h5Al"></div>'+
'<div class="h5-hd"><h2>Compra</h2><button type="button" class="h5-link" data-act="nav" data-v="compra">Ver lista</button></div><div class="h5-card h5-shop"><form class="qkf" id="qkForm" autocomplete="off"><span class="qk-ic" aria-hidden="true">'+ic('plus')+'</span><input id="qk-in" placeholder="Añadir a la compra" enterkeyhint="done" aria-label="Añadir a la compra"><button class="btn sm" type="button" data-act="micq" aria-label="Dictar">'+ic('mic')+'</button><button class="btn primary sm" type="submit">Añadir</button></form><div id="h5Shop"></div></div>'+
'<div id="h5Ag"></div><div class="h5-hd"><h2>De un vistazo</h2></div><div id="h5Tiles"></div><div class="h5-foot" id="h5Foot"></div>';
hub.insertBefore(d,hub.firstChild)}
function renderH5(){
h5Init();var t=today();
put5($('#h5Kick'),cap(DOW[dow(t)])+', '+t.getDate()+' de '+MONTH[t.getMonth()]);
put5($('#h5Title'),h5Greet());
var me=ME();put5($('#h5Me'),avImg(me,34));
var w=$('#hWx');if(w){var x=hWxHtml();if(w.__h!==x){w.__h=x;w.innerHTML=x}}
put5($('#h5Now'),h5Now());put5($('#h5Mo'),momHtml());put5($('#h5Cd'),cdHtml());put5($('#h5Al'),h5Alerts());put5($('#h5Shop'),h5Shop());put5($('#h5Ag'),h5Agenda());put5($('#h5Tiles'),h5Tiles());
put5($('#h5Foot'),'<button class="chip fltb'+(FLT!=='all'?' on':'')+'" data-act="flt">👀 Ver: '+esc(fltName())+'</button><button class="chip" data-act="wsum">📋 Resumen</button>');
}
/* cabeceras: titulo grande + fila de acciones desplazable */
function vhWrap(){$$('.view .vhead').forEach(function(v){var h=$('h1',v);if(!h)return;var r=$('.vh-acts',v);if(!r){r=document.createElement('div');r.className='vh-acts';v.appendChild(r)}[].slice.call(v.children).forEach(function(c){if(c!==h&&c!==r)r.appendChild(c)})})}
function renderMenu(){
var mon=add(monOf(today()),7*S.menuOff),tI=iso(today()),sun=add(mon,6);
$('#menuRange').textContent=mon.getDate()+' '+MONS[mon.getMonth()]+' – '+sun.getDate()+' '+MONS[sun.getMonth()];
var h='';
for(var i=0;i<7;i++){
var d=add(mon,i),k=iso(d),m=S.menu[k]||{};
var cell=function(slot,lab){var v=m[slot];return '<button class="mc'+(v?'':' empty')+'" data-act="me" data-d="'+k+'" data-s="'+slot+'"><small>'+lab+'</small><b>'+(v?esc(v):'Añadir')+'</b></button>'};
h+='<div class="mday'+(k===tI?' today':'')+'"><h2>'+cap(DOW[i])+'<b class="num">'+d.getDate()+'</b></h2>'+cell('c','Comida')+cell('d','Cena')+'</div>';
}
put($('#mgrid'),h);
}
var AJ=null;
var fm=function(n){return String(Math.round(n*100)/100).replace('.',',')};
var dayAmt=function(){var d=S.cfg?Number(S.cfg.day):NaN;return isFinite(d)&&d>=0?d:1};
function ajInit(tab){
AJ={tab:tab||'pag',ho:JSON.parse(JSON.stringify(S.hor||{})),hk:'a',hd:(dow(today())<5?dow(today()):0),bd:(S.bd||[]).map(function(b){return {id:b.id,n:b.n,d:String(b.d),m:String(b.m),y:b.y?String(b.y):'',i:b.i||'🎂'}}),hol:(S.cfg||{}).hol!==false,vac:(S.cfg||{}).vac!==false,dy:(S.days||[]).map(function(x){return {id:x.id,t:x.t,a:x.a,b:x.b||x.a,k:x.k||'v'}}),cl:(S.cals||[]).map(function(c){return {id:c.id,n:c.n,url:c.url,w:c.w}}),names:{a:KIDS.a.n,e:KIDS.e.n},ic:(S.icons||[]).map(function(x){return [x[0],x[1]]}),cs:wkSt(satOf(today())),clr:false,day:dayAmt(),pin:S.pin,rw:S.rewards.map(function(r){return {id:r.id,t:r.t,c:r.c}}),k:{},ro:{}};
['a','e'].forEach(function(k){
AJ.k[k]={mt:S.mission[k].t,mp:S.mission[k].pts,gn:S.purse[k].goal,gt:S.purse[k].target,pt:S.pts[k],gg:S.purse[k].g};AJ.k0=AJ.k0||{};AJ.k0[k]={pt:S.pts[k],gg:S.purse[k].g};
AJ.ro[k]=S.routine[k].map(function(x){return {id:x.id,t:x.t,g:x.g||'',d:x.d||''}});
});
}
function ajCollect(){
if(!AJ)return;
var g=function(id){var e=document.getElementById(id);return e?e.value:null};
var num=function(v){return Number(String(v).replace(',','.'))};
var v=g('aj-day');if(v!==null)AJ.day=num(v);['a','e'].forEach(function(k){var w=g('aj-na-'+k);if(w!==null)AJ.names[k]=w});AJ.ic.forEach(function(x,i){var p=g('aj-ik-'+i),r=g('aj-ie-'+i);if(p!==null)x[0]=p;if(r!==null)x[1]=r});AJ.cl.forEach(function(c,i){var a=g('aj-cn-'+i),b=g('aj-cu-'+i),w=g('aj-cw-'+i);if(a!==null)c.n=a;if(b!==null)c.url=b.trim();if(w!==null)c.w=w});
v=g('aj-pin');if(v!==null)AJ.pin=v.trim();
['a','e'].forEach(function(k){
var o=AJ.k[k];
v=g('aj-mt-'+k);if(v!==null)o.mt=v;
v=g('aj-mp-'+k);if(v!==null)o.mp=num(v);
v=g('aj-gn-'+k);if(v!==null)o.gn=v;
v=g('aj-gt-'+k);if(v!==null)o.gt=num(v);
v=g('aj-pt-'+k);if(v!==null)o.pt=num(v);
v=g('aj-gg-'+k);if(v!==null)o.gg=num(v);
AJ.ro[k].forEach(function(x,i){var t=g('aj-ro-'+k+'-'+i);if(t!==null)x.t=t;var gg=g('aj-rg-'+k+'-'+i),d2=g('aj-rd-'+k+'-'+i);if(gg!==null)x.g=gg;if(d2!==null)x.d=d2});
});
hList().forEach(function(x,i){var a=g('aj-hs-'+i),b=g('aj-hb-'+i);if(a!==null)x.t=a;if(b!==null)x.b=b});
AJ.bd.forEach(function(x,i){var a=g('aj-bn-'+i),d=g('aj-bd-'+i),m=g('aj-bm-'+i),y=g('aj-by-'+i),ic=g('aj-bi-'+i);if(a!==null)x.n=a;if(d!==null)x.d=d;if(m!==null)x.m=m;if(y!==null)x.y=y.trim();if(ic!==null)x.i=ic});
AJ.rw.forEach(function(r,i){var t=g('aj-rt-'+i);if(t!==null)r.t=t;var c=g('aj-rc-'+i);if(c!==null)r.c=num(c)});
(AJ.dy||[]).forEach(function(x,i){var t=g('aj-dt-'+i),k=g('aj-dk-'+i),a=g('aj-da-'+i),b=g('aj-db-'+i);if(t!==null)x.t=t;if(k)x.k=k;if(a)x.a=a;if(b)x.b=b});
}
function ajHtml(){
var T=AJ.tab,h='<h3>Ajustes</h3><div class="seg ajt">'+[['pag','💶 Paguita'],['rut','✅ Rutinas'],['ev','📅 Eventos'],['cal','🗓️ Agendas'],['hor','🎒 Horario'],['bd','🎂 Fechas'],['gen','🔒 General']].map(function(t){return '<button type="button" data-sh="ajtab" data-t="'+t[0]+'" class="'+(T===t[0]?'on':'')+'">'+t[1]+'</button>'}).join('')+'</div>';
var fl=function(lab,id,val,mode){return '<label class="fld ajf">'+lab+'<input id="'+id+'" value="'+esc(String(val))+'" autocomplete="off"'+(mode?' inputmode="'+mode+'"':'')+'></label>'};
if(T==='pag'){
h+=fl('Euros por día completo (L–V)','aj-day',fm(AJ.day),'decimal')+'<p class="muted ajn">Semana completa: '+fm(AJ.day*5)+' €. Se ingresa cada lunes en el sobre Gastar.</p>';
['a','e'].forEach(function(k){
var o=AJ.k[k];
h+='<div class="ajc"><h4>'+KIDS[k].n+'</h4>'+fl('Misión del día','aj-mt-'+k,o.mt)+'<div class="row">'+fl('Puntos de la misión','aj-mp-'+k,o.mp,'numeric')+fl('Puntos actuales','aj-pt-'+k,o.pt,'numeric')+'</div>'+fl('Meta de ahorro','aj-gn-'+k,o.gn)+'<div class="row">'+fl('Objetivo (€)','aj-gt-'+k,o.gt,'decimal')+fl('Euros en Gastar','aj-gg-'+k,o.gg,'decimal')+'</div></div>';
});
h+='<div class="ajc"><h4>Cofre de premios</h4>'+AJ.rw.map(function(r,i){return '<div class="ajr"><input id="aj-rt-'+i+'" value="'+esc(r.t)+'" placeholder="Premio" autocomplete="off"><input id="aj-rc-'+i+'" value="'+esc(String(r.c))+'" inputmode="numeric" class="aj-pts" aria-label="Puntos"><span class="muted">pts</span><button type="button" class="ib" data-sh="ajrwdel" data-i="'+i+'" aria-label="Quitar premio">✕</button></div>'}).join('')+'<button type="button" class="btn sm" data-sh="ajrwadd">+ Añadir premio</button></div>';
}else if(T==='cal'){
var sg2=function(sh,sel){return '<div class="seg">'+[['1','Mostrar'],['0','Ocultar']].map(function(t){return '<button type="button" data-sh="'+sh+'" data-v="'+t[0]+'" class="'+(String(sel)===t[0]?'on':'')+'">'+t[1]+'</button>'}).join('')+'</div>'};
h+='<div class="ajc"><h4>🏝️ Festivos y vacaciones</h4><p class="muted ajn">Curso 2026-27: festivos nacionales, Navidad y Semana Santa sin cole. Los festivos de tu comunidad y tu municipio, y los días de libre disposición del cole, ponlos como evento.</p><div class="fld">Festivos'+sg2('ajhol',AJ.hol?'1':'0')+'</div><div class="fld">Vacaciones escolares'+sg2('ajvac',AJ.vac?'1':'0')+'</div></div>';
h+='<div class="ajc"><h4>📌 Mis días especiales</h4><p class="muted ajn">Puentes, días sin cole, excursiones, viajes… Salen en la agenda (todo el día) y como aviso en Inicio. «Sin cole» y «Festivo» también saltan el horario del cole.</p>'+AJ.dy.map(function(x,i){return '<div class="ajrw"><div class="ajr"><input id="aj-dt-'+i+'" value="'+esc(x.t)+'" placeholder="Qué es (p. ej. Puente de diciembre)" autocomplete="off"><button type="button" class="ib" data-sh="ajddel" data-i="'+i+'" aria-label="Quitar">✕</button></div><div class="ajsel">'+ajSel('aj-dk-'+i,[['v','🏖️ Sin cole'],['h','🎉 Festivo'],['x','📌 Otro']],x.k)+'</div><div class="fld">Desde'+dpHtml('aj-da-'+i,x.a)+'</div><div class="fld">Hasta'+dpHtml('aj-db-'+i,x.b)+'</div></div>'}).join('')+'<button type="button" class="btn sm" data-sh="ajdadd">+ Añadir día</button></div>';
h+='<div class="ajc"><h4>📅 Google Calendar y otros</h4><p class="muted ajn">En Google Calendar (desde el ordenador): Configuración → tu calendario → «Dirección secreta en formato iCal». Copia el enlace y pégalo aquí. Solo se lee, no se modifica. Quien tenga ese enlace puede ver el calendario: no lo compartas.</p>'+AJ.cl.map(function(c,i){return '<div class="ajcal"><div class="row"><input id="aj-cn-'+i+'" value="'+esc(c.n)+'" placeholder="Nombre (p. ej. '+esc(WHO.al)+')" autocomplete="off"><select id="aj-cw-'+i+'">'+[['all','Todos'],['adults',WHO.al+' y '+WHO.ju],['al',WHO.al],['ju',WHO.ju],['a',KIDS.a.n],['e',KIDS.e.n]].map(function(o){return '<option value="'+o[0]+'"'+(c.w===o[0]?' selected':'')+'>'+esc(o[1])+'</option>'}).join('')+'</select><button type="button" class="ib" data-sh="ajcdel" data-i="'+i+'" aria-label="Quitar">✕</button></div><input id="aj-cu-'+i+'" value="'+esc(c.url)+'" placeholder="https://calendar.google.com/calendar/ical/…" autocomplete="off">'+calSt(c)+'</div>'}).join('')+'<button type="button" class="btn sm" data-sh="ajcadd">+ Añadir calendario</button></div>';
}else if(T==='ev'){
h+='<p class="muted ajn">Ya reconozco unas 80 palabras (examen, dentista, fútbol, cumple…). Aquí añades las tuyas: si el título del evento contiene la palabra, sale ese emoji. Las tuyas tienen prioridad.</p><div class="ajc"><h4>Mis emojis de eventos</h4>'+AJ.ic.map(function(x,i){return '<div class="ajr ajr3"><input id="aj-ik-'+i+'" value="'+esc(x[0])+'" placeholder="Palabra (p. ej. cole)" autocomplete="off"><input id="aj-ie-'+i+'" value="'+esc(x[1])+'" placeholder="🙂" class="aj-pts" aria-label="Emoji"><button type="button" class="ib" data-sh="ajicdel" data-i="'+i+'" aria-label="Quitar">✕</button></div>'}).join('')+'<button type="button" class="btn sm" data-sh="ajicadd">+ Añadir emoji</button></div>';
}else if(T==='hor'){
var HK=AJ.hk,HD=AJ.hd,HL=hList();
h+='<p class="muted ajn">Asignaturas de cada día en orden y qué llevar ese día (sin horas). En Inicio y en Rutina sale lo que toca hoy por la mañana y lo de mañana por la tarde.</p><div class="seg">'+['a','e'].map(function(k){return '<button type="button" data-sh="ajhk" data-v="'+k+'" class="'+(HK===k?'on':'')+'">'+esc(KIDS[k].n)+'</button>'}).join('')+'</div><div class="seg">'+[0,1,2,3,4].map(function(i){return '<button type="button" data-sh="ajhd" data-v="'+i+'" class="'+(HD===i?'on':'')+'">'+cap(DOWS[i])+'</button>'}).join('')+'</div><div class="ajc"><h4>'+esc(KIDS[HK].n)+' · '+cap(DOW[HD])+'</h4>'+HL.map(function(x,i){return '<div class="ajrw"><div class="ajr ajr4"><input id="aj-hs-'+i+'" value="'+esc(x.t)+'" placeholder="Asignatura" autocomplete="off"><button type="button" class="ib" data-sh="ajhup" data-i="'+i+'" data-d="-1" aria-label="Subir">↑</button><button type="button" class="ib" data-sh="ajhup" data-i="'+i+'" data-d="1" aria-label="Bajar">↓</button><button type="button" class="ib" data-sh="ajhdel" data-i="'+i+'" aria-label="Quitar">✕</button></div><input id="aj-hb-'+i+'" value="'+esc(x.b||'')+'" placeholder="Qué llevar (libro, cuaderno, chándal…)" autocomplete="off"></div>'}).join('')+'<div class="mschips">'+['Matemáticas','Lengua','Inglés','Naturales','Sociales','Ed. Física','Música','Plástica','Valores','Francés'].map(function(s){return '<button type="button" class="msc" data-sh="ajhs" data-v="'+esc(s)+'">+ '+esc(s)+'</button>'}).join('')+'</div><button type="button" class="btn sm" data-sh="ajhadd">+ Otra asignatura</button></div>';
}else if(T==='bd'){
h+='<p class="muted ajn">Cumpleaños y fechas que se repiten cada año. Salen en la agenda (todo el día) y como aviso en Inicio. El año es opcional: con él se muestra la edad.</p><div class="ajc"><h4>Fechas de cada año</h4>'+AJ.bd.map(function(x,i){return '<div class="ajrw"><div class="ajr"><input id="aj-bn-'+i+'" value="'+esc(x.n)+'" placeholder="Nombre (p. ej. Abuela)" autocomplete="off"><button type="button" class="ib" data-sh="ajbdel" data-i="'+i+'" aria-label="Quitar">✕</button></div><div class="ajsel">'+ajSel('aj-bd-'+i,Array.apply(null,Array(31)).map(function(z,q){return [String(q+1),String(q+1)]}),x.d)+ajSel('aj-bm-'+i,MONTH.map(function(mn,q){return [String(q+1),cap(mn)]}),x.m)+'<input id="aj-by-'+i+'" value="'+esc(x.y)+'" inputmode="numeric" placeholder="Año (opcional)" autocomplete="off" style="width:110px">'+ajSel('aj-bi-'+i,[['🎂','🎂 Cumple'],['💍','💍 Aniversario'],['⭐','⭐ Otra']],x.i)+'</div></div>'}).join('')+'<button type="button" class="btn sm" data-sh="ajbadd">+ Añadir fecha</button></div>';
}else if(T==='rut'){
h+='<p class="muted ajn">Tareas diarias de cada niño. Las tareas nuevas cuentan desde el día en que las creas (no cambian días anteriores) y las semanas ya cobradas quedan cerradas. Toca 😀 para ponerle un emoticono.</p>';
['a','e'].forEach(function(k){
var L=AJ.ro[k];
h+='<div class="ajc"><h4>'+KIDS[k].n+'</h4>'+L.map(function(x,i){return '<div class="ajrw"><div class="ajr ajr4 e13">'+emoBtn(k,i,x.t)+'<input id="aj-ro-'+k+'-'+i+'" value="'+esc(x.t)+'" placeholder="Tarea" autocomplete="off"><button type="button" class="ib" data-sh="ajroup" data-k="'+k+'" data-i="'+i+'" data-d="-1" aria-label="Subir">↑</button><button type="button" class="ib" data-sh="ajroup" data-k="'+k+'" data-i="'+i+'" data-d="1" aria-label="Bajar">↓</button><button type="button" class="ib" data-sh="ajrodel" data-k="'+k+'" data-i="'+i+'" aria-label="Quitar tarea">✕</button></div>'+emoGrid(k,i,x.t)+'<div class="ajsel">'+ajSel('aj-rg-'+k+'-'+i,[['','Todo el día'],['m','Mañana'],['t','Tarde / noche']],x.g)+ajSel('aj-rd-'+k+'-'+i,[['','Todos los días'],['pre','Víspera de cole'],['cole','Días de cole'],['in','Día de llegada'],['out','Víspera de irse'],['alt0','Días alternos (A)'],['alt1','Días alternos (B)'],['wk','Solo L–V'],['we','Solo fin de semana']],x.d)+'</div></div>'}).join('')+'<button type="button" class="btn sm" data-sh="ajroadd" data-k="'+k+'">+ Añadir tarea</button></div>';
});
}else{
h+='<div class="ajc"><h4>Nombres de los niños</h4><div class="row">'+fl('Niño 1','aj-na-a',AJ.names.a)+fl('Niño 2','aj-na-e',AJ.names.e)+'</div></div>';
var sat=satOf(today());
if(CONF.custody.on)h+='<div class="ajc"><h4>Fines de semana alternos</h4><p class="muted ajn">Fin de semana del '+dl(sat)+'. Los siguientes se alternan solos; puedes cambiar cualquiera desde la Agenda.</p><div class="seg">'+[['us','Con peques 🎉🥳😄'],['them','Sin peques 😢']].map(function(t){return '<button type="button" data-sh="ajcs" data-v="'+t[0]+'" class="'+(AJ.cs===t[0]?'on':'')+'">'+t[1]+'</button>'}).join('')+'</div>'+(Object.keys(S.custody.over).length?'<button type="button" class="btn sm'+(AJ.clr?' primary':'')+'" data-sh="ajclr">'+(AJ.clr?'✓ Se quitarán las excepciones':'Quitar '+Object.keys(S.custody.over).length+' excepciones manuales')+'</button>':'')+'</div>';
var sg=function(sh,opts,sel){return '<div class="seg">'+opts.map(function(t){return '<button type="button" data-sh="'+sh+'" data-v="'+t[0]+'" class="'+(String(t[0])===String(sel)?'on':'')+'">'+t[1]+'</button>'}).join('')+'</div>'};
h+='<div class="ajc"><h4>🌙 Esta pantalla: modo reposo</h4><p class="muted ajn">Para la tablet de la nevera: la pantalla no se apaga y, sin tocarla, muestra un reloj tenue con el próximo evento. Al tocar vuelve el panel. Solo afecta a este dispositivo.</p>'+sg('ajsl',[['1','Activado'],['0','Desactivado']],SL.on?'1':'0')+'<div class="fld">Entrar en reposo tras'+sg('ajslm',[[2,'2 min'],[5,'5 min'],[10,'10 min'],[15,'15 min'],[30,'30 min']],SL.min)+'</div><div class="fld">Noche oscura (22:00–07:00, entra al minuto)'+sg('ajsln',[['1','Sí'],['0','No']],SL.night?'1':'0')+'</div><button type="button" class="btn sm" data-sh="ajslt">Probar ahora</button></div>';
h+='<div class="ajc"><h4>💾 Copia de seguridad</h4><p class="muted ajn">Descarga todos los datos del panel en un archivo. Para restaurar, elige un archivo de copia: sustituye los datos actuales.</p><div class="row"><button type="button" class="btn sm" data-sh="bkdl">Descargar copia</button><label class="btn sm" style="cursor:pointer">Elegir copia…<input id="aj-file" type="file" accept=".json,application/json" hidden></label></div>'+(BK?'<p class="muted ajn">Copia lista ('+esc(BK.t||'sin fecha')+'). Al restaurarla se reemplazan los datos actuales.</p><button type="button" class="btn sm primary" data-sh="bkgo">Restaurar esta copia</button>':'')+'</div>'+abHtml()+secHtml();
h+=fl('Código de adultos (4 cifras)','aj-pin',AJ.pin,'numeric')+'<p class="muted ajn">Es el código para salir del modo niños.</p>';
}
return h+'<div class="acts"><button class="btn ghost" data-sh="close">Cancelar</button><button class="btn primary" data-sh="ajsave">Guardar</button></div>';
}
function ajOpen(){var y=sheet.scrollTop;openSheet(ajHtml(),true);sheet.scrollTop=y}
function clean(s){return String(s==null?'':s).replace(/[<>&"]/g,'').trim().slice(0,40)}
function ajSave(){
ajCollect();
var n=function(v,min,max,d){v=Number(v);if(!isFinite(v))return d;return Math.max(min,Math.min(max,v))};
if(!isFinite(AJ.day)||AJ.day<0||AJ.day>50){toast('Los euros por día no son válidos');return}
if(!/^[0-9]{4}$/.test(AJ.pin)){toast('El código debe tener 4 cifras');return}
S.cfg=Object.assign({},S.cfg,{day:Math.round(AJ.day*100)/100,hol:AJ.hol,vac:AJ.vac});S.cals=AJ.cl.filter(function(c){return /^(https?|webcal):/i.test((c.url||'').trim())}).map(function(c){return {id:c.id,n:(c.n||'').trim()||'Calendario',url:c.url.trim(),w:c.w||'all'}});
S.names={a:clean(AJ.names.a)||CONF.kids.a,e:clean(AJ.names.e)||CONF.kids.e};
S.icons=AJ.ic.filter(function(x){return x[0].trim()&&x[1].trim()}).map(function(x){return [x[0].trim(),x[1].trim()]});
if(AJ.clr)S.custody.over={};
var sat0=satOf(today());
if(AJ.cs!==wkSt(sat0)){S.custody.ref=iso(sat0);S.custody.st=AJ.cs;delete S.custody.over[iso(sat0)]}
S.hor={};['a','e'].forEach(function(k){S.hor[k]={};for(var d=0;d<5;d++){var arr=(((AJ.ho[k]||{})[d])||[]).filter(function(x){return (x.t||'').trim()}).map(function(x){return {t:x.t.trim(),b:(x.b||'').trim()}});if(arr.length)S.hor[k][d]=arr}});
S.days=AJ.dy.filter(function(x){return String(x.t||'').trim()&&/^\d{4}-\d{2}-\d{2}$/.test(x.a)}).map(function(x){var a=x.a,b=(/^\d{4}-\d{2}-\d{2}$/.test(x.b)&&x.b>=a)?x.b:a,k=['v','h','x'].indexOf(x.k)>=0?x.k:'v';return {id:x.id,t:String(x.t).trim().slice(0,60),a:a,b:b,k:k,i:{v:'🏖️',h:'🎉',x:'📌'}[k]}}).sort(function(p,q){return p.a<q.a?-1:p.a>q.a?1:0});
S.bd=AJ.bd.filter(function(x){var d=Number(x.d),m=Number(x.m);return (x.n||'').trim()&&d>=1&&d<=31&&m>=1&&m<=12}).map(function(x){var y=Number(x.y);return {id:x.id,n:x.n.trim(),d:Number(x.d),m:Number(x.m),y:(y>=1900&&y<=2100)?y:0,i:x.i||'🎂'}});
S.pin=AJ.pin;
['a','e'].forEach(function(k){
var o=AJ.k[k];
if(o.mt.trim())S.mission[k].t=o.mt.trim();
S.mission[k].pts=Math.round(n(o.mp,1,9999,S.mission[k].pts));
S.purse[k].goal=o.gn.trim()||S.purse[k].goal;
S.purse[k].target=Math.round(n(o.gt,1,99999,S.purse[k].target)*100)/100;
if(Number(o.pt)!==Number(AJ.k0[k].pt))S.pts[k]=Math.round(n(o.pt,0,99999,S.pts[k]));
if(Number(o.gg)!==Number(AJ.k0[k].gg))S.purse[k].g=Math.round(n(o.gg,0,99999,S.purse[k].g)*100)/100;
S.routine[k]=AJ.ro[k].filter(function(x){return x.t.trim()}).map(function(x){return {id:x.id,t:x.t.trim(),g:x.g||'',d:x.d||''}});
});
S.rewards=AJ.rw.filter(function(r){return r.t.trim()}).map(function(r){return {id:r.id,t:r.t.trim(),c:Math.round(n(r.c,1,9999,10))}});
closeSheet();toast('Ajustes guardados');render();extLoad(true).then(calToast);
}
function alertsList(){
var t=today(),a=[],i;rqAlerts(a);batAlert(a);(S.notes||[]).filter(function(n){return (!n.until||n.until>=iso(t))&&vis(n.w)}).slice(0,3).forEach(function(n){a.push({n:-9,c:'',h:'📌 '+(n.w==='all'?'':esc(WHO[n.w])+': ')+esc(n.t)})});
var rel=function(n){return n===0?'hoy':n===1?'mañana':'en '+n+' días'};
(S.buz||[]).filter(function(x){return !x.done&&bzVis(x)}).slice(-3).forEach(function(x){a.push({n:-8,c:'warn',a:'buz',h:'📮 '+esc(bzN(x.w))+' → '+esc(bzN(bzTo(x)))+': '+esc(x.t)})});
KV().forEach(function(k){var x=horTxt(k);if(x)a.push({n:-5,c:'',a:'nav',v:'rutina',h:'🎒 '+esc(KIDS[k].n)+' · '+x.l+': '+esc(x.s)+(x.b.length?' → llevar '+esc(x.b.join(', ')):'')})});
for(i=0;i<=14;i++){allDay(iso(add(t,i))).forEach(function(x){if(x.k==='b')a.push({n:i,c:i===0?'warn':'',a:'nav',v:'cal',h:x.i+' '+esc(x.t)+' · '+(i===0?'hoy':i===1?'mañana':'en '+i+' días')})})}
S.exams.filter(function(x){return vis(x.w)}).forEach(function(x){var n=dd(t,fromIso(x.date));if(n>=0&&n<=7)a.push({n:n,c:n<=1?'bad':n<=3?'warn':'',a:'nav',v:'tareas',h:'📝 '+esc(x.t)+' · '+esc(WHO[x.w])+' · '+rel(n)})});
var od=[];S.tasks.forEach(function(x){if(x.done||!vis(x.w))return;var n=dd(t,fromIso(x.due));if(n<0)od.push(x);else if(n<=1)a.push({n:n,c:'warn',a:'nav',v:'tareas',h:'✅ '+esc(x.t)+' · '+rel(n)})});
if(od.length<=2)od.forEach(function(x){a.push({n:dd(t,fromIso(x.due)),c:'bad',a:'nav',v:'tareas',h:'✅ '+esc(x.t)+' · vencida'})});
else a.push({n:-1,c:'bad',a:'nav',v:'tareas',h:'✅ '+od.length+' tareas vencidas · ver'});
for(i=1;i<=3;i++){var pv=allDay(iso(add(t,i-1))).map(function(y){return y.k+'|'+y.t});allDay(iso(add(t,i))).forEach(function(x){if((x.k==='h'||x.k==='v')&&pv.indexOf(x.k+'|'+x.t)<0)a.push({n:i,c:'',a:'nav',v:'cal',h:x.i+' '+(i===1?'Mañana':'En '+i+' días')+': '+esc(x.t)})})}
if(dow(t)===6)a.push({n:-20,c:'warn',a:'wsum',h:'📋 Resumen de la semana · ver'});
a.sort(function(p,q){var sp=p.c==='bad'?0:1,sq=q.c==='bad'?0:1;return sp-sq||p.n-q.n});
return a}
function alertChip(x,sh){return '<span class="al '+x.c+'"'+(x.a?(sh?' data-sh="mgo" data-a="'+x.a+'"':' data-act="'+x.a+'"')+(x.v?' data-v="'+x.v+'"':'')+' role="button" tabindex="0"':'')+'>'+x.h+'</span>'}
function ajSel(id,opts,val){return '<select id="'+id+'">'+opts.map(function(o){return '<option value="'+o[0]+'"'+(String(val||'')===o[0]?' selected':'')+'>'+o[1]+'</option>'}).join('')+'</select>'}
function applyNames(){var n=S.names||{};KIDS.a.n=(n.a||CONF.kids.a);KIDS.e.n=(n.e||CONF.kids.e);WHO.a=KIDS.a.n;WHO.e=KIDS.e.n;var a=$('#lgA'),e=$('#lgE');if(a)a.textContent=KIDS.a.n;if(e)e.textContent=KIDS.e.n}
function draw(){HIX={};applyNames();renderRail();renderFlt();Object.keys(VREN).forEach(function(k){VDIRTY[k]=true});drawView(S.view||'home');vhWrap()}
function render(){draw();afterChange()}
