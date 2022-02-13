const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favourteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Dish'
        }
    ]
},{
    timestamps:true, usePushEach: true
});

var Favourites = mongoose.model('Favourite' , favourteSchema);

module.exports = Favourites;