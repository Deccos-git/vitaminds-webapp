import { Map } from 'react-map-gl'
import DeckGL, {GeoJsonLayer} from 'deck.gl'
// import data from '../../data/data.json'


const GoogleMaps = () => {

  const accesToken = 'pk.eyJ1IjoiZGVjY29zIiwiYSI6ImNsOG9nbHJkaTA3aXMzcXJ1bG52NW16bGoifQ.oFuHLcVdGKYLYEiiC5SPVg'
  const mapStyle = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'
  const initialView = {
    latitude: 52.092876,
    longitude: 5.104480,
    zoom: 7,
    bearing: 0,
    pitch: 30
  };

  const data = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [5.104480, 52.092876]
    },
    "properties": {
      "name": "Dinagat Islands"
    }
  }

  const layers = [
    new GeoJsonLayer({
      id: 'herstelacademies',
      data: data,
      filled: true,
      pointRadiusMinPixels: 10,
      pointRadiusScale: 2000,
      getPointRadius: 2,
      getFillColor: [86, 144, 58, 250],
      pickable: true,
      autoHighlight: true
    })
  ]

  return (
    <DeckGL
      initialViewState={initialView}
      controller={true}
      layers={layers}
      // style={{width: 600, height: 400, left: '30%', }}
    >
      <div>
        <h1>Hallo</h1>
      </div>
      <Map
        mapStyle={mapStyle}
        mapboxAccessToken={accesToken}
        // style={{width: 600, height: 400}}
      />
    // </DeckGL>
  )
}

export default GoogleMaps