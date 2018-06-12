/************************************************************************************************************
Lecture 6 - Passport User Authentication Project
/************************************************************************************************************/






/************************************************************************************************************
Node.js and mongoDB
/************************************************************************************************************/
npm init //will create file package.json
/*
file package.json
*/
{
  "name": "mongodriver",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mongodb": "^2.2.33"
  }
}

npm install //run installation accirding to package.json

/*
MongoDB
*/
//install the hotfix for win7
http://hotfixv4.microsoft.com/Windows%207/Windows%20Server2008%20R2%20SP1/sp2/Fix405791/7600/free/451413_intl_x64_zip.exe

//install the service
mongod  --directoryperdb  --dbpath C:\MongoDB\data\db --logpath C:\MongoDB\log\mongodb.log --logappend --rest --install

//start the service
net start MongoDB

/*
some mongo query
*/
db.users.find({})
db.users.find({name:'Kejeiri'})
/*
app.js
*/

const MongoClient = require('mongodb').MongoClient;

//connection url

const url ='mongodb://localhost:27017/myproject';
MongoClient.connect(url, (err, db) =>{
	if (err) { 
		return console.dir(err);
	}

	/*cleanCollection = db.collection('users');
	cleanCollection.remove({});

	console.log('Connected to monogodb');
	InsertDocument(db,  () => {
		//db.close();
	});

	InsertDocuments(db,  () => {
		//db.close();
	});

	findDocuments(db,function () {
		db.close();
	});*/

	queryDocument(db,function () {
		//db.close();
	});

	updateDocument(db,function () {
		//db.close();
	});

	deleteDocument(db,function () {
		db.close();
	});

}) ;


//insert a single document.

const InsertDocument = (db, callback) => {
	// get collection
	const collection = db.collection('users');

	//Insert Docs
	collection.insert({
		name:'Kejeiri',
		email:'me@me.com'

	},  (err, result) => {
		if (err) { 
		return console.dir(err);
		}
		console.log('Inserted document');
		console.log(result);
		callback(result);
		
	});
}

//Insert multiple documents
const InsertDocuments= function(db,callback) {

	const collection = db.collection('users');
	
	collection.insertMany([
	{
		name:'adam',
		email:'adam@gmail.com'

	},	
	{ 
		name:'unborn',
		email:'unborn@gmail.com'

	},

	{
		name:'samy',
		email:'samy@gmail.com'

	},
	{
		name:'souad',
		email:'souad@gmail.com'
	}
		],function (err, result) {
			if (err) {console.dir(err);}
			console.log('Inserted ' + result.ops.length + ' documents');
			console.log(result);
			callback(result);
		});
}


//find a documents
const findDocuments = function (db, callback) {
	const collection = db.collection('users');
	collection.find({}).toArray(function (err, docs) {
		if (err) {console.dir(err);}
		console.log('found the following documents');
		console.log(docs);
		callback(docs);
	}) 
}



//query a document
const queryDocument = function (db, callback) {
	const collection = db.collection('users');
	var nameInstance='Kejeiri';
	collection.find({name:nameInstance}).toArray(function (err, docs) {
		if (err) {console.dir(err);}
		console.log('found the following documents with name:' + nameInstance);
		console.log(docs);
		callback(docs);
	}) 
}

//update document
const updateDocument= function (db, callback) {
	const collection = db.collection('users');
	nameInstance = 'Kejeiri';
	collection.updateOne({name:nameInstance}, 
		{$set:{email:'kejeiri@something.com'}},function (err, doc) {
			if (err) {console.dir(err);}
			console.log('Updated:' + nameInstance);
			//console.log(doc);
			callback(doc);

			
	});
}

//delete a document
const deleteDocument= function (db, callback) {
	const collection = db.collection('users');
	nameInstance = 'Kejeiri';
	collection.deleteOne({name:nameInstance}, 
		{$set:{email:'kejeiri@something.com'}},function (err, doc) {
			if (err) {console.dir(err);}
			console.log('deleted:' + nameInstance);
			//console.log(doc);
			callback(doc);

			
	});
}


/************************************************************************************************************
Template ejs
/************************************************************************************************************/

