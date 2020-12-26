import React, { useState } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup,Polyline } from 'react-leaflet';
import { IPub, IBarathon } from '../types/api';
import PubThumbnail from './PubThumbnail';
import { LatLngExpression } from 'leaflet';
import Button from './Button';


interface IProps {
    barathons: IBarathon[];
    changeBarathon: (bars: string[]) => void;
}




const BarathonList = ({ barathons,changeBarathon }: IProps): JSX.Element => {

    console.log('ca passe')

    return (
        <>
            <STable>
                <STr>
                    <STh>NOM</STh>
                    <STh>AUTEUR</STh>
                    <STh>NB DE BAR</STh>
                    <STh>VOIR</STh>
                </STr>
                {barathons.filter((barathon: IBarathon) => {
                    if (barathon.checkpoints.length == 0) return false;
                    return true; 
                        }).map((barathon: IBarathon) => {
                    return (
                        <>
                        <STr>
                            <STd>{barathon.name}</STd>
                            <STd>{barathon.author}</STd>
                            <STd>{barathon.checkpoints.length}</STd>
                            <STd><Button type="button" onClick={():void => {changeBarathon(barathon.checkpoints)}}>VOIR</Button></STd>
                        </STr>

                        </>
                    );
                })}
            </STable>
        </>
    );
};

const STable = styled.table`
    margin-bottom: 15px;
    width:100%;
    text-align:center;
    border: solid black 1px;
`;
const STr = styled.tr`
    height:100px;
    font-size:1.3rem;
`;
const STd = styled.td`
     border-bottom: solid black 1px; 
`;
const STh = styled.td`
     border-bottom: solid black 1px;
     font-weight:bold;
`;



export default BarathonList;