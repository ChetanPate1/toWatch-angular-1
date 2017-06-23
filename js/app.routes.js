angular
   .module('app')
   .config(config);

config.$inject = ['$stateProvider'];

function config($stateProvider, $urlProvider){
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
         url: '/account',
         templateUrl: 'templates/account.html',
      });
}
