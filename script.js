// Función para obtener la hora local (solo horas y minutos)
function actualizarHora() {
    const fecha = new Date();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const horaFormateada = `${horas}:${minutos}`;

    const horaEl = document.getElementById('hora');
    horaEl.textContent = `${horaFormateada}`;

    // Determinar día o noche (por ejemplo, día entre 06:00 y 18:00)
    if (fecha.getHours() >= 6 && fecha.getHours() < 20) {
        horaEl.classList.add('day');
        horaEl.classList.remove('night');
    } else {
        horaEl.classList.add('night');
        horaEl.classList.remove('day');
    }
}

// Función para obtener el clima de Weatherstack con ubicación dinámica
function obtenerClimaWS(lat, lon, containerId) {
    const accessKey = '072afdad369824edb6cf510fd56f014c'; // Tu clave API de Weatherstack
    const url = `https://api.weatherstack.com/current?access_key=${accessKey}&query=${lat},${lon}&units=m`;

    fetch(url)
        .then(resp => {
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            return resp.json();
        })
        .then(data => {
            if (data.error) throw new Error(data.error.info);
            const temp = data.current.temperature;
            const desc = data.current.weather_descriptions[0];
            const icon = data.current.weather_icons[0];  // Icono de clima
            const climaHtml = `
          <h4>Clima actual</h4>
          <img src="${icon}" alt="Clima" style="width: 50px; height: 50px;"/>
          <p>${desc}</p>
          <p>${temp}°C</p>
        `;
            document.getElementById(containerId).innerHTML = climaHtml;
        })
        .catch(err => {
            console.error('Error al obtener el clima WS:', err);
            document.getElementById(containerId).innerHTML = '<p>No se pudo obtener el clima</p>';
        });
}

// Función para obtener la ubicación actual
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            obtenerClimaWS(lat, lon, 'clima-ubicacion');
        }, error => {
            console.error('Error al obtener la ubicación:', error);
            document.getElementById('clima-ubicacion').innerHTML = '<p>No se pudo obtener la ubicación</p>';
        });
    } else {
        console.error('Geolocalización no soportada en este navegador.');
        document.getElementById('clima-ubicacion').innerHTML = '<p>No se puede usar la geolocalización</p>';
    }
}

// Inicializar hora
actualizarHora();
setInterval(actualizarHora, 60_000);  // Actualiza cada minuto

// Obtener clima de la ubicación actual
obtenerUbicacion();
