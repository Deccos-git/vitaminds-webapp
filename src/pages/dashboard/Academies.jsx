import { Map } from 'react-map-gl'
import DeckGL, {GeoJsonLayer} from 'deck.gl'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Academies = () => {
  const [name, setName] = useState(null)
  const [id, setId] = useState(null)

  const navigate = useNavigate()

  const accesToken = 'pk.eyJ1IjoiZGVjY29zIiwiYSI6ImNsOG9nbHJkaTA3aXMzcXJ1bG52NW16bGoifQ.oFuHLcVdGKYLYEiiC5SPVg'
  const mapStyle = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
  const initialView = {
    latitude: 52.092876,
    longitude: 5.104480,
    zoom: 7,
    bearing: 0,
    pitch: 30
  };

  const data = [
    {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [5.104480, 52.092876]
    },
    "properties": {
      "name": "Utrecht"
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [6.5680077, 53.2190652]
    },
    "properties": {
      "name": "Herstelacademie Sedna",
      "id": 'hdssgjdj323'
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [6.95251346620856, 52.752866]
    },
    "properties": {
      "name": "Herstelacademie Plus",
      "id": "7cxvhg6732"
    }
  }
  ]

  const onClick = (info) => {

    setName(info.object.properties.name)
    setId(info.object.properties.id)

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
      autoHighlight: true,
      onClick
    })
  ]

    
  return (
    <DeckGL
      initialViewState={initialView}
      controller={true}
      layers={layers}
      style={{top: 71, left: '20%' }}
    >
      <Map
        mapStyle={mapStyle}
        mapboxAccessToken={accesToken}
        // style={{width: 600, height: 400}}
      />
      <div id='map-item-info-container' style={{display: name ? 'block' : 'none'}}>
        <h1>{name}</h1>
        <button onClick={() => navigate(`/dashboard/academy/${id}`)}>Bekijk</button>
      </div>
     </DeckGL>
  )
}

export default Academies