/**
 * @desc Season Info directive
 * @example <season-info season="" ></season-info>
 */

angular
   .module('app')
   .directive('seasonInfo', seasonInfo);

function seasonInfo() {
   var directive = {
      link: link,
      templateUrl: 'js/components/season-info/season-info.html',
      restrict: 'E',
      scope: {
         season: '=',
         rewatchobj: '=',
         index: '='
      }
   };

   function link(scope) {
      scope.open = false;
      scope.toggleOpen = toggleOpen;

      function toggleOpen() {
         scope.open = !scope.open;
      }
   }

   return directive;
}
