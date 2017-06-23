angular
   .module('app', [
      'ui.router',
      'firebase'
   ]);

angular
   .module('app')
   .config(config);

config.$inject = ['$stateProvider'];

function config($stateProvider){
   $stateProvider
      .state('home',{
         url: '/home',
         templateUrl: 'templates/home.html'
      })
      .state('signin',{
         url: '/signin',
         templateUrl: 'templates/sign.html',
         controller: 'SigninController',
         controllerAs: 'SigninCtrl'
      })
      .state('account',{
         // the rest is the same for ui-router and ngRoute...
         url: '/account',
         templateUrl: 'templates/account.html',
      });   
}

angular
    .module('app')
    .run(runBlock);

runBlock.$inject = ['$rootScope', '$state'];

function runBlock($rootScope, $state) {
   $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if (error === 'AUTH_REQUIRED') {
         $state.go('signin');
      }
   });
}

angular
   .module('app')
   .factory('firebaseAuth', firebaseAuth);

firebaseAuth.$inject = ['$firebaseAuth'];

function firebaseAuth($firebaseAuth){
   return $firebaseAuth();
}

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
