/**
 * @desc No Content directive
 * @example <no-content condition="" message="" ></no-content>
 */

angular
   .module('app')
   .directive('noContent', noContent);

function noContent() {
   var directive = {
      templateUrl: 'components/no-content/no-content.html',
      restrict: 'E',
      scope: {
         condition: '=',
         message: '='
      }
   };

   return directive;
}
