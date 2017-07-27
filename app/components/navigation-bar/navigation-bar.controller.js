angular
   .module('app')
   .controller('NavigationBarController', NavigationBarController);

NavigationBarController.$inject = ['firebaseAuth', '$state'];

function NavigationBarController(firebaseAuth, $state){
   var vm = this;

   vm.open = false;
   vm.toggleOpen = toggleOpen;
   vm.userSignedIn = userSignedIn;
   vm.logout = logout;

   function toggleOpen() {
      if(close == 'close'){
         vm.open = false;
      }
      vm.open = !vm.open;
   }

   function userSignedIn(){
      return firebaseAuth.$getAuth();
   }

   function logout() {
      firebaseAuth.$signOut();
      $state.go('home');
   }
}
