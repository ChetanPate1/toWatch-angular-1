angular
   .module('app')
   .service('episodateApi', episodateApi);

episodateApi.$inject = ['$http', 'helperFunctions', '$timeout'];

function episodateApi($http, helperFunctions, $timeout){
   var vm = this;
   var service = {
      getMostPopular: getMostPopular,
      getShow: getShow,
      generateSeasons: generateSeasons
   };

   function getMostPopular() {
      return $http({
         method: 'GET',
         url: 'https://www.episodate.com/api/most-popular?page=1'
      }).then(function(res) {
         return res.data.tv_shows;
      });
   }

   function getShow(show) {
      return $http({
         method: 'GET',
         url: 'https://www.episodate.com/api/show-details?q=' + show
      }).then(function(res) {
         if (helperFunctions.objSize(res.data.tvShow.episodes) === 0) {
            return false;
         }else {
            return generateSeasons(res.data.tvShow);
         }
      });
   }

   function generateSeasons(show) {
      var episodes = show.episodes;
      var init = {};
      var size = helperFunctions.objSize(episodes) - 1;
      var seasonNum = 1, j = 1, i = 0;
      var series = {};
      series.seasons = [];
      series.series = show.name;
      series.imgSrc = show.image_path;
      series.imgSrcSm = show.image_thumbnail_path;
      series.status = show.status;

      init['season_'+ seasonNum] = {};
      for (i; i <= size; i++) {
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
            init['season_'+ seasonNum] = {};
         }

         series.seasons = init;
      }

      return series;
   }

   return service;
}
