## Multi-step Form

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

-   The design choice in this repo is to manage form data within each form isolately.
-   There is no easy way to communicate between steps. E.g, if user had previsouly selected addons, then changed the recurring type of plan in the select plan step, we need to update the addon items accordingly in the form data. We have two options to address this problem:
    -   Use a message controller and subscribe to the events on the application's top level, so that user can switch between steps freely from the sidebar
    -   Subscribe to a side effect to update the data in the addons step by detecting if there is a change in the recurring type. However, with this approach user cannot switch between steps freely from the sidebar

### TODOs

-   [] use miniExtractCssPlugin or stay with style-loader?
-   [] move fonts to the `assets/` folder after build
-   [] render text color based on theme
-   [] primary color is not dark theme friendly
-   [] add global css override in both App and storybook. E.g, `box-sizing: border-box`
