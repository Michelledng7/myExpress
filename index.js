const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500;
const logger = require('./middleware/logger');

// init middleware
//app.use(logger);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//api routes for players
app.use('/api/players', require('./routes/api/players'));

// app.get('/', (req, res) => {
// 	res.send('Hello Michelle!!!!!');
// });

app.listen(PORT, () => {
	console.log('Listening on port `${PORT}`');
});
