angular
   .module('app')
   .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider){
   $stateProvider
      .state('home',{
         url: '/most-popular',
         templateUrl: 'home/home.html',
         controller: 'HomeController',
         controllerAs: 'HomeCtrl'
      })
      .state('signin',{
         url: '/signin',
         templateUrl: 'signin/sign.html',
         controller: 'SigninController',
         controllerAs: 'SigninCtrl'
      })
      .state('watchlist',{
         url: '/watchlist',
         templateUrl: 'watchlist/watchlist.html',
         controller: 'WatchlistController',
         controllerAs: 'WatchlistCtrl',
         resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
           'currentAuth': ['firebaseAuth', function(firebaseAuth) {
             // $requireSignIn returns a promise so the resolve waits for it to complete
             // If the promise is rejected, it will throw a $stateChangeError (see above)
             return firebaseAuth.$requireSignIn();
           }]
         }
      })
      .state('rewatch',{
         url: '/rewatch',
         templateUrl: 'rewatchlist/rewatch.html',
         controller: 'RewatchController',
         controllerAs: 'RewatchCtrl',
         resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
           'currentAuth': ['firebaseAuth', function(firebaseAuth) {
             // $requireSignIn returns a promise so the resolve waits for it to complete
             // If the promise is rejected, it will throw a $stateChangeError (see above)
             return firebaseAuth.$requireSignIn();
           }]
         }
      })
      .state('shows',{
         url: '/shows',
         templateUrl: 'shows/shows.html',
         controller: 'ShowsController',
         controllerAs: 'ShowsCtrl',
         resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
           'currentAuth': ['firebaseAuth', function(firebaseAuth) {
             // $requireSignIn returns a promise so the resolve waits for it to complete
             // If the promise is rejected, it will throw a $stateChangeError (see above)
             return firebaseAuth.$requireSignIn();
           }]
         }
      });

      $urlRouterProvider.otherwise('most-popular');
}
