var buyer = require('../topic_handlers/buyer');
var seller = require('../topic_handlers/seller');
var order = require('../topic_handlers/order');
var chat = require('../topic_handlers/chat');


module.exports.handleTopicRequest = function(topic_name, payload, callback ) {
        let fname;
        switch(topic_name) {
            // Add your TOPICs here
            //first argument is topic name
            //second argument is a function that will handle this topic request
            case "buyer" : {
                fname = buyer.handleRequest ;  break; 
            }
            case "seller" : {
                fname = seller.handleRequest ;  break; 
            }
            case "order" : {
                fname = order.handleRequest ;  break; 
            }
            case "chat" : {
                fname = chat.handleRequest ;  break; 
            }
            default: break;
        }
        fname(payload, callback);
}
