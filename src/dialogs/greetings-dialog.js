const { BaseDialog } = require('botfuel-dialog');

class Greetings extends BaseDialog {
    render(userMessage, data) {
        const { greeted } = data;
        if (greeted) {
            return [new BotTextMessage('Hi again!')];
        }
        return [new BotTextMessage('Hello!')];
    }
}

module.exports = Greetings;
