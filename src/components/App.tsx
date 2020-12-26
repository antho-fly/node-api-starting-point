import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import { IBarathon, IPub } from '../types/api';
import BarathonForm from './BarathonForm';
import BarathonList from './BarathonList';
import Section from './Section';

const SContainer = styled.div`
    background-color: ${colors.darkGrey};
    height: 100%;
    width: 100%;
    padding: 15px;
`;

const App = (): JSX.Element => {
    // Déclaration d'une nouvelle variable d'état interne : pubs
    // RAPPEL: un changement d'état du composant provoque
    //         son re-rendu
    const [pubs, setPubs] = useState<IPub[]>([]);
    const [barathons, setBarathons] = useState<IBarathon[]>([]);
    
    // fonction executé au montage du composant
    // dans le DOM
    useEffect(() => {
        // obligé d'utiliser une fonction passe-plat pour le code asynchrone
        const fetchPubs = async (): Promise<void> => {
            const response = await fetch('https://miw-server.herokuapp.com/pubs');
            const pubs = await response.json();
            setPubs(pubs);
        };
        const fetchBarathons = async (): Promise<void> => {
            const response = await fetch('https://miw-server.herokuapp.com/barathons');
            const barathons = await response.json();
            setBarathons(barathons);
        };

        fetchPubs();
        fetchBarathons();
    }, []);
    
        const [pubsProps,setPubsProps] = useState<string[]>([]);
        const changeBarathon = (bars: string[]): void => {
               setPubsProps(bars);
            };


    return (
        <SAllContainer>
            <Section>
                <BarathonForm pubs={pubs} pubsProps={pubsProps}/>
            </Section>
            <BarathonList barathons={barathons} changeBarathon={changeBarathon}/>
        </SAllContainer>
    );
};

const SAllContainer = styled.div`
    background-color: ${colors.grey};
`;

export default App;