angular
   .module('app')
   .controller('CountdownCardController', CountdownCardController);

CountdownCardController.$inject = ['firebaseAuth'];

function CountdownCardController(firebaseAuth){
   var vm = this;

   // vm.shows = ;

   vm.loggedIn = loggedIn;

   function loggedIn(){
      return firebaseAuth.$getAuth();
   }

}
