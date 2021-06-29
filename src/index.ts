// const express = require("express")
// const bodyParser = require("body-parser")
// const config = require("./config")
import express from "express"
import bodyParser from "body-parser"
import config from "./config"
import ApiRouter from "./routers"
import database from "./services/database"

const app = express()

database()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/api", ApiRouter)

app.listen(config.app.port, ()=>{
    console.log("Server listening on port", config.app.port)
})