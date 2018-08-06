const { View, CardsMessage, Card, Link, BotTextMessage } = require('botfuel-dialog');

class MoviesCarouselView extends View {
  render(userMessage, { matchedEntities, filmsDataList }) {
    const actor = matchedEntities.actor && matchedEntities.actor.values[0].value;
    const genre = matchedEntities.genre && matchedEntities.genre.values[0].value;
    const actorAndGenre = actor && genre;

    let answer = (filmsDataList.length) ? 'Choose any ' : 'Sorry, I have found no ';

    if (actorAndGenre) {
        answer += `${genre} movie with ${actor}!`;
    } else if (genre) {
        answer += `${genre} movie!`;
    } else if (actor) {
        answer += `movie with ${actor}!`;
    } else {
        answer += `popular movie!`;
    }

    const text = filmsDataList.map(function(value) {
        return value.title;
    }).join();
    
    const cards = filmsDataList.map(function(value) {
        return new Card(value.title, 'https://image.tmdb.org/t/p/w342/' + value.poster_path, [
            new Link('Film Info', 'https://www.themoviedb.org/movie/' + value.id)
        ])
    })


    return [
      new BotTextMessage(answer),
      //new BotTextMessage(text)
      new CardsMessage(cards)
    ];
  }
}

module.exports = MoviesCarouselView;