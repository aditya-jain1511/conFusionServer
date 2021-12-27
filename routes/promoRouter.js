var express = require('express');
var bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //look for addition specification in the code below
})
.get( (req,res,next) => {
    res.end('//will send the promotions to you');
})
.post((req,res,next) => {
    res.end('//will add the promotions: '+ req.body.name + 'with details: '+ req.body.description)
})
.put( (req,res,next) => {
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    res.end('//deleting the promotions for you');
});

promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //look for addition specification in the code below
})
.get((req,res,next) => {
    res.end('//will send the deatils of the promo: '+ req.params.promoId + 'to you');
})
.post((req,res,next) => {
    res.statusCode=403;
    res.end('POST operation not supported on /promotions/'+req.params.promoId);
})
.put((req,res,next) => {
    res.write('updating the promo: '+req.params.promoId)
    res.end('//will update the promos: '+ req.body.name + 'with details: '+ req.body.description);
})
.delete((req,res,next) => {
    res.end('//deleting the promos for you: '+req.params.promoId);
})

module.exports= promoRouter;