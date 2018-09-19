const fs = require('fs');
const path = require('path');

const lib = {};
lib.baseDir = path.join(__dirname,'../.data/');


// Write data to file

lib.write = function(dir , file , data , callback){

    //open file for writting data
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err , fileDescriptor){
        if(!err && fileDescriptor){
            fs.writeFile(fileDescriptor , JSON.stringify(data) , function(err){
                if(!err){
                    fs.close(fileDescriptor , function(err){
                        if(!err){
                            callback(false);
                        }else{
                            callback("Error when closing file")
                        }
                    })
                }else{
                    callback("Error when writing to file")
                }
            })
        }else{
            callback("Error when opening file , maybe it existing")
        }
    })
}

lib.read = function(dir , file ,callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf-8',function(err,data){
        if(!err){
            callback(data)
        }else{
            callback("Error when reading file")
        }
    })
}

lib.update = function(dir , file , data, callback){
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err , fileDescriptor){
        if(!err && fileDescriptor){
            fs.truncate(fileDescriptor,function(err){
                if(!err){
                    fs.writeFile(fileDescriptor,JSON.stringify(data),function(err){
                        if(!err){
                            fs.close(fileDescriptor , function(err){
                                if(!err){
                                    callback(false)
                                }else{
                                    callback("Error when closing file")
                                }
                            })
                        }else{
                            callback("Error when writing new content")
                        }
                    })
                }else{
                    callback("Error when truncate file")
                }
            })
        }else{
            callback("Error when opening file")
        }
    })
}

module.exports = lib;