// takes two bounding boxes and returns the translation necessary to move a to b
function atob(a, b) {
  const scaleWidth = b.width / a.width;
  const scaleHeight = b.height / a.height;

  const x = getXMidpoint(b) - getXMidpoint(a);
  const y = getYMidpoint(b) - getYMidpoint(a);

  return `translate(${x}px, ${y}px) scale(${scaleWidth}, ${scaleHeight})`;
}

//  pass in a bounding box and get back the midpoint xcoord
function getXMidpoint(bb) {
  return ((bb.x + bb.width) + bb.x) / 2;
}
//  pass in a bounding box and get back the midpoint ycoord
function getYMidpoint(bb) {
  return ((bb.y + bb.height) + bb.y) / 2;
}

export { atob }
