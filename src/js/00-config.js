/* ===== Configuración de tu familia =====
   Edita estos valores y vuelve a construir (npm run build). Los nombres de los peques
   también se pueden cambiar luego desde la app (Más › Ajustes). */
var CONF={
  // Los dos peques (internamente «a» y «e») y los dos adultos («al» y «ju»)
  kids:{a:'Niño',e:'Niña'},
  adults:{al:'Papá',ju:'Mamá'},
  // Nombre por defecto de la mascota de cada peque (se puede cambiar en la app)
  pets:{a:'Bolita',e:'Pompón'},
  // Ciudad para el tiempo (Open-Meteo, sin clave)
  city:{name:'Madrid',lat:40.42,lon:-3.70},
  // Cumpleaños que se añaden al calendario la primera vez: ['Nombre', día, mes, año]
  birthdays:[],
  // Custodia compartida. Si está apagada, los peques están siempre en casa.
  //   away: días de diario que pasan fuera (0 = lunes … 3 = jueves)
  //   los fines de semana (viernes a domingo) se alternan y se marcan en la app
  custody:{on:false,away:[0,1]}
};
