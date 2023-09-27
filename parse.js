function parse (l) {
  const result = []
  let building = ""
  let type = "none"
  function add_bit(t, c) {
    if (type != t && type != "none") {
      result[result.length - 1].push({
        content: building, type
      })
      building = ""
    }
    type = t
    building += c
  }
  for (const ln of l) {
    result.push([])
    for (const c of ln) {
      if (c == "\"") 
        if (type == "str") {
          result[result.length - 1].push({
            content: building, type
          })
          building = ""
          type = "none"
        } else add_bit("str", c);
      else if (type == "str") add_bit("str", c)
      else if (/[0-9]/.test(c)) add_bit("num", c)
      else if (Ops.Basic.includes(c)) add_bit("op", c)
      else if (c == " ") continue
      else add_bit("var", c)
    }
  }
  if (type != "none") add_bit("none", "")
  return result
}
function parse_line(l) {
  return parse([l]).flat()
}