angular
   .module('app')
   .controller('WatchlistController', WatchlistController);

WatchlistController.$inject = ['currentAuth', 'firebaseArray'];

function WatchlistController(currentAuth, firebaseArray){
   var vm = this;

   vm.data = firebaseArray.getAll();

   vm.send = send;
   vm.openModal = openModal;

   function send() {
      var data = {
         from: vm.from,
         content: vm.content
      };

      firebaseArray.save('user', data);
   }
}
