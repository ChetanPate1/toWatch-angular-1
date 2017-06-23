angular
   .module('app')
   .controller('SigninController', SigninController);

SigninController.$inject = ['firebaseAuth'];

function SigninController(firebaseAuth){
   var vm = this;

   vm.login = login;

   function login() {
      var user = {
         email: vm.email,
         password: vm.password
      }

      console.log(user);
      firebaseAuth.$createUserWithEmailAndPassword(vm.email, vm.password)
         .then(function(firebaseUser) {
            console.log("User created with uid: " + firebaseUser.uid);
         }).catch(function(error) {
         console.log(error);
      });
   }
}
