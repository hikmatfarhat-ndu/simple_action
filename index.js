const core = require('@actions/core');
const github = require('@actions/github');
import {run} from './helper'
try {
  // `who-to-greet` input defined in action metadata file
  console.log("On branch master")
  console.log("VERSION 1.0.1")
  const token=core.getInput('github-token')
  run('helper')
  console.log(`token=${token}`)
  
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}