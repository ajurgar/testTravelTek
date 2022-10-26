const { json } = require('express');
const fs = require('fs');
const convert = require('xml-js')

let jsonData = []

const timeFields = ["inarrivaltime", "indeparttime", "outarrivaltime", "outdeparttime", "arrtime", "deptime"]
const dateFields = ["inarrivaldate", "indepartdate", "outarrivaldate", "outdepartdate", "arrdate", "depdate"]
const priceField = "originalprice"

const processData = (data) => {
  
  for(field of dateFields) {
    if(field in data)
      data[field] = Date.parse(data[field])
  }

  for(field of timeFields) {
    if(field in data)
      data[field] = Date.parse("2022-01-01T" + data[field])
  }
}

fs.readFile('./flighdata_A.xml', (err, data) => {
  jsonData = convert.xml2json(data, {compact: true, indentAttributes: true})
  jsonData = JSON.parse(jsonData);
 
 console.log(jsonData.flights.flight[1])

  jsonData = jsonData.flights.flight.map(flight => {
 

    let segments = []
    if ('segments' in flight) {
      segments = flight.segments.segment.map ((segment) => {
        return segment._attributes
      })
    }

    const flightObject = flight._attributes;
    flightObject[priceField] = parseFloat(flightObject[priceField])

    processData(flightObject)
    segments.forEach(processData)

    return {
      ...flightObject,
      segment: segments
    }
  });

  const MongoClient = require("mongodb").MongoClient;

    MongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true })
    .then(client => {
        const db = client.db("flightdata");
        const flightsCollection = db.collection("flights");

        flightsCollection.insertMany(jsonData);
    })
    .catch(console.error);
})



