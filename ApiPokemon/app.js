const express = require('express');
const middlewares = require('./middlewares');
const cors = require('cors');
require('./database');

// Routes 
const authRoutes = require('./auth/auth.routes').router;
const teamsRoutes = require('./teams/teams.routes').router;

const app = express();
const corsOptions ={
    origin:'https://pokemon-app-julitoo14.vercel.app', //http://localhost:5173
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const port = 3000;

middlewares.setupMiddlewares(app);
app.get('/', (req, res) => {
    res.status(200).send('La api esta corriendo');
});


app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);



app.listen(port, () => {
    console.log('listening on port ' + port);
});

exports.app = app;