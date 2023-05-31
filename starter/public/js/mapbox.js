export const displayMap = (locations) => {

    mapboxgl.accessToken = 'pk.eyJ1IjoibG91aXNibSIsImEiOiJja2owbWV6YmEwY2FmMnZxamg3enZ6a2dtIn0.J2PBw5ZuRNM1HxGonGf0rA';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/louisbm/ckwt3jx4v0g9f14nsru4sp97x',
        scrollZoom: false
        /* center: [-118.113491,34.111745],
        zoom: 4,
        interactive: false */
    });
    
    const bounds = new mapboxgl.LngLatBounds();
    
    locations.forEach(loc => {
        //Create marker
        const el = document.createElement('div');
        el.className = 'marker';
    
        //Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
            .setLngLat(loc.coordinates)
            .addTo(map);
    
        //Add popup
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);
    
        //Extends map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
    
}

