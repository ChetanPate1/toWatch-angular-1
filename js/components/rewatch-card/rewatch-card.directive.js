/**
 * @desc Rewatch Card directive
 * @example <rewatch-card heading="" subheading="" imgsrc="" seasoninfo=""></rewatch-card>
 */

angular
   .module('app')
   .directive('rewatchCard', rewatchCard);

function rewatchCard() {
   var directive = {
      templateUrl: 'js/components/rewatch-card/rewatch-card.html',
      restrict: 'E',
      controller: 'RewatchCardController',
      controllerAs: 'RewatchCardCtrl',
      scope: {
         heading: '=',
         subheading: '=',
         imgsrc: '=',
         seasoninfo: '='
      }
   };
   return directive;
}
