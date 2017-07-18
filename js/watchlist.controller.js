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
   vm.nextAired = nextAired;

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

   function nextAired(show, watchlist, index) {
      if(!show){
         return;
      }

      var nextAired, i = 1;
      var seasons = objSize(show.seasons);
      var showSeason = show.seasons['season_'+ seasons];
      var episodes = objSize(showSeason);

      for (i; i <= episodes; i++) {
         var ms = new Date(showSeason[i].airDate).getTime();
         if (ms - today > 0){
            nextAired = showSeason[i].airDate;
            break;
         }
      }

      return nextAired;
   }
   //self destroy once season watched
   //next episode -
   function objSize(obj) {
      var count = 0;
      for (var prop in obj) {
         if (obj.hasOwnProperty(prop)) {
            ++count;
         }else {
            break;
         }
      }
      return count;
   }
}
