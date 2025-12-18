const fs = require("fs/promises");
const readLine = require("readline/promises");
const path = require('path');
const os = require('os');

const {fileNames, folderName} = require("./default/defaultSettings.cjs");

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

// functions for requesting and getting user input
async function getInput(question){
    
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const input = await rl.question(question);
    rl.close()

    // resort to default value if no input
    return input.trim() ? input.toString() : "default"
    
}


async function makeFiles(){

    try{
        
        
        // request project dir        
        let directoryInput = await getInput("Where do you want to create the project? (default : Desktop):\n--> ");

        // project's name
        let nameInput;
        let projectName;
        let projectPath;

        do{
            
            nameInput = await getInput("Project name? (default : \"Project\"):\n--> ");
            
            const baseDir = (directoryInput == "default") ? path.join(os.homedir(), 'Desktop') : directoryInput;

            projectName = (nameInput == "default") ? "Project" : nameInput;

            projectPath = path.join(baseDir, projectName);

            if(await dirExists(projectPath)){
                console.log(`Project ${projectPath} already exists.`);
            }
            
        }while(await dirExists(projectPath))
            
        
        do{
            contentInput = await getInput("Populate with default content? (\"n\" to keep empty):\n--> ");
            if(contentInput !== "n" && contentInput !== "default"){
                console.log("Invalid Input");
            }

        }while(contentInput !== "n" && contentInput !== "default")
               
        // get default content
        const defaultHTML = await fs.readFile("./default/fileContents/default.html");
        const defaultCSS = await fs.readFile("./default/fileContents/default.css");
        const defaultJS = await fs.readFile("./default/fileContents/default.js");

        const htmlContent = (contentInput == "default") ? defaultHTML : '';
        const cssContent = (contentInput == "default") ? defaultCSS : '';
        const jsContent = (contentInput == "default") ? defaultJS : '';

        await Promise.all([
            await fs.mkdir(projectPath, {recursive : true}),
            await fs.writeFile((path.join(projectPath, fileNames.HTML)), htmlContent),
            await fs.writeFile((path.join(projectPath, fileNames.CSS)), cssContent),
            await fs.writeFile((path.join(projectPath, fileNames.JAVASCRIPT)), jsContent)
        ]);    
        

    }catch(err){
        console.error(err.message);
    }




}


makeFiles();