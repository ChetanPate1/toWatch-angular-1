angular
   .module('app')
   .controller('AccountController', AccountController);

AccountController.$inject = ['currentAuth'];

function AccountController(currentAuth){
   var vm = this;

}
