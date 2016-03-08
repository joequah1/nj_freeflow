
 var media = function (_this) {
    this.prototype = {
        initialize : function () {
            var self = this;
            var media = _this.sdk.getSelect({
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
                            self.controller({
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

            var mediaContent = _this.sdk.getCustom({
                'title' : { 'title' : '' },
                'input' : '<div id="ff_media_content" class="ff_media_content_style" tab="' + _this.tab + '"></div>'
            });
            
            var section_2 = _this.sdk.section ({
                'title' : {'title':'Media'},
                'input' : [media, mediaContent],
            });

            section_2.style.marginTop = '-35px';

            _this.container.append(section_2); 

            _this.layerContent_section_2 = section_2;
        },
        controller : function (options) {
            var medias  = [imageMedia, buttonMedia, textMedia, shapeMedia]
    
            new medias[options.media] ({
                id : options.media,
                container : $('#ff_media_content[tab=' + options.tab + ']'),
                content : $('#ff_layer_' + options.layer + ' .content'),
                controller : _this,
                sdk : _this.sdk,
                tab : _this.tab,
                layer : options.layer,
                data : _this.data.layers[options.layer].content
            });
        },
        change : function (tab, index) {
            this.media.value = _this.data.layers[index].content.media || -1;
    
            this.media.dispatchEvent(new Event('change'));
        }
    };
     
    return this.prototype;
 }