#!/usr/bin/env node

// Importing necessary modules
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import axios from 'axios';
import process from 'process';
import { exec } from 'child_process';

const program = new Command();

program
    .name('aws-magic')
    .description('CLI tool for translating text into AWS CLI commands using OpenAI');

// Configure command
program
    .command('configure')
    .description('Configure OpenAI API Key')
    .action(configure);

async function configure() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'password',
                name: 'openaiKey',
                message: 'Enter your OpenAI API Key:'
            }
        ]);

        await fs.writeFile('config.json', JSON.stringify({ openaiKey: answers.openaiKey }));
        console.log('OpenAI API Key configured successfully.');
    } catch (error) {
        console.error('Error configuring API Key:', error);
    }
}

// Main functionality
program
    .argument('<text>', 'Text to translate into AWS CLI command')
    .action(translateText);

async function translateText(text: string) {
    try {
        const configData = await fs.readFile('config.json', 'utf-8');
        const { openaiKey } = JSON.parse(configData);

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions', // Chat completions endpoint
            {
                model: "gpt-4", // Specifying the model
                messages: [
                    {
                        role: "user",
                        content: `Translate the following to an AWS CLI command. Return only the AWS CLI command in the response, nothing else : ${text}`
                    }
                ],
                temperature: 0.7  // Adjust as needed
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const awsCliCommand = response.data.choices[0].message.content.trim();

        // Prompt the user to accept the suggested command
        const userResponse = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'executeCommand',
                message: `Do you want to use the following AWS CLI command? \n${awsCliCommand}`,
                default: false
            }
        ]);

        if (userResponse.executeCommand) {
            // Execute the command if user accepts
            exec(awsCliCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Stderr: ${stderr}`);
                    return;
                }
                console.log(`Output: ${stdout}`);
            });
        }
    } catch (error) {
        console.error('Error in translating text:', error);
    }
}


program.parse(process.argv);
