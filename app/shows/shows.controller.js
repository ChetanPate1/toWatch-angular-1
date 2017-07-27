angular
   .module('app')
   .controller('ShowsController', ShowsController);

ShowsController.$inject = ['firebaseArray', '$timeout'];

function ShowsController(firebaseArray, $timeout){
   var vm = this;

   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;

   function add() {

      // var gen = generateEp('Silicon Valley', 'http://toptvshows.me/images/poster/Silicon%20Valley%20season%204%20poster.jpg', 4, 10);
      firebaseArray.save('shows', gen);
   }


   function generateEp(seriesName, url, seasons, episodes){
      var eps = {}, series = {};
      for(var i = 1; i <= episodes; i++){
         eps[i] = {
            number: i.toString()
         }
      }

      series.series = seriesName;
      series.imgSrc = url;
      series.seasons = {};

      for(var i = 1; i <= seasons; i++){
         series.seasons['season_'+ i] = {};
         series.seasons['season_'+ i].number = i.toString();
         series.seasons['season_'+ i] = eps;
      }

      console.log(series);
      return series;
   }


}
