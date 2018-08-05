const request = require('request-promise-native');
const { PromptDialog } = require('botfuel-dialog');

class Movie extends PromptDialog {
    async dialogWillDisplay(userMessage, { matchedEntities, missingEntities }) {    
        let additionalOpts = {}

        if (matchedEntities.genre) {
            const genreId = matchedEntities.genre.values[0].id;
            additionalOpts = Object.assign(additionalOpts, {with_genre: genreId});
        } else if (matchedEntities.actor){
            const actorId = matchedEntities.actor.values[0].id;
            additionalOpts = Object.assign(additionalOpts, {with_people: actorId});
        }

        const defaultOpts = {
                api_key: 'f4a6ae306666f62c878e248d221dab36',
                sort_by: 'popularity.desc'
            }
        const movieData = await request({
            uri: 'https://api.themoviedb.org/3/discover/movie',
            qs: Object.assign(defaultOpts, additionalOpts),
            json: true
        });

        return { movieData };
    }
    async dialogWillComplete() {
        return this.startNewConversation();
    }
}

Movie.params = {
  namespace: 'movie',
  entities: {
    genre: {
      dim: 'genre',
    },
    actor: {
        dim: 'actor',
    },
  },
};

module.exports = Movie;
