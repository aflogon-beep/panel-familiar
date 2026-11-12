/* ===== v9 · momento del dia, dias fuera, bolsa, tiempo y cuentas atras ===== */
var HIC={};function hiC(d){var k=iso(d);if(HIC[k]===undefined)HIC[k]=homeIdx(d);return HIC[k]}
function fixMig4(){S.cfg=S.cfg||{};if(S.cfg.fx4)return;['a','e'].forEach(function(k){var m=S.mission&&S.mission[k];if(m&&/estanter/i.test(m.t||''))m.t='Limpiar la mesa del cuarto con flis';var L=S.routine[k]=S.routine[k]||[];if(!L.some(function(y){return y.id==='h9'+k+'5'}))L.push({id:'h9'+k+'5',t:'🧹 Pasar la aspiradora',g:'t',d:k==='a'?'alt0':'alt1'})});S.chores=(S.chores||[]).filter(function(c){return c.id!=='h8c3'});S.cfg.fx4=1}
function fixMig3(){S.cfg=S.cfg||{};if(S.cfg.fx3)return;['a','e'].forEach(function(k){var L=S.routine[k]=S.routine[k]||[];
[['h9'+k+'1','🥪 Sacar el táper del desayuno y limpiarlo','cole'],['h9'+k+'2','💧 Rellenar la botella','cole'],['h9'+k+'3','🧳 Deshacer la bolsa al llegar','in'],['h9'+k+'4','🧳 Preparar la bolsa para irse (ropa de deporte, libros, cargador)','out']].forEach(function(x){if(!L.some(function(y){return y.id===x[0]}))L.push({id:x[0],t:x[1],g:'t',d:x[2]})})});S.cfg.fx3=1}
function awayMark(){$$('[data-act=ev][data-d]').forEach(function(e){var m=(e.className.match(/\bw-(a|e)\b/)||[])[1];e.classList.toggle('away',!!m&&!atHome(fromIso(e.dataset.d)))})}
function wxTom(){if(!WXC||WXC.tn===undefined)return null;var d=(WXC.td||'').toLowerCase(),r=/lluv|llovizna|chubasc|tormenta/.test(d);
if(r)return {i:'🌧️',t:'Mañana '+WXC.td.toLowerCase()+': chubasquero o paraguas'};if(WXC.tn<=15)return {i:'🧥',t:'Mañana fresco ('+WXC.tn+'°): llevar chaqueta'};if(WXC.tx>=29)return {i:'☀️',t:'Mañana calor ('+WXC.tx+'°): gorra y agua'};return null}
function wxHintK(k){var t=today();if(!activeR(k,t).some(function(x){return x.d==='pre'}))return '';var w=wxTom();return w?'<div class="wxh">'+w.i+' '+esc(w.t)+'</div>':''}
function cdList(){var t=today(),ti=iso(t),o=[],c=S.cfg||{};
var push=function(d,i,tx){var n=dd(t,d);if(n>=0&&n<=240)o.push({n:n,i:i,t:tx})};
(S.bd||[]).forEach(function(b){var m=Number(b.m)-1,dy=Number(b.d);if(isNaN(m)||isNaN(dy))return;var d=new Date(t.getFullYear(),m,dy);if(iso(d)<ti)d=new Date(t.getFullYear()+1,m,dy);push(d,b.i||'🎂',b.n)});
if(c.vac!==false){var v=VACS.filter(function(x){return x[0]>ti})[0];if(v)push(fromIso(v[0]),v[3],v[2])}
(S.days||[]).forEach(function(x){if(x.a>ti)push(fromIso(x.a),x.i||'📌',x.t)});
o.sort(function(a,b){return a.n-b.n});return o.slice(0,4)}
function cdHtml(){var L=cdList();if(!L.length)return '';return '<div class="cd7">'+L.map(function(x){return '<span class="cd7-c"><span class="cd7-i">'+x.i+'</span><b class="num">'+(x.n===0?'¡Hoy!':x.n)+'<i class="cd7-x">'+(x.n===0?'':x.n===1?' día':' días')+'</i></b><small><span class="cd7-u">'+(x.n===0?'':x.n===1?'día · ':'días · ')+'</span>'+esc(x.t)+'</small></span>'}).join('')+'</div>'}
function momHtml(){var h=new Date().getHours(),t=today(),tI=iso(t),ks=KV().filter(function(k){return atHome(t)}),rows=[],tit;
var pend=function(k,f){return activeR(k,t).filter(function(x){return f(x)&&!isDone(k,x.id)})};
if(h<12){tit='🌅 Esta mañana';ks.forEach(function(k){var p=pend(k,function(x){return x.g==='m'});if(p.length)rows.push('<b>'+esc(KIDS[k].n)+':</b> '+p.map(function(x){return esc(x.t)}).join(' · '))});
var nx=eventsOn(tI)[0];if(nx)rows.push('Primer plan: <b>'+nx.s+' '+esc(nx.t)+'</b>')}
else if(h<20){tit='☀️ Esta tarde';ks.forEach(function(k){var p=pend(k,function(x){return x.d==='cole'||x.d==='in'});if(p.length)rows.push('<b>'+esc(KIDS[k].n)+' al llegar:</b> '+p.map(function(x){return esc(x.t)}).join(' · '))});
var nm=nowMin(),nx2=eventsOn(tI).filter(function(e){return mins(e.s)>nm})[0];if(nx2)rows.push('Siguiente: <b>'+nx2.s+' '+esc(nx2.t)+'</b>')}
else{tit='🌙 Esta noche';var m=S.menu[tI]||{};if(m.d)rows.push('Cena: <b>'+esc(m.d)+'</b>');ks.forEach(function(k){var p=pend(k,function(){return true});if(p.length)rows.push('<b>'+esc(KIDS[k].n)+':</b> faltan '+p.length+' de la rutina')});
var tm=eventsOn(iso(add(t,1)))[0];if(tm)rows.push('Mañana: <b>'+tm.s+' '+esc(tm.t)+'</b>');var w=wxTom();if(w)rows.push(w.i+' '+esc(w.t))}
if(!rows.length)return '';return '<div class="mo7"><div class="mo7-t">'+tit+'</div>'+rows.map(function(r){return '<div class="mo7-r">'+r+'</div>'}).join('')+'</div>'}
