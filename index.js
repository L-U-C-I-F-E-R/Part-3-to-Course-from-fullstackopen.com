
// const http = require('http')
// const { time } = require('console')
const express = require('express')

const app = express()

// app.use(express.json())

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/info", (request, response) =>{
  let length = persons.length
  let today = new Date();
  let curentTime = `Curent time ${today}`
  // response.writeHead(200, { 'Content-Type': 'text/xml'})

  response.send(`<p>Phonebook has info for ${length} people.<br>Curent time ${today}</p>`)
    
  // {/* let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // let dateTime = date+' '+time;

  // response.send(`Phonebook has info for ${length} people.Curent time ${today}`)
  
})

app.get("/api", (request, response) => {
    response.send(console.log('Bye world'))
});

app.get("/api/persons", (request, response ) => {
    response.send(persons)
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


