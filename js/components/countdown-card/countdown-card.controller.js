angular
   .module('app')
   .controller('CountdownCardController', CountdownCardController);

// CountdownCardController.$inject = [''];

function CountdownCardController(){
   var vm = this;

   vm.shows = [
      {
         heading: 'Game of Thrones',
         subHeading: 'Season 7 Episode 1',
         imgSrc: 'https://www.google.co.uk/imgres?imgurl=http://www.gstatic.com/tv/thumb/tvbanners/12502846/p12502846_b_v8_aa.jpg&imgrefurl=http://google.com/search%3Ftbm%3Disch%26q%3DGame%2520of%2520Thrones&h=1440&w=960&tbnid=HmTsguiHQZpa-M:&tbnh=186&tbnw=124&usg=__xcLHoHd4TgJ83D-pZNV3METnJ8E=&vet=10ahUKEwjwgva3q-_UAhWKIsAKHTA1BgoQ_B0IlwEwDg..i&docid=MfU06vh8cKuMyM&itg=1&sa=X&ved=0ahUKEwjwgva3q-_UAhWKIsAKHTA1BgoQ_B0IlwEwDg&ei=PGNbWfD0LIrFgAaw6phQ'
      },
      {
         heading: 'The Leftovers',
         subHeading: 'Season 4 Episode 1',
         imgSrc: 'https://www.google.co.uk/imgres?imgurl=http://www.gstatic.com/tv/thumb/tvbanners/12502846/p12502846_b_v8_aa.jpg&imgrefurl=http://google.com/search%3Ftbm%3Disch%26q%3DGame%2520of%2520Thrones&h=1440&w=960&tbnid=HmTsguiHQZpa-M:&tbnh=186&tbnw=124&usg=__xcLHoHd4TgJ83D-pZNV3METnJ8E=&vet=10ahUKEwjwgva3q-_UAhWKIsAKHTA1BgoQ_B0IlwEwDg..i&docid=MfU06vh8cKuMyM&itg=1&sa=X&ved=0ahUKEwjwgva3q-_UAhWKIsAKHTA1BgoQ_B0IlwEwDg&ei=PGNbWfD0LIrFgAaw6phQ'
      },
      {
         heading: 'Lucifer',
         subHeading: 'Season 4 Episode 1',
         imgSrc: 'https://www.google.co.uk/imgres?imgurl=http://www.gstatic.com/tv/thumb/tvbanners/12502846/p12502846_b_v8_aa.jpg&imgrefurl=http://google.com/search%3Ftbm%3Disch%26q%3DGame%2520of%2520Thrones&h=1440&w=960&tbnid=HmTsguiHQZpa-M:&tbnh=186&tbnw=124&usg=__xcLHoHd4TgJ83D-pZNV3METnJ8E=&vet=10ahUKEwjwgva3q-_UAhWKIsAKHTA1BgoQ_B0IlwEwDg..i&docid=MfU06vh8cKuMyM&itg=1&sa=X&ved=0ahUKEwjwgva3q-_UAhWKIsAKHTA1BgoQ_B0IlwEwDg&ei=PGNbWfD0LIrFgAaw6phQ'
      }
   ];
}
