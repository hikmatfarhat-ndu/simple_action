import * as core from '@actions/core'
import * as github from '@actions/github'


  export const run=function (token: string) {
    const t = process.env['GITHUB_TOKEN'] || core.getInput('token')
      if (!t|| token === '') {
          console.log(`token UNDEFINED ${t}`)
      }
      else {
          console.log(`token DEFINED`)
      }
         const octokit: github.GitHub = new github.GitHub(token)
          if (!octokit) {
            console.log('CANNOT octokit')
          }
          else {
            console.log('octokit successful')
            const nwo = process.env['GITHUB_REPOSITORY'] || '/'
            const [owner, repo] = nwo.split('/')
            console.log(`owner=${owner}, repo=${repo}`)
            octokit.repos.listForOrg({org: `$owner`,type: "private",}).then(({ data }) => {
              console.log(`${data}`)
            });
          }
}
