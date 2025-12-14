const fs = require("fs/promises");
const readLine = require("readline/promises");
const path = require('path');
const {fileNames, folderName} = require("./default/defaultSettings.cjs");
const os = require('os');

console.log(fileNames);
console.log(folderName);
// const path = require('path')

// console.log(path.join(userInfo().homedir, 'Desktop'));

// console.log(os.uptime() % (60 * 60));

// console.log(path.join(__dirname, "gg.txt"));

// console.log(path.resolve('.cjs'));

// console.log(path.resolve("Desktop"));

function askInput(question){
    return new Promise((resolve, reject) => {
        const rl = readLine.createInterface({
            input : process.stdin,
            output : process.stderr
        });

        rl.question(question, (value) => {
            if(!value.trim()){
                resolve("default");
            }

            resolve(value);
        });
    })
}

async function makeFiles(){

    try{
        const defaultHTML = await fs.readFile("./default/fileContents/default.html");
        const defaultCSS = await fs.readFile("./default/fileContents/default.css");
        const defaultJS = await fs.readFile("./default/fileContents/default.js");
        
        await Promise.all([
            await fs.mkdir(path.join(os.homedir(), 'Desktop', folderName), {recursive : true}),
            await fs.writeFile((path.join(os.homedir(), 'Desktop', folderName, fileNames.HTML)), defaultHTML),
            await fs.writeFile((path.join(os.homedir(), 'Desktop', folderName, fileNames.CSS)), defaultCSS),
            await fs.writeFile((path.join(os.homedir(), 'Desktop', folderName, fileNames.JAVASCRIPT)), defaultJS)
        ]);    
        

    }catch(err){
        console.error(err.message);
    }




}


makeFiles();