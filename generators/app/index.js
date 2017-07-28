var Generator  = require('yeoman-generator');
module.exports = class extends Generator {

  install() {
    var ascii = (
      `
+-------------------------------------------------------------------------------^
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
|XX+-------------------------------------------------------------------------+XX|
|XX                                                                           XX|
|XX               Now you can create your own component package               XX|
|XX                                                                           XX|
|XX              Note: Don't forget to run "npm install" command              XX|
|XX                                                                           XX|
|XX                                                                           XX|
|XX+-------------------------------------------------------------------------+XX|
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
+------------------------------------------------------------------------------^+
^-------------------------------------------------------------------------------+
    `
    );
    this.log(ascii)
  }

  prompting() {

    var files = [
      '.babelrc',
      '.npmignore',
      '.gitignore',
      'src/index.js',
      'README.md',
      'template/index.html',
      'template/index.js',
      'webpack.config.js'
    ];

    return this.prompt([
      {
        type   : 'input',
        name   : 'packName',
        message: 'What is your component package name? : ',
        default: this.appname
      },
      {
        type   : 'input',
        name   : 'packVersion',
        message: 'What is your component package version? : ',
        default: "1.0.0"
      },
      {
        type   : 'input',
        name   : 'description',
        message: 'Description? : ',
        default: 'None'
      },
      {
        type   : 'input',
        name   : 'getKeywords',
        message: 'Keywords? (Separate with comma) : ',
        default: "react,component"
      },
      {
        type   : 'input',
        name   : 'gitRepo',
        message: 'What is your Git repository? : ',
        default: 'None'
      },
      {
        type   : 'input',
        name   : 'author',
        message: 'Author? : ',
        default: 'None'
      },
      {
        type   : 'input',
        name   : 'license',
        message: 'Which license do you use? : ',
        default: 'MIT'
      }
    ]).then((answers) => {
      for (var value of files) {
        this.fs.copy(
          this.templatePath(value),
          this.destinationPath(value)
        );
      }
      var keywordsArray = answers.getKeywords.split(',');
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          packName   : answers.packName,
          packVersion: answers.packVersion,
          description: answers.description,
          keywords   : keywordsArray,
          gitRepo    : answers.gitRepo,
          author     : answers.author,
          license    : answers.license
        }
      );

    })
  }


};