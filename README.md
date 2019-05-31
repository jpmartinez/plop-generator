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

At this point the extension only support `input` type prompts.
