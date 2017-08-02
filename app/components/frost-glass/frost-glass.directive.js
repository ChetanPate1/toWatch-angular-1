
angular
   .module('app')
   .directive('frostGlass', frostGlass);

function frostGlass(helperFunctions) {
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
