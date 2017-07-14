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
         seasons: '=',
         currentseason: '=',
         rewatchobj: '=',
         index: '='
      }
   };

   function link(scope) {
      scope.open = false;
      scope.toggleOpen = toggleOpen;
      scope.tabSelect = tabSelect;
      scope.isTabSelected = isTabSelected;
      scope.watched = watched;
      scope.tabActive = scope.currentseason;

      function toggleOpen() {
         scope.open = !scope.open;
      }

      function tabSelect(number) {
         scope.tabActive = number;
      }

      function isTabSelected(number) {
         return scope.tabActive == number;
      }

      function watched(rewatchObj, treeIndex, watched) {
         rewatchObj.$save(treeIndex);
         return watched = !watched;
      }
   }

   return directive;
}
