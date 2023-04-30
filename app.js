const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
var _ = require('lodash');

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1/VideoGamesDB");

const gameSchema = mongoose.Schema({
    name: String,
    esrb: String,
    genre: String,
});

const game = mongoose.model("game", gameSchema);

app.route("/games")
.get(function (req, res) {
    game.find({}).then((result) => {
        res.send(result);
    })
})
.post(function (req, res) {
    const newGame = new game({
        name: req.query.name,
        esrb: req.query.esrb,
        genre: req.query.genre
    });
    newGame.save()
        .then(() => {
            console.log("success");
        })
        .catch((err) => {
            console.log(err);
        }); 
})
.delete(function(req, res){
    game.deleteMany({})
    .then(()=>{
        console.log ("Successfully deleted all games")
    })
});

app.get("/games",);

app.post("/games",);

app.delete("/games",);

app.route("/games/:id")

.get(function(req, res){
    game.findOne({name: req.params.id})
    .then((result) => {
        if(!result){
            res.send('Could not find game: ' + req.params.id)
        } else{
            res.send(result);
        }
    })
    .catch((err) => {
        console.log(err)   
    })
})

.put(function(req, res){
    game.updateOne(
        {name: req.params.id},
        {name: req.query.name, esrb: req.query.esrb, genre: req.query.genre})
        .catch((err)=> {
            console.log(err);
        })
})



app.get("/games/:id",);

app.listen("3000", function (req, res) {
    console.log("Server is running on port 3000");
});
