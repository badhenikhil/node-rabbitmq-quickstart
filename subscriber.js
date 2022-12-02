const amqp = require("amqplib/callback_api");
require("dotenv").config();

console.log("Opening connection to RabbitMQ");

try {
  amqp.connect("amqp://localhost", function (err, connection) {
    if (err) throw err;

    connection.createChannel(function (err, channel) {
      if (err) throw err;

      var queue = "hello";
      console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);
      channel.consume(
        queue,
        function (msg) {
          console.log(`${msg.content.toString()} Received`);
        },
        {
          noAck: true,
        }
      );
    });
  });
} catch (exp) {
  console.log(exp);
}
