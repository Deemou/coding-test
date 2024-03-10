function solution(filenames) {
  const parsedFilenames = filenames.map(parseFilename);

  parsedFilenames.sort((a, b) => {
    if (a.head < b.head) return -1;
    if (a.head > b.head) return 1;
    return a.number - b.number;
  });

  return parsedFilenames.map((file) => file.name);
}

function parseFilename(filename) {
  const regex = /^([^\d]+)(\d+)(.*)$/;
  const [NAME, HEAD, NUMBER, TAIL] = filename.match(regex);
    
  return {
    name: NAME,
    head: HEAD.toLowerCase(),
    number: parseInt(NUMBER, 10),
    tail: TAIL,
  };
}