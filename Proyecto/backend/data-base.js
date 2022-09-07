require('dotenv').config()

const {connect, Schema, model} = require('mongoose');
const {createServer} = require('http');

/*
----------------------------------------------
I chosse Mongo because it's easy to work with, we do not have to be worryng  about having id's at mongosse do the trick on it's own.

I consider important to mention that since a big volumes of data is easy to work when it comes to NoSQL that's another key for me to select mongo, since this page
will have a big but a really big inventory it will be really usefull.

Since I'll be making API request to the information in the DB by exporting the data I consider that it would be easier to manipulate the data since there's isn't like 
a static structure.

The main reason why I selected mongodb is due to scalability since the budget for the db is limited and we rather to have a low cost invest.
*/

connect(process.env.MONGO_URI, function (err) {
    if (err) {
        console.error('No se pudo conectar a la base de datos');
        console.error(err);
    } else {
        console.log('Connected to the database')
    }
});

//This is for the DataBase Schema

const UserSchema = new mongoose.Schema({
    RegisterUserName: {type: String, unique: true},
    RegisterEmail: {type: String, unique: true},
    RegisterPhone: {type: String, unique: true},
    RegisterAddress: {type: String, unique: true}
});

const UserDataSentSchema = new mongoose.Schema({
    email: {type: String, maxlength: 50},
    nameUser: {type: String, maxlength: 50},
    phone: {type: Number, maxlength: 15},
    description: {type: String}
});

const UserCommentSchema = new mongoose.Schema({
    description: {type: String, maxlength: 500},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

//instance schemas

const UserModel = mongoose.model('users', UserSchema);
const CommentModel = mongoose.model('comment', UserCommentSchema);
const ForeignSentSchemaModel = mongoose.model('UnRegisterComment', UserDataSentSchema)

//Test user

new UserModel({
    RegisterUserName: 'Jherson Salvador Gallo Cordova',
    RegisterEmail: 'jhersoncordova100@gmail.com',
    RegisterPhone: '3324534234',
    RegisterAddress: 'Hacienda de los peligorosos 1232 Col. Arandas'
}).save(function (err, document) {
    if(err){
        console.error('Error while registering the user info into the DB');
        console.error(err);
    } else{
        console.log('User inserted into the DB Successfully');
        console.log(document);
    }
});

//test comment from user

new CommentModel({
    email: 'jhersoncordova100@gmail.com',
    nameUser: 'Jherson',
    phone: '3322112323',
    description: 'this is a new user'
});

const server = createServer(function(request, response) {
    
    response.write('Inizialiting');
    response.end();
})

server.listen(8080, function (){
    console.log('this is connected in the port 8080')
});

