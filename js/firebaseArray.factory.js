angular
   .module('app')
   .factory('firebaseArray', firebaseArray);

firebaseArray.$inject = ['$firebaseArray'];

function firebaseArray($firebaseArray){
   var vm = this;
   var service = {
      save: save,
      getByRef: getByRef,
      getAll: getAll
   };

   function save(ref, data) {
      var ref = firebase.database().ref(ref);
      return $firebaseArray(ref).$add(data);
   }

   function getByRef(ref) {
      var ref = firebase.database().ref(ref);
      // this uses AngularFire to create the synchronized array
      return $firebaseArray(ref);
   }

   function getAll() {
      var ref = firebase.database().ref();
      // this uses AngularFire to create the synchronized array
      return $firebaseArray(ref);
   }

   return service;
}
