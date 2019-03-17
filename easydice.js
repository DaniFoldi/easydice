/*
  (c) Copyright Dániel Földi 2019

  Version 1.0.0
  GitHub: https://github.com/DaniFoldi/easydice
*/

class EasyDice {
  constructor(a, b) {
    if (typeof a === "undefined" && typeof b === "undefined") {
      this.min = 1
      this.max = 6
      this.count = 1
    } else if (typeof a === "number" && typeof b === "undefined") {
      this.min = 1
      this.max = a
      this.count = 1
    } else if (typeof a === "number" && typeof b === "number") {
      this.min = 1
      this.max = a
      this.count = b
    } else if (Array.isArray(a) && typeof b === "undefined") {
      this.values = a
      this.probabilities = []
      for (let i = 0; i < this.values.length; i++) {
        this.probabilities.push(1 / this.values.length)
      }
      this.count = 1
    } else if (Array.isArray(a) && typeof b === "number") {
      this.values = a
      let probabilities = []
      for (let i = 0; i < this.values.length; i++) {
        probabilities.push(1)
      }
      this.probabilities = EasyDice.normalize(probabilities)
      this.count = b
    } else if (Array.isArray(a) && Array.isArray(b)) {
      this.values = a
      this.probabilities = EasyDice.normalize(b)
      this.count = 1
    } else if (typeof a === "object") {
      if (typeof a.max === "number") {
        this.max = a.max
      } else if (typeof a.values === "undefined") {
        this.max = 6
      }
      if (typeof a.min === "number") {
        this.min = a.min
      } else if (typeof this.max === "number") {
        this.min = 1
      }
      if (typeof a.count === "number") {
        this.count = a.count
      } else {
        this.count = 1
      }
      if (Array.isArray(a.values)) {
        this.values = a.values
      }
      if (Array.isArray(a.probabilities)) {
        this.probabilities = a.probabilities
      } else if (Array.isArray(this.values)) {
        let probabilities = []
        for (let i = 0; i < this.values.length; i++) {
          probabilities.push(1)
        }
        this.probabilities = EasyDice.normalize(probabilities)
      }
    }
  }

  throw() {
    if (this.count === 1) {
      if (typeof this.min === "number") {
        return EasyDice.random(this.min, this.max)
      } else {
        return EasyDice.randomElement(this.values, this.probabilities)
      }
    } else {
      let result = new Result()
      if (typeof this.min === "number") {
        for (let i = 0; i < this.count; i++) {
          result.values.push(EasyDice.random(this.min, this.max))
        }
      } else {
        for (let i = 0; i < this.count; i++) {
          result.values.push(EasyDice.randomElement(this.values, this.probabilities))
        }
      }
      return result
    }
  }

  static sum(a) {
    let sum = 0
    for (let i = 0; i < a.length; i++) {
      sum += a[i]
    }
    return sum
  }

  static highestValue(a) {
    let result = -Infinity
    for (let i = 0; i < a.length; i++) {
      if (a[i] > result) {
        result = a[i]
      }
    }
    return result
  }

  static lowestValue(a) {
    let result = Infinity
    for (let i = 0; i < a.length; i++) {
      if (a[i] < result) {
        result = a[i]
      }
    }
    return result
  }

  static highestIndex(a) {
    let result = []
    for (let i = 0; i < a.length; i++) {
      if (result.length === 0 || a[i] > a[result[0]]) {
        result = [i]
      } else if (a[i] === a[result[0]]) {
        result.push(i)
      }
    }
    if (result.length === 1) {
      return result[0]
    } else {
      return result
    }
  }

  static lowestIndex(a) {
    let result = []
    for (let i = 0; i < a.length; i++) {
      if (result.length === 0 || a[i] < a[result[0]]) {
        result = [i]
      } else if (a[i] === a[result[0]]) {
        result.push(i)
      }
    }
    if (result.length === 1) {
      return result[0]
    } else {
      return result
    }
  }

  static random(a, b) {
    return Math.floor(a + Math.random() * (b - a + 1))
  }

  static normalize(probabilities) {
    let sum = EasyDice.sum(probabilities)
    let result = []
    for (let i = 0; i < probabilities.length; i++) {
      result.push(probabilities[i] / sum)
    }
    return result
  }

  static randomElement(values, probabilities) {
    let value = Math.random()
    let threshold = 0
    for (let i = 0; i < values.length; i++) {
      threshold += probabilities[i]
      if (threshold > value) {
        return values[i]
      }
    }
  }
}

class Result {
  constructor(values) {
    if (Array.isArray(values)) {
      this.values = values
    } else {
      this.values = []
    }
    this.prototype = Array.prototype
  }
  sum() {
    return EasyDice.sum(this.values)
  }
  highestValue() {
    return EasyDice.highestValue(this.values)
  }
  highestIndex() {
    return EasyDice.highestIndex(this.values)
  }
  lowestValue() {
    return EasyDice.lowestValue(this.values)
  }
  lowestIndex() {
    return EasyDice.lowestIndex(this.values)
  }
}

if (typeof define === "function" && define.amd) {
  define([], EasyDice)
} else if (typeof module === "object" && module.exports) {
  module.exports = EasyDice
}
