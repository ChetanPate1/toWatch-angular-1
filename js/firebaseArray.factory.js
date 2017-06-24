angular
   .module('app')
   .factory('firebaseArray', firebaseArray);

firebaseArray.$inject = ['$firebaseArray'];

function firebaseArray($firebaseArray){

   var ref = firebase.database().ref();
   // this uses AngularFire to create the synchronized array
   return $firebaseArray(ref);
}
