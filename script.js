const APIkey = "91a2afe75514b48316074a43a2775ab5" //apikey del openweather
const busqueda = document.getElementById('busqueda'); 
const btnBuscar = document.getElementById('btnBuscar');
const resultado = document.getElementById('resultado');
let pronostico = '';
let clima = '';
const img = document.getElementById('imgClima');
let imgClima = '';
let mapa;
let mapaHTML = document.getElementById('mapa');


btnBuscar.addEventListener('click', event => {
    event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${busqueda.value}&appid=${APIkey}&units=metric&lang=sp`) 
    .then(respuesta =>{ //ARROW F()
        console.log(`Primer Then: response: ${respuesta}`, respuesta);
        console.log(`Status de la respuesta: ${respuesta.status}`);
        
            return respuesta.json();
    })
    .then(json=>{
        clima = json.weather[0].main;
        
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
            case "Atmosphere":
                    imgClima += `<img src="images/atmosfera.png" alt="Clima ventoso o de difícil visibilidad">`
                    break
            default:
                imgClima += `<img src="images/llovizna.png" alt="Llovizna">`
                break;
        }
        
       // Traigo el mapa desde TomTom
        let lon = json.coord.lon;
        let lat = json.coord.lat;
        mapa = `https://api.tomtom.com/map/1/staticimage?key=XzMebvnzPeGAXQlbf3GAZuXacT4rWe7v&center=${lon},${lat}&format=png&view=Unified&language=es-ES&width=1000`

         pronostico +=
        `<div class="card w-100"> 
           <div class="container-fluid m-auto p-3"><h2 class="h5 card-title text-center">Mostrando pronostico de <span> ${json.name}, ${json.sys.country}</span></h2></div> 
            <div class="d-flex flex-column flex-md-row">
                <div id="clima-img" class="card-body d-flex align-items-center justify-content-center">${imgClima}</div>
                <div class="card-body d-flex align-items-center justify-content-center"> 
                    <ul class="list-group">
                        <li class="list-group-item">Sensación térmica: ${json.main.feels_like}°C</li>
                        <li class="list-group-item">Temperatura máxima: ${json.main.temp_max}°C</li>
                        <li class="list-group-item">Temperatura mínima: ${json.main.temp_min}°C</li>
                        <li class="list-group-item">Humedad: ${ json.main.humidity}% </li>
                        <li class="list-group-item">Presión atmosférica: ${json.main.pressure} hPa</li>
                        <li class="list-group-item">Velocidad del viento: ${json.wind.speed}km/h</li>
                    </ul>
                </div>
            </div>
            <div class="card-footer"><img class="card-img-bottom" id="mapa" src="${mapa}" alt="Mapa de ${json.name}"/></div>
        </div>`

    resultado.innerHTML = pronostico;

    })
    .catch(error=>{console.log(`Hubo un error: ${error}`)
    resultado.innerHTML = `<h2>¡Lo sentimos! Pronóstico del tiempo 24/7 no está funcionando en este momento. Vuelva a intentarlo más tarde</h2>`
    })
});