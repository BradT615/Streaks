const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const { v4: uuidv4 } = require('uuid');

exports.handler = async function(event, context) {
  const visitorUUID = event.queryStringParameters.uuid;

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  let visitorData;

  try {
    console.log('Connecting to the database...');
    await client.connect();
    console.log('Successfully connected to the database.');

    const usersCollection = client.db("StreaksDB").collection("users");
    const guestsCollection = client.db("StreaksDB").collection("guests");

    visitorData = await usersCollection.findOne({ uuid: visitorUUID });

    if (!visitorData) {
      visitorData = await guestsCollection.findOne({ uuid: visitorUUID });
    }

    if (!visitorData) {
      const newUUID = uuidv4();
      await guestsCollection.insertOne({ uuid: newUUID });
      visitorData = { uuid: newUUID };
    }
  } catch (error) {
    console.error('An error occurred while connecting to the database:', error);
  } finally {
    await client.close();
  }

  return {
    statusCode: 200,
    body: JSON.stringify(visitorData)
  };
};