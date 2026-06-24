const normalize = (v) => String(v ?? '').toLowerCase().replace(/\s+/g, ' ').trim();

export const findDuplicates = (records, keys = []) => {
  const seen = new Map();
  const duplicates = [];
  records.forEach((record) => {
    const fingerprint = keys.length
      ? keys.map((k) => normalize(record.data?.[k])).join('|')
      : Object.values(record.data || {}).map(normalize).join('|');
    if (!fingerprint) return;
    if (seen.has(fingerprint)) {
      duplicates.push([seen.get(fingerprint), record]);
    } else {
      seen.set(fingerprint, record);
    }
  });
  return duplicates;
};
