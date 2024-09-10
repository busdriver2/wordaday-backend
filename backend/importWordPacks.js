require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const WordPack = require('./models/wordPackModel');
const Word = require('./models/wordModel');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const importWordPacks = async (jsonFilePath) => {
    try {
        const data = fs.readFileSync(jsonFilePath, 'utf-8');
        const wordPacks = JSON.parse(data);

        for (const pack of wordPacks) {
            const { name, price, words } = pack;

            // Save words individually if they don't exist
            const wordIds = [];
            for (const wordData of words) {
                let word = await Word.findOne({ name: wordData.name });

                if (!word) {
                    word = new Word(wordData);
                    await word.save();
                }

                wordIds.push(word._id);
            }

            // Create the word pack
            const wordPack = new WordPack({
                name,
                price,
                words: wordIds // Initially set to false until it's reviewed
            });

            await wordPack.save();
            console.log(`Word Pack "${name}" imported successfully.`);
        }

        console.log('All word packs have been imported successfully.');
    } catch (error) {
        console.error('Error importing word packs:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Path to your JSON file
const jsonFilePath = path.join(__dirname, 'generated_wordpacks.json');

// Start the import process
importWordPacks(jsonFilePath);
