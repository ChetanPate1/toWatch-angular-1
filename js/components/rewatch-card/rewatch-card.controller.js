angular
   .module('app')
   .controller('RewatchCardController', RewatchCardController);

RewatchCardController.$inject = ['firebaseAuth'];

function RewatchCardController(firebaseAuth){
   var vm = this;

   vm.open = false;
   vm.toggleOpen = toggleOpen;

   function toggleOpen() {
      vm.open = !vm.open;
   }
}
