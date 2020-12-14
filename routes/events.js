let init = require("../data/events");

var express = require('express');
var router = express.Router();

const userService = require("../firebase/user-db")
const eventService = require("../firebase/event-db")

/* GET event listings. */
router.get('/', function(req, res, next) {
    eventService.getAllEvents()
        .then(events => {
            res.send(JSON.stringify(events))

        })
});


router.get('/:id', function(req, res, next) {
    eventService.getEventById(req.params["id"])
        .then(event=> {
            res.send(JSON.stringify(event))

        })
});

router.delete('/:id', function(req, res, next) {
    eventService.deleteEvent(req.params["id"])
        .then(deleted => res.send(`deleted event with id=${req.params.id}`))
})

router.post('/', function(req, res, next) {
    eventService.createEvent(req.body)
        .then(event => res.send(JSON.stringify(event)))
})

router.put('/:id', function(req, res, next) {
    eventService.updateEvent(req.params.id,req.body)
        .then(events => res.send(JSON.stringify(events)))
})



router.post('/:id/users', function(req, res, next) {
    userService.getAllUsers()
        .then(users => {
            let user = users.filter(u => req.body.includes(u.id))
            res.send(JSON.stringify(user))
        })
});





module.exports = router;
