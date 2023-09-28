function eval (c) {
  for (const comp of c) {
    if (comp.type == "Block") {
      Eval.Block(comp)
    } else for (const line of parse(comp.content))
        Eval.Code(line)
  }
}
const Eval = {
  Code: function (p) {
    let current = null
    let previous = null
    let operator = ""
    for (const part of p) {
      if (part.type == "op") {
        operator = part.content
      } else {
        if (part.type == "num") {
          current = [Number(part.content)]
        } else if (part.type == "str") {
          let string = part.content
          string = string.slice(1)
          current = [string]
        } else if (part.type == "var") {
          current = vars[part.content]
        }
        if (previous != null && current != null && operator != "") {
          if (operator == "+") {
            current = [previous[0] + current[0]]
          }
          operator = ""
        }
        previous = current
        current = null
      }
    }
    return previous
  },
  Block: function (c) {
    if (c.block_type == "if") {
      const top_parts = parse_line(c.top.replace("if", ""))
      if (this.Code(top_parts)[0] === 1)
        eval(classify(c.content))
    }
  }
}