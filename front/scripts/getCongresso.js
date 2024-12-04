var map = L.map('map').setView([-14.2350, -51.9253], 5); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);



map.on('click', function (e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    
    const fixedLat = -15.799727917206335;
    const fixedLon = -47.864255905151374;
    
    const url = 'http://10.68.55.150:3000/api/obterCongresso';
    

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
        if (data.estado && data.distancia !== undefined) {
            console.log("Estado identificado:", data.estado);
            console.log("Distância:", data.distancia);

            const line = L.polyline(
                [
                    [lat, lon],
                    [fixedLat, fixedLon]
                ],
                { color: 'red' }
            ).addTo(map);

            const popupContent = `<b>${data.estado}</b><br>Distância: ${(parseFloat(data.distancia.toFixed(5)) * 100).toFixed(3)} quilômetros`;
            L.popup()
                .setLatLng([lat, lon])
                .setContent(popupContent)
                .openOn(map);

                const list = document.getElementById('clicked-points');
                const listItem = document.createElement('li');
                listItem.textContent = `${data.estado}: ${(parseFloat(data.distancia.toFixed(5)) * 100).toFixed(3)} km`;
                list.appendChild(listItem);
        } else {
            console.error('Resposta inválida:', data);
        }
    })
    .catch(error => {
        console.error('Erro ao buscar o estado:', error.message);
    });
});
