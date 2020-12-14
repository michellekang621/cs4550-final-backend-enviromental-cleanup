
var express = require('express');
var router = express.Router();

const userService = require("../firebase/user-db")
const eventService = require("../firebase/event-db")



var id_accum = 1




/* GET users. */
router.get('/', function(req, res) {
	userService.getAllUsers()
		.then(usersList => {
			res.send(JSON.stringify(usersList));
		})
});


router.get('/:userId/events', function(req, res) {
	eventService.getEventsForUser(req.params["userId"])
		.then(eventsList => {
			res.send(JSON.stringify(eventsList));
		})
});


// Register User and send back all of the users
router.post('/', function(req, res) {
	// userService.createUser(req.body)
	// 	.then(user => {
	// 		res.send(user);
	// 	})
	const newId = id_accum + 1
	var newUser = req.body
	newUser.id = newId
	users.push(newUser)
	res.send(JSON.stringify(users));
	console.log("Here is the updated list of users:")
	console.log(users)
})

// Login User

router.post('/login', function(req, res) {
	let {email, password} = req.body
    userService.authenticate(email, password).then(response=>
	res.send(JSON.stringify(response)))
})

// find user by Id
router.get('/:userId', function(req, res) {
	userService.getUserById(req.params['userId'])
		.then(user => {
			res.send(JSON.stringify(user))
		})
});

//get user friends
router.get('/:userId/friends', function(req, res) {
	userService.getUserFriends(req.params['userId'])
		.then(users => {
			res.send(JSON.stringify(users))
		})
});


// update user
router.put('/:userId', function(req, res) {
   userService.updateUser(req.params['userId'], req.body)
		.then(user => res.send(JSON.stringify(user)))
	    .catch(err => console.log(err))
});



router.delete("/:userId", function(req, res) {
	userService.deleteUser(req.params['userId']).then(()=>
     res.send(`deleted user with id: ${req.params['userId']}`))
});



module.exports = router;
