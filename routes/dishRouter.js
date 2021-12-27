var express = require('express');
var bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //look for addition specification in the code below
})
.get( (req,res,next) => {
    res.end('//will send the dishes to you');
})
.post((req,res,next) => {
    res.end('//will add the dishes: '+ req.body.name + 'with details: '+ req.body.description)
})
.put( (req,res,next) => {
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    res.end('//deleting the dishes for you');
});

dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //look for addition specification in the code below
})
.get((req,res,next) => {
    res.end('//will send the deatils of the dish: '+ req.params.dishId + 'to you');
})
.post((req,res,next) => {
    res.statusCode=403;
    res.end('POST operation not supported on /dishes/'+req.params.dishId);
})
.put((req,res,next) => {
    res.write('updating the dish: '+req.params.dishId)
    res.end('//will update the dish: '+ req.body.name + 'with details: '+ req.body.description);
})
.delete((req,res,next) => {
    res.end('//deleting the dishes for you: '+req.params.dishId);
})

module.exports= dishRouter;