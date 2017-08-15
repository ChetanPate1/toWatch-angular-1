/**
 * @desc Show Card directive
 * @example <show-card heading="" imgsrc="" shows="" index=""></show-card>
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
         index: '=',
         loader: '=?'
      }
   };

   function link(scope) {
      update(scope.shows, scope.index);

      function update(shows, index) {
         var show = shows[index];

         if (show.status !== 'Running'){
            return;
         }

         if (helperFunctions.hasDaysPast(show.lastUpdated, 7)) {
            console.log('update');
            episodateApi.getShow(show.requestData).then(function(data) {
               if(data){
                  show.lastUpdated = new Date().getTime();
                  show.series = data.series;
                  show.imgSrc = data.imgSrc;
                  show.imgSrcSm = data.imgSrcSm;
                  show.status = data.status;
                  show.seasons = data.seasons;
               }
               shows.$save(index);
            });
         }
      }
   }

   return directive;
}
