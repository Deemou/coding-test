function solution(genres, plays) {
  const genresWithCount = genres.reduce((genresWithCount, genre, index) => {
    if (!Object.hasOwn(genresWithCount, genre)) genresWithCount[genre] = 0;
    genresWithCount[genre] += plays[index];

    return genresWithCount;
  }, {});

  const sortedGenres = Object.keys(genresWithCount).sort((a, b) => {
    if (genresWithCount[a] >= genresWithCount[b]) return -1;
    return 1;
  });

  const answer = sortedGenres.reduce((answer, genre) => {
    const arr = [];
    for (let i = 0; i < genres.length; i++) {
      if (genres[i] === genre) {
        arr.push(i);
      }
    }

    const songs = arr.sort((a, b) => plays[b] - plays[a]).slice(0, 2);

    return answer.concat(songs);
  }, []);

  return answer;
}