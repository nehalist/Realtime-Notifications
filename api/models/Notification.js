/**
* Notification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    receiver :  { type: 'integer' },
    sender :    { type: 'integer' },
    message :   { type: 'string' }
  },

  /**
   * After creation of a notification a message to its receiver is sent.
   */
  afterCreate: function(model, next) {
    User.find(model.sender).exec(function(err, user) {
      sails.sockets.broadcast('user_notifications_' + model.receiver, 'notification', {
        message: model.message,
        sender: user[0].username
      });
    });

    next();
  }
};
