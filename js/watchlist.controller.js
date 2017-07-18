angular
   .module('app')
   .controller('WatchlistController', WatchlistController);

WatchlistController.$inject = ['currentAuth', 'firebaseArray', '$timeout'];

function WatchlistController(currentAuth, firebaseArray, $timeout){
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


   function nextAired(watchlist) {
      if(!vm.shows){
         return;
      }

      var nextAired, i = 1;
      var show = vm.shows[watchlist.seriesId];
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

   // TODO: missedEpisodes function
   // TODO: function for array of unwatched episodes upto latest aired temp
   // TODO: mark watched function
   // TODO: convert to firebase functions
}
