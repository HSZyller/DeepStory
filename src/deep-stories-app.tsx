import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, BookOpen, Plus, X, Trash2, Save, Upload, FileUp, RefreshCw } from 'lucide-react';
import './deep-stories-app.css';

const RULES_DOCUMENT = `Rules For Deep Stories
I want us to play a game. Similar to DnD Or more accurately Kids On Bikes, but using different Dice types as the Skill effectiveness.
Here are the Rules:
I will give you the basic scene part, and information I think you can use.
Your main function will be the options, for example the items a store might have, the quests and more on a notice board, things like this
I'll give most of the info and you can add a little fluff but I control my character or Characters fully without interference from you.
I will give general info about what I want you to create be it possible locations and other [normally like this in square brackets]
Dialog is done 1 section at a time with each section be no longer the one side of a conversation
There will be rolls or change elements I will ask for, difficulty is in numbers for with 4 being easy and 15 being expert, the difficulty can go above or below these number in needed. Something impossible would-be 25+ which could be passed with luck or magic if it's in the game.
Rolls are done with Dice sized from a D4 to a D20 depending on the Stats Dice Size.
All dice used: D4 D6 D8 D10 D12 D20.
There are stats that can be called upon:
Strength(STR)
Speed(SPD)
Sight(SIT)
Stealth(STH)
Search(SRC)
Charm(CRM)
Special(SPL)
Luck(LUK)

Stats Have Dice sizes as their Value going From a Four-sided dice(D4) to a twenty-Sided Dice(D20)
A Stats Dice value determines how well you can use that stat D4 Terrible, D10 Above Average, D20 Specialized.
Players tend to have 1D4 1D6 2D8 2D10 1D12 1D20, but there can be exceptions for especially powerful or weak characters or NPC's
 A roll can be pushed with a second roll but the second roll will result in a negative Consequence that effects the character that pushed. The Larger the pushed roll the more negative the outcome. Consequences effect the Player or character that Pushed a roll (Or an object they used in the Check) and can effect depending on the value of it which can be short term (1 or more Rolls or checks), Long term (Till Rest, Nap, Or Medical treatment), Or even Permanent all depending on the value of the Consequences.
Like Difficulties Consequences have tiers: Very Soft (1), To Soft(4), To Moderate(8), to Harsh (12) to Dangerous (16) and can be any number between 1 to 25+.
Very Soft Example roughly -1 for 1roll
Soft Example roughly -1 for 2 to 3 rolls
Moderate Example roughly -1 till rest, or -2 for few rolls
Harsh Example roughly -2 till rest or heal, or -3 to 5+ for few rolls
Dangerous Example roughly -3 to 5+ Till rest, or -1 permanent, or multiple -3 to 5+ for few rolls
Above dangerous Example~ Can be anything for any amount of time or permanent, getting this is really bad
Negative Stats effect can spread over multiple skills Like -1 to LUK and STR instead of just -2 to one thing
Consequence Effect Example -
Nervous Strain (Short term)
Effect: -1 to LUK rolls for the next two Rolls involving bladder control or deception (e.g., sneaking past staff, hiding a truth).
Flavor: That close call shook your confidence a bit more than you'd like to admit. You're more on edge now, and that tension might trip you up later.

Roll Result Table don't correspond to the dice being rolled but what result numbers you need in the end to get certain possible outcomes, Normally 1 to 25+ but they can be any number if needed Lowest to highest instead.
Roll Tables don't match Dice type; Teat all roll tables like you don't know what dice is being rolled. a low dice type just means the stat is bad and more likely to fail.
A max roll on the Dice means you can roll the dice again without pushing, this is called exploding the dice or rolling through. How it works is if you roll the max value then you get to roll again and add the numbers up as the new value, you can do this as many times at possible.
Rolls looks like this [Full value (Main Roll/Pushed Roll/Modifier)]
Result Tables can have as many or few outcomes as makes sense or stated
Example Results Table (Difficulty 8)
<=4       You slip and fall accidentally letting go of your weapon
5-7       You slip and fall but you are able to hold onto your weapon
8-12       You walk over
13-17       You confidently walk over giving a good impression +1 on your Next Charm Check
18<=       You Do a flip land in front of them and pick up a Blade from the floor +2 on your next charm Check and you gain a Small Blade

Skills give bonuses directly to rolls depending on the skills stat and level. It looks like: Skill Name (Stat) + (Skill Level)
Abilities giver certain actions or effect which can be passive or active. For example: Fireball, Read Thought, Lucky, Timely. Abilities normally have effects that do stuff, that or they give descriptions like roll with advantage, natural pass check involving, or thing like this.

Result Table for player or NPC's don't match up with the dice, the dice size is just how skilled they are at that stat. In general the Values go from 1 to 25+
NPC's can have their rolls pushed to, NPC's pushed rolls can Count towards the value of their roll but no matter what the player takes the consequence effect like a normal pushed roll, if the NPC is an enemy the Consequence is positive.
{lore info is in curly brackets}
[game stuffs In Square brackets]
Rolls are done by the player unless stated in another post after the result table is shown.
Game works in Checks and Rolls not turns. An Action Doesn't need to result us a roll.
There can be items and resources that need to be tracked and used
Items have a durability that go from 0% to 100% and loss durability on any natural 1 roll
Example:
Named Item - 85% - Bent tip (50% effective)

Pushing with an item giving it the negative effect it is possibly that the effect makes it one use
Wound tokens can be used to track how injured you are. Wound token makes Rolls harder, -1 to all Rolls Per Wound, and can have a max that if you gain a wound after your character must proceed with that worlds consequence like death or Respawn
There Wounds are given out when a character is counted as injured by something
Items 
Don't roll dice unless they ask.
Do not roll dice unless they ask.
Even when a roll fails doesn't mean the outcome doesn't happen a failed roll can just mean things didn't go the way I wanted or expected. Good outcome will always be above the DC number and Bad ones below the DC number.
Example roll table:
DC 10
<=3 Very unwanted outcome may be close to what they wanted and with negative side effects
4-7 Unwelcome outcome but maybe Scene progresses in wanted way but not the way intended
8-9 Nearly No positive outcomes but noting bad happens
10-13 Just what you wanted to happen no bonuses just the normal outcome
14-16 Outcome better then expected and maybe slight bonus
17-22 very good outcome what you wanted and more positive effects and surprise additional outcome
23<= An almost impossibly good outcome way better then expected with large bonuses and maybe other rewards`;

