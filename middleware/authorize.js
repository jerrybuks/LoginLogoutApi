const role = require('../helpers/role')
module.exports = function(req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');
     
    // Check if not token
    console.log(req.body.role )
    console.log( role["Admin"])
	if (req.body.role !== role["Admin"]) {
		return res.status(401).json({ msg: 'Cannot delete user, contact an admin' });
	}
    next()
};