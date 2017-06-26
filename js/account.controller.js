angular
   .module('app')
   .controller('AccountController', AccountController);

AccountController.$inject = ['currentAuth', 'firebaseArray'];

function AccountController(currentAuth, firebaseArray){
   var vm = this;

   vm.data = firebaseArray;
}
