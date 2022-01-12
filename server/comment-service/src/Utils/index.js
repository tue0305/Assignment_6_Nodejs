const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const amqplib = require("amqplib");
const { ACCESS_SECRET_TOKEN, MESSAGE_BROKER_URL, EXCHANGE_NAME, QUEUE_NAME, COMMENT_BINDING_KEY } = require("../config/config");
const { APIError, STATUS_CODES } = require("./app-errors")


// ================================== UTILITY FUNCTIONS =================================

// ***** Password utilities *****
const sendEmail = require("./sendEmail");

const generatePassword = async (enteredPassword) => {
  return await argon2.hash(enteredPassword);
};

const validatePassword = async (savedPassword, enteredPassword ) => {
  return await argon2.verify(savedPassword, enteredPassword);
};

// ***** Access token utilities  *****
const verifySignature = async (req, next) => {
  try {
    const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]
  

  if (token) {
    const decoded = await jwt.verify(token, ACCESS_SECRET_TOKEN)
    
    req.userId = decoded._id
    return true
  }

  return false;
  } catch (error) {
    return  new APIError(
      "JWT error!",
      STATUS_CODES.INTERNAL_ERROR, 
      error.message
    );
  }
};

const generateSignature = async (userId) => {
  return await jwt.sign(userId, ACCESS_SECRET_TOKEN, { expiresIn: "1d" });
};



// =========================== MESSAGE BROKER ==============================
// ### Create channel
const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    
    return channel;
  } catch (error) {
    return  new APIError(
      "Create channel error!",
      STATUS_CODES.INTERNAL_ERROR, 
      error.message
    );
    
  }
};

// ### Publish message
const publishMessage = async (channel, COMMENT_BINDING_KEY, message) => {
try {
  await channel.publish(EXCHANGE_NAME, COMMENT_BINDING_KEY, Buffer.from(message));
  console.log("Message has been sent " + JSON.stringify(JSON.parse(message)))

} catch (error) {
 return  new APIError(
    "publishMessage error!",
    STATUS_CODES.INTERNAL_ERROR, 
    error.message
  );
}
};
// ### Subscribe message
const subscribeMessage = async (channel, service) => {
try {
  const appQueue = await channel.assertQueue(QUEUE_NAME);

  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, COMMENT_BINDING_KEY)
  channel.consume(appQueue.queue, data => {
    console.log('Receive data');
    console.log(data.content.toString());
    
    service.SubscribeEvents(data.content.toString());
    channel.ack(data)
  })

} catch (error) {
  return new APIError(
    "subscribeMessage error!",
    STATUS_CODES.INTERNAL_ERROR, 
    error.message
  );
}
};

// **************************************
module.exports = {
  createChannel,
  publishMessage,
  subscribeMessage,

  generatePassword,
  validatePassword,

  generateSignature,
  verifySignature,
  sendEmail
};
