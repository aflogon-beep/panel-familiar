/* ===== Batería de la tablet: indicador en Inicio + avisos de carga ===== */
// Solo informa la tablet (pantalla de 600 px o más y navegador con Battery API, p. ej. Chrome en Android).
// Lo que ve la tablet se guarda en S.cfg.bat {l,c,b,t} solo cuando cambia de tramo, para que los móviles lo vean en Avisos.
var BAT=null,BATB={full:false,seenLow:false,dis:{},disT:0};
function batOn(){return !!(BAT&&Math.min(screen.width,screen.height)>=600)}
function batPct(){return BAT?Math.round(BAT.level*100):null}
function batBucket(l,c){return c?'chg':l<=10?'crit':l<=20?'low':'ok'}
function batIcon(l,c){var w=Math.max(2,Math.round(l/100*16)),col=c?'#22a447':l<=10?'#e5372b':l<=20?'#e8930c':'currentColor';
return '<svg class="bat19-i" viewBox="0 0 26 14" aria-hidden="true"><rect x=".75" y=".75" width="21.5" height="12.5" rx="3.2" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/><rect x="23.5" y="4.5" width="2" height="5" rx="1" fill="currentColor" opacity=".55"/><rect x="3" y="3" width="'+w+'" height="8" rx="1.6" fill="'+col+'"/>'+(c?'<path d="M12.6 2.2 8.4 7.6h3.2l-1 4.2 4.3-5.5h-3.2z" fill="#fff" stroke="#1d7a35" stroke-width=".6" stroke-linejoin="round"/>':'')+'</svg>'}
function batHtml(){if(!batOn())return '';var l=batPct(),c=BAT.charging,b=batBucket(l,c);
return '<span class="bat19 '+b+'" role="img" aria-label="Batería '+l+' %'+(c?', cargando':'')+'">'+batIcon(l,c)+'<b class="num">'+l+'%</b></span>'}
function batAgo(t){var m=Math.round((Date.now()-t)/60000);return m<2?'ahora':m<60?'hace '+m+' min':m<1440?'hace '+Math.round(m/60)+' h':'hace '+Math.round(m/1440)+' d'}
function batAlert(a){var b=S.cfg&&S.cfg.bat;if(!b||b.c||b.l>20)return;
a.push({n:-30,c:b.l<=10?'bad':'warn',h:'🪫 Tablet al '+b.l+' % · enchúfala al cargador'+(batOn()?'':' · '+batAgo(b.t))})}
function batSync(){if(!batOn())return;var l=batPct(),c=BAT.charging?1:0,b=batBucket(l,c),o=S.cfg.bat;
if(o&&o.b===b&&!(b!=='ok'&&b!=='chg'&&o.l-l>=3))return;
S.cfg.bat={l:l,c:c,b:b,t:Date.now()};afterChange()}
function batBanner(kind,l){var el=document.getElementById('bat19b');
if(!kind){if(el)el.remove();return}
if(!el){el=document.createElement('div');el.id='bat19b';el.setAttribute('role','alert');document.body.appendChild(el)}
var T={low:['🪫','La tablet está al '+l+' %','Enchúfala al cargador cuando puedas.'],crit:['🪫','¡Batería al '+l+' %!','Enchúfala ya o se apagará.'],full:['✅','Carga completa','Ya puedes desenchufarla.']}[kind];
el.className='bat19b '+kind;
el.innerHTML='<span class="bat19b-e" aria-hidden="true">'+T[0]+'</span><span class="bat19b-t"><b>'+T[1]+'</b><small>'+T[2]+'</small></span><button type="button" data-act="batok">Vale</button>'}
function batQuiet(){var h=new Date().getHours();return h>=22||h<7}
function batCheck(){if(!batOn())return;var l=batPct(),c=BAT.charging,b=batBucket(l,c),now=Date.now();
var x=document.getElementById('dBat');if(x)x.innerHTML=batHtml();x=document.getElementById('rBat');if(x)x.innerHTML=batHtml();
if(c){if(l<95)BATB.full=true;
  if(BATB.full&&l>=100&&!BATB.dis.full){batBanner('full',l);if(!BATB.fullT){BATB.fullT=setTimeout(function(){BATB.dis.full=1;batBanner(null)},90000)}}
  else if(!(BATB.full&&l>=100))batBanner(null);
  BATB.dis.low=BATB.dis.crit=0;
}else{BATB.full=false;BATB.dis.full=0;clearTimeout(BATB.fullT);BATB.fullT=0;
  if(b==='crit'){if(!BATB.dis.crit||now-BATB.disT>15*60000){if(!document.getElementById('bat19b')&&!batQuiet())sfx('tick');batBanner('crit',l);BATB.dis.crit=0}}
  else if(b==='low'){if(!BATB.dis.low){if(!document.getElementById('bat19b')&&!batQuiet())sfx('tick');batBanner('low',l)}}
  else batBanner(null)}
var bb=document.getElementById('bat19b');if(bb){var tb=bb.querySelector('b');if(tb&&/\d+ %/.test(tb.textContent))tb.textContent=tb.textContent.replace(/\d+ %/,l+' %')}
batSync()}
H.batok=function(){var el=document.getElementById('bat19b');if(!el)return;var k=el.classList.contains('crit')?'crit':el.classList.contains('full')?'full':'low';BATB.dis[k]=1;BATB.disT=Date.now();batBanner(null)};
if(navigator.getBattery){navigator.getBattery().then(function(b){BAT=b;['levelchange','chargingchange'].forEach(function(e){b.addEventListener(e,batCheck)});batCheck()}).catch(function(){})}
