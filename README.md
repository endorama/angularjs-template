# AngularJS template

A template for AngularJS applications using SLIM, SASS and CoffeeScript compiled
using Guard.

Everything is already setup, you can start to use it right now!

All assets are compiled using RubyGems, so you need to have a proper Ruby
environment.

## Installation

1. Clone the repository or unzip the file in the appropriate folder
2. From a shell, enter the newly created folder
3. Install needed gems **but please note**:
  - check the Gemfile and check gems for your system ( MacOS and Linux 
  supported ); uncomment appropriate gems ( default Linux gems )
  - if you use some ruby version manager ( RVM or RBenv ) plase create your
  gemset before bundle
  Install gems with `bundle install`.  
  There is a script for creating **RVM** gemset easily; run
  `scripts/create_rvm_gemset`
4. From the root folder, issue the command to start guard: `guard`
5. Done :)

## Usage

All your work should be done in the `src/`. After starting *guard* from the root
folder, start editing files.

All SASS, Coffee, SLIM and YAML files are automatically compiled in the relevant
folders inside the `app/` folder. Use the final path for file inclusion, so for
example to include `src/js/app.coffee`, include in the SLIM file `js/app.js`.
The root folder for the AngularJS app is the `app/` folder, not the root folder.

There is a built in support for internationalization using the great
[I18next](http://i18next.com/) javascript library ( have a look at 
`app/vendor/i18next/readme.md` for usage help ).

There is built in support for [LiveReload](http://livereload.com/), a browser 
extension to automatically reload CSS, JS , JSON and HTML file in the browser 
windows, without the need to refresh manually.

There is a `clean_app` script to automatically remove every compiled file in the
`app/` folder, run it from the root folder with `scripts/clean_app`

## Folder structure

```
project/                    project root folder
├── app                     AngularJS final application folder
│   ├── css                 application compiled CSS files
│   ├── img                 application images
│   ├── js                  application compiled JS files
│   ├── locales             application compiled localization JSON files
│   ├── vendor              application external JS dependencies
│   │   └── i18next         i18next inclusion for I10n support
│   └── views               application compiled HTML files
├── scripts                 custom scripts for app management
└── src                     application development files
    ├── css                 application SASS files
    ├── js                  application CoffeeScript files
    │   ├── controllers     AngularJS application controllers
    │   ├── directives      AngularJS application directives
    │   ├── filters         AngularJS application filters
    │   ├── models          AngularJS application models
    │   └── services        AngularJS application services
    ├── locales             application YML files
    └── views               application SLIM files
```

## Docs

Refer to projects documentation:
- [AngularJS](http://angularjs.org/)
- [I18next](http://i18next.com/)
- [Guard](https://github.com/guard/guard)
- [LiveReload](http://livereload.com/)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
