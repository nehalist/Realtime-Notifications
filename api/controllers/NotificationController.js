/**
 * NotificationsController
 *
 * @description :: Server-side logic for managing Notifications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	 * Subscribes to the users specific notifications room.
	 * Every room has its own notification room.
	 */
	subscribe: function(req, res) {
		if(typeof req.user !== 'undefined') {
			sails.sockets.join(req.socket, 'user_notifications_' + req.user.id);

			return res.ok();
		}

		return res.forbidden();
	},

	/**
	 * Creates new notifications.
	 */
	newNotification: function(req, res) {
		Notification.create({
			receiver: req.param('to'),
			message:  req.param('content'),
			sender:   req.param('from')
		}).exec(function(err, created) {
			return res.ok();
		});
	}
};
