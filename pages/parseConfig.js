import { Parse } from 'parse';


Parse.serverURL = 'https://parseapi.back4app.com';
Parse.initialize('APPLICATION-ID', 'JAVASCRIPT-SDK');
Parse.enableLocalDatastore();

export default Parse;
