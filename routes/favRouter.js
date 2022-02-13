var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Favourites = require('../models/favourites');
var authenticate = require('../authenticate')

const cors = require('./cors');

const favRouter = express.Router();
favRouter.use(bodyParser.json());

favRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus = 200; })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Favourites.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favs)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favs);
    },(err)=>next(err))
    .catch((err)=> next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favourites.findOne({user: req.user._id})
    .then((favs)=>{
        if(favs){
            for (var i=0; i<req.body.length; i++){
                if(favs.dishes.indexOf(req.body[i]._id)==-1){
                    favs.dishes.push(req.body[i]._id)
                }
            }
            favs.save()
            .then((favs)=>{
                console.log('Favourites Created ', favs);
                res.statusCode=200
                res.setHeader('Content-Type', 'application/json');
                res.json(favs);
            },(err)=>next(err))
        }
        else{
            Favourites.create({
                "user": req.user._id,
                "dishes": req.body
            })
            .then((favs)=>{
                    console.log('Favourites Created ', favs);
                    res.statusCode=200
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favs);
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favourites.findOneAndRemove({"user": req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

favRouter.route('/:dishId')
.options(cors.corsWithOptions, (req,res)=>{ res.sendStatus = 200; })
.get(cors.cors, (req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/'+ req.params.dishId);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favourites.findOne({user: req.user._id})
    .then((favs)=>{
        if(favs){
            if(favs.dishes.indexOf(req.params.dishId)==-1){
                favs.dishes.push(req.params.dishId)
            }
            favs.save()
            .then((favs)=>{
                console.log('Favourites Created ', favs);
                res.statusCode=200
                res.setHeader('Content-Type', 'application/json');
                res.json(favs);
            },(err)=>next(err))
        }
        else{
            Favourites.create({
                "user": req.user._id,
                "dishes": req.params.dishId
            })
            .then((favs)=>{
                    console.log('Favourites Created ', favs);
                    res.statusCode=200
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favs);
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/'+ req.params.dishId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favourites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite) {            
            index = favorite.dishes.indexOf(req.params.dishId);
            if (index >= 0) {
                favorite.dishes.splice(index, 1);
                favorite.save()
                .then((favorite) => {
                    console.log('Favorite Deleted ', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error('Favorites not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports= favRouter;