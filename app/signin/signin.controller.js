angular
   .module('app')
   .controller('SigninController', SigninController);

SigninController.$inject = ['firebaseAuth', '$state'];

function SigninController(firebaseAuth, $state){
   var vm = this;

   vm.login = login;

   function login() {
      var user = {
         email: vm.email,
         password: vm.password
      }

      firebaseAuth.$signInWithEmailAndPassword(vm.email, vm.password)
         .then(function(firebaseUser) {
            $state.go('watchlist');
         }).catch(function(error) {
            console.log(error);
         }
      );
   }
}
