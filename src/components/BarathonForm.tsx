import React, { useState,useEffect } from 'react';
import { IBarathon, IPub } from '../types/api';
import BarathonList from './BarathonList';
import Button from './Button';
import Input from './Input';
import LeafletMap from './LeafletMap';

interface IProps {
    pubs: IPub[],
    pubsProps?: string[],
}



const BarathonForm = ({ pubs,pubsProps }: IProps): JSX.Element => {
    const [selectedPubs, setSelectedPubs] = useState<IPub[]>([]);
    
    const handleSubmit = (): void => {
        
    };
    
    const [barsProps, setBarsProps] = useState<string[]>([]);
    if(pubsProps != barsProps)
    {
        setBarsProps(pubsProps)
        selectedPubs.forEach(pub => removePub(pub._id));
        
        pubsProps.forEach(idPub => {
            addPub(idPub)
        });

        // console.log(pubsProps)
        // console.log("------")
        // console.log(pubs.filter((pub: IPub) => {
        //     pubsProps.forEach(pubProps => {
        //         if(pub._id == pubProps)  return true
        //         return false;
                
        //     });
        // }))
        // console.log("------")



        // pubsProps && setSelectedPubs(
        //     pubs.filter((pub: IPub) => {
        //     pubsProps.forEach(pubProps => {
        //         if(pub._id == pubProps)  return true
        //         return false;
    
        //     });
        // }));

    }

    const addPub = (id: string): void => {
        const selectedPub = pubs.find((pub: IPub)=>{
            if(pub._id == id) return true;
            return false
        })

        setSelectedPubs([...selectedPubs,selectedPub] as IPub[]);
    };

    const removePub = (id: string): void => {
        setSelectedPubs(selectedPubs.filter((pub: IPub) => {
            if (id === pub._id) return false;
            return true;
        }));
    };

    const removeLastPub = (): void => {
        const pubs = [...selectedPubs]
        pubs.pop();
        setSelectedPubs(pubs);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input label='Nom' name="name" type="text" placeholder='Nom de votre parcours' />
            <Input label='Auteur' name="author" type="text" placeholder='Votre pseudo' />
            <Input label='pubs' name="pubs" type="text" value={selectedPubs.map((pub: IPub) => pub._id).join(',')} />
            <Button onClick={removeLastPub} type='button'>Remove Last</Button>
            <LeafletMap pubs={pubs} addPub={addPub} removePub={removePub} selectedPubs={selectedPubs} />
            <Button type='submit'>Soumettre</Button>
        </form>
    );
};

export default BarathonForm;