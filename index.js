#!/usr/bin/env node
const { name, version } = require("./package.json");
const program = require("commander");
const lemuro = require("lemuro");
const { Select } = require("enquirer");
const { spawn } = require("child_process");

program.version(`${name}/${version}`).parse(process.argv);

async function main() {
  const pwd = process.env.PWD;
  const json = `${pwd}/package.json`;

  if (lemuro.isExists(json)) {
    const buffer = await lemuro.readFile(json);
    let choice;
    try {
      const data = JSON.parse(buffer);
      if (data.scripts === undefined) {
        console.log("😖 no script was found in the package.json");
      } else {
        const keys = Object.keys(data.scripts);
        const prompt = new Select({
          name: "script",
          message: "Chose one script to execute",
          choices: keys,
        });

        choice = await prompt.run();

        spawn("yarn", [choice], { stdio: "inherit" });
      }
    } catch (e) {
      if (choice === undefined) {
        console.log("🐦 okkk. bye");
      } else {
        console.log("😖 something went wrong when parsing package.json");
      }
    }
  } else {
    console.log("😖 package.json not found");
  }
}

main();
