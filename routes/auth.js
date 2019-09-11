
const express = require('express');
var mongoose = require('mongoose')
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtSecret');
const { check, validationResult } = require('express-validator');
const authorize = require('../middleware/authorize')

const User = require('../models/User');

router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				jwtConfig,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

router.delete('/:id',[auth, authorize], async (req, res) => {
	try {
		const { id }= req.params
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(401).json({ msg: 'Id is invalid' })
		const user = await User.findById(id);
		if (!user) return res.status(404).json({ msg: 'User not found' });
		await User.findByIdAndRemove(id);
		res.json({ msg: 'User removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
})

module.exports = router;
