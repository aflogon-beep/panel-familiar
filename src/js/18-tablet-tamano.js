/* ===== v11 · tamano en tablet (por dispositivo) ===== */
var SZF={n:1,g:1.2,mg:1.4},SZN={n:'Normal',g:'Grande',mg:'Muy grande'};
function szGet(){var v='';try{v=localStorage.getItem('fam_sz')||''}catch(e){}return SZF[v]?v:'g'}
function szApply(){var m=document.querySelector('meta[name=viewport]');if(!m)return;var sw=Math.max(screen.width,screen.height),sh=Math.min(screen.width,screen.height);
if(sh<600){m.setAttribute('content','width=device-width,initial-scale=1,viewport-fit=cover');return}
var land=matchMedia('(orientation: landscape)').matches,w=land?sw:sh,f=SZF[szGet()];
m.setAttribute('content',f===1?'width=device-width,initial-scale=1,viewport-fit=cover':'width='+Math.round(w/f)+',viewport-fit=cover')}
szApply();window.addEventListener('orientationchange',function(){setTimeout(szApply,250)});
H.tsz=function(){var o=['n','g','mg'],v=o[(o.indexOf(szGet())+1)%3];try{localStorage.setItem('fam_sz',v)}catch(e){}szApply();toast('Tamaño de pantalla: '+SZN[v]);setTimeout(draw,300)};
