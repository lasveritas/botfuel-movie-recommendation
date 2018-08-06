const {
  Bot, BotTextMessage, UserTextMessage,
} = require('botfuel-dialog');
const config = require('../test-config');

describe('Test bot answers', () => {
  test('Bot says hello', async () => {
    const bot = new Bot(config);
    const { userId } = bot.adapter;
    await bot.play([
      new UserTextMessage('Hello!'),
    ]);
    expect(bot.adapter.log).toEqual([
      new UserTextMessage('Hello!'),
      new BotTextMessage('Hello!'),
    ].map(o => o.toJson(userId)));
  });

  test('Bot should not understand.', async () => {
    const bot = new Bot(config);
    const { userId } = bot.adapter;
    await bot.play([
      new UserTextMessage('Make me a sandwich'),
    ]);
    expect(bot.adapter.log).toEqual([
      new UserTextMessage('Make me a sandwich'),
      new BotTextMessage('Not understood.'),
    ].map(o => o.toJson(userId)));
  });

  test('Bot tells, who he is.', async () => {
    const bot = new Bot(config);
    const { userId } = bot.adapter;
    await bot.play([
      new UserTextMessage('Who are you'),
    ]);
    expect(bot.adapter.log).toEqual([
      new UserTextMessage('Who are you'),
      new BotTextMessage('I am a movie recommender bot. Just ask me for any genre or an actor, and I will try to recommend you something interesting.'),
    ].map(o => o.toJson(userId)));
  });
});
