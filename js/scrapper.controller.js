angular
   .module('app')
   .controller('ScrapperController', ScrapperController);

ScrapperController.$inject = ['scrapper'];

function ScrapperController(scrapper){
   var vm = this;
   var show = {
      name: 'Suits',
      season: '1'
   };

   scrapper.get(show).then(function(res){
      var seasons = {}, name, airDate, timeline_block;
      var $scrapper_container = document.querySelector('.scrapped-content');
      vm.page = res;

      $scrapper_container.innerHTML = vm.page;
      $timeline_block = document.querySelectorAll('.cd-timeline-content .cd-timeline-content-data');

      for (var i = 0; i < $timeline_block.length; i++) {
         name = $timeline_block[i].querySelector('.title').innerText;
         airDate = $timeline_block[i].querySelector('.episode-datetime-convert').innerText;

         seasons[i + 1] = {
            number: (i + 1).toString(),
            name: cutOutName(name),
            airDate: convertToMs(airDate)
         }
      }

      console.log(seasons);
   });


   function convertToMs(date) {
      var ms = new Date(date).getTime();
      return ms.toString();
   }

   function cutOutName(text) {
      text = text.split('-');
      return text[1].trim();
   }

}
