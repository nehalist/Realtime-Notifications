var markedejs = require('markedejs');

module.exports = {
  /**
   * Render home page
   */
  home: function(req, res) {
    User.find().exec(function(err, userlist) {
      var parsed;
      markedejs.renderFile('readme.md', [], function(err, html) {
        res.view('home', {
          users: userlist,
          readme: html
        });
      });
    });
  }

};
