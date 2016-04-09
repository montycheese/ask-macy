<?php
/**
 * Created by PhpStorm.
 * User: montanawong
 * Date: 4/9/16
 * Time: 16:20
 */

?>
<html>

<head>
    <title> favorites / bookmark title goes here </title>
</head>

<body bgcolor="white" text="blue">

<h1> Test</h1>



</body>

</html>

<script>

    window.onload = function() {
        console.log(verifyImage());
    }
    ;

    var adjectives = ['leather', 'classic', 'suede', 'casual', 'summer', 'business', 'fur', 'polo'];
    var _colors = ['red', 'green', 'blue', 'black', 'white', 'yellow','purple', 'gray', 'orange', 'khaki', 'beige'];
    var genders = ['men', 'women', 'man', 'woman', 'unisex'];
    var searchTerms = [
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
    function verifyImage(){
        //get first element of queue.
        var url = 'https://upload.wikimedia.org/wikipedia/commons/5/52/Small_sport_fishing_boat.jpg';

        var request = new XMLHttpRequest();
        request.open('GET','https://api.clarifai.com/v1/tag/?url='+ url, false);
        request.setRequestHeader("Authorization", "Bearer " + 'PUep4ANNnzcrr617Iitj9Sx3iiGGW5');
        //request.setRequestHeader("Content-Type","text/plain");
        request.send(null);

        if (request.status === 200) {
            console.log(request.responseText);
            var response = JSON.parse(request.responseText);
            console.log(response);
            //array of tag strings
            var tags = response['results'][0]['result']['tag']['classes'];

            var gender = 'woman'; //temp
            var adjective = null;
            var searchTerm = null;
            var color = getColor(request, url);

            for(var i=0;i < tags.length; i++){
                var tag = tags[i].toLowerCase();
                //check for search term
                if(searchTerms.indexOf(tag) != -1){
                    if(searchTerm == null) {
                        searchTerm = tag;
                    }
                }
                //check for adjective
                if(adjectives.indexOf(tag) != -1){
                    if(adjective == null){
                        adjective = tag;
                    }
                }

            }

            if(adjective == null && searchTerm == null){
                return false;
            }

            return {'searchTerm': searchTerm, 'adjective': adjective, 'color' : color};
        }
        else{
            return false;
        }

        //return object of associations or false
    }

    function getColor(request,  url) {
        request.open('GET', 'https://api.clarifai.com/v1/color/?url='+ url, false);
        request.setRequestHeader("Authorization", "Bearer " + 'PUep4ANNnzcrr617Iitj9Sx3iiGGW5');
        request.send(null);
        if (request.status === 200) {
            console.log(request.responseText);
            var response = JSON.parse(request.responseText);
            var colors = response['results'][0]['colors'];
            for(var i=0;i<colors.length;i++){
                var color = colors[i]['w3c']['name'].replace(/([a-z](?=[A-Z]))/g, '$1 ').split(' ').pop().toLowerCase();
                console.log(color);
                if(_colors.indexOf(color) != -1){
                    console.log(color);
                    return color;
                }
            }
        }
        return null;
    }
</script>