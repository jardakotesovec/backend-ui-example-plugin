# Backend UI Example Plugin

Compatible with upcoming OJS 3.5 release candidate. For version 3.4 check the `stable-3_4_0` branch.

## Check list to set up build step in your plugin

- Install vite@6 - `npm install --save-dev vite@6`
- Copy over the i18nExtractKeys.vite.js to make easy to use translation in the vue.js components
- Copy over vite.config.js, adjust if necessary
- You can follow the eslint/prettier setup - but thats very much optional
- Copy over relevant scripts from the `package.json` to your package.json
- Create `resources/js/main.js`, which will be entry point to register your components

## Scenarios illustrated in this example plugin

- How to inject your own vue component to smarty template
- How to use components from ui-library
- How to use dialog via useModal composable
- How to do API data fetching, using useFetch and useUrl composables
- How to extend FileManager with additional column and custom action
- How to extend WorkflowPage with new menu and new component in existing menu

Also check out generic plugin template https://github.com/pkp/pluginTemplate to see how the cypress test can be written to automatically test your plugin.

![image illustrating plugin example ui](docs/plugin_ui.png)
