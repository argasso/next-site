import * as YAML from 'yaml'
import * as fs from 'fs'
import * as path from 'path'
import config from './config'

const configDisclaimer =
  '# This file is generated\n# Only edit the config.ts file\n\n'
const configString = `${configDisclaimer}${YAML.stringify(config)}`

fs.writeFile(
  path.resolve(__dirname, '..', 'types', 'config.yml'),
  configString,
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('✔ Generated the config.yml')
    }
  }
)
