/**
 * 
 * Request handlers
 */

 // Dependencies

 const _data = require('./data')
 const helpers = require('./helpers')

 //Defined the handlers
const handlers = {};

handlers.users = function(data , callback){
    const acceptableMethods = ['post','get','put','delete'];

    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data,callback)
    }else{
        callback(405)
    }
}

//Container for the user submethods

handlers._users = {};

//Users - post
//Required data : firstName , lastName , phone , password , tosAgreement
handlers._users.post = function(data , callback){
    //Check that all require filed are filled out
    const firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    const tosAgrement = typeof(data.payload.tosAgrement) === 'boolean' && data.payload.tosAgrement.trim().length == true ? data.payload.tosAgrement.trim() : false;

    if(firstName && lastName && phone && password && tosAgrement){
        // Make sure that the user doesnt alread exist
        _data.read('users',phone,function(err , data){
            if(err){
                // Hash the password
                const hashedPassword = helpers.hash(passowrd)
                if(hashedPassword){
                    // Create user object

                    const userObject = {
                        firstName,
                        lastName,
                        phone,
                        hashedPassword,
                        tosAgreement: true
                    }

                    // Store user
                    _data.write('users',phone,userObject,function(err){
                        if(!err){
                            callback(200)
                        }else{
                            console.log(err);
                            callback(500,{'Error' : 'Could not create the new user'})
                        }
                    })
                }else{
                    callback(500, {'Error':'Could not hash the user\'s password'})
                }
                
            }else{
                // User already exist
                callback(400 , {'Error': 'A user with that phone number already exists'})
            }
        })


    }else{
        callback(400,{'Error': 'Missing required fields'})
    }

};

//Users - get
handlers._users.get = function(data , callback){

};

//Users - put
handlers._users.put = function(data , callback){

};
//Users - delete
handlers._users.delete = function(data , callback){

};

handlers.home = function(data, callback){
    callback(200 , {name: 'phuc'})
} 

handlers.notFound = function(data, callback){
    callback(200 , "kakak")
} 




module.exports = handlers