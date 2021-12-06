# Plop generator

### Generate files using [Plop](https://plopjs.com/).

## Usage

Right click on the folder where you want to execute plop click `Generate here with Plop` select the generator and enter the data needed for the generation.

In order to use the current path option the plop configuration file must be present in the root of the workspace and it's name must be `plopfile.js`, the generator needs the following prompt

```javascript
{
	type: 'input',
	name: 'destpath',
	message: 'This input must be in the prompts array'
}
```

Here's an example plopfile that will work with this extension:
```javascript
module.exports = (plop) => {
  plop.setGenerator('Component', {
    description: 'Generate an Component',
    label: 'Component',
    prompts: [
      {
        type: 'input',
        name: 'destpath',
        message: 'This input must be in the prompts array',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{destpath}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile:
          './plop-templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: '{{destpath}}/{{pascalCase name}}/index.ts',
        templateFile:
          './plop-templates/Component/index.ts.hbs',
      },
    ],
  })
}
```

At this point the extension only support `input` type prompts.
