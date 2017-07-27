/**
 * @desc Navigation directive
 * @example <navigation-bar></navigation-bar>
 */

angular
   .module('app')
   .directive('navigationBar', navigationBar);

function navigationBar() {
   var directive = {
      templateUrl: 'components/navigation-bar/navigation-bar.html',
      restrict: 'E',
      controller: 'NavigationBarController',
      controllerAs: 'NavbarCtrl'
   };
   return directive;
}
