angular
   .module('app')
   .factory('scrapper', scrapper);

scrapper.$inject = ['$http'];

function scrapper($http){
   var service = {
      get: get
   };


   function get(show) {
      return $http({
         method: 'GET',
         url: 'https://www.episodate.com/tv-show/'+ show.name +'?season='+ show.season
      }).then(function(res) {
         return stripPage(res.data);
      });
   }

   function stripPage(pageText) {
      var sc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
      var cs = /<style\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/style>/gi;

      pageText = pageText.replace(sc, '').replace(cs, '');

      return pageText;
   }


   return service;
}
