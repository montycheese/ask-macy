angular.module("myApp", [])
  //main controller
  .controller("myController", function($scope) {
    $scope.links = {array: {}};
        $scope.searchTerms = [
            'dress',
            'shirt',
            'jacket',
            'jeans',
            'shoes',
            'sandals',
            'footwear',
            'bra',
            'lingerie',
            'panties',
            'handbag',
            'purse',
            'hat',
            'fedora',
            'suit',
            'denim',
            'backpack',
            'handbag',
            'bag',
            'skirt',
            'swimwear',
            'onesie',
            'underwear',
            'boxers',
            'socks',
            'belt',
            'tie',
            'bowtie',
            'shorts',
            'flannel',
            'button down',
            'glasses',
            'jewelry',
            'earrings',
            'necklace',
            'pendant',
            'beanie',
            'collar',
            'jumpsuit',
            'blazer',
            'heel',
            'coat',
            'trenchcoat',
            'capri',
            'pajamas',
            'hoodies',
            'chain',
            'visor',
            'sunhat'
        ];
        $scope.adjectives = ['leather', 'classic', 'suede', 'casual', 'summer', 'business', 'fur', 'polo'];
        $scope.colors = ['red', 'green', 'blue', 'black', 'white', 'yellow','purple', 'gray', 'orange', 'khaki', 'beige'];
        $scope.genders = ['men', 'women', 'man', 'woman', 'unisex'];
    // Once the DOM is ready...
    window.addEventListener('DOMContentLoaded', function () {
      //query for the active tab...
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        //and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'images'},
            //also specifying a callback to be called
            //from the receiving end (content script)
            setImagesURLs);
      });
    });

    // Update links
    function setImagesURLs(info) {
      $scope.$apply(function(){
        $scope.links.array = info;
        chrome.browserAction.setBadgeText({text: "10+"});
      });
<<<<<<< Updated upstream

        function verifyImage(){




            var endpoint = 'https://api.clarifai.com/v1/tag/?url=';
            //for(var i=0; i < $scope.links.array.length; i++){
            //    var url = $scope.links.array[i];
            //}

            //get first element of queue.
            var url = $scope.links.array.shift();

            var request = new XMLHttpRequest();
            request.open('GET', endpoint + url, false);
            request.send(null);

            if (request.status === 200) {
                //console.log(request.responseText);
                var response = JSON.parse(request.responseText);
                //array of tag strings
                var tags = response['result']['tag']['classes'];

                var gender = 'woman';//temp
                var adjective = null;
                var color = null;
                var searchTerm = null;

                for(var i=0;i < tags.length; i++){
                    var tag = tags[i];
                    if(tag in )
                }
            }
            else{
                return false;
            }

            //return array of tags or false
        }

        function generateSearch(){

        }
      document.getElementById("header").innerHTML = "Suggested Macy's clothing items:";
      document.getElementsByClassName("buttonDiv")[0].style.visibility="visible";
=======
      document.getElementById("header").innerHTML = "Suggested Macy's Clothing Items:";
>>>>>>> Stashed changes
    }

  });
