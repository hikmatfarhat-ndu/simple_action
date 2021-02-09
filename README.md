# simple_action
[Reference](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)

1. create a repo on github
1. clone it on your computer
1. in the cloned repo do:
1. npm init -y
1. create file action.yml
```yml
name: 'Hello World'
description: 'Greet someone and record the time'
inputs:
  who-to-greet:  # id of input
    description: 'Who to greet'
    required: true
    default: 'World'
outputs:
  time: # id of output
    description: 'The time we greeted you'
runs:
  using: 'node12'
  main: 'index.js'

```
1. npm install @actions/core (this creates a subdir node_modules)
1. npm install @actions/github
1. install @vercel/ncc: npm i -g @vercel/ncc
1. write the code in index.js
```js
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
```
1. compile index.js: ncc build index.js (creates dist/index.js)
1. change the main value in action.yml from index.js to dist/index.js
1. commit

# Writing the workflow
Let REPO=name of your repo containing the action we created in the previous section.

In another repo create .github/workflows/main.yml
```yml
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
    - name: Hello world action step
      id: hello
      uses: (GITHUB personal or organization accoutn)/REPO@main
      with:
        who-to-greet: 'Mona the Octocat'
    # Use the output from the `hello` step
    - name: Get the output time
      run: echo "The time was ${{ steps.hello.outputs.time }}"
```
1. __IMPORTANT__: it seems the engine for github action automatically use the __master__ branch whereas newly created repos the default is the __main__ branch.

