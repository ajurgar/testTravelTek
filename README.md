With this application a user can retrieve the flight data from different flights around the world over a two week period. The app uses MongoDB to store flight data after being converted from XML to JSON format for better manipulation. It also uses node JS backend with express server.

The application uses seeds.js to parse the data from XML to JSON in order to be inserted into the Mongodb database. An express js server then provides different REST endpoints to retrieve the data requested by the user.

The app can also display flight information on the frontend via React.

How to Run the application Localy:

* After cloning the repository, run "npm install" on backend folder.
* Ensure MongoDB server is running and run node seeds.js.
* Start the back end running command "npm start" on backend folder.
* Run "npm install" in the traveltekfrontend folder.
* Start the front end running command "npm start" on traveltekfrontend folder.

## Notes:
All the questions are answered via API endpoints on backend.

