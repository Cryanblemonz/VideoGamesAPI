const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1/VideoGamesDB");

const gameSchema = mongoose.Schema({
    name: String,
    esrb: String,
    genre: String,
});

const game = mongoose.model("game", gameSchema);

app.get("/", function (req, res) {
        game.findOne({})
        .then(result => {
                console.log(result.esrb)
                let games = [];
                games.push(result.genre);
                console.log(games.length);

                res.render('index', {games: games})
        })
});

app.listen("3000", function (req, res) {
    console.log("Server is running on port 3000");
});
