loadWeather();setInterval(loadWeather,30*60000);
renderClock();settle();draw();go('home');
if(KEY)start();else showLogin();
setInterval(function(){tick();if(iso(today())!==LOADED&&!busy)location.reload()},20000);
