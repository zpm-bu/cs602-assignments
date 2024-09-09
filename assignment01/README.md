# Temperature Conversion Assignment

Create a console-based application to convert:

1. From Fahrenheit to Celsius
2. From Fahrenheit to Kelvin
3. From Celsius to Kelvin
4. From Celsius to Fahrenheit
5. from Kelvin to Celsius.

## Requirements

1. Round all temperatures to 2 digits.
2. Use ES6 modules to bundle the JavaScript.
3. Use Node -- you **must** use Node.
4. DO NOT SUBMIT THE `node_modules/` folder.

## Formulae

|        |            To F            |       To C        |            To K            |
| :----- | :------------------------: | :---------------: | :------------------------: |
| From F |             =F             | =(F - 32) * (5/9) | =(F - 32) * (5/9) + 273.15 |
| From C |      =32 + C * (9/5)       |        =C         |        =C + 273.15         |
| From K | =32 + (K - 273.15) * (9/5) |    =K - 273.15    |             =K             |

# The Application

## Help

Call `node index.js` to call the application. The following arguments are
available:

- `--from`, `-f`: The unit to convert _from_. Defaults to "F".
- `--to`, `-t`: The unit to convert _to_. Defaults to "C".
- `--negative`, `-n`: If included, the script will parse the numerical `arg` as
  negative. This is a weird limitation of the `parseArgs` function; see below.

The call accepts exactly ONE positional argument, `arg`, which must be
convertible to a number and represents the degrees being converted.

## Example

To convert 10 °K to °F, use:

```bash
node index.js --from K --to F 10
```

## Negative input

The `parseArgs` function from Node is weird and really doesn't like negative
numbers as arguments. Under the hood, it will parse

```bash
node index.js -40
```

as having value arguments `{ 4: true, 0: true }` since it interprets the leading
`-` not as a negative marker, but as an intro for a short flag.

The application supports negative inputs, but through the `--negative/-n` flag.
So to pass `-40`, you would have to do:

```bash
node index.js --negative 40
node index.js -n 40
```

This is the compromise for the nice argument parser...
