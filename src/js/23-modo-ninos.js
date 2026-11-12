/* ===== v12 · modo niños: pueden crear (eventos, tareas, compra, notas...) ===== */
var KIDPASS=false,_guard12=guard;guard=function(){return KIDPASS?false:_guard12()};
H.add=function(){if(PH()||S.kid){openAddMenu();return}openAdd()};
['add','mic','ntnew','tk','li','qm','qp','me','lirm','liedit','clear','sxclear','off'].forEach(function(a){var f=H[a];if(f)H[a]=function(){KIDPASS=true;try{return f.apply(this,arguments)}finally{KIDPASS=false}}});
if(SH.qbfav){var _qbf12=SH.qbfav;SH.qbfav=function(){KIDPASS=true;try{return _qbf12.apply(this,arguments)}finally{KIDPASS=false}}}
document.addEventListener('submit',function(e){var f=e.target;if(f&&/^(dq|sx|qk|qb|add)Form$/.test(f.id)){KIDPASS=true;setTimeout(function(){KIDPASS=false},0)}},true);
