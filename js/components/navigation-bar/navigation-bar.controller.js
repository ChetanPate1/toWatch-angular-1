angular
   .module('app')
   .controller('NavigationBarController', NavigationBarController);

NavigationBarController.$inject = ['firebaseAuth', '$state'];

function NavigationBarController(firebaseAuth, $state){
   var vm = this;

   vm.userSignedIn = userSignedIn;
   vm.logout = logout;

   function userSignedIn(){
      return firebaseAuth.$getAuth();
   }

   function logout() {
      firebaseAuth.$signOut();
      $state.go('home');
   }
}
