import * as db_operations from '../db_operations.js';
const prompts = [
  "What is your favorite color?",
  "What do you like to do in your free time?",
  "If you could have any superpower, what would it be?",
  "What is the best book you've ever read?",
  "What is your favorite type of music?",
  "If you could travel anywhere in the world, where would you go?",
  "What is your favorite food?",
  "What is your favorite movie?",
  "What is your dream job?",
  "What is your favorite hobby?",
  "If you could meet any historical figure, who would it be?",
  "What is the most interesting place you've ever been to?",
  "What is your biggest fear?",
  "What is the craziest thing you've ever done?",
  "What is the most important thing in your life?",
  "What is the most challenging thing you've ever faced?",
  "What is your favorite animal?",
  "What is your favorite season?",
  "If you could live in any era, which one would you choose?",
  "What is your favorite childhood memory?"
];

exports.scheduledFunction = functions.pubsub.schedule('every 24 hours').onRun((context) => {
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  db_operations.setPrompt(randomPrompt);
});
