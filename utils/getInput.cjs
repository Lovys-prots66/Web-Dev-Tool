const readLine = require("readline/promises");

// function for requesting and getting user input
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

module.exports = getInput;