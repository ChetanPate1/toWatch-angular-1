angular
   .module('app')
   .config(config);
   
function config($stateProvider, $urlRouterProvider){
   $stateProvider
      .state('home',{
         url: '/home',
         templateUrl: 'templates/home.html'
      }

   );

   $urlRouterProvider.otherwise('home');
}
