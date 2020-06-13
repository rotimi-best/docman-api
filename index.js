const { PORT = 9000 } = process.env
require('dotenv').config();
require('./helpers/additionalInit')

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectToDb = require('./db/connect')

const { getUser, addUser, updateUser } = require('./db/cruds/User')
const { getGroup, addGroup, updateGroup } = require('./db/cruds/Group')
const { getDocument, addDocument } = require('./db/cruds/Document')
const getDefaultGroups = require('./helpers/getDefaultGroups')

const len = val => val.length;

const app = express()

// MONGODB ATLAS CONNECTION
connectToDb()

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())

/**
 * @route GET check
 * @route Check if server is running
 * @access Public
 */
app.get('/', (req, res) => {
  const date = new Date()

  res.send(`<h1>&copy; ${date.getFullYear()} API </h1>`)
})

/**
 * @route POST login
 * @route Login
 * @access Public
 */
app.post('/login', async (req, res) => {
  const { email = '', password = '' } = req.body;

  if (!len(email) || !len(password)) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  const [user] = await getUser({ email, password });

  if (!user) {
    return res.status(400).json({ success: false, message: 'Username or Password is wrong' });
  }

  delete user.password;

  res.json({
    success: true,
    user,
  });
});

/**
 * @route POST register
 * @route Register
 * @access Public
 */
app.post('/register', async (req, res) => {
  const { name = '', email = '', password = '', avatarUrl = '' } = req.body;

  if (!len(name) || !len(email) || !len(password)) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  const user = await getUser({ email });

  if (len(user)) {
    return res.status(400).json({ success: false, message: 'Nickname already exists' });
  }

  const newUser = await addUser({
    name,
    email,
    password,
    avatarUrl
  });
  delete newUser.password;

  await addGroup(getDefaultGroups(newUser._id));

  res.json({
    success: true,
    user: newUser,
  });
});

// Add new document to the data store
app.post('/document', async (req, res) => {
  const data = req.body;

  console.log('DOCUMENT GOTTEN FROM REQUEST', data);
  data.userId = ObjectId(data.userId);
  console.log('data', data)
  await addDocument(data);

  res.json({
    success: true,
  });
});

// Get all groups in the data store
app.get('/documents', async (req, res) => {
  const { userId } = req.query;

  const documents = await getDocument({ userId }, { sort: { createdAt: -1 } });

  res.json({ documents });
});


// Get all groups in the data store
app.get('/group', async (req, res) => {
  const userId = ObjectId(req.query.userId);

  const groups = await getGroup({ userId }, { sort: { createdAt: -1 } });

  res.json({ groups });
});

// Get a group in the data store
app.get('/group/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const userId = ObjectId(req.query.userId);

  const [group = {}] = await getGroup({ userId, _id: groupId }, {
    sort: {
      createdAt: -1
    }
  });

  const documents = [];
  for (const _id of group._doc.documents) {
    const [doc] = await getDocument({ _id: ObjectId(_id) })

    documents.push(doc);
  }
  group.documents = documents;

  res.json({ group });
});

// Get a group in the data store
app.put('/group/:groupId', async (req, res) => {
  const groupId = ObjectId(req.params.groupId);
  const documents = req.body.documents.map(d => ObjectId(d));

  await updateGroup({ _id: groupId }, {
    documents
      // $addToSet: {
      //   documents
      // }
  });

  const [group = {}] = await getGroup({  _id: groupId }, {
    sort: {
      createdAt: -1
    }
  });

  if (len(Object.values(group))) {
    const documents = [];
    for (const _id of group._doc.documents) {
      const [doc] = await getDocument({ _id: ObjectId(_id) })

      documents.push(doc);
    }
    group.documents = documents;
  }

  res.json({ group });
});

app.put('/profile', async (req, res) => {
  const { userId, name, avatarUrl } = req.body;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: 'Invalid userId' });
  }

  await updateUser({ _id: userId }, {
    name,
    avatarUrl
  });
  const [user] = await getUser({ _id: userId  });

  if (!user) {
    return res.status(400).json({ success: false, message: 'Username or Password is wrong' });
  }

  delete user.password;

  res.json({
    success: true,
    user
  });
});

app.listen(PORT, () => {
  console.log(` Listening on port ${PORT}`);
});
