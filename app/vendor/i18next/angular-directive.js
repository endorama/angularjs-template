/*
 * view README
 */
angular.module('i18next', []).directive('ngI18next', function ($rootScope) {

  'use strict';

  var
    /**
     * This will be our translation function (see code below)
     */
    t = null,
    /**
     * Default options for i18next
     * @type {Object}
     */
    options = {},
    callbacks = [],
    translated = [];

  /**
   * Translate the string given by the ng-i18next attribute and put it into the element.
   * @param {DOMElement} element     Element with the ng-i18next attribute
   * @param {String} keys            The key we want to translate
   * @param {Boolean} retranslate    Whether it is the first time we translate the element or not
   */
  function setText (element, original_key, retranslate) {

    if (!retranslate) {
      translated[translated.length] = function () {
        setText(element, original_key, true);
      };
    }

    if (t !== null) {

      var attribute = 'text';
      var interpolation = {};
      var key = original_key;

      // Support multiple keys inside ng-i18next
      // if (key.indexOf(';') === key.length-1) {  // ??? Seems not needed
      //     key = key.substr(0, key.length-2);
      // }
      // check for ;
      if (key.indexOf(';') >= 0) {
        // split string
        var strings = key.split(';');
        // translate every piece
        for (var i = strings.length - 1; i >= 0; i--) {
          setText(element, strings[i], retranslate);
        }
        // return
        return;
      }

      // Support for [attribute] translation 
      if (key.indexOf("[") >= 0) {
        // split on ]
        var parts = key.split(']');
        // get text inside square brackets
        attribute = parts[0].substr(1, parts[0].length-1);
        // remove square brackets and content
        key = parts[1];
      }

      // Support interpolation for values in string
      if (key.indexOf("{") >= 0) {
        // split on }
        var parts = key.split('{');

        // get key without other stuff
        key = parts[0];

        // get text inside curly brackets
        parts = parts[1].substr(0, parts[1].length-1).split(':');

        // get value
        var value = parts[1].trim();

        // if parameter is count we are looking for pluralization
        if (parts[0] === 'count')
          interpolation[parts[0]] = parseInt(value);
        else
          interpolation[parts[0]] = value;
      }

      // console.log(element);
      // console.log(key);
      // console.log(attribute);
      // console.log(interpolation);
      // console.log(t(key, interpolation));

      // see 'Replace other attributes or innerHtml' - http://i18next.com/pages/sample.html
      if (attribute === 'html') {
        element.html(t(key, interpolation));
      }
      // default, update element text
      else if (attribute === 'text') {
        element.text(t(key, interpolation));
      }
      // if an attribute has been specified, translate it
      else {
        // translate and assign to attribute ( check for special )
        element.attr(attribute, t(key, interpolation));
      }

    } else {
      /*
       * We have to wait for i18next to initialize, so we
       * add the string (and element) we want to translate
       * to the callback array. It will get executed when
       * i18next is ready.
       */
      callbacks[callbacks.length] = function () {
        setText(element, key);
      };
    }

  }
  /**
   * Initializes i18next
   * @param {Boolean} reinitialization Have the options (in $rootScope) changed, so
   *                                   we have to translate every string again?
   */
  function init (reinitialization) {

    window.i18n.init(options, function (tFunction) {

      $rootScope.$broadcast('i18nextInit');
      $rootScope.i18nextLoaded = true;

      var i;

      t = tFunction;

      if (!reinitialization) {

        for (i = 0; i < callbacks.length; i++) {
          callbacks[i]();
        }

        callbacks = [];

      } else {

        for (i = 0; i < translated.length; i++) {
          translated[i]();
        }

      }

    });

  }

  $rootScope.$watch('i18nextOptions', function () {

    options = $rootScope.i18nextOptions || options;

    // Note: !! -> make i18nextOptions a boolean (true if it is defined)
    init(!!$rootScope.i18nextOptions);

  });

  return {

    // 'A': only as attribute
    restrict: 'A',

    link: function postLink (scope, element, attrs) {

      attrs.$observe('ngI18next', function (value) {

        if (!value) {
          // Well, seems that we don't have anything to translate...
          return;
        }

        setText(element, value);

      });

    }

  };

});
