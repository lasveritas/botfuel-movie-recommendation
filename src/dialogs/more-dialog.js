const { BaseDialog } = require('botfuel-dialog');

class More extends BaseDialog {
    async dialogWillComplete(userMessage) {
        const userId = userMessage.user;
        const data = (await this.brain.userGet(userId, 'lastQuery')) || {};

        if (data) {
            return this.triggerNext('movie', data);
        }


    }}  

module.exports = More;
