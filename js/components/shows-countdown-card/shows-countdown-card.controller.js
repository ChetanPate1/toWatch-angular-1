angular
   .module('app')
   .controller('ShowsCountdownCardController', ShowsCountdownCardController);

ShowsCountdownCardController.$inject = ['firebaseAuth'];

function ShowsCountdownCardController(firebaseAuth){
   var vm = this;

   // vm.shows = ;

   vm.loggedIn = loggedIn;

   function loggedIn(){
      return firebaseAuth.$getAuth();
   }

}
