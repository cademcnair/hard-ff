function filter (c) {
  // removes spaces/tabs and splits by new lines
  return c.split("\n").map(i => {
    let result = i
    while ([" ", "\t"].includes(result[0]))
      result = result.substr(1)
    return result
  }).filter(l => l.length > 0)
}