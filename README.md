With this application a user can retrieve the flight data from different flights around the world over a two week period. The app uses MongoDB to store flight data after being converted from XML to JSON format for better manipulation. It also uses node JS backend with express server. 

The application uses seeds.js to parse the data from XML to JSON in order to be inserted into the Mongodb database. An express js server then provides a REST endpoint to retrieve the data.

How to Run the application Localy:

* After cloning the repository, run "npm install" on backend folder.
* Ensure MongoDB server is running and run node seeds.js
* Start the back end running using command "npm start" in the server folder.


