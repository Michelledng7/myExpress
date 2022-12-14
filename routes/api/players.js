const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const players = require('../../PlayersDB');

//get all players
router.get('/', (req, res) => {
	res.json(players);
});

//get single player
router.get('/:id', (req, res) => {
	console.log(req.params.id);
	const found = players.some((player) => player.id === parseInt(req.params.id));
	if (found) {
		res.json(players.filter((player) => player.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No player with the id of ${req.params.id}` });
	}
});

//add and create players
router.post('/', (req, res) => {
	//res.send(req.body);
	const newPlayer = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email,
		status: 'active',
	};

	if (!newPlayer.name || !newPlayer.email) {
		return res.status(400).json({ msg: 'Please include a name and email' });
	}
	players.push(newPlayer);
	res.json(players);
});

//update player
router.put('/:id', (req, res) => {
	const found = players.some((player) => player.id === parseInt(req.params.id));
	if (found) {
		players.forEach((player) => {
			if (player.id === parseInt(req.params.id)) {
				player.name = req.body.name ? req.body.name : player.name;
				player.email = req.body.email ? req.body.email : player.email;
				res.json({ msg: 'Player updated just now', player: player });
			}
		});
	}
	//res.json(players);
});

//delete player
router.delete('/:id', (req, res) => {
	const found = players.some((player) => player.id === parseInt(req.params.id));
	if (found) {
		res.json({
			msg: 'Player deleted',
			players: players.filter(
				(player) => player.id !== parseInt(req.params.id)
			),
		});
	} else {
		res.status(400).json({ msg: `No player with the id of ${req.params.id}` });
	}
});

module.exports = router;
