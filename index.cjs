const { userInfo } = require('os');
const fs = require("fs/promises");
const readLine = require("readline/promises");

const path = require('path')

console.log(path.join(userInfo().homedir, 'Desktop'));

// console.log(os.uptime() % (60 * 60));

console.log(path.join(__dirname, "gg.txt"));

console.log(path.resolve('.cjs'));

console.log(path.resolve("Desktop"));