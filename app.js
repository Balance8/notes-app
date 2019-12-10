const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//customize yargs version

yargs.version('1.1.0');

// create add command
yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

//create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: function() {
    console.log('removing the note');
  }
});

// create list command
yargs.command({
  command: 'list',
  describe: 'list all notes',
  handler: function() {
    console.log('Listing out all notes');
  }
});

// create read command
yargs.command({
  command: 'read',
  describe: 'read a note',
  handler: function() {
    console.log('reading a note');
  }
});

//add,remove,read,list

// console.log(yargs.argv);
yargs.parse();
