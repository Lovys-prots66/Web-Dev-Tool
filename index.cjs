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

    return input.trim() ? input.toString() : "default"
    
}


async function makeFiles(){

    try{
        const defaultHTML = await fs.readFile("./default/fileContents/default.html");
        const defaultCSS = await fs.readFile("./default/fileContents/default.css");
        const defaultJS = await fs.readFile("./default/fileContents/default.js");
        

        let nameInput = await getInput("Project name? (default : \"Project\"):\n--> ");

        let directoryInput = await getInput("Where do you want to create the project? (default : Desktop):\n--> ");
                        
        let contentInput;

        do{
            contentInput = await getInput("Populate with default content?(\"n\" to keep empty):\n--> ");
            if(contentInput !== "n" && contentInput !== "default"){
                console.log("Invalid Input");
            }
        }while(contentInput !== "n" && contentInput !== "default")

        // const projectDirectory = (directoryInput == "default") ? defaultDir : path.join(directoryInput, folderName);

        const projectName = (nameInput === "default") ? folderName : nameInput;

        const defaultDir = path.join(os.homedir(), 'Desktop', projectName);


        const htmlContent = (contentInput == "default") ? defaultHTML : '';
        const cssContent = (contentInput == "default") ? defaultCSS : '';
        const jsContent = (contentInput == "default") ? defaultJS : '';

        await Promise.all([
            await fs.mkdir(defaultDir, {recursive : true}),
            await fs.writeFile((path.join(defaultDir, fileNames.HTML)), htmlContent),
            await fs.writeFile((path.join(defaultDir, fileNames.CSS)), cssContent),
            await fs.writeFile((path.join(defaultDir, fileNames.JAVASCRIPT)), jsContent)
        ]);    
        

    }catch(err){
        console.error(err.message);
    }




}


makeFiles();