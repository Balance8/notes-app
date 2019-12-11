const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return 'Your notes...';
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log('New Note Added!');
  } else {
    console.log('Note title taken!');
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const keepNotes = notes.filter(note => note.title != title);

  if (notes.length === keepNotes.length) {
    console.log(chalk.red('No notes found'));
  } else {
    saveNotes(keepNotes);
    console.log(chalk.green(`Note titled ${title} removed`));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};
