/* ===== v14 · editar eventos, tareas y examenes (tambien en modo ninos) ===== */
function openEdit(type,id){var x,f={type:type,edit:id,nu:'3',rep:'',days:[],until:'',dur:60,time:'17:00',sec:'fv'};
if(type==='tk'){x=S.tasks.filter(function(t){return t.id===id})[0];if(!x)return;f.title=x.t;f.w=x.w;f.date=x.due}
else if(type==='xm'){x=S.exams.filter(function(t){return t.id===id})[0];if(!x)return;f.title=x.t;f.w=x.w;f.date=x.date}
else{x=S.events.filter(function(t){return t.id===id})[0];if(!x)return;f.title=x.t;f.w=x.w;f.date=x.date;if(!x.ad){f.time=x.s;var du=mins(x.e)-mins(x.s);f.dur=du;f.dur0=du}f.ad=!!x.ad;
if(x.rec){f.rep=x.rec.f;f.days=(x.rec.days||[]).slice()}f.rep0=f.rep}
F=f;drawAdd()}
function saveEdit(){syncForm();var T=F.type,title=(F.title||'').trim(),x;if(!title){toast('Escribe un título');return}
if(T==='tk'){x=S.tasks.filter(function(t){return t.id===F.edit})[0];if(x){x.t=title;x.w=F.w;x.due=F.date}}
else if(T==='xm'){x=S.exams.filter(function(t){return t.id===F.edit})[0];if(x){x.t=title;x.w=['a','e'].indexOf(F.w)>=0?F.w:x.w;x.date=F.date}}
else{x=S.events.filter(function(t){return t.id===F.edit})[0];if(x){x.t=title;x.w=F.w;x.date=F.date;
if(!x.ad){var st=mins(F.time||x.s),du=Number(F.dur)||60;x.s=hm(st);x.e=hm(Math.min(st+du,23*60+59))}
if(F.rep!==F.rep0||(F.rep==='w'&&JSON.stringify((x.rec&&x.rec.days)||[])!==JSON.stringify(F.days||[]))){if(!F.rep)delete x.rec;else{var u=x.rec&&x.rec.until;x.rec={f:F.rep};if(F.rep==='w')x.rec.days=(F.days&&F.days.length?F.days.slice():[dow(fromIso(F.date))]).sort();if(u)x.rec.until=u}}}}
if(!x){toast('No lo encuentro');closeSheet();return}
closeSheet();toast('Cambios guardados ✏️');render()}
SH.save=function(){if(F&&F.edit)return saveEdit();return saveAdd()};
SH.eddel=function(){if(guard())return;var T=F.type,id=F.edit;if(T==='tk')S.tasks=S.tasks.filter(function(t){return t.id!==id});else if(T==='xm')S.exams=S.exams.filter(function(t){return t.id!==id});else S.events=S.events.filter(function(t){return t.id!==id});closeSheet();toast('Borrado');render()};
H.tkedit=function(el){openEdit('tk',el.dataset.id)};H.xmedit=function(el){openEdit('xm',el.dataset.id)};SH.evedit=function(el){openEdit('ev',el.dataset.id)};
