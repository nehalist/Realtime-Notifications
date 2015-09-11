/**
 * ConnectionController
 *
 * @description :: Server-side logic for managing Connectioncontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	 * Subscribes to the "users_online" room
	 *
	 * The users_online room is where all connected users are stored.
	 */
	subscribe: function(req, res) {
		if(typeof req.user !== 'undefined') {
			sails.sockets.join(req.socket, 'users_online');

			User.find(req.user.id).exec(function(err, user) {
				if( ! Connections.isOnline(user[0])) {
					Connections.addConnection(user[0]);

					sails.sockets.broadcast('users_online', 'user_connected', user[0]);
				}

				// Subscribing to the users_online room returns a list of all connected users
				return res.json(Connections.getConnectedUsers());
			});
		}
	}
};
