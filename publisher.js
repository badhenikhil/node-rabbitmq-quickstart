const amqp = require("amqplib/callback_api");
require("dotenv").config();

console.log("Opening connection to RabbitMQ");

try {
  amqp.connect("amqp://localhost", function (err, connection) {
    if (err) throw err;

    connection.createChannel(function (err, channel) {
      if (err) throw err;

      var queue = "hello";
      var counter = 0;

      setInterval(() => {
        var msg = `Hello world - ${++counter}`;
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(`message: ${msg} sent to queue`);
      }, 2 * 1000);
    });
  });
} catch (exp) {
  console.log(exp);
}
