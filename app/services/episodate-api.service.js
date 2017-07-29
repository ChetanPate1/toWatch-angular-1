angular
   .module('app')
   .service('episodateApi', episodateApi);

episodateApi.$inject = ['$http', 'helperFunctions', '$timeout'];

function episodateApi($http, helperFunctions,$timeout){
   var vm = this;
   var service = {
      getShow: getShow,
      generateSeasons: generateSeasons
   };

   function getShow(show) {
      return $http({
         method: 'GET',
         url: 'https://www.episodate.com/api/show-details?q=' + show
      }).then(function(res) {
         console.log(res.data.tvShow);
         return generateSeasons(res.data.tvShow);
      });
   }

   function generateSeasons(show) {
      var episodes = show.episodes;
      var init = [];
      var size = helperFunctions.objSize(episodes) - 1;
      var seasonNum = 1, j = 1, i = 0;
      var show = {};

      init['season_'+ seasonNum] = [];

      for (i; i < size; i++) {
         init['season_'+ seasonNum][ j ] = {
            name: episodes[i].name,
            number: episodes[i].episode,
            airDate: helperFunctions.dateToMs( episodes[i].air_date )
         };

         if(i > size - 1){
            break;
         }else if (episodes[i + 1].season === seasonNum) {
            j++;
         }else {
            j = 1;
            seasonNum++;
            init['season_'+ seasonNum] = [];
         }
      }

      show.show = init;
      show.imgUrl = show.image_path;
      console.log(show);
      return init;
   }

   return service;
}
