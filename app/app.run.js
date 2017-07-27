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
