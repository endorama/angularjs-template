# Angular binding for i18next

AngularJS directive for using i18next (based upon https://gist.github.com/archer96/5239617)

## Installation:
 
- include `i18next-1.x.x.js`
- include your language files
- add 'i18n' to your dependencies of your module  
  `angular.module('MyApp', ['i18next']);`
- anywhere in your code change $rootScope.i18nextOptions to your options.  
    Best practise: in
    
    ```
    angular.module('MyApp', ['i18next']).run(function ($rootScope) {
      $rootScope.i18nextOptions = {
        lng: 'de-DE',
        ...
      };
    });
    ```

    (Because it will run before the directive is initialized)
- use the `ng-i18next` attribute on any element you want  
  `<p ng-i18next="myStringToTranslate"></p>`
- You can also listen for the `i18nextInit` event. Then you can translate
  via
  
  ```
  i18n.t('Your String here');  
  $scope.$on('i18nextInit', function () {  
    console.log(i18n.t('hello'));  
  });  
  ```

## Usage

Quite every i18next feature is available in AngularJS!

Given a JSON file with this content:

```
{
  "app": {
    "name": "i18next",

    "insert": "you are __youAre__",

    "child": "__count__ child",
    "child_plural": "__count__ children".

    "area": "Area 51",
    "district": "District 9 is more fun than $t(app.area)",

    "friend_context": "A friend",
    "friend_context_male": "A boyfriend",
    "friend_context_female": "A girlfriend",

    "search": "Search...",

    "content": [
      "<p>row one</p>",
      "<p>row two</p>",
      "<p>row three</p>"
    ],

    "btnTranslated": "translated title",
    "hoverMe": "hover me!"
  }
}
```

### Basic translation

*Without or default namespace*

HTML ( angular template ):

```
< p ng-i18next="app.name"></p>
```

HTML ( rendered ):

```
< p>i18next</p>
```

*With namespace*

HTML ( angular template ):

```
< p ng-i18next="ns.common:app.name"></p>
```

HTML ( rendered ):

```
< p>i18next</p>
```

### Interpolation

HTML ( angular template ):

```
< p ng-i18next="app.insert{youAre: great}"></p>
```

HTML ( rendered ):

```
< p>you are great</p>
```

### Plurals

HTML ( angular template ):

```
< p ng-i18next="app.child{count: 1}"></p>
< p ng-i18next="app.child{count: 3}"></p>
```

HTML ( rendered ):

```
< p>1 child</p>
< p>3 children</p>
```

### Nesting

HTML ( angular template ):

```
< p ng-i18next="app.district"></p>
```

HTML ( rendered ):

```
< p>District 9 is more fun than Area 51</p>
```

### Context

HTML ( angular template ):

```
< p ng-i18next="app.friend_context"></p>
< p ng-i18next="app.friend_context{context: }"></p>
< p ng-i18next="app.friend_context{context: male}"></p>
< p ng-i18next="app.friend_context{context: female}"></p>
```

HTML ( rendered ):

```
< p>A friend</p>
< p>A friend</p>
< p>A boyfriend</p>
< p>A girlfriend</p>
```

### Setting other attributes of elements

HTML ( angular template ):

```
<input class="search-query ng-pristine ng-valid" ng-i18next="[placeholder]app.search" ng-model="query" type="text">
```

HTML ( rendered ):

```
<input class="search-query ng-pristine ng-valid" ng-i18next="[placeholder]app.search" ng-model="query" type="text" placeholder="Search...">
```

### Setting multiple attributes

HTML ( angular template ):

```
<button data-i18n="[title]app.btnTranslated;app.hoverMe;"></button>
```

HTML ( rendered ):

```
<button data-i18n="[title]app.btnTranslated;btn.hoverMe;" class="btn btn-success" title="translated title">hover me!</button>
```


### Setting inner html

HTML ( angular template ):

```
<div id="innerHtml" data-i18n="[html]app.content"></div>
```

HTML ( rendered ):

```
<div id="innerHtml" data-i18n="[html]app.content">
  <p>row one</p>
  <p>row two</p>
  <p>row three</p>
</div>
```
