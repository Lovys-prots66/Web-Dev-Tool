const fs = require("fs/promises");
const readLine = require("readline/promises");
const path = require('path');
const os = require('os');

const {fileNames, folderName} = require("./default/defaultSettings.cjs");



async function getInput(question){
    
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const input = await rl.question(question);
    rl.close()

    return input.trim() ? input : "default"
    
}


async function makeFiles(){

    try{
        const defaultHTML = await fs.readFile("./default/fileContents/default.html");
        const defaultCSS = await fs.readFile("./default/fileContents/default.css");
        const defaultJS = await fs.readFile("./default/fileContents/default.js");
        
        const defaultDir = path.join(os.homedir(), 'Desktop', folderName);

        const directoryInput = await getInput("Where do you want to create the project? (default: Desktop): ");
        const contentInput = await getInput("Populate with default content?: ");

        const htmlContent = (contentInput == "default") ? defaultHTML : '';
        const cssContent = (contentInput == "default") ? defaultCSS : '';
        const jsContent = (contentInput == "default") ? defaultJS : '';

        await Promise.all([
            await fs.mkdir(path.join(os.homedir(), 'Desktop', folderName), {recursive : true}),
            await fs.writeFile((path.join(os.homedir(), 'Desktop', folderName, fileNames.HTML)), htmlContent),
            await fs.writeFile((path.join(os.homedir(), 'Desktop', folderName, fileNames.CSS)), cssContent),
            await fs.writeFile((path.join(os.homedir(), 'Desktop', folderName, fileNames.JAVASCRIPT)), jsContent)
        ]);    
        

    }catch(err){
        console.error(err.message);
    }




}


makeFiles();