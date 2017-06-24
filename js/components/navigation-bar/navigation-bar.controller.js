angular
   .module('app')
   .controller('NavigationBarController', NavigationBarController);

NavigationBarController.$inject = ['firebaseAuth', '$state'];

function NavigationBarController(firebaseAuth, $state){
   var vm = this;

   vm.logout = logout;

   function logout() {
      firebaseAuth.$signOut();
      $state.go('home');
   }
}
