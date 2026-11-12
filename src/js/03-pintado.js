/* ===== pintado ===== */
function renderRail(){
document.body.classList.toggle('kid',S.kid);
var kb=$('#kidBtn');kb.classList.toggle('kidon',S.kid);kb.setAttribute('aria-label',S.kid?'Salir del modo niños':'Activar modo niños');
$('use',kb).setAttribute('href',S.kid?'#i-lock':'#i-kids');$('span',kb).textContent=S.kid?'Adultos':'Niños';
$('#themeIc use').setAttribute('href',isDark()?'#i-sun':'#i-moon');
fabUpd();
}
function renderClock(){var n=new Date();$('#clk').textContent=pad(n.getHours())+':'+pad(n.getMinutes());$('#clkd').textContent=DOWS[dow(n)]+' '+n.getDate()}
function renderHome(){if(PH())renderH5();else renderDash()}
