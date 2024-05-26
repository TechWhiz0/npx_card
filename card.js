#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
clear();

const prompt = inquirer.createPromptModule();

const actions = {
    sendEmail: () => {
        open("mailto:anshunishad.dev@gmail.com");
        console.log("\nDone, see you soon at inbox.\n");
    },
    downloadResume: () => {
        const loader = ora({
            text: 'Downloading Resume',
            spinner: cliSpinners.material,
        }).start();
        let pipe = request('https://drive.google.com/uc?export=download&id=1Z3azwX5CQZOgiM5P4PpymulGWL176eQb').pipe(fs.createWriteStream('./anshu-resume.pdf'));
        pipe.on("finish", function () {
            let downloadPath = path.join(process.cwd(), 'anshu-resume.pdf')
            console.log(`\nResume Downloaded at ${downloadPath} \n`);
            open(downloadPath)
            loader.stop();
        });
    },
    scheduleMeeting: () => {
        open('https://calendly.com/forcourse2021aaa/30min');
        console.log("\nSee you at the meeting\n");
    },
    quit: () => {
        console.log("See you again👋\n");
    }
};

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}`,
                value: "sendEmail"
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}`,
                value: "downloadResume"
            },
            {
                name: `Schedule a ${chalk.redBright.bold("Meeting")}`,
                value: "scheduleMeeting"
            },
            {
                name: "Just quit.",
                value: "quit"
            }
        ]
    }
];

const data = {
    name: chalk.bold.green("             Anshu Nishad"),
    handle: chalk.white("@anshunishad"),
    work: `${chalk.white("Full Stack Intern at")} ${chalk
        .hex("#2b82b2")
        .bold("Vistaran Techtronix")}`, 
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("AnshuNi30370666"),
    github: chalk.gray("https://github.com/") + chalk.green("educationalgamer"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("anshu-nishad"),
    web: chalk.cyan("https://anshu-dev-ashy.vercel.app"),
    npx: chalk.red("npx") + " " + chalk.white("anshunishad"),

    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "I am currently looking for new opportunities,"
        )}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic(
            "question or just want to say hi, I will try "
        )}`,
        `${chalk.italic(
            "my best to get back to you!"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => {
    const action = actions[answer.action];
    if (action) {
        action();
    }
});
