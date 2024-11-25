const express = require('express');
const router = express.Router();
const VoiceBot = require('../models/VoiceBot'); 

// Add or update a VoiceBot
router.post('/add', async (req, res) => {
  const { name, logo, prompt, identifier } = req.body;

  try {
    // Check if a VoiceBot with the same identifier already exists
    const existingVoiceBot = await VoiceBot.findOne({ identifier });

    if (existingVoiceBot) {
      // Update the existing VoiceBot
      existingVoiceBot.name = name;
      existingVoiceBot.logo = logo;
      existingVoiceBot.prompt = prompt;

      await existingVoiceBot.save();
      return res.status(200).json({ message: 'VoiceBot updated successfully', voiceBot: existingVoiceBot });
    }

    // Create a new VoiceBot
    const newVoiceBot = new VoiceBot({
      name,
      logo,
      prompt,
      identifier,
    });

    await newVoiceBot.save();
    res.status(201).json({ message: 'VoiceBot added successfully', voiceBot: newVoiceBot });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add or update VoiceBot', details: err.message });
  }
});

// Fetch prompt for a specific VoiceBot
router.get('/prompt/:identifier', async (req, res) => {
  const { identifier } = req.params;

  try {
    const voiceBot = await VoiceBot.findOne({ identifier });
    if (!voiceBot) {
      return res.status(404).json({ error: 'VoiceBot not found' });
    }
    res.status(200).json({ prompt: voiceBot.prompt });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prompt', details: error.message });
  }
});

router.get('/voicebot/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;

    // Fetch the VoiceBot details from the database
    const voiceBot = await VoiceBot.findOne({ identifier });
    if (voiceBot) {
      res.json(voiceBot);
    } else {
      res.status(404).json({ message: 'VoiceBot not found' });
    }
  } catch (error) {
    console.error('Error fetching VoiceBot details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
