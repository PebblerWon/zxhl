import React from 'react'
import MyMap from './MyMap'
import EsriLoader from 'esri-loader-react'

const esriOptions = {
    url:'https://js.arcgis.com/3.21/'
  }
const MapC = (props) => (
  <div> 
    <EsriLoader options={esriOptions}/>
    <MyMap />
  </div>
)

export default MapC
