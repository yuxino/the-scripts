#!/usr/bin/env node
const { name, version } = require("./package.json");
const program = require("commander");

program.version(`${name}/${version}`).parse(process.argv);

console.log("wow !! waht a new cli app !");
