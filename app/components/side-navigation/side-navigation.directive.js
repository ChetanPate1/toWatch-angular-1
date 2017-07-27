/**
 * @desc Sidebar Navigation directive
 * @example <side-navigation></side-navigation>
 */

angular
   .module('app')
   .directive('sideNavigation', sideNavigation);

function sideNavigation() {
   var directive = {
      templateUrl: 'js/components/side-navigation/side-navigation.html',
      restrict: 'E'
   };
   return directive;
}
