
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); 

mongoose.connect('mongodb+srv://upraiss_user:upraiss123@assignment06.fbalb.mongodb.net/?retryWrites=true&w=majority&appName=Assignment06', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send('Welcome to the Student API!');
});


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema);

app.post('/students', async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name,
            class: req.body.class
        });

        const savedStudent = await student.save();
        res.status(201).send(savedStudent); 
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).send(students);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send('Student not found'); 

        res.status(200).send(student);
    } catch (err) {
        res.status(500).send(err); 
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
