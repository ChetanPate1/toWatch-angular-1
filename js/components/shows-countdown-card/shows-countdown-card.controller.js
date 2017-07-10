angular
   .module('app')
   .controller('ShowsCountdownCardController', ShowsCountdownCardController);

ShowsCountdownCardController.$inject = ['firebaseAuth'];

function ShowsCountdownCardController(firebaseAuth){
   var vm = this;

   vm.open = false;
   vm.toggleOpen = toggleOpen;

   function toggleOpen() {
      vm.open = !vm.open;
   }
}
