const { View, BotTextMessage } = require('botfuel-dialog');

class GreetingsView extends View {
  render(userMessage, data) {
    const { greeted } = data;
    if (greeted) {
      return [new BotTextMessage('Hi again!')];
    }
    return [new BotTextMessage('Hello! I am a movie recommender bot. Just ask me for any genre or an actor, and I will try to recommend you something interesting.')];
  }
}

module.exports = GreetingsView;