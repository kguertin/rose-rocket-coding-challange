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

//download csv file via fs and maybe node library. 
//readme files
// selected for edit option
// style
// error handling
//change view  schedule to get rather than post

// if we have time:
// make csv file download in browser rather than write to drive
//rework how we store data so we can use filter to handle everything
// deploy
// ui/ux