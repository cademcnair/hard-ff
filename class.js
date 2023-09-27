function classify (l) {
  // says what each line is for
  const output = []
  let lines = []
  let building = false
  let type = "none"
  let block_type = "none"
  for (const ln of l) {
    // is this the second line of a type of code?
    if (building) {
      // is this the end of a while/if statement?
      if (type == "block" && ln.startsWith("end")) {
        lines.push(ln)
        output.push(new Lang.Block(block_type, Utils.clone(lines)))
        building = false
        block_type = "none"
        type = "none"
        lines = []
        continue 
      } 
      // is this the end of a block of just code, with a while/if statement starting?
      else if (type == "code" && Utils.MatchRegExps(ln) != "none") {
        output.push(new Lang.Code(Utils.clone(lines)))
        building = false
        type = "none"
        lines = []
      } 
      // moving foward on line collection for block
      else {
        lines.push(ln)
        continue
      }
    }
    // is this a block?
    let isV = false
    for (let v = Utils.MatchRegExps(ln); v != "none"; 0) {
      isV = true
      // is this a multiline block?
      if (Blocks.Types[v]) {
        building = true
        block_type = v
        type = "block"
        lines.push(ln)
        v = "none"
        continue
      }
      output.push(new Lang.Block(v, [ln]))
      v = "none"
    }
    if (isV) continue
    building = true
    type = "code"
    lines.push(ln)
  }
  output.push(new Lang.Code(Utils.clone(lines)))
  return output
}