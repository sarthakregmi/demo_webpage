var opacity, map, geojson, layer_name,coordinate ,layerSwitcher, featureOverlay, highlightStyle,ward,length_wardroad,cqlfilter,symbology_overlay,draw,modify; 


var view = new ol.View({
    projection: 'EPSG:4326',
    center: [83.75, 27.98],
    zoom: 13.5,
});

var view_ov = new ol.View({
    projection: 'EPSG:4326',
    center: [78.0,23.0],
    zoom: 5,
});
        
        
var base_maps = new ol.layer.Group({
    'title': 'Base maps',
    layers: [
    new ol.layer.Tile({
        title: 'OSM',
        type: 'base',
        visible: true,
        source: new ol.source.OSM()
    }),
    new ol.layer.Tile({
        title: 'Satellite Imagery(labels)',
        type: 'base',
        source: new ol.source.XYZ({
            url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
            maxZoom: 19,
            visible: false
            })
        })
    ]
});
        
var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({

        color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2,
        }),
        
}),
});

var overlays = new ol.layer.Group({
    'title': 'Road data',
    layers: [ vector]
});
        
var map = new ol.Map({
    target: 'map',
    view: view,
});
    
map.addLayer(base_maps);
map.addLayer(overlays);
    
        
    
var overview = new ol.control.OverviewMap({
    view: view_ov, 
    collapseLabel:'O', 
    label: 'O',
    layers:[
        new ol.layer.Tile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
        })
    ]
});

map.addControl(overview);
    
var full_sc = new ol.control.FullScreen({label:'F'});
map.addControl(full_sc);
    
var zoom = new ol.control.Zoom({zoomInLabel:'+', zoomOutLabel:'-'});
map.addControl(zoom);
    
var slider = new ol.control.ZoomSlider();
map.addControl(slider);
    


var zoom_ex = new ol.control.ZoomToExtent({
    extent:[
            80.90,26.48,
            88.96,30.30
            ]
            });
    map.addControl(zoom_ex);
        
var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: false,
    tipLabel: 'Layers', // Optional label for button
    groupSelectStyle: 'children', // Can be 'children' [default], 'group' or 'none'
    collapseTipLabel: 'Collapse layers',
});
map.addControl(layerSwitcher);


var road_type = new ol.source.ImageWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {
        'LAYERS': 'web_map:b1',
        },
        ratio: 1,
        serverType: 'geoserver',
        })
        var Layers = new ol.layer.Image({
        // extent: [-180, -90, -180, 90],
        source: road_type
        })
        //view statistics xml
        

    window.symbology_overlay = new ol.layer.Group({
        'title': 'Overlays',
        layers: [Layers]
    })
    map.addLayer(symbology_overlay);
    

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
    
    
var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
    duration: 250
    }
});

map.addOverlay(overlay)
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

map.on('singleclick', function (evt) {
    const coordinate = evt.coordinate;
    content.innerHTML = '<p>You clicked here:</p><code>' + coordinate + '</code>';
    overlay.setPosition(coordinate);
});
