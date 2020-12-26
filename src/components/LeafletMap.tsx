import React, { useState } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup,Polyline } from 'react-leaflet';
import { IPub } from '../types/api';
import PubThumbnail from './PubThumbnail';
import { LatLngExpression } from 'leaflet';

const TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

interface IProps {
    pubs: IPub[];
    addPub: (id: string) => void;
    removePub: (id: string) => void;
    selectedPubs: IPub[];
}





const LeafletMap = ({ pubs, addPub, removePub, selectedPubs }: IProps): JSX.Element => {

    const polyline:LatLngExpression[] = selectedPubs.map((pub:IPub)=>{
        return [pub.latlng.lat,pub.latlng.lng]
    })
    console.log(JSON.stringify(polyline))



    return (
        <SMapContainer>
            <MapContainer
                center={[44.5667, 6.0833]}
                zoom={13}
                style={{
                    width: 320,
                    height: 200
                }}
            >
                <TileLayer
                    attribution={ATTRIBUTION}
                    url={TILE_LAYER}
                />
                <Polyline pathOptions={{ color: 'lime' }} positions={polyline} />
                {pubs.map((pub: IPub) => {
                    return (
                        <Marker position={[pub.latlng.lat, pub.latlng.lng]} key={pub._id}>
                            <Popup>
                                <PubThumbnail
                                    pub={pub}
                                    addPub={addPub}
                                    removePub={removePub}
                                />
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </SMapContainer>
    );
};

const SMapContainer = styled.div`
    margin-bottom: 15px;
`;

export default LeafletMap;