export default function DeepStoriesApp() {
  const [activeTab, setActiveTab] = useState('rolls');
  const [storySoFar, setStorySoFar] = useState('');
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [condensing, setCondensing] = useState(false);
  const [showSaveLoadModal, setShowSaveLoadModal] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [newCharName, setNewCharName] = useState('');
  const [editingChar, setEditingChar] = useState(null);
  const [showImportCharModal, setShowImportCharModal] = useState(false);
  const [importAsNPC, setImportAsNPC] = useState(true);
  
  // Roll Generator State
  const [rollDifficulty, setRollDifficulty] = useState('');
  const [rollStat, setRollStat] = useState('');
  const [rollStatDice, setRollStatDice] = useState('D8');
  const [rollContext, setRollContext] = useState('');
  const [rollResult, setRollResult] = useState('');
  const [rollLoading, setRollLoading] = useState(false);
  
  // Dialogue State
  const [dialogueHistory, setDialogueHistory] = useState([]);
  const [playerInput, setPlayerInput] = useState('');
  const [dialogueLoading, setDialogueLoading] = useState(false);
  const [sceneContext, setSceneContext] = useState('');
  const [sceneDirection, setSceneDirection] = useState('');
  const [showScenePrep, setShowScenePrep] = useState(true);
  const [showNextSceneConfirm, setShowNextSceneConfirm] = useState(false);
  const [inputMode, setInputMode] = useState('action'); // 'action', 'speech', 'stage', 'query'
  const [selectedSpeaker, setSelectedSpeaker] = useState('');
  const [waitForAI, setWaitForAI] = useState(true);
  const [responseLength, setResponseLength] = useState('medium'); // 'short', 'medium', 'long'

  // Ref for auto-scrolling dialogue
  const dialogueEndRef = useRef(null);

  // AI Functionality
  const [openaiApiKey, setOpenaiApiKey] = useState('');

  // Auto-scroll to bottom when dialogue updates
  useEffect(() => {
    if (dialogueEndRef.current) {
      dialogueEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dialogueHistory]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('deepStoriesSession');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.storySoFar) setStorySoFar(data.storySoFar);
        if (data.characters) setCharacters(data.characters);
        if (data.dialogueHistory) setDialogueHistory(data.dialogueHistory);
        if (data.sceneContext) setSceneContext(data.sceneContext);
        if (data.sceneDirection) setSceneDirection(data.sceneDirection);
      }
    } catch (error) {
      console.error('Error loading session:', error);
    }
  }, []);

  const saveSession = () => {
    try {
      const sessionData = {
        storySoFar,
        characters,
        dialogueHistory,
        sceneContext,
        sceneDirection,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('deepStoriesSession', JSON.stringify(sessionData));
      alert('Session saved successfully!');
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Error saving session. Please try again.');
    }
  };

  const exportSession = () => {
    try {
      const sessionData = {
        storySoFar,
        characters,
        dialogueHistory,
        sceneContext,
        sceneDirection,
        savedAt: new Date().toISOString()
      };
      const dataStr = JSON.stringify(sessionData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `deep-stories-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting session:', error);
      alert('Error exporting session. Please try again.');
    }
  };

  const importSession = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
  
        if (typeof result !== "string") {
          throw new Error("FileReader result is not a string");
        }
  
        const data = JSON.parse(result);
  
        if (data.storySoFar) setStorySoFar(data.storySoFar);
        if (data.characters) setCharacters(data.characters);
        if (data.dialogueHistory) setDialogueHistory(data.dialogueHistory);
        if (data.sceneContext) setSceneContext(data.sceneContext);
        if (data.sceneDirection) setSceneDirection(data.sceneDirection);
  
        alert("Session loaded successfully!");
        setShowSaveLoadModal(false);
      } catch (error) {
        console.error("Error importing session:", error);
        alert(
          "Error loading file. Please make sure it's a valid Deep Stories save file."
        );
      }
    };
  
    reader.readAsText(file);
  };
  

  const clearSession = () => {
    if (confirm('Are you sure you want to clear the entire session? This cannot be undone.')) {
      setStorySoFar('');
      setCharacters([]);
      setDialogueHistory([]);
      setRollResult('');
      setSceneContext('');
      setSceneDirection('');
      localStorage.removeItem('deepStoriesSession');
      alert('Session cleared.');
    }
  };

  const importCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
  
        if (typeof result !== "string") {
          throw new Error("FileReader result is not a string");
        }
  
        const data = JSON.parse(result);
  
        // Convert imported character format to app format
        const newChar = {
          name: data.characterName || data.name || "Unnamed Character",
          isNPC: importAsNPC,
          inScene: false,
          appearance: data.appearance || "",
          role: data.role || data.class || "",
          notes: data.notes || data.background || "",
          statValues: {} as Record<string, number>,
        };
  
        // Map stats
        if (data.stats) {
          const statMapping: Record<string, string> = {
            Strength: "STR",
            Speed: "SPD",
            Sight: "SIT",
            Stealth: "STH",
            Search: "SRC",
            Charm: "CRM",
            Special: "SPL",
            Luck: "LUK",
          };
  
          Object.entries(data.stats).forEach(([key, value]) => {
            const mappedKey = statMapping[key] || key;
            (newChar.statValues as any)[mappedKey] = value as number;
          });
        }
  
        setCharacters([...characters, newChar]);
        setShowImportCharModal(false);
        alert(
          `Character "${newChar.name}" imported successfully as ${
            importAsNPC ? "NPC" : "Player Character"
          }!`
        );
      } catch (error) {
        console.error("Error importing character:", error);
        alert(
          "Error loading character file. Please make sure it's a valid JSON character file."
        );
      }
    };
  
    reader.readAsText(file);
  };
  

  const exportCharacter = (index) => {
    try {
      const char = characters[index];
      const exportData = {
        characterName: char.name,
        type: char.isNPC ? 'NPC' : 'Player',
        appearance: char.appearance || '',
        role: char.role || '',
        notes: char.notes || '',
        stats: {}
      };

      // Convert stat format
      const statMapping = {
        'STR': 'Strength',
        'SPD': 'Speed',
        'SIT': 'Sight',
        'STH': 'Stealth',
        'SRC': 'Search',
        'CRM': 'Charm',
        'SPL': 'Special',
        'LUK': 'Luck'
      };

      if (char.statValues) {
        Object.entries(char.statValues).forEach(([key, value]) => {
          if (value) {
            exportData.stats[statMapping[key] || key] = value;
          }
        });
      }

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${char.name.replace(/\s+/g, '-').toLowerCase()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error exporting character:', error);
      alert('Error exporting character. Please try again.');
    }
  };

  const addCharacter = (isNPC = true) => {
    if (newCharName.trim()) {
      setCharacters([...characters, {
        name: newCharName.trim(),
        isNPC: isNPC,
        inScene: false,
        appearance: '',
        stats: '',
        role: '',
        notes: ''
      }]);
      setNewCharName('');
    }
  };

  const removeCharacter = (index) => {
    setCharacters(characters.filter((_, i) => i !== index));
  };

  const toggleInScene = (index) => {
    const updated = [...characters];
    updated[index].inScene = !updated[index].inScene;
    setCharacters(updated);
  };

  const updateCharacter = (index, field, value) => {
    const updated = [...characters];
    updated[index][field] = value;
    setCharacters(updated);
  };

  const updateCharacterStat = (index, stat, value) => {
    const updated = [...characters];
    if (!updated[index].statValues) {
      updated[index].statValues = {};
    }
    updated[index].statValues[stat] = value;
    setCharacters(updated);
  };

  const getStatsString = (char) => {
    if (!char.statValues) return '';
    return Object.entries(char.statValues)
      .filter(([_, value]) => value)
      .map(([stat, dice]) => `${stat}:${dice}`)
      .join(', ');
  };

  const condenseStory = async () => {
    if (!storySoFar.trim()) {
      alert('No story to condense yet.');
      return;
    }

    if (!openaiApiKey.trim()) {
      alert('Please paste your OpenAI API key first.');
      return;
    }

    setCondensing(true);

    try {
      const prompt = `
      You are helping condense a Deep Stories RPG game narrative. Take the following story log and create a condensed, simplified summary that preserves all important events, decisions, character interactions, and outcomes while removing unnecessary details.

      Current Story Log:
      ${storySoFar}
      
      Create a condensed version that:
      - Keeps all major plot points and character decisions
      - Preserves important NPC interactions and discoveries
      - Maintains key rolls and their outcomes
      - Removes redundant dialogue and minor details
      - Uses clear, concise language
      - Organizes events chronologically
      
      Return ONLY the condensed story summary, nothing else.
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.9,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });
      const data = await response.json();
      const condensedText: string | undefined =
      data.choices?.[0]?.message?.content;
      
      if (!condensedText) {
        throw new Error('No content returned from OpenAI');
      }
      setStorySoFar(condensedText);
      
    } catch (error) {
      console.error('Error condensing story:', error);
      alert('Error condensing story. Please try again.');
    } finally {
      setCondensing(false);
    }
  };

  const generateRollTable = async () => {
    if (!rollDifficulty || !rollContext) {
      alert('Please enter a difficulty and action context');
      return;
    }

    setRollLoading(true);
    setRollResult('');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `You are running a Deep Stories RPG game. Here are the complete rules:

${RULES_DOCUMENT}

The player wants to generate a Roll Result Table for the following action:

Action: ${rollContext}
Stat Being Used: ${rollStat || 'Not specified'} (${rollStatDice})
Difficulty: ${rollDifficulty}

Generate a Roll Result Table following the rules format. Remember:
- Tables go from 1 to 25+ (not based on dice type)
- Show outcomes below DC (failures), at DC (success), and above DC (better successes)
- Include interesting consequences and bonuses
- Format like the examples in the rules
- DO NOT roll any dice - just provide the table

Return ONLY the formatted table, nothing else.`
            }
          ]
        })
      });

      const data = await response.json();
      const tableText = data.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');

      setRollResult(tableText);
      
      // Update story
      const storyUpdate = `\n[Roll Table Generated: ${rollStat || 'Action'} check, DC ${rollDifficulty} - ${rollContext}]`;
      setStorySoFar(prev => prev + storyUpdate);
      
    } catch (error) {
      console.error('Error generating roll table:', error);
      setRollResult('Error generating roll table. Please try again.');
    } finally {
      setRollLoading(false);
    }
  };

  const sendDialogue = async () => {
    if (!playerInput.trim()) return;

    let messageText = playerInput;
    let messageType = inputMode;

    // Format the message based on input mode
    if (inputMode === 'speech' && selectedSpeaker) {
      messageText = `${selectedSpeaker}: "${playerInput}"`;
    } else if (inputMode === 'stage') {
      messageText = `[Stage Direction: ${playerInput}]`;
    } else if (inputMode === 'query') {
      messageText = `[Query: ${playerInput}]`;
    }

    const newMessage = { role: 'player', text: messageText, type: messageType };
    const updatedHistory = [...dialogueHistory, newMessage];
    setDialogueHistory(updatedHistory);
    setPlayerInput('');

    // Don't call AI if waitForAI is false (for player-to-player dialogue)
    if (!waitForAI && inputMode === 'speech') {
      return;
    }

    setDialogueLoading(true);

    try {
      const conversationHistory = updatedHistory.map(msg => ({
        role: msg.role === 'player' ? 'user' : 'assistant',
        content: msg.text
      }));

      let systemPrompt = `You are running a Deep Stories RPG game. Here are the complete rules:

${RULES_DOCUMENT}

Characters currently in the scene:
${characters.filter(c => c.inScene).map(c => {
  let info = `- ${c.name} [${c.isNPC ? 'NPC' : 'PLAYER CHARACTER'}]`;
  if (c.role) info += ` (${c.role})`;
  if (c.appearance) info += `\n  Appearance: ${c.appearance}`;
  const statsStr = getStatsString(c);
  if (statsStr) info += `\n  Stats: ${statsStr}`;
  if (c.notes) info += `\n  Notes: ${c.notes}`;
  return info;
}).join('\n') || 'None specified'}

Scene Context: ${sceneContext || 'Not specified'}

Scene Direction/Goal: ${sceneDirection || 'Not specified'}

Story so far:
${storySoFar || 'Just beginning...'}`;

      // Add response length guidance
      let lengthGuidance = '';
      if (responseLength === 'short') {
        lengthGuidance = '\n\nIMPORTANT: Keep your response brief and concise - 1-3 sentences maximum.';
      } else if (responseLength === 'medium') {
        lengthGuidance = '\n\nIMPORTANT: Keep your response moderate in length - around 3-5 sentences.';
      } else if (responseLength === 'long') {
        lengthGuidance = '\n\nIMPORTANT: You can provide a detailed response - 5-8 sentences with rich description.';
      }

      systemPrompt += lengthGuidance;
      // Customize prompt based on input mode
      if (inputMode === 'query') {
        systemPrompt += `

The player is asking a question about the scene/world. Answer their query helpfully but DO NOT move the scene forward or add new narrative elements.

Player query: ${playerInput}

Provide a clear, informative answer without progressing the story.`;
      } else if (inputMode === 'stage') {
        systemPrompt += `

The player has provided a stage direction describing an event or action.

Stage direction: ${playerInput}

Respond with:
- NPC reactions to this event
- Environmental descriptions and atmosphere
- Stage-level details (sounds, sights, changes in the scene)
- DO NOT include character dialogue unless it's a direct reaction
- Focus on narration and description

Respond now:`;
      } else if (inputMode === 'speech') {
        systemPrompt += `

The player character just spoke. This is pure dialogue interaction.

${messageText}

Respond with:
- NPC dialogue in response
- Keep it conversational and focused on what NPCs would say
- Minimal stage directions - only if essential to the dialogue
- DO NOT narrate actions unless directly related to speech (like facial expressions during talking)

Respond now:`;
      } else {
        systemPrompt += `

The player controlling their character(s) just said/did:
${messageText}

Respond as the NPCs and environment. Remember:
- Control ONLY the NPCs, NOT the player characters
- Player characters are marked as [PLAYER CHARACTER] - never control their actions or dialogue
- Keep dialogue to one exchange
- Add flavor and options (items, quests, environment details)
- Keep it concise - one section at a time
- Consider the scene context and direction
- Include dialogue, actions, descriptions, and reactions as appropriate
- DO NOT roll any dice
- Note: {curly brackets} and [square brackets] are for player use in their messages, not for AI responses

Respond now:`;
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            ...conversationHistory,
            {
              role: 'user',
              content: systemPrompt
            }
          ]
        })
      });

      const data = await response.json();
      const npcResponse = data.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');

      setDialogueHistory(prev => [...prev, { role: 'npc', text: npcResponse }]);
      
    } catch (error) {
      console.error('Error getting NPC response:', error);
      setDialogueHistory(prev => [...prev, { role: 'npc', text: 'Error getting response. Please try again.' }]);
    } finally {
      setDialogueLoading(false);
    }
  };

  const regenerateLastMessage = async () => {
    // Find the last AI message
    const lastAIIndex = dialogueHistory.length - 1;
    if (lastAIIndex < 0 || dialogueHistory[lastAIIndex].role !== 'npc') {
      alert('No AI message to regenerate.');
      return;
    }

    // Remove the last AI message
    const historyWithoutLastAI = dialogueHistory.slice(0, -1);
    setDialogueHistory(historyWithoutLastAI);
    setDialogueLoading(true);

    try {
      const conversationHistory = historyWithoutLastAI.map(msg => ({
        role: msg.role === 'player' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Get the last player message to determine context
      const lastPlayerMsg = historyWithoutLastAI[historyWithoutLastAI.length - 1];
      const lastInputMode = lastPlayerMsg?.type || 'action';

      let systemPrompt = `You are running a Deep Stories RPG game. Here are the complete rules:

${RULES_DOCUMENT}

Characters currently in the scene:
${characters.filter(c => c.inScene).map(c => {
  let info = `- ${c.name} [${c.isNPC ? 'NPC' : 'PLAYER CHARACTER'}]`;
  if (c.role) info += ` (${c.role})`;
  if (c.appearance) info += `\n  Appearance: ${c.appearance}`;
  const statsStr = getStatsString(c);
  if (statsStr) info += `\n  Stats: ${statsStr}`;
  if (c.notes) info += `\n  Notes: ${c.notes}`;
  return info;
}).join('\n') || 'None specified'}

Scene Context: ${sceneContext || 'Not specified'}

Scene Direction/Goal: ${sceneDirection || 'Not specified'}

Story so far:
${storySoFar || 'Just beginning...'}`;

      // Add response length guidance
      let lengthGuidance = '';
      if (responseLength === 'short') {
        lengthGuidance = '\n\nIMPORTANT: Keep your response brief and concise - 1-3 sentences maximum.';
      } else if (responseLength === 'medium') {
        lengthGuidance = '\n\nIMPORTANT: Keep your response moderate in length - around 3-5 sentences.';
      } else if (responseLength === 'long') {
        lengthGuidance = '\n\nIMPORTANT: You can provide a detailed response - 5-8 sentences with rich description.';
      }

      systemPrompt += lengthGuidance;

      // Customize prompt based on last input mode
      if (lastInputMode === 'query') {
        systemPrompt += `

The player asked a question. Answer it helpfully but DO NOT move the scene forward or add new narrative elements.

Provide a clear, informative answer without progressing the story.`;
      } else if (lastInputMode === 'stage') {
        systemPrompt += `

The player provided a stage direction.

Respond with:
- NPC reactions to this event
- Environmental descriptions and atmosphere
- Stage-level details (sounds, sights, changes in the scene)
- DO NOT include character dialogue unless it's a direct reaction
- Focus on narration and description

Respond now:`;
      } else if (lastInputMode === 'speech') {
        systemPrompt += `

The player character just spoke. This is pure dialogue interaction.

Respond with:
- NPC dialogue in response
- Keep it conversational and focused on what NPCs would say
- Minimal stage directions - only if essential to the dialogue
- DO NOT narrate actions unless directly related to speech (like facial expressions during talking)

Respond now:`;
      } else {
        systemPrompt += `

Respond as the NPCs and environment. Remember:
- Control ONLY the NPCs, NOT the player characters
- Player characters are marked as [PLAYER CHARACTER] - never control their actions or dialogue
- Keep dialogue to one exchange
- Add flavor and options (items, quests, environment details)
- Keep it concise - one section at a time
- Consider the scene context and direction
- Include dialogue, actions, descriptions, and reactions as appropriate
- DO NOT roll any dice
- Note: {curly brackets} and [square brackets] are for player use in their messages, not for AI responses

Respond now:`;
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            ...conversationHistory,
            {
              role: 'user',
              content: systemPrompt
            }
          ]
        })
      });

      const data = await response.json();
      const npcResponse = data.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');

      setDialogueHistory(prev => [...prev, { role: 'npc', text: npcResponse }]);
      
    } catch (error) {
      console.error('Error regenerating message:', error);
      alert('Error regenerating message. Please try again.');
      // Restore the old message on error
      setDialogueHistory(dialogueHistory);
    } finally {
      setDialogueLoading(false);
    }
  };

  const nextScene = async () => {
    if (dialogueHistory.length === 0) {
      alert('No scene to summarize yet.');
      return;
    }

    setDialogueLoading(true);

    try {
      // Generate scene summary
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.9,
          messages: [
            {
              role: 'user',
              content: `Summarize this scene from a Deep Stories RPG session into 2-4 sentences. Focus on key events, decisions, and outcomes.

Scene Context: ${sceneContext || 'Not specified'}

Dialogue:
${dialogueHistory.map(msg => `${msg.role === 'player' ? 'Player' : 'NPCs/Scene'}: ${msg.text}`).join('\n')}

Provide ONLY the summary, nothing else.`
            }
          ]
        })
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('OpenAI error:', text);
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();

      const summary = data.choices?.[0]?.message?.content;


      // Add summary to story
      const sceneHeader = sceneContext ? `\n\n=== Scene: ${sceneContext} ===\n` : '\n\n=== New Scene ===\n';
      setStorySoFar(prev => prev + sceneHeader + summary);

      // Clear scene
      setDialogueHistory([]);
      setSceneContext('');
      setSceneDirection('');
      setShowScenePrep(true);
      setShowNextSceneConfirm(false);

      alert('Scene summarized and added to Story So Far. Ready for next scene!');
      
    } catch (error) {
      console.error('Error summarizing scene:', error);
      alert('Error summarizing scene. Please try again.');
    } finally {
      setDialogueLoading(false);
    }
  };

  return (
    <div className="deep-stories-app min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      <div className="deep-stories-container mx-auto">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Deep Stories
            </h1>
            <p className="text-slate-300">AI-Powered Story Assistant</p>
          </div>
          <button
            onClick={() => setShowSaveLoadModal(true)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save size={20} />
            Save/Load
          </button>
        </div>

        {/* Story So Far Button */}
        <button
          onClick={() => setShowStoryModal(true)}
          className="mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2 transition-colors"
        >
          <BookOpen size={20} />
          Story So Far
        </button>

        {/* Character Tracker */}
        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-purple-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Users size={20} className="text-purple-400" />
            <h2 className="text-lg font-semibold">Character Management</h2>
          </div>
          
          {/* Player Characters Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-green-400">Player Characters</h3>
              <button
                onClick={() => {
                  setImportAsNPC(false);
                  setShowImportCharModal(true);
                }}
                className="px-2 py-1 bg-green-600/50 hover:bg-green-600 rounded text-xs flex items-center gap-1 transition-colors"
              >
                <FileUp size={14} />
                Import
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {characters.filter(c => !c.isNPC).map((char, idx) => {
                const actualIdx = characters.indexOf(char);
                return (
                  <div key={actualIdx} className="p-3 bg-green-900/20 rounded-lg border border-green-600/30">
                    {editingChar === actualIdx ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={char.name}
                          onChange={(e) => updateCharacter(actualIdx, 'name', e.target.value)}
                          className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none font-semibold"
                        />
                        <input
                          type="text"
                          value={char.appearance}
                          onChange={(e) => updateCharacter(actualIdx, 'appearance', e.target.value)}
                          placeholder="Appearance..."
                          className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-sm"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-slate-400">STR</label>
                            <select
                              value={char.statValues?.STR || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'STR', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">SPD</label>
                            <select
                              value={char.statValues?.SPD || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'SPD', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">SIT</label>
                            <select
                              value={char.statValues?.SIT || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'SIT', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">STH</label>
                            <select
                              value={char.statValues?.STH || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'STH', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">SRC</label>
                            <select
                              value={char.statValues?.SRC || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'SRC', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">CRM</label>
                            <select
                              value={char.statValues?.CRM || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'CRM', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">SPL</label>
                            <select
                              value={char.statValues?.SPL || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'SPL', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">LUK</label>
                            <select
                              value={char.statValues?.LUK || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'LUK', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={char.role}
                          onChange={(e) => updateCharacter(actualIdx, 'role', e.target.value)}
                          placeholder="Role (e.g., Warrior, Mage)..."
                          className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-sm"
                        />
                        <textarea
                          value={char.notes}
                          onChange={(e) => updateCharacter(actualIdx, 'notes', e.target.value)}
                          placeholder="Additional notes..."
                          rows={2}
                          className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-sm resize-none"
                        />
                        <button
                          onClick={() => setEditingChar(null)}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
                        >
                          Done Editing
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="checkbox"
                            checked={char.inScene}
                            onChange={() => toggleInScene(actualIdx)}
                            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-green-600 focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-green-300">{char.name}</div>
                            {char.role && <div className="text-xs text-slate-400">Role: {char.role}</div>}
                            {getStatsString(char) && <div className="text-xs text-slate-400">Stats: {getStatsString(char)}</div>}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingChar(actualIdx)}
                            className="px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => exportCharacter(actualIdx)}
                            className="px-2 py-1 bg-blue-600/50 hover:bg-blue-600 rounded text-xs transition-colors"
                          >
                            Export
                          </button>
                          <button
                            onClick={() => removeCharacter(actualIdx)}
                            className="px-2 py-1 bg-red-600/50 hover:bg-red-600 rounded text-xs transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {characters.filter(c => !c.isNPC).length === 0 && (
                <span className="text-slate-400 text-sm block text-center py-2">No player characters yet</span>
              )}
            </div>
          </div>

          {/* NPCs Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-blue-400">NPCs</h3>
              <button
                onClick={() => {
                  setImportAsNPC(true);
                  setShowImportCharModal(true);
                }}
                className="px-2 py-1 bg-blue-600/50 hover:bg-blue-600 rounded text-xs flex items-center gap-1 transition-colors"
              >
                <FileUp size={14} />
                Import
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {characters.filter(c => c.isNPC).map((char, idx) => {
                const actualIdx = characters.indexOf(char);
                return (
                  <div key={actualIdx} className="p-3 bg-blue-900/20 rounded-lg border border-blue-600/30">
                    {editingChar === actualIdx ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={char.name}
                          onChange={(e) => updateCharacter(actualIdx, 'name', e.target.value)}
                          className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none font-semibold"
                        />
                        <input
                          type="text"
                          value={char.appearance}
                          onChange={(e) => updateCharacter(actualIdx, 'appearance', e.target.value)}
                          placeholder="Appearance..."
                          className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-sm"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-slate-400">STR</label>
                            <select
                              value={char.statValues?.STR || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'STR', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">SPD</label>
                            <select
                              value={char.statValues?.SPD || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'SPD', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">SIT</label>
                            <select
                              value={char.statValues?.SIT || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'SIT', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">STH</label>
                            <select
                              value={char.statValues?.STH || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'STH', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">SRC</label>
                            <select
                              value={char.statValues?.SRC || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'SRC', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">CRM</label>
                            <select
                              value={char.statValues?.CRM || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'CRM', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">SPL</label>
                            <select
                              value={char.statValues?.SPL || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'SPL', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">LUK</label>
                            <select
                              value={char.statValues?.LUK || ''}
                              onChange={(e) => updateCharacterStat(actualIdx, 'LUK', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-xs"
                            >
                              <option value="">-</option>
                              <option value="D4">D4</option>
                              <option value="D6">D6</option>
                              <option value="D8">D8</option>
                              <option value="D10">D10</option>
                              <option value="D12">D12</option>
                              <option value="D20">D20</option>
                            </select>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={char.role}
                          onChange={(e) => updateCharacter(actualIdx, 'role', e.target.value)}
                          placeholder="Role (e.g., Merchant, Guard, Ally)..."
                          className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-sm"
                        />
                        <textarea
                          value={char.notes}
                          onChange={(e) => updateCharacter(actualIdx, 'notes', e.target.value)}
                          placeholder="Additional notes..."
                          rows={2}
                          className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-sm resize-none"
                        />
                        <button
                          onClick={() => setEditingChar(null)}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
                        >
                          Done Editing
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="checkbox"
                            checked={char.inScene}
                            onChange={() => toggleInScene(actualIdx)}
                            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-blue-300">{char.name}</div>
                            {char.role && <div className="text-xs text-slate-400">Role: {char.role}</div>}
                            {getStatsString(char) && <div className="text-xs text-slate-400">Stats: {getStatsString(char)}</div>}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingChar(actualIdx)}
                            className="px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => exportCharacter(actualIdx)}
                            className="px-2 py-1 bg-blue-600/50 hover:bg-blue-600 rounded text-xs transition-colors"
                          >
                            Export
                          </button>
                          <button
                            onClick={() => removeCharacter(actualIdx)}
                            className="px-2 py-1 bg-red-600/50 hover:bg-red-600 rounded text-xs transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {characters.filter(c => c.isNPC).length === 0 && (
                <span className="text-slate-400 text-sm block text-center py-2">No NPCs yet</span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newCharName}
              onChange={(e) => setNewCharName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addCharacter(true);
                }
              }}
              placeholder="New character name..."
              className="flex-1 px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
            />
            <button
              onClick={() => addCharacter(false)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition-colors whitespace-nowrap"
            >
              + Player
            </button>
            <button
              onClick={() => addCharacter(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors whitespace-nowrap"
            >
              + NPC
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('rolls')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'rolls'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            Roll Table Generator
          </button>
          <button
            onClick={() => setActiveTab('dialogue')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'dialogue'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            Dialogue & NPCs
          </button>
        </div>

        {/* Roll Table Generator Tab */}
        {activeTab === 'rolls' && (
          <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-4">Generate Roll Result Table</h2>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Stat Being Used</label>
                  <select
                    value={rollStat}
                    onChange={(e) => setRollStat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Select Stat...</option>
                    <option value="STR">Strength (STR)</option>
                    <option value="SPD">Speed (SPD)</option>
                    <option value="SIT">Sight (SIT)</option>
                    <option value="STH">Stealth (STH)</option>
                    <option value="SRC">Search (SRC)</option>
                    <option value="CRM">Charm (CRM)</option>
                    <option value="SPL">Special (SPL)</option>
                    <option value="LUK">Luck (LUK)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stat Dice Size</label>
                  <select
                    value={rollStatDice}
                    onChange={(e) => setRollStatDice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="D4">D4 (Terrible)</option>
                    <option value="D6">D6 (Below Average)</option>
                    <option value="D8">D8 (Average)</option>
                    <option value="D10">D10 (Above Average)</option>
                    <option value="D12">D12 (Good)</option>
                    <option value="D20">D20 (Specialized)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty (4 = Easy, 15 = Expert)</label>
                <input
                  type="number"
                  value={rollDifficulty}
                  onChange={(e) => setRollDifficulty(e.target.value)}
                  placeholder="e.g., 10"
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Action/Situation Context</label>
                <textarea
                  value={rollContext}
                  onChange={(e) => setRollContext(e.target.value)}
                  placeholder="Describe what you're trying to do..."
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            <button
              onClick={generateRollTable}
              disabled={rollLoading}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {rollLoading ? 'Generating...' : 'Generate Roll Table'}
            </button>

            {rollResult && (
              <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-purple-500/30">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">Roll Result Table:</h3>
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-200">{rollResult}</pre>
              </div>
            )}
          </div>
        )}

        {/* Dialogue Tab */}
        {activeTab === 'dialogue' && (
          <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-4">Dialogue & NPC Controller</h2>

            {/* Scene Prep Section */}
            {showScenePrep && (
              <div className="mb-4 p-4 bg-slate-900/50 rounded-lg border border-blue-500/30">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Scene Preparation</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Scene Context</label>
                    <textarea
                      value={sceneContext}
                      onChange={(e) => setSceneContext(e.target.value)}
                      placeholder="Describe the scene setting, atmosphere, what's happening... (e.g., 'Dark tavern at midnight, tension in the air')"
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-800 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Scene Direction/Goal</label>
                    <textarea
                      value={sceneDirection}
                      onChange={(e) => setSceneDirection(e.target.value)}
                      placeholder="Where should this scene lead? What might happen? (e.g., 'Players need to gather information about the missing artifact')"
                      rows={2}
                      className="w-full px-3 py-2 bg-slate-800 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none text-sm"
                    />
                  </div>
                  <button
                    onClick={() => setShowScenePrep(false)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
                  >
                    Start Scene
                  </button>
                </div>
              </div>
            )}

            {/* Dialogue History */}
            {!showScenePrep && (
              <>
                {/* Input Mode Selector */}
                <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                  <label className="block text-sm font-medium mb-2">Input Mode:</label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button
                      onClick={() => setInputMode('action')}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        inputMode === 'action'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      Action/Mixed
                    </button>
                    <button
                      onClick={() => setInputMode('speech')}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        inputMode === 'speech'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      Speech Only
                    </button>
                    <button
                      onClick={() => setInputMode('stage')}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        inputMode === 'stage'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      Stage Direction
                    </button>
                    <button
                      onClick={() => setInputMode('query')}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        inputMode === 'query'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      AI Query
                    </button>
                  </div>

                  {/* Speech Mode Options */}
                  {inputMode === 'speech' && (
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Speaking Character:</label>
                        <select
                          value={selectedSpeaker}
                          onChange={(e) => setSelectedSpeaker(e.target.value)}
                          className="w-full px-2 py-1 bg-slate-800 rounded border border-slate-600 focus:border-purple-500 focus:outline-none text-sm"
                        >
                          <option value="">Select character...</option>
                          {characters.filter(c => c.inScene && !c.isNPC).map((char, idx) => (
                            <option key={idx} value={char.name}>{char.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="waitForAI"
                          checked={waitForAI}
                          onChange={(e) => setWaitForAI(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-purple-600"
                        />
                        <label htmlFor="waitForAI" className="text-xs text-slate-300">
                          Get AI response (uncheck for player-to-player dialogue)
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Mode Descriptions */}
                  <div className="mt-2 text-xs text-slate-400">
                    {inputMode === 'action' && '→ Regular actions, dialogue, and mixed content'}
                    {inputMode === 'speech' && '→ Pure dialogue from selected character'}
                    {inputMode === 'stage' && '→ Describe events/actions without character attribution'}
                    {inputMode === 'query' && '→ Ask AI about the scene, world, or rules'}
                  </div>
                </div>

                {/* Response Length Control */}
                <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                  <label className="block text-sm font-medium mb-2">AI Response Length:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setResponseLength('short')}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        responseLength === 'short'
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      Short
                    </button>
                    <button
                      onClick={() => setResponseLength('medium')}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        responseLength === 'medium'
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => setResponseLength('long')}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        responseLength === 'long'
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      Long
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    {responseLength === 'short' && '→ Brief responses (1-3 sentences)'}
                    {responseLength === 'medium' && '→ Moderate responses (3-5 sentences)'}
                    {responseLength === 'long' && '→ Detailed responses (5-8 sentences)'}
                  </div>
                </div>

                <div className="mb-4 h-96 overflow-y-auto bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
                  {dialogueHistory.length === 0 ? (
                    <p className="text-slate-400 text-center">Scene ready. Start the conversation!</p>
                  ) : (
                    <div className="space-y-4">
                      {dialogueHistory.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg ${
                            msg.role === 'player'
                              ? 'bg-purple-600/30 ml-8'
                              : 'bg-slate-700/50 mr-8'
                          }`}
                        >
                          <div className="text-xs font-semibold mb-1 text-purple-300">
                            {msg.role === 'player' ? 'You' : 'NPCs/Scene'}
                          </div>
                          <div className="whitespace-pre-wrap">{msg.text}</div>
                        </div>
                      ))}
                      <div ref={dialogueEndRef} />
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mb-3">
                  <textarea
                    value={playerInput}
                    onChange={(e) => setPlayerInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendDialogue();
                      }
                    }}
                    placeholder={
                      inputMode === 'action' ? 'What does your character say or do?' :
                      inputMode === 'speech' ? 'What does your character say?' :
                      inputMode === 'stage' ? 'Describe what happens (e.g., "A loud crash echoes from upstairs")' :
                      'Ask a question about the scene, world, or rules...'
                    }
                    rows={3}
                    className="flex-1 px-3 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none"
                    disabled={dialogueLoading || (inputMode === 'speech' && !selectedSpeaker)}
                  />
                  <button
                    onClick={sendDialogue}
                    disabled={dialogueLoading || !playerInput.trim() || (inputMode === 'speech' && !selectedSpeaker)}
                    className="px-6 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center"
                  >
                    {dialogueLoading ? '...' : <Send size={20} />}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-400">Press Enter to send, Shift+Enter for new line</p>
                  <div className="flex gap-2">
                    {dialogueHistory.length > 0 && dialogueHistory[dialogueHistory.length - 1]?.role === 'npc' && (
                      <button
                        onClick={regenerateLastMessage}
                        disabled={dialogueLoading}
                        className="px-3 py-1 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded text-sm flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw size={14} />
                        Regenerate
                      </button>
                    )}
                    <button
                      onClick={() => setShowScenePrep(true)}
                      className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-sm transition-colors"
                    >
                      Edit Scene Prep
                    </button>
                    <button
                      onClick={() => setShowNextSceneConfirm(true)}
                      disabled={dialogueLoading || dialogueHistory.length === 0}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg text-sm transition-colors"
                    >
                      Next Scene
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Story So Far Modal */}
        {showStoryModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg p-6 w-full max-w-4xl flex flex-col border border-purple-500/30" style={{ height: 'auto', minHeight: '400px', maxHeight: '90vh' }}>
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h2 className="text-2xl font-bold">Story So Far</h2>
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <textarea
                value={storySoFar}
                onChange={(e) => setStorySoFar(e.target.value)}
                placeholder="Your story will be recorded here as you play..."
                className="flex-1 min-h-0 px-3 py-2 bg-slate-900 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none resize-none mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-4 items-center">
              <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-2 rounded">
                <label className="text-xs text-slate-300 whitespace-nowrap">
                  OpenAI API key:
                  </label>
                  <input
                      type="password"
                      className="bg-slate-900 text-xs px-2 py-1 rounded outline-none border border-slate-700 w-48"
                      placeholder="sk-..."
                      value={openaiApiKey}
                      onChange={(e) => setOpenaiApiKey(e.target.value)}
                    />
                  </div>
                </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setStorySoFar('')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Trash2 size={18} />
                  Clear Story
                </button>
                <button
                  onClick={condenseStory}
                  disabled={condensing}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  {condensing ? 'Condensing...' : 'Condense Story'}
                </button>
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save/Load Modal */}
        {showSaveLoadModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-purple-500/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Save/Load Session</h2>
                <button
                  onClick={() => setShowSaveLoadModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={saveSession}
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={20} />
                  Save to Browser
                </button>
                
                <button
                  onClick={exportSession}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload size={20} />
                  Export to File
                </button>
                
                <div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={importSession}
                    className="hidden"
                    id="import-file"
                  />
                  <label
                    htmlFor="import-file"
                    className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer block"
                  >
                    <Upload size={20} className="rotate-180" />
                    Import from File
                  </label>
                </div>
                
                <button
                  onClick={clearSession}
                  className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 size={20} />
                  Clear All Data
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-4">
                Browser saves are automatic on load. Export to file for backup or sharing between devices.
              </p>
            </div>
          </div>
        )}

        {/* Import Character Modal */}
        {showImportCharModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-purple-500/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  Import {importAsNPC ? 'NPC' : 'Player Character'}
                </h2>
                <button
                  onClick={() => setShowImportCharModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-slate-300">
                  Import a character from a JSON file. The character will be added as {importAsNPC ? 'an NPC' : 'a Player Character'}.
                </p>
                
                <input
                  type="file"
                  accept=".json"
                  onChange={importCharacter}
                  className="hidden"
                  id="import-character-file"
                />
                <label
                  htmlFor="import-character-file"
                  className={`w-full px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer block ${
                    importAsNPC 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <FileUp size={20} />
                  Select Character File
                </label>

                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-2">Expected format:</p>
                  <pre className="text-xs text-slate-300 overflow-x-auto">
{`{
  "characterName": "Character Name",
  "appearance": "Description",
  "role": "Class/Role",
  "stats": {
    "Strength": "D8",
    "Speed": "D10",
    ...
  },
  "notes": "Background info"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Scene Confirmation Modal */}
        {showNextSceneConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-red-500/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-red-400">End Current Scene?</h2>
                <button
                  onClick={() => setShowNextSceneConfirm(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-slate-300">
                  This will:
                </p>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                  <li>Create a summary of the current scene</li>
                  <li>Add the summary to "Story So Far"</li>
                  <li>Clear all dialogue history</li>
                  <li>Reset scene preparation</li>
                </ul>
                <p className="text-sm text-red-400 font-semibold">
                  ⚠️ This cannot be undone. The dialogue will be permanently cleared.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNextSceneConfirm(false)}
                    className="flex-1 px-4 py-3 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={nextScene}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-semibold"
                  >
                    End Scene
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}