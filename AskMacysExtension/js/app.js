angular.module("myApp", [])
  //main controller
  .controller("myController", function($scope) {
    $scope.links = {array: {}};
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
      });
      document.getElementById("header").innerHTML = "Suggested Macy's clothing items:";
      document.getElementsByClassName("buttonDiv")[0].style.visibility="visible";
    }
  });
