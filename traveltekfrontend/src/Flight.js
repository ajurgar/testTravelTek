import React from "react";

const Flight = ({ flight }) => {
    return (
        <div className="flights">
            <p><b>Carrier: </b>{flight.carrier}</p>
            <p><b>Departure Airport: </b>{flight.depair}</p>
            <p><b>Destination Airport: </b>{flight.destair}</p>
            <p><b>Flight Class: </b>{flight.outflightclass}</p>
            <p><b>Reservation Number: </b>{flight.reservation}</p>

            <br></br>
        </div>
    )
}

export default Flight;