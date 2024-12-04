var map = L.map('map').setView([-14.2350, -51.9253], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

map.on('click', function (e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    



    // LEMBRE-SE DE ALTERAR CONFORME O USO
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
                
                var popup = L.popup()
                .setLatLng([lat, lon])
                .setContent(data.estado)
                .openOn(map);
                
                const list = document.getElementById('clicked-points');
                const listItem = document.createElement('li');
                listItem.textContent = `${data.estado}`;
                list.appendChild(listItem);

                } else {
                console.error('Resposta inválida:', data);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o estado:', error.message);
        });
});
