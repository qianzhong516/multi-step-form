## Multi-step Form

<p>
  <img alt="Webpack" src="https://img.shields.io/badge/Webpack-8DD6F9?logo=webpack&logoColor=white&style=for-the-badge" />
  <img alt="Storybook" src="https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white&style=for-the-badge" />
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000000&style=for-the-badge" />
  <img alt="NodeJs" src="https://img.shields.io/badge/Node.JS-339933?logo=Node.Js&logoColor=white&style=for-the-badge" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000000&style=for-the-badge" />
  <img alt="HTML" src="https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white&style=for-the-badge" />
  <img alt="Css" src="https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white&style=for-the-badge" />
</p>

## Demo

https://multi-step-form-27082023-794b6e0622ab.herokuapp.com/

https://github.com/qianzhong516/multi-step-form-2/assets/33209457/3a958c12-dae3-4b6e-90ec-67af0aeed8c4

## Project Intro

This project is built based on the design from [Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ).


## Techstack Intro

Instead of relying on existing tools like create-react-app, webpack has been set up from scratch in the project to have complete control over the build process. The TypeScript code is transpiled by Babel plugins that help ensuring the code works smoothly across different environments. TypeScript package keeps the codebase reliable with thorough type checking.

I've kept things simple by not using state management tools like Redux or Mobx. The app follows the principles of object-oriented programming, focusing on clear and efficient design.

## Build

Type check and build the project by running

```
npm run build
```

Kick off the webpack dev server by running

```
npm run dev
```

Serve the built static html file after build

```
npm start
```

and acceess http://localhost:8080

Storybook build

```
npm run storybook
```

## TODOs

-   [] use miniExtractCssPlugin or stay with style-loader?
-   [] move fonts to the `assets/` folder after build
-   [] render text color based on theme
-   [] primary color is not dark theme friendly
-   [] add global css override in both App and storybook. E.g, `box-sizing: border-box`
