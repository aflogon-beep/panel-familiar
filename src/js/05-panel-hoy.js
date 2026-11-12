/* ===== v6 · panel: HOY protagonista, la semana en resumen ===== */
function dHoyHtml(){
var t=today(),tI=iso(t),nm=nowMin();
var te=eventsOn(tI),ad=allDay(tI),xs=S.exams.filter(function(x){return x.date===tI&&vis(x.w)}),rows='';
var left=te.filter(function(e){return mins(e.e)>nm}).length;
ad.forEach(function(a){rows+='<div class="fi h6-ad ad-'+a.k+'"><span>'+a.i+'</span><b>'+esc(a.t)+'</b></div>'});
xs.forEach(function(x){rows+='<div class="fi h6-ad ad-x"><span>📝</span><b>Examen de '+esc(x.t)+'</b>'+whoTag(x.w,26)+'</div>'});
te.forEach(function(e){var past=mins(e.e)<=nm,cur=mins(e.s)<=nm&&nm<mins(e.e),p=cur?Math.round((nm-mins(e.s))/Math.max(1,mins(e.e)-mins(e.s))*100):0;
rows+='<button type="button" class="fi h6-ev w-'+e.w+(past?' past':'')+(cur?' cur':'')+'" data-act="ev" data-id="'+e.id+'" data-d="'+e.date+'"><span class="h6-t num">'+e.s+'<small>'+e.e+'</small></span><span class="h6-n"><b>'+evIcon(e.t)+' '+esc(e.t)+'</b>'+(cur?'<span class="h6-k">Ahora · '+(mins(e.e)-nm)+' min</span><i class="h6-bar"><i style="width:'+p+'%"></i></i>':'')+'</span>'+whoTag(e.w,34)+'</button>'});
var tmE=eventsOn(iso(add(t,1))),tmS=false;if(!left&&new Date().getHours()>=18&&tmE.length){tmS=true;rows+='<div class="fi h6-ad"><span>🌙</span><b>Mañana</b></div>'+tmE.map(function(e){return '<button type="button" class="fi h6-ev tom w-'+e.w+'" data-act="ev" data-id="'+e.id+'" data-d="'+e.date+'"><span class="h6-t num">'+e.s+'<small>'+e.e+'</small></span><span class="h6-n"><b>'+evIcon(e.t)+' '+esc(e.t)+'</b></span>'+whoTag(e.w,30)+'</button>'}).join('')}
if(!te.length&&!tmS)rows+='<div class="h6-free"><b>'+(ad.length||xs.length?'Sin más planes':'Día libre')+'</b><span>No hay nada apuntado con hora 🎉</span></div>';
var side=h6Side();
var sub=te.length?(left?left+(left===1?' plan por delante':' planes por delante'):'Todo hecho por hoy'):'';
return dcHead('cal','Hoy',sub,'cal')+'<div class="h6-g"><div class="dc-b fitbox h6-tl" data-fit="past">'+rows+'</div><div class="h6-side">'+side+'</div></div>'}
function dSemHtml(){
var t=today(),sat=satOf(t),rows='',f='';
for(var i=1;i<=6;i++){
var d=add(t,i),k=iso(d),wk=dow(d)>=5,st=wk?wkSt(satOf(d)):'',ev=eventsOn(k),ad=allDay(k),xs=S.exams.filter(function(x){return x.date===k&&vis(x.w)});
var bits=ad.map(function(a){return '<span class="s6-ad">'+a.i+' '+esc(a.t)+'</span>'}).concat(xs.map(function(x){return '<span class="s6-ad x">📝 '+esc(x.t)+'</span>'})).concat(ev.slice(0,3).map(function(e){return '<span class="s6-e w-'+e.w+((e.w==='a'||e.w==='e')&&!atHome(d)?' away':'')+'"><small class="num">'+e.s+'</small> '+esc(e.t)+'</span>'}));
if(ev.length>3)bits.push('<span class="s6-m">+'+(ev.length-3)+'</span>');
rows+='<button type="button" class="fi s6-r'+(bits.length?'':' free')+(wk?' wkend':'')+'" data-act="nav" data-v="cal"><span class="s6-d"><small>'+(i===1?'Mañana':DOWS[dow(d)])+'</small><b class="num">'+d.getDate()+'</b></span><span class="s6-l">'+(bits.length?bits.join(''):'<span class="s6-free">Libre</span>')+'</span>'+(wk?'<span class="s6-c '+st+'">'+ic(st==='us'?'heart':'away','sm')+'</span>':'')+'</button>'}
for(var q=0;q<=3;q++){var s2=add(sat,7*q);if(q===0&&dow(t)===0)continue;var s3=wkSt(s2);f+='<button type="button" class="wkchip '+s3+'" data-act="wk" data-wk="'+iso(s2)+'">'+ic(s3==='us'?'heart':'away','sm')+'<span>'+rangeLabel(s2)+'</span></button>'}
return dcHead('cal','Esta semana','','cal')+'<button type="button" class="s6-sum" data-act="wsum"><span class="s6-si">📋</span><span><b>Resumen de la semana</b><small>Planes, exámenes, tareas y finde de un vistazo</small></span><span class="s6-go">›</span></button>'+cdHtml()+'<div class="dc-b fitbox s6-list">'+rows+'</div>'}
