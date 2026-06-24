import csv from 'csv-parser';

export const parseCsvStream = (stream, limit = 10000) =>
  new Promise((resolve, reject) => {
    const rows = [];
    stream
      .pipe(csv())
      .on('data', (row) => {
        if (rows.length < limit) rows.push(row);
      })
      .on('error', reject)
      .on('end', () => resolve(rows));
  });
