'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// https://firebase.google.com/docs/functions/write-firebase-functions

exports.rewatchInitialise = functions.database.ref('/rewatch/{uid}/{pushId}').onWrite(event => {
   const rewatch = event.data.val();
   if(rewatch.init){
      return;
   }

   rewatch.init = true;
   console.log(rewatch);
   return event.data.ref.set(rewatch);
   //if init return
   //copy show seasons
   //add watched = false
   //put it show:
   //set init: true
});
