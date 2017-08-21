/**
 * @desc Show Card directive
 * @example <show-card heading="" imgsrc="" shows="" index="" ></show-card>
 */

angular
   .module('app')
   .directive('showCard', showCard);

showCard.$inject = ['episodateApi', 'helperFunctions', 'firebaseArray'];

function showCard(episodateApi, helperFunctions, firebaseArray) {
   var directive = {
      link: link,
      templateUrl: 'components/show-card/show-card.html',
      restrict: 'E',
      scope: {
         heading: '=',
         imgsrc: '=',
         shows: '=?',
         index: '=?'
      }
   };

   function link(scope) {
      var now = new Date().getTime();

      scope.deleteable = true;
      scope.deleteOpen = false;

      if (scope.index == undefined) {
         scope.deleteable = false;
         return;
      }

      update(scope.shows, scope.index);

      function update(shows, index) {
         var show = shows[index];

         if (show.status !== 'Running' || !helperFunctions.hasDaysPast(show.lastUpdated, 7)){
            return;
         }

         if (helperFunctions.hasDaysPast(show.lastUpdated, 7)) {

            episodateApi.getShow(show.requestData).then(function(data) {
               if(data){
                  show.lastUpdated = now;
                  show.series = data.series;
                  show.imgSrc = data.imgSrc;
                  show.imgSrcSm = data.imgSrcSm;
                  show.status = data.status;
                  show.seasons = data.seasons;
                  shows.$save(index);
               }
            });
         }
      }
   }

   return directive;
}
