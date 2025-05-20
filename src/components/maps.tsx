import {APIProvider, Map, MapCameraChangedEvent,AdvancedMarker,Pin, useMap, useAdvancedMarkerRef, InfoWindow,AdvancedMarkerProps,AdvancedMarkerAnchorPoint} from '@vis.gl/react-google-maps';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import { Circle } from './circle';
import type {Marker} from '@googlemaps/markerclusterer';

type Poi ={ key: string, location: google.maps.LatLngLiteral ,zIndex:number}

export const MapElement=({Poi1,cityprops}:{Poi1:Poi[],cityprops:{lat:number,long:number}})=>{
    const apiKey="AIzaSyDItL5Twjd22_r8j9nRWW8VXdAeE3UlUVo";
    const [latlng1, setlatlng1] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoverId, setHoverId] = useState<string | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const Z_INDEX_SELECTED = Poi1.length;
    const Z_INDEX_HOVER = Poi1.length + 1;
    const onMouseEnter = useCallback((id: string | null) => setHoverId(id), []);
    const onMouseLeave = useCallback(() => setHoverId(null), []);
    const onMarkerClick = useCallback(
      (id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
        setSelectedId(id);
  
        if (marker) {
          setSelectedMarker(marker);
        }
  
        if (id !== selectedId) {
          setInfoWindowShown(true);
        } else {
          setInfoWindowShown(isShown => !isShown);
        }
      },
      [selectedId]
    );
    const onMapClick = useCallback(() => {
      setSelectedId(null);
      setSelectedMarker(null);
      setInfoWindowShown(false);
    }, []);
    const handleInfowindowCloseClick = useCallback(
      () => setInfoWindowShown(false),
      []
    );

    useEffect(() => {
      if (Poi1 && Poi1.length > 1) {
        setlatlng1(Poi1[1].location);
      }
    }, [Poi1]); 
    const AdvancedMarkerWithRef = (
      props: AdvancedMarkerProps & {
        onMarkerClick: (marker: google.maps.marker.AdvancedMarkerElement) => void;
      }
    ) => {
      const {children, onMarkerClick, ...advancedMarkerProps} = props;
      const [markerRef, marker] = useAdvancedMarkerRef();
    
      return (
        <AdvancedMarker
          onClick={() => {
            if (marker) {
              onMarkerClick(marker);
            }
          }}
          ref={markerRef}
          {...advancedMarkerProps}>
          {children}
        </AdvancedMarker>
      );
    };
  const PoiMarkers = (props: { pois: Poi[] })=>{
    const [circleCenter, setCircleCenter] = useState< google.maps.LatLng | null>()
    const map = useMap();
    const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
    const [infoWindowShown,setInfoWindowShown]=useState(true);
    const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
        if(!map) return;
        if(!ev.latLng) return;
        setInfoWindowShown(isShown => !isShown)
        console.log('marker clicked:', ev.latLng.toString());
        setCircleCenter(ev.latLng);
        map.panTo(ev.latLng);
    },[]);
    useEffect(() => {
      map?.panTo({lat: cityprops.lat, lng: cityprops.long})
      if (!map) return;
     
    }, [map,Poi1]);


  
    const setMarkerRef = (marker: Marker | null, key: string) => {
      if (marker && markers[key]) return;
      if (!marker && !markers[key]) return;
  
      setMarkers(prev => {
        if (marker) {
          return {...prev, [key]: marker};
        } else {
          const newMarkers = {...prev};
          delete newMarkers[key];
          return newMarkers;
        }
      });
    };
    const handleClose = useCallback(() => setInfoWindowShown(false), []);
    
    return (
      <>
        <Circle
          radius={3000}
          center={circleCenter}
          strokeColor={'#0c4cb3'}
          strokeOpacity={1}
          strokeWeight={3}
          fillColor={'#3b82f6'}
          fillOpacity={0.3}
        />
        {props.pois.map( ({key,zIndex:zIndexDefault,location}) => {
          
          let zIndex = zIndexDefault;

          if (hoverId === key){
            zIndex = Z_INDEX_HOVER;
          }

          if (selectedId === key) {
            zIndex = Z_INDEX_SELECTED;
          }
          return(
          <AdvancedMarkerWithRef
            key={key}
            position={location}
            onMarkerClick={(
              marker: google.maps.marker.AdvancedMarkerElement
            ) => onMarkerClick(key, marker)}
            onMouseEnter={() => onMouseEnter(key)}
            onMouseLeave={onMouseLeave}
            zIndex={zIndex}
            className="custom-marker"
                style={{
                  transform: `scale(${[hoverId, selectedId].includes(key) ? 1.3 : 1})`,
                  transformOrigin: AdvancedMarkerAnchorPoint['BOTTOM'].join(' ')
              }}
          >
            <Pin background={'#3659B1'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarkerWithRef>
          );
          
    })}
    
      </>
    );
  };
    return(
        <APIProvider apiKey={apiKey?apiKey:"errror"} onLoad={() => console.log('Maps API has loaded.')} libraries={['marker']}>
            <Map defaultZoom={10} center={latlng1} mapId='DEMO_MAP_ID' onCameraChanged={ (ev: MapCameraChangedEvent) => {console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}} gestureHandling={'greedy'} onClick={onMapClick}>
                <PoiMarkers pois={Poi1} />
                {infoWindowShown && selectedMarker && (
            <InfoWindow
              anchor={selectedMarker}
              pixelOffset={[0, -2]}
              onCloseClick={handleInfowindowCloseClick}>
              <h2>Marker <span className='text-brand-900'>{selectedId}</span></h2>
            </InfoWindow>
          )}
            </Map>
        </APIProvider>
    )
    

    
}