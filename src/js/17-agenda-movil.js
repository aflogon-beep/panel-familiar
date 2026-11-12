/* ===== v10 · agenda del movil (semana + dia en tarjetas) ===== */
var AG9=null;
function renderAg9(){
var host=$('#ag9');if(!host)return;if(!PH()){host.innerHTML='';return}
var t=today();if(!AG9)AG9=iso(t);var sel=fromIso(AG9),mon=monOf(sel),h='';
var mName=cap(MONTH[sel.getMonth()])+' '+sel.getFullYear();
h+='<div class="g9-top"><button type="button" class="g9-nav" data-g9="prev" aria-label="Semana anterior">'+ic('chl')+'</button><b class="g9-m">'+mName+'</b>'+(AG9!==iso(t)?'<button type="button" class="g9-today" data-g9="today">Hoy</button>':'')+'<button type="button" class="g9-nav" data-g9="next" aria-label="Semana siguiente">'+ic('chr')+'</button></div><div class="g9-wk">';
for(var i=0;i<7;i++){var d=add(mon,i),k=iso(d),n=eventsOn(k).length+allDay(k).length+S.exams.filter(function(x){return x.date===k&&vis(x.w)}).length;
h+='<button type="button" class="g9-d'+(k===AG9?' on':'')+(k===iso(t)?' td':'')+(atHome(d)?' home':'')+'" data-g9="day" data-d="'+k+'"><small>'+cap(DOWS[i])+'</small><b class="num">'+d.getDate()+'</b><i>'+(n?'<em></em>'.repeat(Math.min(3,n)):'')+'</i></button>'}
h+='</div>';
var ev=eventsOn(AG9),ad=allDay(AG9),xs=S.exams.filter(function(x){return x.date===AG9&&vis(x.w)}),dw=dow(sel);
var lab=AG9===iso(t)?'Hoy':AG9===iso(add(t,1))?'Mañana':cap(DOW[dw]);
h+='<div class="g9-dh"><b>'+lab+'</b><span>'+sel.getDate()+' de '+MONTH[sel.getMonth()]+'</span>'+(dw>=4?'<span class="g9-cu '+wkSt(satOf(sel))+'">'+(wkSt(satOf(sel))==='us'?'Con peques':'Sin peques')+'</span>':'')+'</div>';
var allr=ad.map(function(a){return '<div class="g9-ad"><span>'+a.i+'</span><b>'+esc(a.t)+'</b><small>Todo el día</small></div>'}).join('')+xs.map(function(x){return '<div class="g9-ad x"><span>📝</span><b>Examen de '+esc(x.t)+'</b><small>'+esc(WHO[x.w])+'</small></div>'}).join('');
if(allr)h+='<div class="g9-adl">'+allr+'</div>';
if(!ev.length)h+='<div class="g9-empty">'+(allr?'Sin planes con hora':'Día libre 🎉')+'</div>';
else{var nm=AG9===iso(t)?nowMin():-1;h+='<div class="g9-tl">'+ev.map(function(e){var past=nm>=0&&mins(e.e)<=nm,cur=nm>=0&&mins(e.s)<=nm&&nm<mins(e.e);
return '<div class="g9-row'+(past?' past':'')+'"><div class="g9-tm num">'+e.s+'</div><button type="button" class="g9-c w-'+e.w+(cur?' cur':'')+'" data-act="ev" data-id="'+e.id+'" data-d="'+(e.date||AG9)+'"><span class="g9-ic">'+evIcon(e.t,'📌')+'</span><span class="g9-b"><b>'+esc(e.t)+'</b><small>'+esc(WHO[e.w]||'')+(e.cal?' · '+esc(e.cal):'')+(cur?' · ahora':'')+'</small><span class="g9-f">'+whoTag(e.w,22)+'<span class="g9-h">🕒 '+e.s+' – '+e.e+'</span></span></span></button></div>'}).join('')+'</div>'}
host.innerHTML=h;awayMark()}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-g9]');if(!b)return;var a=b.dataset.g9,s=fromIso(AG9||iso(today()));
if(a==='day')AG9=b.dataset.d;else if(a==='prev')AG9=iso(add(s,-7));else if(a==='next')AG9=iso(add(s,7));else if(a==='today')AG9=iso(today());renderAg9()});
(function(){var x0=null,y0=0;document.addEventListener('touchstart',function(e){var w=e.target.closest&&e.target.closest('.g9-wk');x0=w?e.touches[0].clientX:null;y0=e.touches[0].clientY},{passive:true});
document.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){AG9=iso(add(fromIso(AG9||iso(today())),dx<0?7:-7));renderAg9()}},{passive:true})})();
