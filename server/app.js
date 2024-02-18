const express = require('express');
const mongoose = require('mongoose');
const indexRouter = require('./Routes/indexRouter');
const userRouter = require('./Routes/userRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRouter = require('./Routes/postRouter');

const app = express();

mongoose.connect('mongodb://localhost:27017/ExclusiveAccess', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB Connection Error:', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(5000, () => console.log('Server Runnig on PORT : 5000'));

module.exports = app;