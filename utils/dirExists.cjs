const fs = require("fs/promises");

// function for checking the existence of a directory
async function dirExists(dir){

    try{
        const stat = await fs.stat(dir);

        if(stat.isDirectory()){
            console.log("Project already exists");
            return true;
        }
    }catch(err){
        return false;
    }
}

module.exports = dirExists;