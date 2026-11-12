/* ===== v12 · bolsa de misiones sorpresa (diarias) + mision especial semanal ===== */
function misMig(){S.cfg=S.cfg||{};if(S.cfg.mis6)return;var A=['a','e'],P=function(id,t,w,sp){return {id:id,t:t,pts:sp?15:10,w:w||A,sp:!!sp}};
S.cfg.mpool=[P('m1','Limpiar la mesa del cuarto con flis'),P('m3','Ordenar el cajón de los juguetes o del escritorio'),P('m5','Limpiar el espejo del baño'),P('m6','Ordenar el zapatero'),P('m8','Regar las plantas'),
P('m10','Ayudar a hacer la cena'),P('m11','Preparar el desayuno del finde para todos'),P('m12','Ayudar a comprar en el Mercadona'),P('m13','Hacer un dibujo o una carta para alguien de la familia'),
P('m14a','Ayudar a tu hermana con algo',['a']),P('m14e','Ayudar a tu hermano con algo',['e']),P('m15','Ordenar el salón después de jugar'),
P('s16','🐜 Limpiar el hormiguero a fondo con papá',['a'],1),P('s17','🚗 Lavar el coche (Copito o Blue) con papá',A,1),P('s18','🪟 Limpiar la ventana de tu cuarto',A,1)];
S.cfg.mused={a:[],e:[]};S.cfg.spm={};S.cfg.mis6=1}
function misPick(k,sp,cur){var c=S.cfg,u=(c.mused=c.mused||{a:[],e:[]})[k]=(c.mused[k]||[]),L=(c.mpool||[]).filter(function(x){return (sp===null||!!x.sp===!!sp)&&(x.w||['a','e']).indexOf(k)>=0});if(!L.length)return null;
var f=L.filter(function(x){return u.indexOf(x.id)<0&&x.id!==cur});if(!f.length){L.forEach(function(x){var i=u.indexOf(x.id);if(i>=0)u.splice(i,1)});f=L.filter(function(x){return x.id!==cur});if(!f.length)f=L}
var x=f[Math.floor(Math.random()*f.length)];u.push(x.id);return x}
function misNext(k){var m=S.mission[k],x=misPick(k,null,m.id);if(x){m.id=x.id;m.t=x.t;m.pts=x.pts;m.sp=!!x.sp}m.st='todo';m.day=''}
function misWeekly(k){var m=S.mission[k];if(!m||m.st!=='ok')return;if(m.day&&iso(monOf(fromIso(m.day)))>=iso(monOf(today())))return;misNext(k)}
function spmWeek(k){if(S.cfg&&S.cfg.spm)delete S.cfg.spm}
function spmAppr(k){var s=S.cfg&&S.cfg.spm&&S.cfg.spm[k];if(!s||s.st!=='pending')return '';return '<div class="appr">'+ic('check')+'<span>'+KIDS[k].n+' ha hecho su misión especial «'+esc(s.t)+'» (+'+s.pts+' pts)</span><span style="flex:1"></span><button class="btn sm adult-only" data-act="sap" data-k="'+k+'">Aprobar</button></div>'}
H.smis=function(el){var s=S.cfg.spm&&S.cfg.spm[el.dataset.k];if(!s)return;if(s.st==='ok'){toast('Ya está aprobada. La próxima, el lunes');return}s.st=s.st==='todo'?'pending':'todo';if(s.st==='pending')toast('Misión especial hecha. Falta que un adulto la apruebe');render()};
H.sap=function(el){if(guard())return;var k=el.dataset.k,s=S.cfg.spm&&S.cfg.spm[k];if(!s||s.st==='ok')return;s.st='ok';s.day=iso(today());S.pts[k]=(Number(S.pts[k])||0)+s.pts;xpAdd(k,s.pts);toast('Misión especial aprobada: +'+s.pts+' puntos para '+KIDS[k].n);render()};
