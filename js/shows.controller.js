angular
   .module('app')
   .controller('ShowsController', ShowsController);

ShowsController.$inject = ['firebaseArray'];

function ShowsController(firebaseArray){
   var vm = this;

   vm.shows = firebaseArray.getAll();
   vm.add = add;

   function add() {

      // firebaseArray.save('shows', gen);
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

      for(var i = 1; i <= seasons; i++){
         series['season_'+ i] = {};
         series['season_'+ i].number = i.toString();
         series['season_'+ i].episodes = eps;
      }

      return series;
   }

}
