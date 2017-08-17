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
      .state('rewatchlist',{
         url: '/rewatchlist',
         templateUrl: 'rewatchlist/rewatchlist.html',
         controller: 'RewatchlistController',
         controllerAs: 'RewatchlistCtrl',
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
      .state('my-shows',{
         url: '/my-shows',
         templateUrl: 'my-shows/my-shows.html',
         controller: 'MyShowsController',
         controllerAs: 'MyShowsCtrl',
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
