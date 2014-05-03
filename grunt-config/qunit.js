module.exports = {
  options: {
    '--web-security': 'no',
    coverage: {
      src: ['shout.js'],
      instrumentedFiles: 'temp/',
      htmlReport: 'report/coverage',
      coberturaReport: 'report/',
      linesThresholdPct: 85
    }
  },
  all: ['test/**/*.html']
}
