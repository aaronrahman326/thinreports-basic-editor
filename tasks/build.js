const packager = require('electron-packager')
const path = require('path')
const rootdir = path.join(__dirname, '..')

const config = {
  arch: 'x64',
  asar: true,
  dir: path.join(rootdir, 'app'),
  // icon: path.join(__dirname, '../app/assets/images'),
  ignore: 'editor/',
  out: path.join(rootdir, 'builds'),
  overwrite: true,
  platform: ['darwin', 'linux', 'win32']
}

clean()
build()

function clean () {
  require('del').sync(['builds/*'])
  console.log('\x1b[33m`builds` directory cleaned.\n\x1b[0m')
}

function build () {
  console.log('\x1b[34mBuilding electron app(s)...\n\x1b[0m')

  packager(config, (err, appPaths) => {
    if (err) {
      console.error('\x1b[31mError from `electron-packager` when building app...\x1b[0m')
      console.error(err)
    } else {
      console.log('Build(s) successful!')
      console.log(appPaths)
    }
  })
}
