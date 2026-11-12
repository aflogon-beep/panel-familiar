/* ===== v12 · cofre de premios por niveles, con candados y sorpresa ===== */
var RWT=[[20,'g','🟢 Pequeños'],[50,'y','🟡 Medianos'],[100,'o','🟠 Grandes'],[1e9,'r','🔴 Épicos']];
function rwMig(){S.cfg=S.cfg||{};if(S.cfg.rw5)return;S.rewards=S.rewards||[];
var has=function(t){return S.rewards.some(function(r){return norm(r.t)===norm(t)})};
S.rewards.forEach(function(r){if(norm(r.t)===norm('Invitar a un amigo a dormir')&&Number(r.c)===50)r.c=80});
[['rw1','🌙 15 min más antes de dormir',10],['rw2','🍨 Elegir el postre',12],
['rw3','🍿 Noche de peli y palomitas (eliges la peli)',30],['rw4','🥞 Desayuno especial el finde',30],['rw5','🎮 Partida de juego con papá',25],['rw6','❓ Premio sorpresa',40],
['rw7','🍦 Tarde a solas con papá o mamá',70],['rw8','🃏 Un sobre de cromos',60],['rw9','⛺ Acampada en el salón',80],
['rw10','🎢 Excursión que eliges tú',200],['rw11','🎁 Un juguete o juego (hasta 15 €)',150],['rw12','👑 Día del «sí»: tú decides los planes',250]
].forEach(function(x){if(!has(x[1])&&!S.rewards.some(function(r){return r.id===x[0]}))S.rewards.push({id:x[0],t:x[1],c:x[2]})});
S.cfg.rw5=1}
