const { BaseDialog } = require('botfuel-dialog');

class Greetings extends BaseDialog {
  async dialogWillDisplay(userMessage) {
    const userId = userMessage.user;
    const { greeted } = (await this.brain.userGet(userId, 'greetings')) || {
      greeted: false,
    };

    if (!greeted) {
      await this.brain.userSet(userId, 'greetings', { greeted: true });
    }

    return { greeted };
  }
}  

module.exports = Greetings;
