'use strict';

# /* App Module */
DEBUG_MODE = false

if !DEBUG_MODE
  console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = () ->

@myApp = angular.module 'myApp', ['i18next']


@myApp.run(($rootScope) ->
  $rootScope.i18nextOptions = 
    lng: 'en-GB'
);
