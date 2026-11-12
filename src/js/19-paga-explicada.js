/* ===== v12 · paguita explicada: barra en Rutinas + reglas en Paguita ===== */
// Versión compacta para la cabecera de Rutina: una línea bajo el nombre
function paySub(k,rs){if(!rs||!rs.t)return '';var a=fm(dayAmt())+'\u00a0€',left=rs.t-rs.d;
return rs.all?'<small class="rp-sub ok">✅ ¡'+a+' ganado hoy!</small>':'<small class="rp-sub">Te falta'+(left===1?' <b>1 cosa</b>':'n <b>'+left+' cosas</b>')+' para ganar <b>'+a+'</b></small>'}
// Puntos en pequeño (el detalle de nivel y premios está en Paguita › Puntos)
function ptsChip(k){var p=Number(S.pts[k])||0,fx='';if(XPFX&&XPFX.k===k&&Date.now()-XPFX.t<1500){fx='<span class="xp12-fl">+'+XPFX.n+' ⭐</span>';setTimeout(function(){XPFX=null},60)}
return '<button type="button" class="rp-pts'+(fx?' bump':'')+'" data-act="rppts" aria-label="'+p+' puntos, ver premios">⭐<b class="num">'+p+'</b>'+fx+'</button>'}
function payBar(k,rs){if(!rs||!rs.t)return '';var a=fm(dayAmt())+' €',left=rs.t-rs.d;
if(rs.all)return '<div class="pay12 ok">✅ <b>¡'+a+' ganado hoy!</b></div>';
return '<div class="pay12">💶 <span>Te falta'+(left===1?' <b>1 cosa</b>':'n <b>'+left+' cosas</b>')+' para ganar <b>'+a+'</b> hoy</span></div>'}
function payRulesHtml(){var n=homeDaysWeek(),a=fm(dayAmt()),cl=true;try{cl=localStorage.getItem('fam_payr')!=='1'}catch(e){}
return '<details class="pay12r"'+(cl?'':' open')+'><summary>ⓘ Cómo se gana la paguita</summary><ul>'+
'<li>💶 <b>'+a+' € por día completo en casa.</b> Completo = toda la rutina de ese día marcada.</li>'+
'<li>📅 <b>Solo cuentan los días en casa.</b> Esta semana: '+n+(n===1?' día':' días')+' → hasta <b>'+fm(n*dayAmt())+' €</b>.</li>'+
'<li>🗓️ <b>Se cobra el lunes:</b> lo de la semana pasada va a la hucha.</li>'+
'<li>⭐ <b>Tareas de casa y misiones dan puntos</b>, no euros. Los puntos se canjean por premios.</li></ul></details>'}
function wdVal(k,i,ti,mon0){var d=add(mon0,i);if(!atHome(d))return '—';if(dayDone(k,i))return fm(dayAmt())+' €';if(i<ti)return '0 €';if(i===ti)return 'hoy';return ''}
document.addEventListener('toggle',function(e){var d=e.target;if(d&&d.classList&&d.classList.contains('pay12r')){try{localStorage.setItem('fam_payr',d.open?'1':'0')}catch(x){}}},true);
