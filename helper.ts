import * as core from '@actions/core'
//import * as github from '@actions/github'

  export const run=function (input: string) {
      const token = process.env['GITHUB_TOKEN'] || core.getInput('token')
      if (!token || token === '') {
          console.log(`token UNDEFINED ${input}`)
      }
      else {
          console.log(`token DEFINED`)
      }

      // Create the octokit client
    //   const octokit: github.GitHub = new github.GitHub(token)
    //   if (!octokit) {
    //       console.log('CANNOT octokit')
    //   }
    //   else {
    //       console.log('octokit successful')
    //   }
  }