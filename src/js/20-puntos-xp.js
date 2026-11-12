/* ===== v12 · puntos tipo videojuego: XP de por vida, niveles y premio siguiente ===== */
var XPL=50,XPFX=null;
function xpMig(){S.cfg=S.cfg||{};if(S.cfg.xp)return;S.cfg.xp={a:Number(S.pts.a)||0,e:Number(S.pts.e)||0}}
function xpGet(k){var x=S.cfg&&S.cfg.xp;return Math.max(Number(x&&x[k])||0,Number(S.pts[k])||0)}
function xpAdd(k,n){if(!n)return;xpMig();S.cfg.xp[k]=Math.max(0,(Number(S.cfg.xp[k])||0)+n);if(n>0)XPFX={k:k,n:n,t:Date.now()}}
function cToggle(key,m,p){var o=S.cdone&&S.cdone[key],r=cToggle0(key,m,p);p=Number(p)||0;if(r){if(m==='a'||m==='e')xpAdd(m,p)}else if(o==='a'||o==='e')xpAdd(o,-p);return r}
var _ap12=H.ap;H.ap=function(el){var k=el.dataset.k,m=S.mission[k],was=m&&m.st;_ap12(el);if(m&&was!=='ok'&&m.st==='ok')xpAdd(k,m.pts)};
function xpNext(k){var p=Number(S.pts[k])||0,R=(S.rewards||[]).slice().sort(function(a,b){return a.c-b.c});
var ok=R.filter(function(r){return r.c<=p}),nx=R.filter(function(r){return r.c>p})[0];return {ok:ok,nx:nx,p:p}}
function xpHtml(k,big){var p=Number(S.pts[k])||0,xp=xpGet(k),lv=Math.floor(xp/XPL)+1,in_=xp%XPL,N=xpNext(k),fx='';
if(XPFX&&XPFX.k===k&&Date.now()-XPFX.t<1500){fx='<span class="xp12-fl">+'+XPFX.n+' ⭐</span>';setTimeout(function(){XPFX=null},60)}
var nx=N.ok.length?'<div class="xp12-rw ok">🎁 ¡Ya puedes canjear: <b>'+esc(N.ok[N.ok.length-1].t)+'</b>!</div>':N.nx?'<div class="xp12-rw">🎁 Faltan <b class="num">'+(N.nx.c-p)+' ⭐</b> para: <b>'+esc(N.nx.t)+'</b></div>':'';
return '<div class="xp12 k-'+k+(fx?' bump':'')+(big?' big':'')+'"><div class="xp12-s"><span class="xp12-st">⭐</span><b class="num">'+p+'</b><small>puntos</small>'+fx+'</div>'+
'<div class="xp12-m"><div class="xp12-lv"><b>Nivel '+lv+'</b><small class="num">'+in_+' / '+XPL+' XP</small></div><div class="xp12-bar"><i style="width:'+Math.round(in_/XPL*100)+'%"></i></div>'+nx+'</div></div>'}
