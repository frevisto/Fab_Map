var map = L.map('map').setView([-14.2350, -51.9253], 5); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);



map.on('click', function (e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    
    const palacioLat = -15.799727917206335;
    const palacioLon = -47.864255905151374;
    
    const url = 'http://10.68.55.150:3000/api/obterEstado';
    

    console.log("Lat:", lat, "/ Lon:", lon);
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lon, lat })
    })
    .then(async response => {
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro desconhecido');
        }
        return response.json();
    })
    .then(data => {
        if (data.estado) {
            console.log("Estado identificado: ", data.estado);

            
            
            var latLngPalacio = L.latLng(palacioLat, palacioLon);
            var latLngClick = L.latLng(lat, lon);
            
            L.polyline([latLngPalacio, latLngClick], { color: 'red' }).addTo(map);
            
            var distance = (latLngPalacio.distanceTo(latLngClick)/1000);
            console.log("Distância em kilometros: ", distance);
            
            var popup = L.popup()
            .setLatLng([lat, lon])
            .setContent(`Estado: ${data.estado}<br>Distância: ${distance.toFixed(2)} kilometros`)
            .openOn(map);
            
        } else {
            console.error('Resposta inválida:', data);
        }
    })
    .catch(error => {
        console.error('Erro ao buscar o estado:', error.message);
    });
});
// var popup = L.popup();
// popup.on('popupclose', function () {
//     map.removeLayer(lastLine);
// })
