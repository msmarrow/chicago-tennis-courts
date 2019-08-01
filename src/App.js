import React from 'react';
import { GoogleMap,
        withScriptjs,
        InfoWindow,
        withGoogleMap,
        Marker
      } from 'react-google-maps';
import * as courtData from "./data/courts.json";
import mapStyle from "./mapStyle.js";

function Map() {
  const [selectedPark, setSelectedPark] = React.useState(null);

  return (
    <GoogleMap
    defaultZoom={12}
    defaultCenter={{lat:41.878113, lng:-87.629799}}
    defaultOptions={{styles: mapStyle}}
    >
      {courtData.parks.map((park) => (
        <Marker
          key={park['PARK NAME']} position={{
          lat:park['LATITUDE'],
          lng:park['LONGITUDE']
        }}
        onClick = {() => {
          setSelectedPark(park);
        }}
        icon={{
          url: '/tennis-ball.png',
          scaledSize: new window.google.maps.Size(16,16)
        }}
         />
      ))}

      {selectedPark && (
        <InfoWindow
            position = {{
            lat: selectedPark['LATITUDE'],
            lng: selectedPark['LONGITUDE']
          }}
          onCloseClick = {() => {
            setSelectedPark(null);
          }}>
          <div>
            <h3>{selectedPark['PARK NAME']}</h3>
            <p>ADDRESS: {selectedPark['STREET ADDRESS']}</p>
            <p>NO. OF COURTS: {selectedPark['NUMBER OF COURTS']}</p>
          </div>
          </InfoWindow>)}
    </GoogleMap>
  );
}

const MapWrapper = withScriptjs(withGoogleMap(Map));

export default function App() {
  return <div style={{ width:'100vw', height:'100vh' }}>
    <MapWrapper
    googleMapURL = {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
    loadingElement = {<div style= {{ height:"100%" }} />}
    containerElement = {<div style = {{ height:"100%" }} />}
    mapElement = {<div style = {{ height:"100%" }} />}
    />
  </div>;
}
