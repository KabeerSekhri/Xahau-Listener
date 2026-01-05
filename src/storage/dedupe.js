const seen = new Set();

function isDuplicate(hash) {
  if (seen.has(hash)) return true;
  seen.add(hash);
  return false;
}

module.exports = { isDuplicate };
