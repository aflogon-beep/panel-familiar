/* ===== navegación ===== */
var calY=88,calSet=0;
function go(v){
S.view=v;
$$('.view').forEach(function(s){s.classList.toggle('on',s.id==='v-'+v)});
$$('.nav-btn[data-v]').forEach(function(b){b.classList.toggle('on',b.dataset.v===v)});
fabUpd();if(VDIRTY[v])drawView(v);
if(v==='cal'){if(!calSet){calSet=1;calY=Math.max(0,(nowMin()-90-CAL.H0*60)*CAL.HH/60)}$('#calScroll').scrollTop=calY}
window.scrollTo(0,0);
}
