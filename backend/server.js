const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");


const app = express();
app.use(cors());
const router = express.Router();

let dbCollection;

MongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("flightdata");
    dbCollection = db.collection("flights");

  })
  .catch(console.error);



router.get('/', function (req, res) {
  const data = dbCollection.find().toArray((err, result) => {
    res.json(result)
  })
})

//get the count of all flights in the morning(before 12 pm)
router.get('/earlyflights', function (req, res) {
  const data = dbCollection.count({
    "outdeparttime": {
      $lt: Date.parse("2022-01-01T12:00:00")
    }
  }, (err, count) => res.json({ count }));
})

// – What percentage of the total set of flights fly into Sweden?
router.get('/flightstosweden', function (req, res) {
  const swedishAirports = [
    "ARN", "GOT", "MYO", "BMA", "MMX", "LLA", "UME"
  ];
  dbCollection.count((err, totalCount) => {
    dbCollection.count({
      "destair": {
        $in: swedishAirports
      }
    }, (err, count) => {
      let percentage = (count / totalCount) * 100
      percentage = Math.round((percentage + Number.EPSILON) * 100) / 100;
      res.json({ percentage });

    })
  })
})

// – What are the 10 most popular destination airports?
router.get('/populardestinations', function (req, res) {
  dbCollection.aggregate([
    {
      "$group": {
        _id: "$destair", count: { $sum: 1 }
      }
    }, {
      $sort: { count: -1 }
    }, {
      $limit: 10
    }
  ]).toArray((err, result) => {
    res.json(result)
  })
})

// – What’s the average journey time between London Heathrow (LHR) and Dubai (DXB)?
router.get('/lhrtodxb', function (req, res) {
  dbCollection.find({
    "destair": "DXB",
    "depair": "LHR"
  }).toArray((err, result) => {
    const count = result.length;
    const totalTime = result.reduce((acc, curr) => acc += (curr.inarrivaltime - curr.indeparttime), 0);
    const average = Math.floor(totalTime / count); 
    const averageTime = new Date(average); 
    let hours = averageTime.getHours();
    //add 3 hours to account for time difference
    hours = (hours + 3).toString().padStart(2, 0);
    const mins = averageTime.getMinutes().toString().padStart(2, 0);
    const secs = averageTime.getSeconds().toString().padStart(2, 0);

    res.json({ average_time: `${hours}:${mins}:${secs}` })
  });
})

// – What are the 5 most used Airlines?
router.get('/popularairlines', function (req, res) {
  dbCollection.aggregate([
    {
      "$group": {
        _id: "$carrier", count: { $sum: 1 }
      }
    }, {
      $sort: { count: -1 }
    }, {
      $limit: 5
    }
  ]).toArray((err, result) => {
    res.json(result)
  })
})


app.use("/api/flights", router);

app.listen(9000, function () {
  console.log('App running on port 9000')
});



