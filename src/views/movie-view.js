const { PromptView, BotTextMessage } = require('botfuel-dialog');

class MovieView extends PromptView {
  render(userMessage, { matchedEntities, movieData }) {
    const actor = matchedEntities.actor && matchedEntities.actor.values[0].value;
    const genre = matchedEntities.genre && matchedEntities.genre.values[0].value;
    const actorAndGenre = actor && genre;

    const filmsDataList = movieData.results;
    const filmsTitles = filmsDataList.map(function(value) {
        return value.title;
    }).join();

    let answer = (filmsTitles) ? 'Choose any ' : 'Sorry, I have found no ';

    if (actorAndGenre) {
        answer += `${genre} film with ${actor}!`;
    } else if (genre) {
        answer += `${genre} film!`;
    } else if (actor) {
        answer += `film with ${actor}!`;
    } else {
        answer += `popular film!`;
    }

    return [
        new BotTextMessage(answer),
        new BotTextMessage(filmsTitles)
    ]; 
  }
}

module.exports = MovieView;
