require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/questionModel'); // Import the Question model

const questions = [
   {
      question: "What is the meaning of 'abundant'?",
      options: ["scarce", "plentiful", "dangerous", "complex"],
      correctAnswer: 1,
      difficultyLevel: 1
   },
   {
      question: "Which word is closest in meaning to 'gregarious'?",
      options: ["shy", "sociable", "angry", "lonely"],
      correctAnswer: 1,
      difficultyLevel: 2
   },
   {
      question: "What does 'ambiguous' mean?",
      options: ["clear", "vague", "harmful", "rapid"],
      correctAnswer: 1,
      difficultyLevel: 2
   },
   {
      question: "Which word is an antonym of 'benevolent'?",
      options: ["kind", "cruel", "generous", "peaceful"],
      correctAnswer: 1,
      difficultyLevel: 3
   },
   {
      question: "What does 'superfluous' mean?",
      options: ["necessary", "excessive", "urgent", "hidden"],
      correctAnswer: 1,
      difficultyLevel: 3
   },
   {
      question: "Which of the following is closest in meaning to 'elated'?",
      options: ["joyful", "worried", "tired", "bored"],
      correctAnswer: 0,
      difficultyLevel: 1
   },
   {
      question: "What is the meaning of 'omniscient'?",
      options: ["all-knowing", "powerful", "wise", "mysterious"],
      correctAnswer: 0,
      difficultyLevel: 2
   },
   {
      question: "Which word is an antonym of 'meticulous'?",
      options: ["careless", "precise", "detailed", "painstaking"],
      correctAnswer: 0,
      difficultyLevel: 3
   },
   {
      question: "What does 'ephemeral' mean?",
      options: ["lasting a very short time", "permanent", "unreliable", "beautiful"],
      correctAnswer: 0,
      difficultyLevel: 3
   },
   {
      question: "Which of the following words means 'harmful'?",
      options: ["benign", "malicious", "innocuous", "beneficial"],
      correctAnswer: 1,
      difficultyLevel: 2
   }
];

async function main() {
   try {
      // Connect to MongoDB
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });

      // Insert questions into the database
      const result = await Question.insertMany(questions);
      console.log(`${result.length} questions were inserted successfully.`);
   } catch (error) {
      console.error('Error inserting questions:', error);
   } finally {
      // Disconnect from MongoDB
      mongoose.connection.close();
   }
}

main().catch(console.error);
