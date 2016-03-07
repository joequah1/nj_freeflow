

myComponent.prototype.renderMedia = function () {
    
    var _this = this;
    
    var media = this.sdk.getSelect({
        'title' : {
            'title' : 'Media'
        },
        'input' : {
            'value' : -1,
            'options' : [
                {'text' : '-- Select --', 'value' : -1},
                {'text' : 'Image', 'value' : 0},
                {'text' : 'Button', 'value' : 1},
                {'text' : 'Text', 'value' : 2},
                {'text' : 'Shape', 'value' : 3}
            ],
            'tab' : _this.tab,
            'id' : 'ff_media_select'
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                /* media controller */
                if ($(this).val() != -1) {
                    _this.controller({
                        media : $(this).val(),
                        tab : $(this).attr('tab'),
                        layer : $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('layer')
                    });
                } else {
                    $('#ff_media_content[tab=' + $(this).attr('tab') + ']').html('');
                }
            }
        }
    });
    
    this.media = media.querySelector('#ff_media_select');
    
    var mediaContent = this.sdk.getCustom({
        'title' : { 'title' : '' },
        'input' : '<div id="ff_media_content" class="ff_media_content_style" tab="' + this.tab + '"></div>'
    });

    var images = this.sdk.getImages({
        'title' : {
            'title' : 'Media'
        },
        'name' : '',
        'tab' : this.tab,
        'addCallback' : function (image) {
            $('.ff_layer.selected[tab=' + _this.tab + ']').append('<img src="' + image + '" id="ff_media_image" rel="' + _this.tab + '" style="width:100%;height:100%;"/>');
        },
        'removeCallback' : function () {
            $('.ff_layer.selected[tab=' + _this.tab + ']').html('');
        }
    });
    
    var section_2 = this.sdk.section ({
        'title' : {'title':'Media'},
        'input' : [media, mediaContent],
    });
    
    $(section_2).hide();
    
    section_2.style.marginTop = '-35px';
    
    this.container.append(section_2); 
    
    this.layerContent_section_2 = section_2;
}
myComponent.prototype.changeMedia = function (index) {
    this.media.value = this.data.layers[index].content.media || -1;
    
    this.media.dispatchEvent(new Event('change'));
}
myComponent.prototype.controller = function (options) {
    
    var medias  = [imageMedia, buttonMedia, textMedia, shapeMedia]
    
    new medias[options.media] ({
        id : options.media,
        container : $('#ff_media_content[tab=' + options.tab + ']'),
        content : $('#ff_layer_' + options.layer + ' .content'),
        controller : this,
        sdk : this.sdk,
        tab : this.tab,
        layer : options.layer,
        data : this.data.layers[options.layer].content
    });
}
