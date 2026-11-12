/* ===== v8 · hogar: dias en casa, rutinas y tareas de los peques ===== */
CMEM=['a','e'];
function atHome(d){if(!CONF.custody.on)return true;var w=dow(d);if(CONF.custody.away.indexOf(w)>=0)return false;if(w<=3)return true;return wkSt(satOf(d))==='us'}
function schoolDay(d){return dow(d)<5&&!isOff(d)}
var HIX={};function homeIdx(d){var e=iso(d);if(HIX[e]!==undefined)return HIX[e];var n=0,x=new Date(2026,0,5);while(iso(x)<e){if(atHome(x))n++;x=add(x,1)}HIX[e]=n;return n}
function nextHome(){var t=today();for(var i=1;i<15;i++){var d=add(t,i);if(atHome(d))return (i===1?'mañana':DOW[dow(d)]+' '+d.getDate())}return ''}
function homeDaysWeek(){var m=monOf(today()),n=0;for(var i=0;i<7;i++)if(atHome(add(m,i)))n++;return n}
function cOrder(){return ['a','e']}
function cAssign(d){
var o=[],dn=S.cdone||{},di=iso(d);if(!atHome(d))return o;
var sh=(S.cfg&&S.cfg.cshift)||0,hi=null,mon=monOf(d),wi=Math.round(dd(CEP,mon)/7)+sh;
var md=function(a,n){return ((a%n)+n)%n};
(S.chores||[]).forEach(function(c,ci){
if(c.s&&di<c.s)return;
var L=(c.w&&c.w.length?c.w:CMEM).filter(function(m){return m==='a'||m==='e'});if(!L.length)return;
var f=c.f||'d',key,m;
if(f==='w'){key='w'+iso(mon)+'|'+c.id;m=L[md(wi+(Number(c.o)||0),L.length)]}
else if(f==='n'){var N=Math.max(2,Number(c.n)||4),s0=fromIso(c.s||'2026-01-05'),p=Math.floor(dd(s0,d)/N);key='n'+iso(add(s0,p*N))+'|'+c.id;m=L[md(p+(Number(c.o)||0)+sh,L.length)]}
else{if(hi===null)hi=homeIdx(d);key=di+'|'+c.id;m=L[md(hi+(Number(c.o)||0)+sh,L.length)]}
o.push({c:c,m:m,key:key,done:!!dn[key]})});
return o}
var HG_S='2026-10-19';
function hogarMig(){S.cfg=S.cfg||{};if(S.cfg.hogar===2)return;
var R=function(k){return [{id:'h8'+k+'1',t:'🛏️ Hacer la cama',g:'m',d:''},{id:'h8'+k+'2',t:'🧹 Recoger y ordenar su cuarto',g:'t',d:''},{id:'h8'+k+'3',t:'🧺 Ropa sucia al cesto',g:'t',d:''},{id:'h8'+k+'4',t:'📚 Deberes y estudiar',g:'t',d:'pre'},{id:'h8'+k+'5',t:'🎒 Preparar la mochila',g:'t',d:'pre'},{id:'h8'+k+'6',t:'👕 Preparar la ropa de mañana',g:'t',d:'pre'}]};
S.routine={a:R('a'),e:R('e')};
var K=['a','e'],C=function(id,t,i,f,p,w,x){var c={id:id,t:t,i:i,f:f,p:p,w:w,s:HG_S};for(var q in x||{})c[q]=x[q];return c};
S.chores=[C('h8c1','Poner la mesa','🍽️','d',2,K,{o:0}),C('h8c2','Recoger la mesa','🧽','d',2,K,{o:1}),C('h8c3','Pasar la aspiradora','🧹','d',3,K,{o:1}),
C('h8c4','Poner el lavavajillas','🫧','d',2,K,{o:1}),C('h8c5','Vaciar el lavavajillas','🍴','d',2,K,{o:0}),C('h8c6','Revisar el hormiguero','🐜','n',2,['a'],{n:4}),
C('h8c7','Ordenar su armario','👕','n',5,['a'],{n:14}),C('h8c8','Ordenar su armario','👕','n',5,['e'],{n:14}),C('h8c9','Limpiar el lavabo del baño','🚰','w',3,K,{o:1})];
S.cfg.hogar=2}
function fixMig(){S.cfg=S.cfg||{};if(S.cfg.fx1)return;var bad={'MAtes':1,'REligiónm':1,'MAtemáticas':1};S.exams=(S.exams||[]).filter(function(x){return !(x.date==='2026-11-03'&&bad[(x.t||'').trim()])});S.cfg.fx1=1}
function fixMig2(){S.cfg=S.cfg||{};if(S.cfg.fx2)return;S.events=S.events||[];
[['bk1','2026-10-27','17:00','18:30'],['bk2','2026-10-30','16:00','17:30']].forEach(function(x){if(S.events.some(function(e){return e.id===x[0]||(norm(e.t)===norm('Baloncesto')&&e.date===x[1]&&e.s===x[2])}))return;S.events.push({id:x[0],date:x[1],s:x[2],e:x[3],t:'Baloncesto',w:'a',rec:{f:'w'}})});
S.cfg.fx2=1}
