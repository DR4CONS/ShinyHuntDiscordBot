const fs = require('node:fs');

// takes a .json file and reads it into an object
function readJSON(fileName = "db.json") {
    try {
        const data = fs.readFileSync("./" + fileName, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading config');
        return null;
    }
}

function writeJSON(data, fileName = "db.json") {
    // Write the updated JSON back to the file
    try {
        fs.writeFileSync("./" + fileName, JSON.stringify(data));
    } catch {
        console.log("ERROR SAVING")
    }
    
    return;
}

module.exports = { readJSON, writeJSON }