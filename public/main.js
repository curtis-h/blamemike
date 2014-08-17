function setupUploadHandlers() {
    $("#uploadForm").submit(function(ev) {
        var el   = $(this);
        var url  = el.attr('action');
        var data = new FormData(this);
        
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data, status) {
                 // TODO - notify success
            },
            error: function(data, status) {
                // TODO - notify failure
            }
        });
        
        ev.preventDefault();
        return false;
    });
    
    $("#uploader").change(function() {
        $("#uploadForm").submit();
    });
    
    $("#uploadBtn").click(function() {
        $("#uploader").click();
    });
}

function setupImgHandlers(container) {
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
            
            setupImgHandlers(imageArea);
        }
    });
}

$(function(){
    setupUploadHandlers();
    getImages();
});