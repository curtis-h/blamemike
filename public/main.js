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
                if(typeof(data._id) != 'undefined') {
                    addImage(data);
                    setupImgHandlers();
                }
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
    var area = $(".imageArea");
    area.find('img').off().click(function() {
        $('.select, .edit').hide();
        $(this).parent().find('.select, .edit').show();
    });
    
    area.find('.select').off().click(function() {
        window.prompt ("URL for this image\nCopy and use however you like", $(this).parent('.imgContainer').find('img').get(0).src);
    });
}

function addImage(image) {
    $(".imageArea").append(
        '<div class="imgContainer col-xs-12 col-md-4">'+
        '<img src="/memes/'+image._id+'" />'+
        '<p class="select"><span>select</span></p>'+
        '<p class="edit">edit</p>'+
        '</div>'
    );
}

function getImages() {
    $.get('/memes', function(images) {
        if(images.length > 0) {
            var imageArea = $(".imageArea");
            imageArea.empty();
            for(i in images) {
                if(images.hasOwnProperty(i)) {
                    addImage(images[i]);
                }
            }
            
            setupImgHandlers();
        }
    });
}

$(function(){
    setupUploadHandlers();
    getImages();
});