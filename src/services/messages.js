import Message from '../models/message.js';

export async function postMessage(req, res) {
  const text = req.query.text;

  if (!text)
    return res.status(400).send({
      error: 'no text',
    });

  const isPalidrome = checkPalindrome(text);

  const message = new Message({
    text: isPalidrome ? text : reverseString(text),
    isPalidrome,
  });

  const messageSaved = await message.save();

  res.json(messageSaved);
}

export async function getMessages(req, res) {
  const messages = await Message.find().sort({
    createdAt: 'desc',
  });

  res.json({ messages });
}

function checkPalindrome(str) {
  let l = str.length;

  for (let i = 0; i < l / 2; i++) {
    if (str[i] !== str[l - 1 - i]) return false;
  }

  return true;
}

function reverseString(str) {
  return str === '' ? '' : reverseString(str.substr(1)) + str.charAt(0);
}
