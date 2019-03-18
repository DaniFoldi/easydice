#  EasyDice

![NPM bundle size](https://img.shields.io/bundlephobia/min/easydice.svg)
![NPM downloads per week](https://img.shields.io/npm/dw/easydice.svg)
![GitHub open issues](https://img.shields.io/github/issues-raw/DaniFoldi/easydice.svg)
![GitHub open Pull Requests](https://img.shields.io/github/issues-pr-raw/DaniFoldi/easydice.svg)
![License](https://img.shields.io/github/license/DaniFoldi/easydice.svg)
![GitHub version](https://img.shields.io/github/package-json/v/DaniFoldi/easydice.svg)
![NPM version](https://img.shields.io/npm/v/easydice.svg)

## Install

**Via npm:**

```
npm i easydice
```

[![Try on RunKit](https://badge.runkitcdn.com/easydice.svg)](https://npm.runkit.com/easydice)

## Getting started

After you have installed the package, import it like this:

```javascript
let EasyDice = require('easydice')

let die = new EasyDice()
// Creates a single die with 6 sides by default

let result = die.throw()
// Returns the result as an integer, since there is a single die

// Use your result
// player.position += result

let die2 = new EasyDice(20)
// Creates a single die with 20 sides

let result2 = die2.throw()
// Returns the thrown value as a number
```

In some games you decide which player starts by getting everyone to throw a die, and whoever has highest, goes first.

```javascript
let playerCount = 2
let dice = new EasyDice({count: playerCount})
// Creates two dice with 6 sides each

let startingThrow = dice.throw()
// Throw both dice, returns an array since there are multiple dice

let whichPlayerStarts = []

while (Array.isArray(whichPlayerStarts)) {
  whichPlayerStarts = dice.throw().highestIndex()
}
```

```javascript
let dice = new EasyDice("5d20") // lowercase or uppercase d can be used
// Creates 5 dice with 20 sides each
```

## Randomness

The package uses `Math.random()` internally, so it can be considered random enough for dice. The results should be equally distributed.

## Documentation

You can specify properties of the dice by giving the constructor some values:

| | |
|-|-|
|`new EasyDice()`|Returns a die with 6 sides.|
|`new EasyDice(s)`|Returns a die with `s` sides.|
|`new EasyDice(s, n)`|Returns `n` dice with `s` sides.|
|`new EasyDice(arr)`|Returns a custom die where the outcome is any element of `arr`, with equal probability.|
|`new EasyDice(arr, prob)`|Returns a custom die where the outcome is any element of `arr`, with the corresponding relative probability in `prob`.|
|`new EasyDice(arr, n)`|Returns n custom dice where the outcome for each die is any element of `arr`, with equal probability.|

You can set more properties by instead passing an object to the constructor.

| | |
|-|-|
|`new EasyDice(obj)`|Returns dice according to the following table

| | |
|-|-|
|`min`|specifies the minimum value for the di(c)e (default: 1)|
|`max`|specifies the maximum value for the di(c)e (default: 6)|
|`count`|specifies the number of dice (default: 1)|
|`values`|specifies that this is a custom die with outcomes from the array (default: undefined)|
|`probabilites`|specifies the relative probabilities of all items in |`values`|(default: undefined)|

For example:

| | |
|-|-|
|`new EasyDice({ count: 2 })`|Returns 2 dice with 6 sides each.|
|`new EasyDice({ values: ["red", "green", "blue"]})`|Returns a die where a throw will result in either "red", "green" or "blue".|

In some RPG games you specify dice with `CdM` where `C` is the count of dice and `M` is the maximum value.

| | |
|-|-|
|`new EasyDice('CdM')`|Returns C dice with M being the maximum value for each.|
`C` defaults to 1, `M` defaults to 6.

If there are more than 1 dice, the returned array contains some special functions:
```javascript
let EasyDice = require('easydice')

let die = new EasyDice({ count: 2 })
let result = die.throw()
```
`result` now has the following special functions:

| | |
|-|-|
|`result.sum()`|Returns the sum of all thrown dice|
|`result.product()`|Returns the product of all thrown dice|
|`result.highestIndex()`|Returns the highest thrown value's index as an integer, **or an array if there is a tie**|
|`result.highestValue()`|Returns the highest thrown value|
|`result.lowestIndex()`|Returns the lowest thrown value's index as an integer, **or an array if there is a tie**|
|`result.lowestValue()`|Returns the lowest thrown value|
|`result.notHighestIndex()`|Returns the all but the highest value's indices as an array|
|`result.notHighestValue()`|Returns the all but the highest thrown value as an array|
|`result.notLowestIndex()`|Returns the all but the lowest value's indices as an array|
|`result.notLowestValue()`|Returns the all but the lowest thrown value as an array|

**Note:**
`min` and `max` are prioritized over `values` and `probabilities`.
Do not use the special functions if `values` is used and it contains elements that are not numbers.

## Contribution

You are welcome to open Pull Requests which add new functionality, contain bugfixes or general improvements to the code.

## License

This package is licensed with MIT license. See LICENSE for details.
