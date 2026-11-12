/* ===== sincronización ===== */
var KEY='';try{KEY=localStorage.getItem('fam_key')||''}catch(e){}
try{S.kid=localStorage.getItem('fam_kid')==='1'}catch(e){}
var rev=-1,base='',busy=false,saveT=0,warned=false,LOADED=iso(today());
var SY=['pin','freq','custody','events','routine','rdone','mission','pts','paid','purse','rewards','cfg','names','icons','cals','hist','notes','buz','hor','bd','aisle','tasks','exams','catalog','list','menu','chores','cdone','cn','days'];
var snapStr=function(o){return JSON.stringify(SY.map(function(k){return o[k]===undefined?null:o[k]}))};
var snap=function(){var o={};SY.forEach(function(k){o[k]=S[k]});return o};
function showLogin(msg){$('#login').hidden=false;$('#loginMsg').textContent=msg||'Escribe la contraseña'}
function api(method,body,qs){
return fetch('/api/state'+(qs||''),{method:method,headers:{'X-Family-Key':KEY,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined}).then(function(r){
if(r.status===401){KEY='';try{localStorage.removeItem('fam_key')}catch(e){}showLogin('Sesión cerrada: escribe la contraseña');throw new Error('auth')}
return r.json().then(function(j){j.status=r.status;return j});
});
}
function netErr(e){if(e&&e.message==='auth')return;if(!warned){warned=true;toast('Sin conexión: reintentando…')}}
function settle(){
hogarMig();fixMig();fixMig2();fixMig3();fixMig4();xpMig();rwMig();misMig();fixMig7();huchaMig();misMig7();bdMig();rqPrune();intCheck();petTickAll();S.sup=false;var mon=monOf(today()),ts=iso(today());
['a','e'].forEach(function(k){
var w=add(fromIso(S.paid[k]),7);
while(w<mon){var n=0,ds=[];for(var i=0;i<7;i++){var dn_=dayDone(k,i,w);ds.push(atHome(add(w,i))?(dn_?1:0):-1);if(dn_)n++}S.purse[k].g+=n*dayAmt();S.hist=S.hist||{a:[],e:[]};(S.hist[k]=S.hist[k]||[]).push({w:iso(w),n:n,v:n*dayAmt(),d:ds});if(S.hist[k].length>60)S.hist[k].shift();S.paid[k]=iso(w);w=add(w,7)}
misWeekly(k);spmWeek(k);
});
Object.keys(S.rdone).forEach(function(d){if(dd(fromIso(d),today())>70)delete S.rdone[d]});S.chores=S.chores||[];S.cdone=S.cdone||{};S.cn=S.cn||{};S.days=(S.days||[]).filter(function(x){return dd(fromIso(x.b||x.a),today())<=400});Object.keys(S.cdone).forEach(function(k){var d=k.replace(/^w/,'').slice(0,10);if(dd(fromIso(d),today())>70)delete S.cdone[k]});S.notes=(S.notes||[]).filter(function(n){return !n.until||n.until>=iso(today())});S.buz=(S.buz||[]).filter(function(x){return !x.done||dd(fromIso(x.d),today())<=30});
if(!(S.cfg&&S.cfg.fam)){S.cfg=S.cfg||{};S.bd=S.bd||[];CONF.birthdays.map(function(b,i){return ['bd-c'+i,b[0],b[1],b[2],b[3]]}).forEach(function(b){if(!S.bd.some(function(x){return Number(x.d)===b[2]&&Number(x.m)===b[3]&&norm(x.n||'')===norm(b[1])}))S.bd.push({id:b[0],n:b[1],d:b[2],m:b[3],y:b[4],i:'🎂'})});S.cfg.fam=1}
}
function afterChange(){try{vfabUpd()}catch(e){}
try{localStorage.setItem('fam_kid',S.kid?'1':'0')}catch(e){}
if(rev<0||busy)return;
if(snapStr(S)!==base){clearTimeout(saveT);saveT=setTimeout(save,500)}
}
function J(x){return JSON.stringify(x)}
function isO(x){return !!x&&typeof x==='object'&&!Array.isArray(x)}
var CNT=/^(pts\.|freq\.|cn\.)/;
/* fusion de 3 vias: l=lo mio, b=lo que vi la ultima vez, s=lo que hay en el servidor */
function merge3(l,b,s,p){
p=p||'';
if(J(l)===J(b))return s;
if(J(s)===J(b)||J(l)===J(s))return l;
if(CNT.test(p)&&typeof l==='number'&&typeof s==='number')return s+(l-(typeof b==='number'?b:0));
if(isO(l)&&isO(s)){
var bb=isO(b)?b:{},o={},ks={};
Object.keys(s).forEach(function(k){ks[k]=1});Object.keys(l).forEach(function(k){ks[k]=1});
Object.keys(ks).forEach(function(k){
var hl=k in l,hs=k in s,hb=k in bb;
if(hl&&hs)o[k]=merge3(l[k],bb[k],s[k],p?p+'.'+k:k);
else if(hl){if(!hb)o[k]=l[k]}
else if(!hb)o[k]=s[k];
});
return o}
if(Array.isArray(l)&&Array.isArray(s)){
var ba=Array.isArray(b)?b:[],kf=p==='catalog'?'n':'id';
var hk=function(a){return a.every(function(x){return isO(x)&&typeof x[kf]==='string'})};
if(hk(l)&&hk(s)&&hk(ba)){
var bm={},sm={},lm={},o2=[];
ba.forEach(function(x){bm[x[kf]]=x});s.forEach(function(x){sm[x[kf]]=x});l.forEach(function(x){lm[x[kf]]=x});
s.forEach(function(x){var id=x[kf];if(bm[id]&&!lm[id])return;o2.push(lm[id]?merge3(lm[id],bm[id],x,p):x)});
l.forEach(function(x){var id=x[kf];if(!bm[id]&&!sm[id])o2.push(x)});
return o2}
var pr=function(x){return x===null||typeof x!=='object'};
if(l.every(pr)&&s.every(pr)&&ba.every(pr)){
if(l.length===s.length&&l.every(function(x){return s.indexOf(x)>=0}))return l;
var o3=s.slice();
l.forEach(function(x){if(ba.indexOf(x)<0&&o3.indexOf(x)<0)o3.push(x)});
ba.forEach(function(x){if(l.indexOf(x)<0){var i=o3.indexOf(x);if(i>=0)o3.splice(i,1)}});
return o3}}
return l}
function save(){
if(busy||rev<0)return;busy=true;var cur=snapStr(S);
api('PUT',{rev:rev,data:snap()}).then(function(j){
busy=false;
if(j.status===409&&typeof j.rev==='number'){
warned=false;
var sv=j.data||{},b=JSON.parse(base);
SY.forEach(function(k,ix){if(sv[k]===undefined)return;S[k]=merge3(S[k],b[ix]===null?undefined:b[ix],sv[k],k)});
rev=j.rev;base=snapStr(sv);settle();draw();afterChange();return}
if(j.status===200&&typeof j.rev==='number'){warned=false;rev=j.rev;base=cur;draw();afterChange();cacheSave();return}
if(!warned){warned=true;toast('No se pudo guardar. Reintento…')}
clearTimeout(saveT);saveT=setTimeout(save,15000);
}).catch(function(e){busy=false;netErr(e);clearTimeout(saveT);saveT=setTimeout(save,8000)});
}
function pull(){
if(!KEY)return Promise.resolve();
if(busy||(rev>=0&&snapStr(S)!==base))return Promise.resolve();
return api('GET',null,rev>=0?'?rev='+rev:'').then(function(j){
if(j.status!==200||typeof j.rev!=='number')return;
warned=false;
if(j.same||(rev>=0&&j.rev===rev))return;
if(rev>=0&&snapStr(S)!==base)return;
var d=j.data||{};SY.forEach(function(k){if(d[k]!==undefined)S[k]=d[k]});
rev=j.rev;base=snapStr(d);settle();render();cacheSave();
}).catch(netErr);
}
