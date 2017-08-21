/**
 * @desc Toast directive
 * @example <toast content="" show="" action=""></toast>
 */

angular
   .module('app')
   .directive('toast', toast);

function toast() {
   var directive = {
      templateUrl: 'components/toast/toast.html',
      restrict: 'E',
      scope: {
         content: '=',
         action: '=',
         show: '='
      }
   };

   return directive;
}
