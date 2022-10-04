import { Map } from 'react-map-gl'
import DeckGL, {GeoJsonLayer} from 'deck.gl'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import data from '../../data/data.json'

const Academies = () => {
  const [name, setName] = useState(null)
  const [id, setId] = useState(null)

  const navigate = useNavigate()

  const accesToken = 'pk.eyJ1IjoiZGVjY29zIiwiYSI6ImNsOG9nbHJkaTA3aXMzcXJ1bG52NW16bGoifQ.oFuHLcVdGKYLYEiiC5SPVg'
  const mapStyle = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
  const initialView = {
    latitude: 51.8125626,
    longitude: 5.8372264,
    zoom: 7,
    bearing: 0,
    pitch: 30
  };

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
      <div id='map-item-info-container'>
        <h1>{name ? name : 'Selecteer een academie op de map'}</h1>
        <button onClick={() => navigate(`/dashboard/academy/${id}`)} style={{display: id ? 'block' : 'none'}}>Bekijk</button>
      </div>
     </DeckGL>
  )
}

export default Academies