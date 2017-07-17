angular
   .module('app')
   .controller('WatchlistController', WatchlistController);

WatchlistController.$inject = ['currentAuth', 'firebaseArray'];

function WatchlistController(currentAuth, firebaseArray){
   var vm = this;
   var ref = 'watchlist/' + currentAuth.uid;
   var today = new Date().getTime();

   vm.watchlist = firebaseArray.getByRef(ref);
   vm.shows = firebaseArray.getByRef('shows');
   vm.add = add;
   vm.aired = aired;

   function add() {
      var list = {
         seriesId: vm.series,
         on: {
            season: vm.season,
            episode: vm.episode
         }
      };

      list['season_'+ vm.season] = [null, { watched: false }];

      firebaseArray.save(ref, list);
   }

   function aired(airDate, on) {
      var diff = new Date(airDate).getTime() - today;

      //

      if(diff < 0){
         console.log('aired', diff);
      }else {

      }
      return airDate;
   }
   //self destroy once season watched
   //next episode -

}
