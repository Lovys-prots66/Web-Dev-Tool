#!/usr/bin/env node

const fs = require("fs/promises");
const path = require('path');
const os = require('os');

const getInput = require("./utils/getInput.cjs");
const dirExists = require("./utils/dirExists.cjs");

const {fileNames, folderName} = require("./default/defaultSettings.cjs");

async function makeFiles(){

    try{
        
        // request project dir        
        let directoryInput = await getInput("Where do you want to create the project? (default : Desktop):\n--> ");

        // project's name
        let nameInput;
        let projectName;
        let projectPath;

        // loop until the user provides a non-existing project name
        do{
           // request project name and then create path
            nameInput = await getInput("Project name? (default : \"Project\"):\n--> ");
            
            const baseDir = (directoryInput == "default") ? path.join(os.homedir(), 'Desktop') : directoryInput;

            projectName = (nameInput == "default") ? folderName : nameInput;

            projectPath = path.join(baseDir, projectName);

            // verify if a project with that name already exists
            if(await dirExists(projectPath)){
                console.log(`Project ${projectPath} already exists.`);
            }
            
        }while(await dirExists(projectPath))
            
        // request content prefence and loop until valid input is provided
        let contentInput;

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

        // set content based on user input
        const htmlContent = (contentInput == "default") ? defaultHTML : '';
        const cssContent = (contentInput == "default") ? defaultCSS : '';
        const jsContent = (contentInput == "default") ? defaultJS : '';

        // create project directory and files
        await Promise.all([
            await fs.mkdir(projectPath, {recursive : true}),
            await fs.writeFile((path.join(projectPath, fileNames.HTML)), htmlContent),
            await fs.writeFile((path.join(projectPath, fileNames.CSS)), cssContent),
            await fs.writeFile((path.join(projectPath, fileNames.JAVASCRIPT)), jsContent)
        ]);    
        
        console.log(`\nProject created at ${projectPath}`);

    }catch(err){
        console.error(err.message);
    }

}


makeFiles();