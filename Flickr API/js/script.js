$(function() {
    $("#search").keyup(function(event) {
        if (event.keyCode === 13) {
            console.log(3);
            $(".button").click();
        }
    });
});

let search;
let imageURL;

getSearch();

function getSearch(){
  console.log(1);
  search = $("#search").val();
  $('.list-group').html('');
  getFlickrJSON(search);
}

function getFlickrJSON(search){
  $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d293702bddac032f1687d9a78c009792&tags='+search+'&text='+search+'&sort=relevance&tag_mode=all&per_page=25&format=json&nojsoncallback=1',function(json){
    let collectionLength = json.photos.photo.length;
    let firstImage;
    for(let i=0; i<collectionLength; i++){
      let image = json.photos.photo[i];
      imageURL = 'https://farm'+image.farm+'.staticflickr.com/'+image.server+'/'+image.id+'_'+image.secret+'.jpg';
      if(i==0)
        firstImage = imageURL;
      $('.list-group').append('<li> <p class="link">'+imageURL+'</p>');
    }
    $(".image").attr("src",firstImage);
     $('li').click(function(){
       var temp = $(this).children()[0];
       console.log($('.temporary').html(temp));
       var link = $('.temporary').text();
       $('.image').attr('src',link);
       $(this).html('<p class="link">'+link+'</p>');
    })
  });

}
