var chatService = require('../services/chat_service');

const messageServiceMap = {
    'SENDMESSAGE' : chatService.sendMessage,
    'GETCHAT': chatService.getChat
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

