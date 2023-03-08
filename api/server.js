const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Sattwik:Sattwik%402002@cluster0.jrtveln.mongodb.net/?retryWrites=true&w=majority', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');
app.use((err, req, res, next) => {
	if (err.name === 'DocumentNotFoundError') {
	  res.status(404).json({ error: 'Document not found' });
	} else {
	  res.status(500).json({ error: 'Internal server error' });
	}
  });
  
app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});
//create a new data collection
app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text,
		timestamp:req.body.timestamp,
		author:req.body.author
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);
   if(result!=null)
	res.json({result});
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);
  if(todo!==null)

  {
	
   
	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
  }
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;
	

	todo.save();

	res.json(todo);
});

app.listen(3001);