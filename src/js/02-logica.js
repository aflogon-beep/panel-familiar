/* ===== lógica ===== */
var satOf=function(d){var w=dow(d);return w===6?add(d,-1):add(d,5-w)};
var autoSt=function(sat){if(!CONF.custody.on)return 'us';var n=Math.round(dd(fromIso(S.custody.ref),sat)/7);var same=Math.abs(n)%2===0;return same?S.custody.st:(S.custody.st==='us'?'them':'us')};
var wkSt=function(sat){return S.custody.over[iso(sat)]||autoSt(sat)};
var rangeLabel=function(sat){var s=add(sat,1);return sat.getMonth()===s.getMonth()?sat.getDate()+'–'+s.getDate()+' '+MONS[sat.getMonth()]:sat.getDate()+' '+MONS[sat.getMonth()]+' – '+s.getDate()+' '+MONS[s.getMonth()]};
var HOLS=[['2026-11-02','Todos los Santos','🕯️'],['2026-12-08','La Inmaculada','🎉'],['2026-12-25','Navidad','🎄'],['2027-01-01','Año Nuevo','🎆'],['2027-01-06','Reyes Magos','👑'],['2027-03-25','Jueves Santo','✝️'],['2027-03-26','Viernes Santo','✝️'],['2027-08-16','Asunción de la Virgen','🎉'],['2027-10-12','Fiesta Nacional','🎉'],['2027-11-01','Todos los Santos','🕯️'],['2027-12-06','Día de la Constitución','🎉'],['2027-12-08','La Inmaculada','🎉'],['2027-12-25','Navidad','🎄']];
var VACS=[['2026-12-22','2027-01-07','Vacaciones de Navidad','🎄'],['2027-03-22','2027-03-26','Semana Santa (sin cole)','🐣']];
var EXT=[];
var FLT='all';try{FLT=localStorage.getItem('fam_flt')||'all'}catch(e){}
var ADU={adults:1,al:1,ju:1};var AVS={};
// Avatares: iniciales sobre el color de cada uno (sin fotos)
var AVC={a:['#4f7dff','#2f55d4'],e:['#ff4fa3','#d12f7d'],al:['#3fb06b','#24854b'],ju:['#ff8a4c','#d8622a']};
var avImg=function(w,px){var c=AVC[w];if(!c)return '';var n=String(WHO[w]||'?').trim(),ini=(n[0]||'?').toUpperCase();return '<svg class="avt" width="'+px+'" height="'+px+'" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="32" fill="'+c[1]+'"/><circle cx="32" cy="28" r="30" fill="'+c[0]+'"/><text x="32" y="43" text-anchor="middle" font-family="system-ui,sans-serif" font-size="30" font-weight="800" fill="#fff">'+esc(ini)+'</text></svg>'};
var vis=function(w){if(FLT==='all'||!w||w==='all')return true;if(FLT==='ad')return !!ADU[w];if(FLT==='al'||FLT==='ju')return w==='adults'||w===FLT;return w===FLT};
var KV=function(){return (FLT==='ad'||FLT==='al'||FLT==='ju')?[]:FLT==='a'?['a']:FLT==='e'?['e']:['a','e']};
var fltName=function(){return FLT==='all'?'Todos':FLT==='ad'?'Adultos':WHO[FLT]};
var bdTxt=function(b,k){var y=Number(b.y)||0,age=y?Number(k.slice(0,4))-y:0;if(b.i==='🎂')return 'Cumple de '+b.n+(age>0?' ('+age+')':'');return b.n+(age>0?' · '+age+' años':'')};
var recMatch=function(e,k){var r=e.rec;if(!r||k<=e.date)return false;if(r.until&&k>r.until)return false;var d=fromIso(k);if(r.f==='d')return true;if(r.f==='w')return (r.days&&r.days.length?r.days:[dow(fromIso(e.date))]).indexOf(dow(d))>=0;if(r.f==='m')return d.getDate()===fromIso(e.date).getDate();return false};
var eventsOn=function(k){var out=[];S.events.forEach(function(e){if(e.ex&&e.ex.indexOf(k)>=0)return;if(e.date===k)out.push(e);else if(recMatch(e,k)){var c={};for(var p in e)c[p]=e[p];c.date=k;out.push(c)}});EXT.forEach(function(e){if(e.date===k&&!e.ad)out.push(e)});return out.filter(function(e){return vis(e.w)}).sort(function(a,b){return mins(a.s)-mins(b.s)})};
var allDay=function(k){var o=[],c=S.cfg||{};if(c.hol!==false)HOLS.forEach(function(h){if(h[0]===k)o.push({t:h[1],i:h[2],k:'h'})});if(c.vac!==false)VACS.forEach(function(v){if(k>=v[0]&&k<=v[1])o.push({t:v[2],i:v[3],k:'v'})});(S.days||[]).forEach(function(x){if(k>=x.a&&k<=(x.b||x.a))o.push({t:x.t,i:x.i||'📌',k:x.k||'x'})});EXT.forEach(function(e){if(e.date===k&&e.ad&&vis(e.w))o.push({t:e.t,i:'📅',k:'x',w:e.w})});(S.bd||[]).forEach(function(b){if(Number(b.m)===Number(k.slice(5,7))&&Number(b.d)===Number(k.slice(8,10)))o.push({t:bdTxt(b,k),i:b.i||'🎂',k:'b'})});return o};
var adHtml=function(k){return allDay(k).map(function(a){return '<div class="adb ad-'+a.k+'">'+a.i+' '+esc(a.t)+'</div>'}).join('')};
var isDone=function(k,id,dk){var r=S.rdone[dk||iso(today())];return !!(r&&r[k]&&r[k].indexOf(id)>=0)};
var activeR=function(k,date){if(!atHome(date))return [];var w=dow(date);return (S.routine[k]||[]).filter(function(x){var d=x.d;return !d||(d==='we'&&w>=5)||(d==='wk'&&w<5)||(d==='pre'&&schoolDay(add(date,1)))||(d==='cole'&&schoolDay(date))||(d==='in'&&!atHome(add(date,-1)))||(d==='out'&&!atHome(add(date,1)))||((d==='alt0'||d==='alt1')&&hiC(date)%2===(d==='alt0'?0:1))})};var routineStats=function(k){var L=activeR(k,today());var d=L.filter(function(x){return isDone(k,x.id)}).length;return {d:d,t:L.length,p:L.length?d/L.length:0,all:L.length>0&&d===L.length}};
var dayDone=function(k,i,mon){mon=mon||monOf(today());var d=add(mon,i);if(d>today())return false;var dk=iso(d),L=activeR(k,d);return L.length>0&&L.every(function(x){return isDone(k,x.id,dk)})};
var earned=function(k){var n=0;for(var i=0;i<7;i++){if(dayDone(k,i))n++}return n};
var streak=function(k){var s=0,t=today();for(var i=0;i<60;i++){var d=add(t,-i);if(!atHome(d))continue;var dk=iso(d),L=activeR(k,d),ok=L.length>0&&L.every(function(x){return isDone(k,x.id,dk)});if(ok)s++;else if(i===0)continue;else break}return s};
var nowMin=function(){var n=new Date();return n.getHours()*60+n.getMinutes()};
function nowInfo(){
var nm=nowMin(),evs=eventsOn(iso(today()));
var cur=evs.filter(function(e){return mins(e.s)<=nm&&nm<mins(e.e)})[0];
if(cur)return {k:'now',e:cur,txt:'Termina en '+human(mins(cur.e)-nm)+', a las '+cur.e};
var nx=evs.filter(function(e){return mins(e.s)>nm})[0];
if(nx)return {k:'next',e:nx,txt:'Empieza en '+human(mins(nx.s)-nm)+', a las '+nx.s};
return {k:'none'};
}
function ring(p,size){var r=34,c=2*Math.PI*r;return '<svg class="ring" viewBox="0 0 80 80" width="'+size+'" height="'+size+'" aria-hidden="true"><circle cx="40" cy="40" r="'+r+'" class="rg-bg"/><circle cx="40" cy="40" r="'+r+'" class="rg-fg" stroke-dasharray="'+c+'" stroke-dashoffset="'+(c*(1-p))+'" transform="rotate(-90 40 40)"/></svg>'}
function whenLbl(n,kind){
if(n<0)return kind==='t'?'Vencida hace '+(-n)+(n===-1?' día':' días'):'Pasado';
if(n===0)return kind==='t'?'Vence hoy':'Es hoy';
if(n===1)return kind==='t'?'Vence mañana':'Es mañana';
return (kind==='t'?'Vence ':'')+'en '+n+' días';
}
var guard=function(){if(S.kid){toast('Eso lo hacen los adultos');return true}return false};
var tt;function toast(m,lab,fn){var t=$('#toast');t.textContent=m;if(lab){var b=document.createElement('button');b.type='button';b.className='toast-a';b.textContent=lab;b.addEventListener('click',function(){t.hidden=true;clearTimeout(tt);fn()});t.appendChild(b)}t.hidden=false;clearTimeout(tt);tt=setTimeout(function(){t.hidden=true},lab?6500:2800)}
var isDark=function(){var t=document.documentElement.dataset.theme;return t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches};
