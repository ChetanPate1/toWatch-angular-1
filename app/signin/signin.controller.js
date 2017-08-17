angular
   .module('app')
   .controller('SigninController', SigninController);

SigninController.$inject = ['firebaseAuth', '$state', '$timeout'];

function SigninController(firebaseAuth, $state, $timeout){
   var vm = this;

   vm.validation = {
      message: 'Something went wrong',
      show: false
   };

   vm.login = login;
   vm.signup = signup;

   function login() {
      var user = {
         email: vm.email,
         password: vm.password
      }

      if (!vm.email || !vm.password) {
         return;
      }

      firebaseAuth.$signInWithEmailAndPassword(vm.email, vm.password)
         .then(function(firebaseUser) {
            $state.go('shows');
         }).catch(function(error) {
            validation(error);
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
            validation(error);
         }
      );
   }

   function validation(error) {
      vm.validation.show = true;
      if (error.code === 'auth/wrong-password') {
         vm.validation.message = 'Incorrect password';
      }
      if(error.code === 'auth/user-not-found'){
         vm.validation.message = 'User does not exist';
      }
      if(error.code === 'auth/email-already-in-use'){
         vm.validation.message = 'User already exists';
      }

      $timeout(function() {
         vm.validation.show = false;
      }, 3000);
   }
}
