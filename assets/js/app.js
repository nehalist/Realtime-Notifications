io.socket.on('connect', function() {
  // Cheap way to get the user id
  var userID = $('#user-id').html();

  // List of all users
  var connectedUserIDs = [];

  io.socket.get('/connection/subscribe', function(data, jwr) {
    // We get a list of all connected users after subscribing and need to display them
    $.each(data, function(key, user) {
      $('#connected-users-list').append('<li data-user-id=' + user.id + '>' + user.username + '</li>');
      connectedUserIDs.push(user.id);
    });

    // Handling user disconnects
    io.socket.on('user_disconnected', function(uid) {
      var user = $('li[data-user-id="' + uid + '"]').html();
      if(typeof user !== 'undefined') {
        new PNotify({
          title: 'Info',
          text: $('li[data-user-id="' + uid + '"]').html() + ' went offline'
        });
      }

      // Remove it from our connected users array
      connectedUserIDs.splice(connectedUserIDs.indexOf(uid), 1);

      // Remote it from the list
      $('li[data-user-id="' + uid + '"]').remove();
    });

    // Handling user connections
    io.socket.on('user_connected', function(user) {
      // Only notifiy or add to list if the user is not in the users array
      if($.inArray(user.id, connectedUserIDs) == -1) {
        new PNotify({
          title: 'Info',
          text: user.username + ' came online'
        });
        $('#connected-users-list').append('<li data-user-id=' + user.id + '>' + user.username + '</li>');

        // Add it to the connected users array
        connectedUserIDs.push(user.id);
      }
    });
  });

  // Subscribe to notifications
  io.socket.get("/notification/subscribe", function(data, jwr) {
    // Handling notifications
    io.socket.on('notification', function(obj) {
      new PNotify({
        title: 'Notification from <b>' + obj.sender + '</b>',
        text: obj.message,
        icon: false,
        type: 'info'
      });
    });
  });

  // Sending notifications
  // Basically just an AJAX call
  $('#notification-send').click(function() {
    var receiver = $('#notification-receiver').val();
    var message  = $('#notification-message').val();

    $.ajax({
      url: '/notification/new',
      method: 'POST',
      data: {
        to:       receiver,
        content:  message,
        from:     userID
      }
    });
  });
});
