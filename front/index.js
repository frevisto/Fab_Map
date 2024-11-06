// Onclick;


var map = L.map('map').setView([-14.2350, -51.9253], 4); // Centrado no Brasil

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        map.on('click', function (e) {
            var lat = e.latlng.lat;
            var lon = e.latlng.lng;
            // Enviar essas coordenadas para o backend para consultar qual estado
            console.log(lat, lon);
        });