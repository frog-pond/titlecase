/*
 * To Title Case 2.1 – http://individed.com/code/to-title-case/
 * Copyright © 2008–2013 David Gouch. Licensed under the MIT License.
 *
 * modifications by @rvagg Apr-2014
 *
 * additional modifications by @hawkrives, Dec. 2018
 */

let smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i

function toTitleCase(str) {
  return titleCase(str, smallWords)
}

let laxWords = [
  ...require("./articles"),
  ...require("./prepositions"),
  ...require("./conjunctions"),
  ...smallWords.source.replace(/(^\^\(|\)\$$)/g, "").split("|"),
  ...["is"], // a personal preference
]

let laxWordsRe = new RegExp("^(" + laxWords.join("|") + ")$", "i")

function toLaxTitleCase(str) {
  return titleCase(str, laxWordsRe)
}

function titleCase(str, smallWords) {
  if (!str) {
    return str
  }

  return str.replace(
    /[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,
    (match, index, title) => {
      if (
        index > 0 &&
        index + match.length !== title.length &&
        match.search(smallWords) > -1 &&
        title.charAt(index - 2) !== ":" &&
        (title.charAt(index + match.length) !== "-" ||
          title.charAt(index - 1) === "-") &&
        title.charAt(index - 1).search(/[^\s-]/) < 0
      ) {
        return match.toLowerCase()
      }

      if (match.substr(1).search(/[A-Z]|\../) > -1) {
        return match
      }

      return match.charAt(0).toUpperCase() + match.substr(1)
    },
  )
}

module.exports.toTitleCase = toTitleCase
module.exports.toLaxTitleCase = toLaxTitleCase
