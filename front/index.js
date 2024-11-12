// Onclick;


var map = L.map('map').setView([-14.2350, -51.9253], 4); // Centrado no Brasil

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

map.on('click', function (e) {
    var lat = e.latlng.lat;
    var lon = e.latlng.lng;
    const url = 'http://localhost:3000/api/obterEstado';

    // Enviar essas coordenadas para o backend para consultar qual estado
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
                // CAINDO AQUI, erro de CORS;
                // Se o status da resposta não for 2xx, levanta um erro
                const data = await response.json();
                throw new Error(data.error || 'Erro desconhecido');
            }
            return response.json(); // Converte a resposta para JSON se for bem-sucedida
        })
        .then(data => {
            // Se a resposta contiver um "estado", é um sucesso

            if (data.estado) {
                console.log("Estado identificado: ", data.estado);

                var popup = L.popup()
                    .setLatLng([lat, lon])
                    .setContent(data.estado)
                    .openOn(map);
                
                    // Aqui você pode mostrar o nome do estado na interface ou fazer outra ação
            } else {
                // Caso o backend retorne algo inesperado
                console.error('Resposta inválida:', data);
            }
        })
        .catch(error => {
            // Trata qualquer erro que ocorreu na requisição ou na resposta
            console.error('Erro ao buscar o estado:', error.message);
        });
});
