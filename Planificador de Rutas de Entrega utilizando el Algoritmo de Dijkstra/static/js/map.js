class RouteManager {
    constructor() {
        this.map = null;
        this.routingControl = null;
        this.initMap();
        this.initEventListeners();
    }

    initMap() {
        const quetzaltenangoCoords = [14.8333, -91.5167];
        this.map = L.map('map').setView(quetzaltenangoCoords, 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    initEventListeners() {
        document.getElementById('packageForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        const startAddress = document.getElementById('start_address').value;
        const endAddress = document.getElementById('end_address').value;

        try {
            // Aquí se puede agregar la lógica para geocodificar las direcciones
            const start_coords = { lat: 14.8333, lng: -91.5167 };
            const end_coords = { lat: 14.84, lng: -91.52 };

            this.showRoute(start_coords, end_coords);
        } catch (error) {
            console.error('Error al calcular la ruta:', error);
            alert('Error al calcular la ruta. Por favor, intente nuevamente.');
        }
    }

    showRoute(start, end) {
        if (this.routingControl) {
            this.map.removeControl(this.routingControl);
        }

        this.routingControl = L.Routing.control({
            waypoints: [
                L.latLng(start.lat, start.lng),
                L.latLng(end.lat, end.lng)
            ],
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: '#4CAF50', weight: 6 }]
            },
            createMarker: function(i, wp, nWps) {
                return L.marker(wp.latLng, {
                    icon: L.divIcon({
                        className: 'custom-marker',
                        html: `<div>${i + 1}</div>`,
                        iconSize: [30, 30]
                    })
                });
            }
        }).addTo(this.map);
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new RouteManager();
});