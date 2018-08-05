const { CorpusExtractor, FileCorpus } = require('botfuel-dialog');

const genreMap = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  'Science Fiction': 878,
  'TV Movie': 10770,
  Thriller: 53,
  War: 10752,
  Western: 37
};


class GenreExtractor extends CorpusExtractor {
  constructor() {
    super({
      dimension: 'genre',
      corpus: new FileCorpus(`${__dirname}/../corpora/genre.txt`),
      options: {},
    });
  }
  buildValue(value) {
    return { value: value, id: genreMap[value], type: 'string' };
  }
}

module.exports = GenreExtractor;