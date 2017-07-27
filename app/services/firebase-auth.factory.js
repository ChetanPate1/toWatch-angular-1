angular
   .module('app')
   .factory('firebaseAuth', firebaseAuth);

firebaseAuth.$inject = ['$firebaseAuth'];

function firebaseAuth($firebaseAuth){
   return $firebaseAuth();
}
