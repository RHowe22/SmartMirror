var utils =require ('./utils.js') ;
var Weather = require('./Weather.js')
const top='top'
const left='left'
const right='right'
const bottom='bottom'
const none='none'


const express = require('express')
const app = express()
const port = 6900
var sqlite3= require('sqlite3')
var db = new sqlite3.Database('./database.db',sqlite3.OPEN_CREATE |sqlite3.OPEN_READWRITE,(err)=>{
  if(err){ console.error(err.message)}
  else{console.log('database connected')
  // create table that the selected locations for the users
  db.serialize(()=>{
    db.run('CREATE TABLE if not exists selections (userId Text,location Text,dataType Text , data Text) ;');
  }  );
  db.all("SELECT name FROM sqlite_master WHERE type='table' AND name='quotes';",
    [] , (err, rows)=>{
      if(err){ throw err;}
      if(rows.length >0)
      {
        db.run('CREATE TABLE quotes (userId Text ,author Text) ;')
        var quotes=utils.readQuotes()        
        quotes.array.forEach(quote => {
          db.run("INSERT  INTO quotes (quote, author) VALUES (?,?)", [quote.quote,   qoute.author]);
        });
      }

    }
  
  )




  db.close()
}
})

/**
 * upon launching the server if the request is blank
 * 
 */
app.get('/', async (req, res) => {
  res.send('Hello World!')
  if(req.query.dog){console.log("hey theres a dog")}
  else{console.log("sad no dog")}
})
/*
app.get('/weather/:lat/:long', async (req, res) => {

   var location = ( await Weather.getLocation())
  res.send(location)
})*/

/**
 * api request to get weather
 * if no location is selected then the location to be used will be determined base on 
 * 
 */
app.get('/weather', async (req, res) => {
  var typesToExlude={"daily":true,"hourly":true,"current":true}
  var location;
  if(req.query.latitude && req.query.longitude){
    console.log("given Coord")
      location = {"longitude":req.query.longitude,
                  "latitude": req.query.latitude
                  }
  }
  else{
     location =  await Weather.getLocationFromIP()
  }

  if(req.query.type){

    var types= req.query.type.split(',')
    types.forEach(el =>typesToExlude[el]=false)

  }
  else
  {
    typesToExlude["current"]=false
  }

  var ForecastTypes= Object.keys(typesToExlude).reduce((accum,item)=> {
             if(typesToExlude[item]) 
                {console.log(accum);return accum+","+item;}
              else {return accum}
           },"")
         
  if (location != null){

   res.send(await Weather.GetForecast(location,ForecastTypes))

  }
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})