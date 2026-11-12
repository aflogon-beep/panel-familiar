/* ===== tiempo (Open-Meteo, ciudad de CONF.city) ===== */
var WX=function(c){if(c===0)return ['☀️','Despejado'];if(c<=2)return ['🌤️','Poco nuboso'];if(c===3)return ['☁️','Nublado'];if(c<=48)return ['🌫️','Niebla'];if(c<=57)return ['🌦️','Llovizna'];if(c<=67)return ['🌧️','Lluvia'];if(c<=77)return ['🌨️','Nieve'];if(c<=82)return ['🌦️','Chubascos'];if(c<=86)return ['🌨️','Nieve'];return ['⛈️','Tormenta']};
var SL={on:false,min:5,night:true},slLock=null,slLast=Date.now(),slOn=false,slMan=false,slIx=0,slSh=-1;
function slLoad(){try{var o=JSON.parse(localStorage.getItem('fam_sleep')||'{}');SL.on=!!o.on;SL.min=[2,5,10,15,30].indexOf(o.min)>=0?o.min:5;SL.night=o.night!==false}catch(e){}}
function slSave(){try{localStorage.setItem('fam_sleep',JSON.stringify(SL))}catch(e){}}
function slNight(){var h=new Date().getHours();return SL.night&&(h>=22||h<7)}
function slWake(){slLast=Date.now()}
function slLockReq(){if((!SL.on&&!slMan)||!navigator.wakeLock||document.hidden||slLock)return;try{navigator.wakeLock.request('screen').then(function(l){slLock=l;l.addEventListener('release',function(){slLock=null})}).catch(function(){})}catch(e){}}
function slLockRel(){if(slLock){try{slLock.release()}catch(e){}slLock=null}}
function slSlides(){
var out=[],now=new Date(),tk=iso(now),nm=nowMin(),t0=today(),i;
var up=allEv(tk).filter(function(e){return mins(e.e)>=nm}).slice(0,3),tm=allEv(iso(add(t0,1))).slice(0,2);
var rw=function(e){return '<div class="slr"><b class="num">'+e.s+'</b><span>'+evIcon(e.t)+' '+esc(e.t)+'</span><i>'+avImg(e.w,30)+'</i></div>'};
out.push({t:'📅 Hoy',h:(up.length?up.map(rw).join(''):'<p>Ya no quedan planes hoy 🎉</p>')+(tm.length?'<h4>Mañana</h4>'+tm.map(rw).join(''):'')});
var A=cAssign(t0);
if(A.length)out.push({t:'🏠 Casa hoy',h:'<div class="slc">'+CMEM.map(function(m){var L=A.filter(function(x){return x.m===m});return '<div class="slcm">'+avImg(m,44)+'<div><b>'+esc(WHO[m])+'</b><span>'+(L.length?L.map(function(x){return '<i class="'+(x.done?'dn':'')+'">'+esc(((x.c.i||'')+' '+x.c.t).trim())+'</i>'}).join(''):'<i>Libre hoy 😎</i>')+'</span></div></div>'}).join('')+'</div>'});
var mm=S.menu[tk]||{};
if(mm.c||mm.d)out.push({t:'🍽️ Menú de hoy',h:'<div class="slm"><div><small>Comida</small><b>'+esc(mm.c||'—')+'</b></div><div><small>Cena</small><b>'+esc(mm.d||'—')+'</b></div></div>'});
var nx=[],sat=satOf(t0),rel=function(n){return n===0?'hoy':n===1?'mañana':'en '+n+' días'};
nx.push('<div class="slr"><span>'+(wkSt(sat)==='us'?'🎉 Este finde con peques':'😢 Este finde sin peques')+'</span><i>'+rangeLabel(sat)+'</i></div>');
S.exams.forEach(function(x){var n=dd(t0,fromIso(x.date));if(n>=0&&n<=14)nx.push('<div class="slr"><span>📝 Examen de '+esc(x.t)+esc(sumWho(x.w))+'</span><i>'+rel(n)+'</i></div>')});
S.tasks.forEach(function(x){if(x.done)return;var n=dd(t0,fromIso(x.due));if(n<=3)nx.push('<div class="slr"><span>✅ '+esc(x.t)+esc(sumWho(x.w))+'</span><i>'+(n<0?'vencida':rel(n))+'</i></div>')});
for(i=0;i<=30;i++)allDay(iso(add(t0,i))).forEach(function(a){if(a.k==='b')nx.push('<div class="slr"><span>'+a.i+' '+esc(a.t)+'</span><i>'+rel(i)+'</i></div>')});
out.push({t:'⏭️ Lo próximo',h:nx.slice(0,5).join('')});
return out}
function slDraw(){
var n=new Date(),hh=n.getHours();
$('#slT').textContent=pad(hh)+':'+pad(n.getMinutes());
$('#slD').textContent=cap(DOW[dow(today())])+' '+n.getDate()+' de '+MONTH[n.getMonth()];
$('#slG').textContent=(hh<13?'Buenos días':hh<20?'Buenas tardes':'Buenas noches')+', familia 🌺';
$('#slW').textContent=WXC?WXC.i+' '+WXC.t+'° · '+WXC.d+' ('+WXC.a+'°–'+WXC.b+'°)':'';
var f='';CMEM.forEach(function(m){f+='<div class="sf">'+avImg(m,84)+'<span>'+esc(WHO[m])+'</span></div>'});
var fe=$('#slF');if(fe.dataset.h!==f){fe.dataset.h=f;fe.innerHTML=f}
var L=slSlides(),el=$('#slM'),h='';
if(L.length){var s=L[((slIx%L.length)+L.length)%L.length];h='<div class="sl-sl"><h3>'+s.t+'</h3>'+s.h+'</div>'}
if(el.dataset.h!==h){el.dataset.h=h;el.innerHTML=h}
var k=hh*60+n.getMinutes();
if(slSh!==k){slSh=k;var w=$('#slWrap');if(w)w.style.transform='translate('+Math.round((Math.random()-.5)*20)+'px,'+Math.round((Math.random()-.5)*20)+'px)'}
}
function slShow(){var el=$('#sleep');if(!el||slOn)return;slOn=true;el.classList.toggle('night',slNight());slDraw();el.hidden=false;requestAnimationFrame(function(){el.classList.add('on')})}
function slHide(){var el=$('#sleep');if(!el||!slOn)return;slOn=false;slMan=false;if(!SL.on)slLockRel();el.classList.remove('on');setTimeout(function(){if(!slOn)el.hidden=true},300);slWake();try{pull()}catch(e){}}
function slTick(){if(!SL.on&&!slMan){if(slOn)slHide();return}slLockReq();if(slOn){slDraw();return}var sc=$('#scrim'),lg=$('#login');if((sc&&!sc.hidden)||(lg&&!lg.hidden))return;var idle=(Date.now()-slLast)/60000,lim=slNight()?1:SL.min;if(idle>=lim)slShow()}
['pointerdown','keydown','touchstart','wheel'].forEach(function(ev){document.addEventListener(ev,function(){if(!slOn)slWake()},true)});
$('#sleep').addEventListener('click',function(e){e.stopPropagation();slHide()});
document.addEventListener('visibilitychange',function(){if(!document.hidden)slLockReq()});
setInterval(slTick,10000);slLoad();slLockReq();
setInterval(function(){if(slOn){slIx++;slDraw()}},15000);
var NL=String.fromCharCode(10),CR=String.fromCharCode(13),BS=String.fromCharCode(92);
function icsUnesc(v){return v.split(BS+'n').join(' ').split(BS+'N').join(' ').split(BS+',').join(',').split(BS+';').join(';').split(BS+BS).join(BS)}
function icsDate(v){v=(v||'').trim();if(v.length<8)return null;var y=v.slice(0,4),mo=v.slice(4,6),da=v.slice(6,8);if(v.indexOf('T')<0)return {d:y+'-'+mo+'-'+da,m:-1};var hh=Number(v.slice(9,11)),mi=Number(v.slice(11,13));if(v.slice(-1)==='Z'){var t=new Date(Date.UTC(Number(y),Number(mo)-1,Number(da),hh,mi));return {d:iso(t),m:t.getHours()*60+t.getMinutes()}}return {d:y+'-'+mo+'-'+da,m:hh*60+mi}}
var ICD={MO:0,TU:1,WE:2,TH:3,FR:4,SA:5,SU:6};
function icsExpand(start,rr,hi){
var o={};rr.split(';').forEach(function(p){var i=p.indexOf('=');if(i>0)o[p.slice(0,i)]=p.slice(i+1)});
var iv=Number(o.INTERVAL)||1,cnt=Number(o.COUNT)||0,un=hi;if(o.UNTIL){var ud=icsDate(o.UNTIL);if(ud&&ud.d<un)un=ud.d}
var out=[],d0=fromIso(start),n=0,i,dt;
var push=function(k){if(k>=start&&k<=un&&(!cnt||out.length<cnt))out.push(k)};
if(o.FREQ==='DAILY'){for(dt=d0;iso(dt)<=un&&n<900&&(!cnt||out.length<cnt);dt=add(dt,iv),n++)push(iso(dt))}
else if(o.FREQ==='WEEKLY'){var bd=(o.BYDAY?o.BYDAY.split(','):[]).map(function(x){return ICD[x.slice(-2)]}).filter(function(x){return x!==undefined});if(!bd.length)bd=[dow(d0)];bd.sort();for(var w=monOf(d0);iso(w)<=un&&n<400&&(!cnt||out.length<cnt);w=add(w,7*iv),n++){bd.forEach(function(b){push(iso(add(w,b)))})}}
else if(o.FREQ==='MONTHLY'){for(i=0;i<120&&(!cnt||out.length<cnt);i++){dt=new Date(d0.getFullYear(),d0.getMonth()+i*iv,d0.getDate());if(dt.getDate()!==d0.getDate())continue;if(iso(dt)>un)break;push(iso(dt))}}
else if(o.FREQ==='YEARLY'){for(i=0;i<12&&(!cnt||out.length<cnt);i++){dt=new Date(d0.getFullYear()+i*iv,d0.getMonth(),d0.getDate());if(iso(dt)>un)break;push(iso(dt))}}
else out.push(start);
return out}
function icsParse(txt,cal){
var L=txt.split(CR).join('').split(NL),U=[];
L.forEach(function(l){if((l.charAt(0)===' '||l.charAt(0)==='\t')&&U.length)U[U.length-1]+=l.slice(1);else U.push(l)});
var evs=[],cur=null;
U.forEach(function(l){
if(l==='BEGIN:VEVENT'){cur={ex:[]};return}
if(l==='END:VEVENT'){if(cur)evs.push(cur);cur=null;return}
if(!cur)return;var ci=l.indexOf(':');if(ci<0)return;
var nm=l.slice(0,ci).split(';')[0].toUpperCase(),v=l.slice(ci+1);
if(nm==='EXDATE')v.split(',').forEach(function(x){var q=icsDate(x);if(q)cur.ex.push(q.d)});else cur[nm]=v;
});
var lo=iso(add(today(),-7)),hi=iso(add(today(),400)),ovr={},out=[];
evs.forEach(function(e){if(e['RECURRENCE-ID']){var q=icsDate(e['RECURRENCE-ID']);if(q)ovr[e.UID+'|'+q.d]=1}});
evs.forEach(function(e,ix){
if((e.STATUS||'').toUpperCase()==='CANCELLED')return;
var s=icsDate(e.DTSTART);if(!s)return;
var en=icsDate(e.DTEND)||s,ad=s.m<0;
var dates=(e.RRULE&&!e['RECURRENCE-ID'])?icsExpand(s.d,e.RRULE,hi):[s.d];
var t=icsUnesc(e.SUMMARY||'')||'(sin título)';
dates.forEach(function(dk){
if(e.ex.indexOf(dk)>=0||(e.RRULE&&!e['RECURRENCE-ID']&&ovr[e.UID+'|'+dk]))return;
if(ad){var span=Math.max(1,Math.min(30,dd(fromIso(s.d),fromIso(en.d))));for(var j=0;j<span;j++){var k2=iso(add(fromIso(dk),j));if(k2>=lo&&k2<=hi)out.push({id:'x'+cal.id+'_'+ix+'_'+k2,date:k2,s:'00:00',e:'23:59',t:t,w:cal.w||'all',ad:true,cal:cal.n})}}
else if(dk>=lo&&dk<=hi){var st=s.m,ee=(en.m>=0&&en.d===s.d&&en.m>st)?en.m:(en.d>s.d?1439:Math.min(st+60,1439));out.push({id:'x'+cal.id+'_'+ix+'_'+dk,date:dk,s:hm(st),e:hm(ee),t:t,w:cal.w||'all',ad:false,cal:cal.n})}
});
});
return out.slice(0,2000);
}
var EXTC={};try{EXTC=JSON.parse(localStorage.getItem('fam_ext')||'{}')}catch(e){EXTC={}}
function extRebuild(){var ids={};(S.cals||[]).forEach(function(c){ids[c.id]=1});EXT=[];Object.keys(EXTC).forEach(function(id){if(ids[id])EXT=EXT.concat(EXTC[id].ev)})}
function calMsg(c){var x=EXTC[c.id],u=c.url||'';if(!u)return '';if(/\/embed|\/r\b|cid=/.test(u))return '⚠️ Ese enlace no es iCal: usa la «Dirección secreta en formato iCal»';if(!x||x.u!==u)return '⏳ Se comprobará al guardar';
var e=x.err;if(!e){var n=(x.ev||[]).length;return n?'✓ Leído: '+n+' eventos próximos':'✓ Leído, pero sin eventos próximos'}
if(e==='upstream')return /\/public\//.test(u)?'⚠️ Google no deja leerlo: ese es el enlace público y el calendario es privado. Usa la «Dirección secreta en formato iCal»':'⚠️ Google no deja leerlo: revisa que sea la «Dirección secreta en formato iCal» completa';
if(e==='host'||e==='url')return '⚠️ Enlace no válido (debe ser de Google, iCloud u Outlook)';if(e==='notics')return '⚠️ Ese enlace no devuelve un calendario iCal';if(e==='auth')return '⚠️ Sesión caducada: vuelve a entrar';return '⚠️ No se pudo leer ahora; se reintentará'}
function calSt(c){var m=calMsg(c);return m?'<small class="calst'+(m.charAt(0)==='✓'?' ok':'')+'">'+esc(m)+'</small>':''}
function calToast(){var L=(S.cals||[]).filter(function(c){return c.url});if(!L.length)return;toast(L.map(function(c){return '📅 '+(c.n||'Calendario')+': '+calMsg(c).replace(/^[✓⚠️⏳]+\s*/,'')}).join(' · '))}
function extStore(){try{localStorage.setItem('fam_ext',JSON.stringify(EXTC))}catch(e){}}
function extLoad(force){
if(!S.cals||!S.cals.length){EXTC={};extRebuild();extStore();return Promise.resolve()}
if(!KEY){extRebuild();return Promise.resolve()}
return Promise.all(S.cals.map(function(c){
var ca=EXTC[c.id];if(!force&&ca&&ca.u===c.url&&ca.w===c.w&&Date.now()-ca.t<25*60000)return null;
return fetch('/api/ics?u='+encodeURIComponent(c.url),{headers:{'X-Family-Key':KEY}}).then(function(r){if(!r.ok)return r.json().catch(function(){return {}}).then(function(j){throw new Error(j.error||('http'+r.status))});return r.text()}).then(function(t){var ok=/BEGIN:VCALENDAR/.test(t);EXTC[c.id]={t:Date.now(),u:c.url,w:c.w,ev:ok?icsParse(t,c):[],err:ok?'':'notics',ok:Date.now()}}).catch(function(e){var o=EXTC[c.id];EXTC[c.id]={t:Date.now(),u:c.url,w:c.w,ev:(o&&o.u===c.url)?o.ev:[],err:(e&&e.message)||'red'}});
})).then(function(){extRebuild();extStore();draw()});
}
setInterval(function(){extLoad()},10*60000);
function cacheSave(){try{localStorage.setItem('fam_cache',JSON.stringify({rev:rev,data:snap()}))}catch(e){}}
function cacheLoad(){if(rev>=0)return;try{var c=JSON.parse(localStorage.getItem('fam_cache')||'null');if(c&&c.data){SY.forEach(function(k){if(c.data[k]!==undefined&&c.data[k]!==null)S[k]=c.data[k]});draw()}}catch(e){}}
if('serviceWorker' in navigator)window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})});
function loadWeather(){
fetch('https://api.open-meteo.com/v1/forecast?latitude='+CONF.city.lat+'&longitude='+CONF.city.lon+'&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=2').then(function(r){return r.json()}).then(function(j){
var c=WX(j.current.weather_code),t=WX(j.daily.weather_code[1]);WXC={i:c[0],t:Math.round(j.current.temperature_2m),d:c[1],a:Math.round(j.daily.temperature_2m_min[0]),b:Math.round(j.daily.temperature_2m_max[0]),ti:t[0],td:t[1],tn:Math.round(j.daily.temperature_2m_min[1]),tx:Math.round(j.daily.temperature_2m_max[1])};try{renderWx()}catch(e){}try{if(slOn)slDraw()}catch(e){}
$('#weather').innerHTML='<div><span class="chip">'+esc(CONF.city.name)+'</span></div><div style="font-size:54px;line-height:1">'+c[0]+'</div><div class="temp num">'+Math.round(j.current.temperature_2m)+'°</div><div></div><div class="desc">'+c[1]+', entre '+Math.round(j.daily.temperature_2m_min[0])+'° y '+Math.round(j.daily.temperature_2m_max[0])+'°</div><div class="tom"><span>Mañana: '+t[1].toLowerCase()+', '+Math.round(j.daily.temperature_2m_min[1])+'°–'+Math.round(j.daily.temperature_2m_max[1])+'°</span><small style="font-weight:600;opacity:.7">Open-Meteo.com</small></div>';
}).catch(function(){});
}
