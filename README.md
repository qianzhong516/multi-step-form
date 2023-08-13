## Create React From Scratch

### Build

Type check and build the project by running

```
npm run build
```

Kick off the webpack dev server by running

```
npm run dev
```

### Technical Choice

1. Immediate error feedback is provided while users are filling in each form. Users cannot proceed to a next step if there is any error in the form. Next button isn't disbaled because footer and content form are two parrallel children within the Dialog component. It requires a common context for those two components to communicate with each other. However, the design choice in this repo is to manage form data within each form isolately by avoiding having a central state controller on the top level.

### TODOs

-   [] use miniExtractCssPlugin or stay with style-loader?
-   [] move fonts to the `assets/` folder after build
-   [] render text color based on theme
-   [] primary color is not dark theme friendly
-   [] add global css override in both App and storybook. E.g, `box-sizing: border-box`
