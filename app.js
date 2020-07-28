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

// error handling
// check that something isnt added in that time
// add task when one already exist, user can choose to overwrite existing task
// when updating task when one already exists user can choose to delete conflicting task
// update actual task instead of adding a new one
//readme files
//download csv file via fs and maybe node library. 
// style

// if we have time:
//rework how we store data so we can use filter to handle everything
//rework how we handle time 
// deploy
// ui/ux