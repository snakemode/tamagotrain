// game-_utils.js

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function rand(start, end) {
  const result = Math.floor(Math.random() * end) + start;
  // console.log(`rand(${start},${end}) = ${result}`);
  return result;
}

function inTargetZone(location, target, tolerance) {
  tolerance = tolerance || 0;  
  if (location.x < target.x - tolerance) return false;
  if (location.x > target.x + tolerance) return false;
  if (location.y < target.y - tolerance) return false;
  if (location.y > target.y + tolerance) return false;    
  return true;
}

function walkNaturally(walker, target, unitSize) {
  const manhattenDistance = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

  if (walker.isDisplayed) { // Has been rendered

    const stepSize = 1 * unitSize;

    const possibleSteps = [
      { x: walker.x - stepSize, y: walker.y - stepSize },
      { x: walker.x - stepSize, y: walker.y },
      { x: walker.x - stepSize, y: walker.y + stepSize },
      { x: walker.x, y: walker.y - stepSize },
      { x: walker.x, y: walker.y + stepSize },            
      { x: walker.x + stepSize, y: walker.y - stepSize },
      { x: walker.x + stepSize, y: walker.y },
      { x: walker.x + stepSize, y: walker.y + stepSize },
    ];

    const currentManhattenDistance = manhattenDistance({x: walker.x, y: walker.y}, target);
    const closerSteps = possibleSteps.filter(s => manhattenDistance(s, target) < currentManhattenDistance);
    
    if (closerSteps.length > 0) {
      const stepChoice = rand(0, closerSteps.length);          
      const selectedStep = closerSteps[stepChoice];
      walker.x = selectedStep.x;
      walker.y = selectedStep.y;
    }
  }
}

module.exports = {
  uuidv4,
  rand,
  inTargetZone,
  walkNaturally
}