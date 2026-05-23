const findBestChunk = (chunks, query) => {
  let bestChunk = "";
  let maxScore = 0;

  const keywords = query.toLowerCase().split(" ");

  chunks.forEach((chunk) => {
    let score = 0;

    keywords.forEach((word) => {
      if (chunk.toLowerCase().includes(word)) {
        score++;
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestChunk = chunk;
    }
  });

  return bestChunk;
};

module.exports = findBestChunk;