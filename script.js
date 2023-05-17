const APIkey = "91a2afe75514b48316074a43a2775ab5" //apikey del openweather
const busqueda = document.getElementById('busqueda'); 
const btnBuscar = document.getElementById('btnBuscar');
const resultElement = document.getElementById('resultado');
let pronostico = '';
let clima = '';
const img = document.getElementById('imgClima');
let imgClima = '';
let coord;
let mapa;
let mapaHTML = document.getElementById('mapa');


btnBuscar.addEventListener('click', event => {
    event.preventDefault();
    console.log(resultElement);
    console.log(resultElement.innerHTML);
    if(resultElement.innerHTML != null){
        resultElement.innerHTML = '<div> </div>'
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${busqueda.value}&appid=${APIkey}&units=metric&lang=sp`) 
    .then(respuesta =>{ //ARROW F()
        console.log(`Primer Then: response: ${respuesta}`, respuesta);
        console.log(`Status de la respuesta: ${respuesta.status}`);
        
            return respuesta.json();
    })
    .then(json=>{
        clima = json.weather[0].main;
        console.log(json);
        switch (clima) {
            case "Clouds":
                imgClima += '<img src="images/nublado.png" alt="Clima nublado">'
                break;
            case "Clear":
                imgClima += '<img src="images/soleado.png" alt="Clima soleado">'
                break;        
            case "Snow":
                imgClima += `<img src="images/nieve.png" alt="Clima nevado">`
                break;
            case "Rain":
                imgClima += `<img src="images/lluvia.png" alt="Clima lluvioso">`
                break; 
            case "Drizzle":
                imgClima += `<img src="images/llovizna.png" alt="Llovizna">`
                break;
            case "Thunderstorm":
                imgClima += `<img src="images/tormenta.png" alt="Clima tormentoso">`
                break;   

            default:
                imgClima += `<img src="images/llovizna.png" alt="Llovizna">`
                break;
        }
        
       // img.innerHTML = imgClima;
       let lon = json.coord.lon;
    let lat = json.coord.lat;
    mapa = `https://api.tomtom.com/map/1/staticimage?key=XzMebvnzPeGAXQlbf3GAZuXacT4rWe7v&center=${lon},${lat}&format=png&view=Unified&language=es-ES&width=1000`

         pronostico +=`<div class="card w-100"> 
         <div class="container-fluid m-auto p-3"><h2 class="h5 card-title text-center">Mostrando pronostico de <span> ${json.name}, ${json.sys.country}</span></h2></div> 
         <div class="d-flex flex-column flex-md-row">
         <div id="clima-img" class="card-body d-flex align-items-center justify-content-center">${imgClima}</div>
        <div class="card-body d-flex align-items-center justify-content-center"> 
       <ul class="list-group">
        <li class="list-group-item">Sensación térmica: ${json.main.feels_like}<abbr title="Grados Celsius​">°C</abbr></li>
        <li class="list-group-item">Temperatura máxima: ${json.main.temp_max}<span>°C</span></li>
        <li class="list-group-item">Temperatura mínima: ${json.main.temp_min}<span>°C</span></li>
        <li class="list-group-item">Humedad: ${ json.main.humidity}<span>% </span></li>
        <li class="list-group-item">Presión atmosférica: ${json.main.pressure}<span> hPa</span></li>
      <li class="list-group-item">Velocidad del viento: ${json.wind.speed}<span>km/h</span></li>
     </ul>
    </div>
    </div>
    <div class="card-footer"><img class="card-img-bottom" id="mapa" src="${mapa}" alt="Mapa de ${json.name}"/></div>
    </div> `

    resultElement.innerHTML = pronostico;

    
    //mapaHTML.innerHTML = `<img src="${mapa}" alt="Mapa del lugar ingresado"/>`
    

    })
    .catch(err=>{console.log(`Hubo un error: ${err}`)})
    .finally(final=>{ //op
        // borra el loading
        console.log('ejecuto el finally');
    });
});