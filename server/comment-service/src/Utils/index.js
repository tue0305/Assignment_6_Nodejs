const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const amqplib = require("amqplib");
const { ACCESS_SECRET_TOKEN, MESSAGE_BROKER_URL, EXCHANGE_NAME, QUEUE_NAME } = require("../config/config");
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
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]
  

  if (token) {
    const decoded = await jwt.verify(token, ACCESS_SECRET_TOKEN)
    
    req.userId = decoded._id
    return true
  }

  return false;
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
    const err =  new APIError(
      "Create channel error!",
      STATUS_CODES.INTERNAL_ERROR, 
      error.message
    );
    console.log(err)
  }
};

// ### Publish message
const publishMessage = async (channel, binding_key, message) => {
try {
  await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
} catch (error) {
  const err = new APIError(
    "publishMessage error!",
    STATUS_CODES.INTERNAL_ERROR, 
    error.message
  );
  console.log(err)
}
};
// ### Subscribe message
const subscribeMessage = async (channel, service, binding_key) => {
try {
  const appQueue = await channel.assertQueue(QUEUE_NAME);

  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key)
  channel.consume(appQueue.queue, data => {
    console.log('Receive data');
    console.log(data.content.toString());
    channel.ack(data)
  })

} catch (error) {
  const err = new APIError(
    "subscribeMessage error!",
    STATUS_CODES.INTERNAL_ERROR, 
    error.message
  );
  console.log(err)
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
