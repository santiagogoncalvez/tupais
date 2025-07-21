export function nextIndex(current, total) {
  return (current + 1) % total;
}

export function prevIndex(current, total) {
  return (current - 1 + total) % total;
}

export function getDirection(prev, next, total) {
  const forward = (next - prev + total) % total;
  const backward = (prev - next + total) % total;

  if (forward === 0) return "none";
  return forward < backward ? "forward" : "backward";
}
