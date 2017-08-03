
angular
   .module('app')
   .directive('moreButton', moreButton);

function moreButton(helperFunctions) {
   var directive = {
      link: link,
      templateUrl: 'components/more-button/more-button.html',
      restrict: 'E',
      scope: {
         seasons: '=',
         action: '&'
      }
   };

   function link(scope) {
      scope.behindCount = behindCount;

      function behindCount(seasoninfo) {
         var i = 1, size = seasoninfo.length - 1;
         var count = 0, aired = 0;

         for (i; i <= size; i++) {
            if(!seasoninfo[i].watched && seasoninfo[i].airDate - now < 0){
               count++;
            }
         }

         return (count > 0) ? '-'+ count : count;
      }
   }

   return directive;
}
