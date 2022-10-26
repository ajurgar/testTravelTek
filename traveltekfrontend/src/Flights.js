import React, { useState, useEffect } from 'react';
import { getFlights } from './FlightService';
import FlightList from './FlightList';



const Flights = () => {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        getAllFlights()
    }, []);

    const getAllFlights = () => {
        getFlights().then((allFlights) => {
            setFlights(allFlights);
        })
    }


    return (
        <>
        <h1>All Flights</h1>
       
            <FlightList flights={flights} />
        </>
    )
}

export default Flights;