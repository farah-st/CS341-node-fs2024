var express =  require('express');
var app = express ();
const port = process.env.PORT || 3000;

//this is connected to routes
app.use('/', require('./routes'));

app.listen (3000, () => {
    console.log(`Server is running on port ${port}`)
});