let vars = { "true": [1], "false": [0] }
function main (c) {
  const filtered = filter(c)
  const classes = classify(filtered)
  eval(classes)
}