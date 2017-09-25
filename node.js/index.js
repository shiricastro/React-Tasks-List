var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var Schema = mongoose.Schema;

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

var personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: "String",
  nickname: "String",
  descprition: "String"
});

var TasksSchema = Schema({
  task: "String",
  date: "Date",
  person: { type: Schema.Types.ObjectId, ref: 'Person' }
});


var Task = mongoose.model('Task', TasksSchema);
var Person = mongoose.model('Person', personSchema);

mongoose.connect("mongodb://127.0.0.1:27017/Todos",function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("we're connected to MongoDB");
});
app.post("/Person",function(req,res){
    req.body._id = new mongoose.Types.ObjectId();
    var person = new Person(req.body);
    person.save(function (err, updatedTank) {
        if (err) return console.log(err);
        res.send(updatedTank);
     });
});
app.get("/Person",function(req,res){
    Person.find({},function(err,Person){
        res.send(Person);
    });
});
app.get("/Person/:_id",function(req,res){
    Person.find({_id:req.params._id},function(err,Person){
        res.send(Person);
    });
});
app.post("/Tasks",function(req,res){
    req.body.date = new Date();
    var tasks = new Task(req.body);
    tasks.save(function (err, updatedTank) {
        if (err) return console.log(err);
        res.send(updatedTank);

     });
});
app.get("/Tasks",function(req,res){
    Task.find({}).populate("person").
  exec(function (err, task) {
    console.log(task);
    res.send(task);
  });
});

app.delete("/Person/:_id",function(req,res){
    Person.remove({_id:req.params._id},function(err,Person){
        res.status(204);
        res.send();
    });
});
app.delete("/Tasks/:_id",function(req,res){
    Task.remove({_id:req.params._id},function(err,Task){
        res.status(204);
        res.send();
    });
});
app.listen(3000,function(){
    console.log("listen to Port 3000");
});


