angular.module("myApp", [])
  //main controller
  .controller("myController", function($scope) {
    $scope.links = {array: {}};
    $scope.macyLinks = {array: {}};
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
        $scope.endpointTag = 'https://api.clarifai.com/v1/tag/?url=';
        $scope.endpointColor = 'https://api.clarifai.com/v1/color/?url=';
        $scope.CLARIFAI_ACCESS_TOKEN = 'PUep4ANNnzcrr617Iitj9Sx3iiGGW5';
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
        $scope.$apply(function () {
            $scope.links.array = info;
            chrome.browserAction.setBadgeText({text: "10+"});
            while ($scope.links.array.length > 0) {
                var clarifaiResults = verifyImage();
                if (clarifaiResults) {
                    var url = createSearchUrl(clarifaiResults);
                    $scope.macyLinks.array.push(generateSearch(url));
                }
            }
        });
    }

    function verifyImage(){
        //get first element of queue.
        var url = $scope.links.array.shift();

        var request = new XMLHttpRequest();
        request.open('GET', $scope.endpointTag + url, false);
        request.setRequestHeader("Authorization", "Bearer " + $scope.CLARIFAI_ACCESS_TOKEN);
        request.send(null);

        if (request.status === 200) {
            //console.log(request.responseText);
            var response = JSON.parse(request.responseText);
            //array of tag strings
            var tags = response['results'][0]['result']['tag']['classes'];

            var gender = 'woman'; //temp
            var adjective = null;
            var searchTerm = null;
            var color = getColor(request, url);

            for(var i=0;i < tags.length; i++) {
                var tag = tags[i].toLowerCase();
                //check for search term
                if ($scope.searchTerms.indexOf(tag) != -1) {
                    if (searchTerm == null) {
                        searchTerm = tag;
                    }
                }
                //check for adjective
                if ($scope.adjectives.indexOf(tag) != -1) {
                    if (adjective == null) {
                        adjective = tag;
                    }
                }

                if (searchTerm == null) {
                    return false;
                }

            }

            return {'searchTerm': searchTerm, 'adjective': adjective, 'color' : color};
        }
        else{
            return false;
        }

        //return object of associations or false
    }

        function getColor(request,  url) {
            request.open('GET', $scope.endpointColor + url, false);
            request.setRequestHeader("Authorization", "Bearer " + $scope.CLARIFAI_ACCESS_TOKEN);
            request.send(null);
            if (request.status === 200) {
                //console.log(request.responseText);
                var response = JSON.parse(request.responseText);
                var colors = response['results']['colors'];
                for(var i=0;i<colors.length;i++){
                    var color = colors[i]['w3c']['name'].replace(/([a-z](?=[A-Z]))/g, '$1 ').split(' ').pop().toLowerCase();
                    if($scope.colors.indexOf(color) != -1){
                        return color;
                    }
                }
            }
            return null;
        }



        function createSearchUrl(clarifaiResults){
            var url = 'http://www1.macys.com/shop/search?keyword=';
            url += clarifaiResults['searchTerm'];

            var adj = clarifaiResults['adjective'];
            var color = clarifaiResults['color'];

            if(adj != null){
                url += '+' + adj;
            }
            if(color != null){
                url += '+' + color;
            }
            return url;
        }

        function generateSearch(searchURL){
          //searchURL = "http://www1.macys.com/shop/search?keyword=black+dress";
            return {'pageUrl': 'http://slimages.macysassets.com/is/image/MCY/products/6/optimized/3287376_fpx.tif?bgc=255,255,255&wid=224&qlt=90,0&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg',
                'imgUrl': 'http://www1.macys.com/shop/product/shop-the-trend-the-perfect-pump?ID=2767978&CategoryID=26481#fn=sp%3D1%26spc%3D828%26ruleId%3D65%26slotId%3D1%26kws%3Dblue%20shoes%20women'};
          /*$.ajax({
            url: searchURL,
            complete: function(data) {
              //console.log(data.responseText);
              //$scope.macyLinks.array.push(imageUrl);
            }
          });*/
        }
      document.getElementById("header").innerHTML = "Suggested Macy's Clothing Items For You:";

  });
