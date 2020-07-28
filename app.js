const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

const scheduleRoutes = require('./routes/schedule');

app.use(scheduleRoutes);

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
}) 

// fix time to use moment to check overlap, this should make everything easier 
// when updating task when one already exists user can choose to delete conflicting task, similar to conflicting new task logic
// update actual task instead of adding a new one, filter by id 
//download csv file via fs and maybe node library. 
//readme files
// error handling
// style
//change view  schedule to get rather than post

// if we have time:
//rework how we store data so we can use filter to handle everything
//rework how we handle time 
// deploy
// ui/ux