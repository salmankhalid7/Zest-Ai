const chunkText = (text, size = 1000) => {
  if (!text) return [];
  const chunks = [];
  let index = 0;

  while (index < text.length) {
    // If remaining text is smaller than chunk size, take all of it
    if (text.length - index <= size) {
      chunks.push(text.slice(index).trim());
      break;
    }

    // Isolate a tentative chunk block
    let endStr = index + size;
    
    // Backtrack to find the nearest space so words don't snap in half
    const lastSpace = text.lastIndexOf(" ", endStr);
    if (lastSpace > index) {
      endStr = lastSpace;
    }

    chunks.push(text.slice(index, endStr).trim());
    index = endStr + 1; // Slide window past the space
  }

  return chunks;
};

module.exports = chunkText;