///// js for carouel
$("#myCarousel").on("slide.bs.carousel", function(e) {
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 4;
  var totalItems = $(".carousel-item").length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);
    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == "left") {
        $(".carousel-item")
          .eq(i)
          .appendTo(".carousel-inner");
      } else {
        $(".carousel-item")
          .eq(0)
          .appendTo($(this).find(".carousel-inner"));
      }
    }
  }
});



//// js for map

window.movies = {
    params: {},
    data: {},
};

//fetch data and pass date to the list
function fetchDataMap() {
  console.log("fetchDataMap");
  $.getJSON('https://raw.githubusercontent.com/echo-zhou/final/master/data_all.json', function(data) {
      window.movies.data = data;
      console.log("json loaded");
      fillMap();
  });
}



//codes from google map api
var map;

function initMap() {
  console.log("initMap function called");
  var mid_NC = {lat: 35.900, lng: -78.800};
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: mid_NC
    });
  fetchDataMap();
}


function init(){
  console.log("init function");
  //initMap();
  }


function fillMap() {
  console.log("fillMap()");
  console.log(window.movies.data);
//Chapel Hill
  for (i = 0; i < window.movies.data[0]["theaters"].length; i++){
    var name = window.movies.data[0]["theaters"][i]["name"];
    var id = window.movies.data[0]["theaters"][i]["id"];
    var city = window.movies.data[0]["theaters"][i]["id"];
    var lat = window.movies.data[0]["theaters"][i]["geo"]["latitude"];
    var lng = window.movies.data[0]["theaters"][i]["geo"]["longitude"];
    var address = window.movies.data[0]["theaters"][i]["address1"];
    var phone = window.movies.data[0]["theaters"][i]["phone"];
    var url = "https://www.fandango.com/"+window.movies.data[0]["theaters"][i]["theaterPageUrl"];
    var marker = new google.maps.Marker({
        position: {lat, lng},
        map:map,
        content:'<div id="content" style="font-size: 20px;"><a href="/movies/theaters/' + id + '"><h2>'+name+'</h2>'+address+'<br>'+phone+'</div>',
    })
  var infoWindow = new google.maps.InfoWindow({
      maxWidth: 300,
      maxHeight: 300
    })
  //codes from StackOverflow  H.M.
  marker.addListener('mouseover', function() {
  infoWindow.setContent(this.content);
  infoWindow.open(this.getMap(), this);
  });

  }

//Durham
for (i = 0; i < window.movies.data[1]["theaters"].length; i++){
  var name = window.movies.data[1]["theaters"][i]["name"];
  var id = window.movies.data[1]["theaters"][i]["id"];
  var city = window.movies.data[1]["theaters"][i]["id"];
  var lat = window.movies.data[1]["theaters"][i]["geo"]["latitude"];
  var lng = window.movies.data[1]["theaters"][i]["geo"]["longitude"];
  var url = "https://www.fandango.com/"+window.movies.data[1]["theaters"][i]["theaterPageUrl"];
  var marker = new google.maps.Marker({
      position: {lat, lng},
      map:map,
      content:'<div id="content" style="font-size: 20px;"><a href="/movies/theaters/' + id + '"><h2>'+name+'</h2>'+address+'<br>'+phone+'</div>',
  })
  var infoWindow = new google.maps.InfoWindow({
      maxWidth: 300,
      maxHeight: 300
    })
  marker.addListener('mouseover', function() {
  infoWindow.setContent(this.content);
  infoWindow.open(this.getMap(), this);
  });

  }

//Raleigh
  for (i = 0; i < window.movies.data[2]["theaters"].length; i++){
    // console.log(window.movies.data[0]["theaters"][i])
    var name = window.movies.data[2]["theaters"][i]["name"];
    var id = window.movies.data[2]["theaters"][i]["id"];
    var city = window.movies.data[2]["theaters"][i]["id"];
    var lat = window.movies.data[2]["theaters"][i]["geo"]["latitude"];
    var lng = window.movies.data[2]["theaters"][i]["geo"]["longitude"];
    var url = "https://www.fandango.com/"+window.movies.data[2]["theaters"][i]["theaterPageUrl"];
    var marker = new google.maps.Marker({
        position: {lat, lng},
        map:map,
        content:'<div id="content" style="font-size: 20px;"><a href="/movies/theaters/' + id + '"><h2>'+name+'</h2>'+address+'<br>'+phone+'</div>',
    })
    var infoWindow = new google.maps.InfoWindow({
        maxWidth: 300,
        maxHeight: 300
      })
    marker.addListener('mouseover', function() {
    infoWindow.setContent(this.content);
    infoWindow.open(this.getMap(), this);
    });

    }
}
