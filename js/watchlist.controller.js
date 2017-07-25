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
   vm.checkAired = checkAired;

   function add() {
      var list = {
         upToDate: false,
         seriesId: vm.series,
         on: {
            season: vm.season,
            episode: vm.episode
         },
         unwatched: {}
      };
      list['unwatched'] = nextAired(list).unwatched;

      firebaseArray.save(ref, list);
   }

   function nextAired(watchlist) {
      var nextAired, i = 1, j = 1, unwatched = {}, toMs;
      var show = vm.shows[watchlist.seriesId];
      var seasons = objSize(show.seasons);
      var latestSeason = show.seasons['season_'+ seasons];
      var episodes = objSize(latestSeason);

      for (j; j <= episodes; j++) {
         unwatched[j] = {
            watched: false,
            airDate: latestSeason[j].airDate
         };
      }

      for (i; i <= episodes; i++) {
         unwatched[i].aired = true;

         if (latestSeason[i].airDate - today > 0){
            unwatched[i].aired = false;
            nextAired = latestSeason[i].airDate;
            break;
         }
      }

      return { nextAired: nextAired, unwatched: unwatched };
   }

   function checkAired(date) {
      return date - today < 0;
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
}
