var utils = require('./utils.js');
var Weather = require('./Weather.js')
const top = 'top'
const left = 'left'
const right = 'right'
const bottom = 'bottom'
const none = 'none'


const express = require('express')
const app = express()
const port = 6900
var sqlite3 = require('sqlite3')

function initDatabase() {
  var db = new sqlite3.Database('./database.db', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.error(err.message) }
    console.log('database connected')
    // create table that the selected locations for the users
    db.serialize(() => {
      db.run('CREATE TABLE if not exists selections (userId Text,location Text,dataType Text , data Text) ;', (err) => {
        if (err) { throw err }
        else {
          db.all("SELECT name FROM sqlite_master WHERE type='table' AND name='quotes';",
            [], (err, rows) => {
              if (err) { throw err; }
              if (rows.length == 0) {
                console.log("Creating quotes")
                db.run('CREATE TABLE if not exists quotes (quote Text ,author Text) ;',(err)=>{
                  if(err ){throw err}
                var quotes = utils.readquotes()
                quotes.forEach(quote => {
                  db.run("INSERT INTO quotes (quote, author) VALUES (?,?)", [quote.quote, quote.author]);
                });
                console.log("added quotes")
               });
              }
            }
          );
        }

      });
    });
  });

  db.close();


}

/**
 * upon launching the server if the request is blank
 * 
 */
app.get('/', async (req, res) => {
  res.send('Hello World!')
})

/**
 * api request to get weather
 * @param longitude @param latitude 
 * coordinates to reflect the location for the weather
 * if no location is selected then the location to be used will be determined base on IP
 * @param type
 * reflects the commas seperated list of the types of forcecast to be looked up
 * valid types are "current", "hourly", "daily"
 */
app.get('/weather', async (req, res) => {
  var typesToExlude = { "daily": true, "hourly": true, "current": true }
  var location;
  if (req.query.latitude && req.query.longitude) {
    location = {
      "longitude": req.query.longitude,
      "latitude": req.query.latitude
    }
  }
  else {
    location = await Weather.getLocationFromIP()
  }

  if (req.query.type) {

    var types = req.query.type.split(',')
    types.forEach(el => typesToExlude[el] = false)

  }
  else {
    typesToExlude["current"] = false
  }

  var ForecastTypes = Object.keys(typesToExlude).reduce((accum, item) => {
    if (typesToExlude[item]) { console.log(accum); return accum + "," + item; }
    else { return accum }
  }, "")

  if (location != null) {

    res.send(await Weather.GetForecast(location, ForecastTypes))

  }
})
/**
 * gets random quotes from quotes table
 * 
 */
app.get('/quote', async (req, res) => {
  console.log("quotes")
  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE)
  db.all("select * from quotes Order by RANDOM() ;", [], (err, rows) => {
    if (err) {
      console.log("error")
      throw err;
    }
    console.log(rows)
    res.send(rows[0])
  });
  db.close
})


app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`)
  initDatabase();
})