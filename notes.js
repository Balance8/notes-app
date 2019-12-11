const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
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

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue('Your Notes:'));
  notes.forEach(note => {
    console.log(chalk.blue(note.title));
  });
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(
      chalk.green(`Your note is Title: ${note.title}, Body: ${note.body}`)
    );
  } else {
    console.log(chalk.red('No note found'));
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
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
