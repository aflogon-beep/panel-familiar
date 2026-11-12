/* ===== datos de ejemplo ===== */
var KIDS={a:{n:CONF.kids.a},e:{n:CONF.kids.e}};
var WHO={a:CONF.kids.a,e:CONF.kids.e,al:CONF.adults.al,ju:CONF.adults.ju,all:'Todos',adults:'Adultos'};
var SEC=[
{id:'fv',n:'Fruta y verdura',c:'#4DA35A'},{id:'carne',n:'Carne y pollo',c:'#D0584B'},{id:'pescado',n:'Pescado',c:'#3C8FBF'},
{id:'pan',n:'Panadería',c:'#C9913C'},{id:'lac',n:'Lácteos y huevos',c:'#5C86D6'},{id:'des',n:'Despensa',c:'#B0793A'},
{id:'cong',n:'Congelados',c:'#4FB0C6'},{id:'beb',n:'Bebidas',c:'#8A6FD0'},{id:'limp',n:'Limpieza e higiene',c:'#3FA79A'}
];
var secOf=function(id){return SEC.filter(function(s){return s.id===id})[0]||SEC[5]};
var ICONS=[['examen','📝'],['control','📝'],['prueba','📝'],['dentista','🦷'],['ortodon','🦷'],['medico','🩺'],['pediatra','🩺'],['doctor','🩺'],['vacuna','💉'],['analitica','🩺'],['hospital','🩺'],['oculista','👓'],['fisio','💆'],['futbol','⚽'],['partido','⚽'],['baloncesto','🏀'],['basket','🏀'],['natacion','🏊'],['piscina','🏊'],['tenis','🎾'],['padel','🎾'],['karate','🥋'],['judo','🥋'],['gimnasia','🤸'],['baile','💃'],['danza','💃'],['ballet','💃'],['musica','🎵'],['piano','🎹'],['guitarra','🎸'],['violin','🎻'],['ingles','🇬🇧'],['frances','🗣️'],['aleman','🗣️'],['tutoria','🏫'],['colegio','🏫'],['profesor','🏫'],['excursion','🚌'],['cumple','🎂'],['fiesta','🎉'],['cine','🎬'],['teatro','🎭'],['concierto','🎤'],['comida','🍽️'],['cena','🍽️'],['restaurante','🍽️'],['viaje','✈️'],['vuelo','✈️'],['aeropuerto','✈️'],['vacaciones','🏖️'],['playa','🏖️'],['peluquer','✂️'],['veterinario','🐾'],['deberes','📚'],['ficha','📚'],['redaccion','📚'],['trabajo','📋'],['proyecto','📋'],['libro','📖'],['biblioteca','📖'],['mochila','🎒'],['uniforme','👕'],['recoger','🧹'],['reunion','👥'],['entrenamiento','🏃'],['clase','📚'],['academia','📚'],['refuerzo','📚'],['compra','🛒']];
var evIcon=function(t,def){var n=' '+norm(t);var cu=S.icons||[];for(var j=0;j<cu.length;j++){if(cu[j][0]&&n.indexOf(norm(cu[j][0]))>-1)return cu[j][1]}for(var i=0;i<ICONS.length;i++){if(n.indexOf(ICONS[i][0])>-1)return ICONS[i][1]}return def||'📌'};
var C=function(n,sec,img){return {n:n,sec:sec,img:img}};
var pk=function(sec,a){return a.map(function(s){var i=s.indexOf(' ');return C(s.slice(i+1),sec,s.slice(0,i))})};
var BASE=[].concat(
pk('fv',['🍌 Plátanos','🍎 Manzanas','🍐 Peras','🍊 Naranjas','🍋 Limones','🍇 Uvas','🍓 Fresas','🍉 Sandía','🍈 Melón','🍑 Melocotones','🍍 Piña','🥭 Mango','🥝 Kiwis','🍒 Cerezas','🫐 Arándanos','🥑 Aguacates','🍅 Tomates','🍅 Tomate cherry','🥒 Pepino','🥬 Lechuga','🥗 Ensalada en bolsa','🥕 Zanahorias','🥔 Patatas','🍠 Boniato','🧅 Cebollas','🧄 Ajos','🫑 Pimientos','🌶️ Guindillas','🥦 Brócoli','🥦 Coliflor','🥬 Espinacas','🥬 Acelgas','🥬 Puerros','🌽 Mazorcas de maíz','🍆 Berenjenas','🥒 Calabacín','🎃 Calabaza','🍄 Champiñones','🫛 Judías verdes','🌿 Perejil','🌿 Albahaca','🍌 Papaya']),
pk('carne',['🍗 Pollo entero','🍗 Pechuga de pollo','🍗 Muslos de pollo','🍗 Alitas de pollo','🥩 Carne picada','🥩 Filetes de ternera','🥩 Entrecot','🥩 Solomillo','🥩 Chuletas de cerdo','🥩 Lomo de cerdo','🍖 Costillas','🍖 Pavo','🥩 Albóndigas','🍔 Hamburguesas','🌭 Salchichas','🥓 Bacon','🍖 Jamón cocido','🥓 Jamón serrano','🍖 Chorizo','🍖 Salchichón','🥩 Fiambre de pavo','🥩 Lomo embuchado','🍢 Pinchitos','🍖 Pollo asado']),
pk('pescado',['🐟 Merluza','🐟 Salmón','🐟 Dorada','🐟 Lubina','🐟 Bacalao','🐟 Atún fresco','🐟 Sardinas','🐟 Vieja','🐟 Pescado blanco','🦐 Gambas','🦐 Langostinos','🦑 Calamares','🐙 Pulpo','🦪 Mejillones','🦀 Palitos de cangrejo']),
pk('pan',['🍞 Pan de barra','🍞 Pan de molde','🍞 Pan integral','🥖 Baguette','🥖 Picos','🍞 Tostadas','🥐 Croissants','🥯 Pan de hamburguesa','🌭 Pan de perritos','🫓 Pan de pita','🫓 Tortillas de trigo','🍞 Pan rallado','🍰 Bizcocho','🍪 Magdalenas','🍩 Donuts','🍰 Tarta']),
pk('lac',['🥛 Leche entera','🥛 Leche semidesnatada','🥛 Leche desnatada','🥛 Leche sin lactosa','🥛 Bebida de avena','🥛 Bebida de soja','🥛 Bebida de almendras','🥚 Huevos','🍦 Yogures naturales','🍦 Yogures de sabores','🍦 Yogur griego','🍦 Yogur de beber','🍮 Natillas','🍮 Flan','🍨 Postres lácteos','🧈 Mantequilla','🧈 Margarina','🧀 Queso rallado','🧀 Queso en lonchas','🧀 Queso fresco','🧀 Queso tierno','🧀 Queso curado','🧀 Mozzarella','🧀 Queso crema','🧀 Queso de cabra','🧀 Parmesano','🧀 Queso feta','🥛 Nata para cocinar','🥛 Nata para montar','🥛 Leche condensada','🥛 Batido de chocolate','🥛 Kéfir']),
pk('des',['🍝 Espaguetis','🍝 Macarrones','🍝 Fideos','🍝 Lasaña (placas)','🍝 Pasta fresca','🍚 Arroz','🍚 Arroz integral','🍚 Cuscús','🍚 Quinoa','🫘 Lentejas','🫘 Garbanzos','🫘 Alubias','🥫 Garbanzos cocidos','🥫 Lentejas cocidas','🥫 Judías cocidas','🥫 Fabada','🫒 Aceite de oliva','🌻 Aceite de girasol','🧂 Sal','🧂 Pimienta','🍬 Azúcar','🍬 Edulcorante','🌾 Harina','🧁 Levadura','🍰 Preparado para bizcocho','🥫 Tomate frito','🥫 Tomate triturado','🍅 Salsa de tomate','🥫 Salsa boloñesa','🥫 Atún en lata','🥫 Sardinillas en lata','🥫 Mejillones en escabeche','🥫 Maíz en lata','🥫 Espárragos','🥫 Pimientos del piquillo','🫒 Aceitunas','🥒 Pepinillos','🥫 Piña en almíbar','🥫 Melocotón en almíbar','🥫 Paté','🥫 Caldo de pollo','🥫 Caldo de verduras','🍜 Sopa de sobre','🍜 Fideos orientales','🥫 Mayonesa','🍅 Kétchup','🌭 Mostaza','🥫 Salsa de soja','🥫 Vinagre','🫒 Vinagre de Módena','🌿 Orégano','🌶️ Pimentón','🧂 Especias','🧂 Bicarbonato','🥣 Cereales','🥣 Copos de avena','🍫 Barritas de cereales','🍪 Galletas','🍪 Galletas María','🍪 Galletas rellenas','🍫 Chocolate','🍫 Crema de cacao','🥛 Cacao en polvo','🍯 Miel','🍯 Sirope','🍓 Mermelada','🥜 Mantequilla de cacahuete','🥜 Cacahuetes','🥜 Frutos secos','🌰 Almendras','🥜 Pipas','🍿 Palomitas','🥔 Patatas fritas de bolsa','🥨 Snacks salados','🍘 Tortitas de arroz','🍬 Caramelos','🍬 Chicles','☕ Café molido','☕ Café en cápsulas','☕ Café soluble','🍵 Té','🍵 Infusiones']),
pk('cong',['🍕 Pizza congelada','🍕 Masa de pizza','🍟 Patatas congeladas','🥦 Verduras congeladas','🫛 Guisantes congelados','🍓 Fruta congelada','🍅 Sofrito congelado','🍤 Gambas congeladas','🐟 Merluza congelada','🐟 Palitos de pescado','🍤 Calamares a la romana','🍗 Nuggets','🍔 Hamburguesas congeladas','🥟 Croquetas','🥟 Empanadillas','🥟 Gyozas','🥘 Lasaña congelada','🥐 Croissants congelados','🍞 Pan congelado','🍦 Helados','🍨 Tarrina de helado','🧊 Hielo']),
pk('beb',['💧 Agua','💧 Agua con gas','🧃 Zumo de naranja','🧃 Zumo multifrutas','🧃 Zumo de piña','🧃 Zumo de manzana','🧃 Zumos pequeños','🥤 Refresco de cola','🥤 Cola zero','🥤 Refresco de naranja','🥤 Refresco de limón','🥤 Tónica','🥤 Gaseosa','🥤 Isotónica','🥤 Té frío','⚡ Bebida energética','🍺 Cerveza','🍺 Cerveza sin alcohol','🍷 Vino tinto','🍷 Vino blanco','🍾 Cava','🍷 Vermut']),
pk('limp',['🧴 Detergente de ropa','🧴 Suavizante','🧴 Lavavajillas a mano','🧴 Pastillas lavavajillas','🧴 Sal lavavajillas','🧴 Abrillantador','🧻 Papel higiénico','🧻 Papel de cocina','🧻 Servilletas','🤧 Pañuelos','🧽 Estropajos','🧽 Bayetas','🧴 Lejía','🧴 Limpiacristales','🧴 Limpiahogar','🧴 Fregasuelos','🧴 Desengrasante','🧴 Antical','🧴 Ambientador','🗑️ Bolsas de basura','🧷 Papel de aluminio','🧷 Film transparente','🧷 Papel de horno','🧷 Bolsas de congelar','🧴 Gel de ducha','🧴 Champú','🧴 Acondicionador','🧼 Jabón de manos','🪥 Pasta de dientes','🪥 Cepillos de dientes','🧴 Enjuague bucal','🧴 Desodorante','🪒 Cuchillas de afeitar','🧴 Crema hidratante','🧴 Protector solar','🧴 Toallitas','🧴 Algodón','🧴 Bastoncillos','🩹 Tiritas','🔋 Pilas','💡 Bombillas','🍼 Pañales','🐶 Comida de perro','🐱 Comida de gato','🐱 Arena de gato'])
);
var allCat=function(){var cm={};S.catalog.forEach(function(c){cm[norm(c.n)]=c});var seen={},out=[];BASE.forEach(function(c){var k=norm(c.n);seen[k]=1;out.push(cm[k]||c)});S.catalog.forEach(function(c){var k=norm(c.n);if(!seen[k]){seen[k]=1;out.push(c)}});return out};
var pic=function(img){return img.indexOf('https://images.openfoodfacts.org/')===0?'<img src="'+esc(img)+'" alt="" loading="lazy">':esc(img)};
var catSec='fv',OFF=[],offHtml='',offT=0,offQ='',offLoad=false;
var OFFON=false;
function offSearch(q){
clearTimeout(offT);offLoad=false;if(!OFFON){offHtml='';return}q=q.trim();
if(q.length<3||!KEY){offLoad=false;return}
if(q!==offQ){offHtml='';offLoad=true}
offT=setTimeout(function(){
if(q===offQ){offLoad=false;renderSug();return}offQ=q;
fetch('/api/off?q='+encodeURIComponent(q),{headers:{'X-Family-Key':KEY}}).then(function(r){return r.json()}).then(function(j){
offLoad=false;if($('#addInp').value.trim()!==q)return;
OFF=j.items||[];
offHtml=OFF.length?'<div class="sub" style="width:100%">Más productos</div>'+OFF.map(function(o,i){return '<button type="button" class="sg" data-act="off" data-i="'+i+'">'+pic(o.img)+' '+esc(o.n)+' <small>'+esc(secOf(o.sec).n)+'</small></button>'}).join(''):'';
renderSug();
}).catch(function(){offLoad=false;renderSug()});
},450);
}
var ev=function(d,s,e,t,w){return {id:nid('ev'),date:wd(d),s:s,e:e,t:t,w:w}};
var LUN=['Lentejas con verduras','Pasta con tomate','Pollo al horno con patatas','Arroz con huevo y tomate','Merluza a la plancha','Pizza casera','Paella de verduras'];
var CEN=['Tortilla de patatas','Crema de calabaza','Hamburguesas caseras','Sopa de fideos','Ensalada y croquetas','Tacos de pollo','Revuelto de verduras'];
var li=function(n,sec,img,q,done){return {id:nid('li'),n:n,sec:sec,img:img,q:q||1,done:!!done}};
var rt=function(id,t){return {id:id,t:t}};
var S={
view:'home',kid:false,calOff:0,menuOff:0,sup:false,pin:'1234',freq:{},
custody:{ref:iso(add(M0,5)),st:'us',over:{}},
events:[],
routine:{
a:[rt('a1','Hacer la cama'),rt('a2','Mochila lista para mañana'),rt('a3','Deberes'),rt('a4','Recoger su cuarto'),rt('a5','Ayudar a poner la mesa')],
e:[rt('e1','Hacer la cama'),rt('e2','Lavarse los dientes'),rt('e3','Deberes'),rt('e4','Leer 15 minutos'),rt('e5','Recoger la mesa')]
},
rdone:{},
mission:{a:{t:'Ordenar la estantería de los libros',pts:10,st:'todo',day:''},e:{t:'Preparar la ensalada para la cena',pts:10,st:'todo',day:''}},
pts:{a:0,e:0},
paid:{a:iso(add(M0,-7)),e:iso(add(M0,-7))},
purse:{a:{g:0,s:0,r:0,goal:'Mi primera meta',target:40},e:{g:0,s:0,r:0,goal:'Mi primera meta',target:40}},
notes:[],buz:[],hor:{a:{},e:{}},bd:[],cals:[],hist:{a:[],e:[]},cfg:{day:1},names:{a:CONF.kids.a,e:CONF.kids.e},icons:[],rewards:[{id:'r1',t:'Elegir la cena del sábado',c:20},{id:'r2',t:'30 min de pantalla extra',c:15},{id:'r3',t:'Elegir el plan del finde',c:40},{id:'r4',t:'Invitar a un amigo a dormir',c:50}],
tasks:[],exams:[],
catalog:[
C('Plátanos','fv','🍌'),C('Manzanas','fv','🍎'),C('Tomates','fv','🍅'),C('Lechuga','fv','🥬'),C('Zanahorias','fv','🥕'),C('Patatas','fv','🥔'),
C('Pollo','carne','🍗'),C('Carne picada','carne','🥩'),C('Merluza','pescado','🐟'),C('Pan','pan','🍞'),
C('Leche','lac','🥛'),C('Huevos','lac','🥚'),C('Yogures','lac','🍦'),C('Queso','lac','🧀'),
C('Pasta','des','🍝'),C('Arroz','des','🍚'),C('Aceite de oliva','des','🫒'),C('Galletas','des','🍪'),C('Cereales','des','🥣'),
C('Pizza congelada','cong','🍕'),C('Agua','beb','💧'),C('Zumo','beb','🧃'),C('Detergente','limp','🧴'),C('Papel higiénico','limp','🧻')
],
list:[],
menu:{},
chores:[
{id:'h1',t:'Poner la mesa',i:'🍽️',f:'d',p:2,w:['al','ju','a','e'],s:'2026-01-01'},
{id:'h2',t:'Recoger la mesa',i:'🧽',f:'d',p:2,w:['al','ju','a','e'],s:'2026-01-01'},
{id:'h3',t:'Bajar la basura',i:'🗑️',f:'d',p:2,w:['al','ju','a','e'],s:'2026-01-01'},
{id:'h4',t:'Doblar la ropa',i:'👕',f:'w',p:5,w:['al','ju','e'],s:'2026-01-01'},
{id:'h5',t:'Aspirar el salón',i:'🧹',f:'w',p:5,w:['al','ju','a','e'],s:'2026-01-01'},
{id:'h6',t:'Regar las plantas',i:'🪴',f:'w',p:3,w:['al','ju','a','e'],s:'2026-01-01'}
],cdone:{},cn:{al:0,ju:0,a:0,e:0},days:[]
};
