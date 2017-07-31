angular
   .module('app')
   .controller('SigninController', SigninController);

SigninController.$inject = ['firebaseAuth', '$state'];

function SigninController(firebaseAuth, $state){
   var vm = this;

   vm.login = login;
   vm.signup = signup;

   function login() {
      var user = {
         email: vm.email,
         password: vm.password
      }

      firebaseAuth.$signInWithEmailAndPassword(vm.email, vm.password)
         .then(function(firebaseUser) {
            $state.go('shows');
         }).catch(function(error) {
            console.log(error);
         }
      );
   }

   function signup() {
      var user = {
         email: vm.email,
         password: vm.password
      }

      firebaseAuth.$createUserWithEmailAndPassword(vm.email, vm.password)
         .then(function(firebaseUser) {
            $state.go('shows');
         }).catch(function(error) {
            console.log(error);
         }
      );
   }   
}
