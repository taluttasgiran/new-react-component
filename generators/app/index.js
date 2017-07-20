var Generator  = require('yeoman-generator');
module.exports = class extends Generator {
  install() {
    this.spawnCommand('npm', ['install']);
  }

  prompting() {

    var files = [
      '.babelrc',
      '.npmignore',
      'src/index.js',
      'README.md'
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
          name   : 'keywords',
          message: 'Keywords? (Separate with comma) : ',
          default: []
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
        for (var value of files)
        {
          this.fs.copy(
            this.templatePath(value),
            this.destinationPath(value)
          );
        }

        if(keywordsArray.length){
          var keywordsArray = answers.keywords.split(',');
        }else{

        }
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