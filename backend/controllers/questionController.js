const Question = require('../models/questionModel')
const User = require('../models/userModel')


const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find({}).limit(10); // Fetch 10 questions
        res.status(200).json(questions);
     } catch (error) {
        res.status(500).json({ message: "Server Error" });
     }
}

const submitTest = async (req, res) => {
    const answers  = req.body;
    const userEmail = req.params.email
    const user = await User.findOne({email: userEmail})
    console.log(user)
    console.log(userEmail)

   let score = 0;
   answers.forEach(async answer => {
      const question = await Question.findById(answer.questionId);
      if (question.correctAnswer === answer.selectedOption) {
         score += question.difficultyLevel; // Increment score by difficulty level
      }
   });

   let userLevel;
   if (score < 5) userLevel = 'Beginner';
   else if (score < 10) userLevel = 'Intermediate';
   else userLevel = 'Advanced';
   
   user.level = userLevel
   await user.save()
   // Store userLevel in the user's profile
   res.status(200).json({ userLevel });

}

module.exports = {getQuestions, submitTest}