const path = require('path')

const express = require('express');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('schedule')
})

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
}) 