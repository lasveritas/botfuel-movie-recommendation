const { CorpusExtractor, FileCorpus } = require('botfuel-dialog');
const actors = require('../dbs/actorsMap.json');


class ActorExtractor extends CorpusExtractor {
  constructor() {
    super({
      dimension: 'actor',
      corpus: new FileCorpus(`${__dirname}/../corpora/actor.txt`),
      options: {},
    });
  }
  buildValue(value) {
    return { value: value, id: actors[value], type: 'string' };
  }
}

module.exports = ActorExtractor;