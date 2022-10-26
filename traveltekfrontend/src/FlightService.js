const serverURL = "http://localhost:9000/api/flights"
const earlyflights = "http://localhost:9000/api/flights/earlyflights"


const getFlights = () => {
    return fetch(serverURL)
        .then(data => data.json())
        
}


const getEarlyFlightsCount = () => {
    return fetch(earlyflights)
        .then(data => data.json())
        
}



export { getFlights , getEarlyFlightsCount}