/*
footer.ejs
*/
<div class="container">	
	<h1>Copyright &copy; 2018</h1>			
</div>

/*
Index.ejs
*/
<%- include('inc/header') %>

<div class="container">
	<% if (showTitle) { -%>
		<h1><%= title %></h1>	
	<% } else { -%>
		<div>showTitle is set to <%=showTitle %></div>
	<% } -%>

	<table class=".table-striped ">
		<th><td>Name</td></th>
		<% peoples.forEach(function (person) { %>
		<tr><td><%=person%></td></tr>	
		<%}) %>
	</table>	
</div>

<%- include('inc/footer') %>
/*
about.ejs
*/
<%- include('inc/header') %>
<h1>Title: <%=Title %></h1>
<%- include('inc/footer') %>

/*
contact.ejs
*/
<%- include('inc/header') %>
<h1>Title: <%=Title %></h1>
<%- include('inc/footer') %>
/*
header.ejs :
*/
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>MyNode website</title>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>	
<nav class="navbar navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">My Node Website</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
</body>
</html>

/*
app.js
*/
var express = require('express');
var bodyParser= require('body-parser');
var path= require('path');
var ejs= require('ejs');

var app=express();
var port = 3000;

app.use(function(req,res, next) {//calling the middleware
	 console.log('Date : ' , Date.now());
	 next();
}); 


app.set('view engine','ejs');
/*app.set('views', path.join(__dirname,'views'));*/ //optional

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


/*app.get('/',function (req,res) {
	res.send('hi there  ');
});
*/


/*routing*/

app.get('/',function(req,res) {
	res.render('index',{
		title:'hello there',
		showTitle:true,
		peoples:['Samy','Adam', 'Souad', 'Mohamed']
	});
})

app.get('/about',function (req,res) {
	res.render('about',{
		Title:'This is my dynamic about page'
	});
});


app.get('/contact',function (req,res) {
	res.render('contact',{
		Title:'This is my dynamic contact page'
	});
});


app.listen(port);
console.log('server up & running in port '+ port);
module.exports = app;




/*
Index.ejs template ejs
*/
<%- include('inc/header') %>

<div class="container">
	<% if (showTitle) { -%>
		<h1><%= title %></h1>	
	<% } else { -%>
		<div>showTitle is set to <%=showTitle %></div>
	<% } -%>

	<table class=".table-striped ">
		<th><td>Name</td></th>
		<% peoples.forEach(function (person) { %>
		<tr><td><%=person%></td></tr>	
		<%}) %>
	</table>	
</div>


/*
template engine ejs
*/

//install
npm install ejs --save




/*
public folder static page : http://localhost:3000/index.html
*/

var express = require('express');
var bodyParser= require('body-parser');
var path= require('path');

var app=express();
var port = 3000;

app.use(function(req,res, next) {//calling the middleware
	 console.log('Date : ' , Date.now());
	 next();
}); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public'))); //includes a static files


app.get('/',function (req,res) {
	res.send('hi there  ');
});


app.listen(port);
console.log('server up & running in port '+ port);
module.exports = app;





/*dependencies express and
file package.json*/
{
  "name": "myexpress",
  "version": "1.0.0",
  "description": "Simple express applications",
  "main": "app.js",
  "scripts": {
    "test": "com"
  },
  "repository": {
    "type": "git",
    "url": "gitrep"
  },
  "keywords": [
    "keywords"
  ],
  "author": "kejeiri",
  "license": "ISC",
  "dependencies": {
    "express": "*",
    "body-parser": "*"
  }
}
 

//app.js file

var express = require('express');
var bodyParser= require('body-parser');
var path= require('path');

var app=express();
var port = 3000;

app.use(function(req,res, next) {//calling the middleware
	 console.log('Date : ' , Date.now());
	 next();
}); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));



app.get('/',function (req,res) {
	res.send('hi there');
});

app.listen(port);
console.log('server up & running in port '+ port);
module.exports = app;


/*static pages
public folder and tell the sys where to look for:*/
app.use(express.static(path.join(__dirname,'public')));

 
 
npm install
npm install nodemon -g (g for global)
