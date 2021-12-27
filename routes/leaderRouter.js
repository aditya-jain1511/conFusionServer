var express = require('express');
var bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //look for addition specification in the code below
})
.get( (req,res,next) => {
    res.end('//will send the leaders to you');
})
.post((req,res,next) => {
    res.end('//will add the leaders: '+ req.body.name + ' with details: '+ req.body.description)
})
.put( (req,res,next) => {
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    res.end('//deleting the leaders for you');
});

leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //look for addition specification in the code below
})
.get((req,res,next) => {
    res.end('//will send the deatils of the leader: '+ req.params.leaderId + ' to you');
})
.post((req,res,next) => {
    res.statusCode=403;
    res.end('POST operation not supported on /leaders/'+req.params.leaderId);
})
.put((req,res,next) => {
    res.write('//updating the leaders: '+req.params.leaderId)
    res.end(' //will update the leader: '+ req.body.name + ' with details: '+ req.body.description);
})
.delete((req,res,next) => {
    res.end('//deleting the leader for you: '+req.params.leaderId);
})

module.exports = leaderRouter;