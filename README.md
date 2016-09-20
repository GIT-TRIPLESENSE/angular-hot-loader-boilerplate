
# Angular 1.x Hot Reloader boilerplate

Webpack boilerplate for Angular 1.x app development

## Features

* ES6 Class declaration
* HMR for Template, Component controller and Services
* CSS Modules with LiveReload
* Modules loaded dinamically from folder
* Loaders: SASS, HTML, Babel, Base64 Icon Font
* HTML Templating JS interpolation
* Entry point name based on package.json data
* Commitizen with CZ Conventional changelog for properly commit format

## Installation 

```
npm install
```

## Usage

### Development

Run `webpack` and `webpack-dev-server` on `dist` folder, and serve entry point from it

```
npm start
```

### Production
Create bundle in `dist` folder

```
npm run build
```

Folder structure

```
index.html
[package.json.name].min.js
[package.json.name].min.css
```

### Commit

Run `commitizen` and `cz-conventional-changelog` for property commit format
```
npm run commit
```

## Naming convention

### Services

Services class name must follow this convention:
```
// tag.js -> Tag
export default class Tag {
```
```
// service-example.js -> ServiceExample
export default class ServiceExample {
```

### Component

Component folder assets get filename from parent folder:

```
component
    component.css
    component.html
    component.js
```

Controller Class must be exported es default, and follow this convention, 

```
// component.js -> ComponentController
export default class DemoController {
```
```
// ui-accordion.js -> UiAccordionController
export default class UiAccordionController {
```

## Contributing

[https://medium.com/@Honestica/hot-reloading-angular-1-x-controllers-services-and-templates-f775507ff389#.lhx480nag](https://medium.com/@Honestica/hot-reloading-angular-1-x-controllers-services-and-templates-f775507ff389#.lhx480nag)
[https://github.com/seeden/angular-es6](https://github.com/seeden/angular-es6)ù