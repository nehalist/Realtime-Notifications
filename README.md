# Realtime Notifications
My little playground to play around with realtime events and things like that. This project covers:

- User authentication (via Passport)
- Send notification messages (in realtime) from one user to another
- Realtime "currently online" list

It's entirely written in NodeJS using the SailsJS Framework. For additional credits see below.

### Installation
- Clone the repo
- Run `npm install`
- Run `sails lift`
- Go to `http://localhost:1337`
- Win

### How to use it
- Click on the `Register` button
- Register a bunch of users
- Log into each of the users simultaneously (by using Chrome Incognito mode, other browsers, devices, whatever)
- Send notifications / messages to users
- Win again

### How it works
#### Notifications
1. After logging in the client is subscribed to a room for _his_ (`user_notifications_{id}`) notifications (see `api/controllers/NotificationsController@subscribe`)
2. Every time a notification is created a message is broadcast to the receivers notifications room (see `api/models/Notification.js@afterCreate`)
3. Client reacts to notifications (see `assets/js/app.js@Line~61`)

#### Users online list
The `Connections` service is responsible for managing connections (basically just stores and/or removes user IDs from the memory).

1. After logging in every client is subscribed to a room called `users_online` (see `api/controller/ConnectionController@subscribe`). The request returns a list of all connected users to show it on client (see `aseets/js/app.js@Line~9`)
2. Whenever a user logs in a message is broadcast to the `users_online` room (see `api/controller/ConnectionController@subscribe`)
3. Whenever a user disconnects (or logs out) it gets removed by the `Connections` service. In case the user doesn't return within three second it can be considered as "offline" and a message is broadcast (see `config/sockets@afterDisconnect`). The delay is required due to refreshing a page is technically a disconnect.

### Credits
- [SailsJS](http://sailsjs.org/)
- [jQuery](https://jquery.com/)
- [Bootstrap](http://getbootstrap.com/)
- [PassportJS](http://passportjs.org/)

written by [nehalist.io](http://nehalist.io)
