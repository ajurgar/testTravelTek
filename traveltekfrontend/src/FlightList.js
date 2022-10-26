import React from "react";
import Flight from "./Flight";

const FlightList = ({ flights }) => {

    const flightNodes = flights.map((flight, index) => {
        return <Flight flight={flight} key={index} />
    });


    return (
        <>
            {flightNodes}
            
        </>
    )
}

export default FlightList;