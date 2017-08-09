/**
 * @desc Frost Glass directive
 * @example <frost-glass imgsrc="" ></frost-glass>
 */

angular
   .module('app')
   .directive('frostGlass', frostGlass);

function frostGlass() {
   var directive = {
      templateUrl: 'components/frost-glass/frost-glass.html',
      restrict: 'E',
      transclude: true,
      scope: {
         imgsrc: '='
      }
   };

   return directive;
}
