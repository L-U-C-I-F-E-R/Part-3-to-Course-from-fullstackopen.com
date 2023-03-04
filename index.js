
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join('build')))


morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-type] - :response-time ms :type'))

let persons = [
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
  console.log(today)
  response.sendFile(path.join(`<p>Phonebook has info for ${length} people.<br>Curent time ${today}</p>`, 'build', 'index.html')) 
  // response.writeHead(200, { 'Content-Type': 'text/xml'})
  // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // let dateTime = date+' '+time;
  // console.log(dateTime) 
  
})

app.get("/api", (request, response) => {
    response.send(console.log('Bye world'))
});

app.get("/api/persons", (request, response ) => {
    response.sendFile(path.join(persons, 'build', 'index.html')) 
    // response.send(persons)
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(n => n.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  // console.log(id)
  persons = persons.filter(person => person.id !== id)
  // response.send("Deleted")
  // console.log(persons)
  response.status(204).end()
})

const checkName = (name) => {
  // console.log(typeof name)
  return persons.find(person => person.name === name)
}

app.post("/api/persons", (request, response) => {
  const newPerson = request.body
  const randomId = Math.floor(Math.random()*1000)
  newPerson.id = randomId
  // console.log(newPerson)
  if (!newPerson.name || !newPerson.number){
    response.send("Absent name or number ")
    return response.status(204).end()
  } else if (checkName(newPerson.name)){
    response.send("Can not add. This name already contains in a list.")
    return response.status(208).end()
  } else {
    persons = persons.concat(newPerson)
    response.send(persons)
  }
  
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


