/**
 * Very simple implementation of a connection manager service.
 */

module.exports = {
  connectedUsers: {},

  addConnection: function(user) {
    this.connectedUsers[user.id] = user;
  },

  isOnline: function(user) {
    if(typeof user == 'number') {
      if(user in this.connectedUsers) {
        return true;
      }
      return false;
    }

    if(typeof user !== 'undefined' && user.id in this.connectedUsers) {
      return true;
    }

    return false;
  },

  getConnectedUsers: function() {
    return this.connectedUsers;
  },

  removeUser: function(id) {
    delete this.connectedUsers[id];
  }
};
