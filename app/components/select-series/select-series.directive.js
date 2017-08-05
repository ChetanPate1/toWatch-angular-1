/**
 * @desc Select Series directive
 * @example <select-series ></select-series>
 */

angular
   .module('app')
   .directive('selectSeries', selectSeries);

// selectSeries.$inject = [''];

function selectSeries() {
   var directive = {
      link: link,
      templateUrl: 'components/select-series/select-series.html',
      restrict: 'E'
   };

   function link(scope, element) {

   }

   return directive;
}
