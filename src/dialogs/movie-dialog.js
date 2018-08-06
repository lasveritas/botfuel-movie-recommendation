const request = require('request-promise-native');
const { PromptDialog } = require('botfuel-dialog');

class Movie extends PromptDialog {
    async dialogWillDisplay(userMessage, data) {
        const userId = userMessage.user;

        const defaultOpts = {
                api_key: 'f4a6ae306666f62c878e248d221dab36',
                include_adult: false
            }

        let additionalOpts = {}

        if (data.matchedEntities.genre) {
            const genreId = data.matchedEntities.genre.values[0].id;
            additionalOpts = Object.assign(additionalOpts, {with_genres: genreId});
        } 

        if (data.matchedEntities.actor){
            const actorId = data.matchedEntities.actor.values[0].id;
            additionalOpts = Object.assign(additionalOpts, {with_people: actorId});
        }

        const movieData = await request({
            uri: 'https://api.themoviedb.org/3/discover/movie',
            qs: Object.assign(defaultOpts, additionalOpts),
            json: true
        });

        let usedFilmsIds = await this.brain.userGet(userId, 'films') || []; 
        if (usedFilmsIds.length > 100) {
            await this.brain.userSet(userId, 'films', []);
            usedFilmsIds = [];
        }    

        let filmsDataList = movieData.results.filter(film => usedFilmsIds.indexOf(film.id) === -1);

        filmsDataList = (filmsDataList.length >= 3) ? filmsDataList : movieData.results;
        filmsDataList = filmsDataList.splice(0, 3);

        const filmsIds = filmsDataList.map(function(value) {
            return value.id;
        });

        await this.brain.userSet(userId, 'films', usedFilmsIds.concat(filmsIds));
        await this.brain.userSet(userId, 'lastQuery', data);

        return { filmsDataList };
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
