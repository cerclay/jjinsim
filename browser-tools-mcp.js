#!/usr/bin/env node

const { exec } = require('child_process');

const command = 'npm exec -- @agentdeskai/browser-tools-mcp@1.2.0';

const process = exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

process.stdout.on('data', (data) => {
  console.log(data);
});

process.stderr.on('data', (data) => {
  console.error(data);
});

process.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
}); 