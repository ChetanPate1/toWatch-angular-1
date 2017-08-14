/**
 * @desc Show Card directive
 * @example <show-card heading="" imgsrc="" ></show-card>
 */

angular
   .module('app')
   .directive('showCard', showCard);

showCard.$inject = ['episodateApi', 'helperFunctions'];

function showCard(episodateApi, helperFunctions) {
   var directive = {
      link: link,
      templateUrl: 'components/show-card/show-card.html',
      restrict: 'E',
      scope: {
         heading: '=',
         imgsrc: '=',
         shows: '=',
         index: '='
      }
   };

   function link(scope) {
      update(scope.shows, scope.index);

      function update(shows, index) {
         var show = shows[index];
         var seriesName = helperFunctions.spacesToDashes(show.series);

         if (show.status === 'Running'){
            return;
         }

         episodateApi.getShow(seriesName).then(function(data) {
            if(data){
               show.series = data.series;
               show.imgSrc = data.imgSrc;
               show.imgSrcSm = data.imgSrcSm;
               show.status = data.status;
               show.seasons = data.seasons;
            }else {
               console.log(seriesName);
            }

            shows.$save(index);
         });
      }
   }

   return directive;
}
