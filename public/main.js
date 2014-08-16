function setupHandlers(container) {
    container.find('img').click(function() {
        
    });
}

function getImages() {
    $.get('/memes', function(images) {
        if(images.length > 0) {
            var imageArea = $(".imageArea");
            imageArea.empty();
            for(i in images) {
                if(images.hasOwnProperty(i)) {
                    var image = images[i];
                    imageArea.append('<div class="imgContainer col-xs-12 col-md-4"><img src="/memes/'+image._id+'" /></div>');
                }
            }
            
            setupHandlers(imageArea);
        }
    });
}

$(function(){
    getImages();
});
