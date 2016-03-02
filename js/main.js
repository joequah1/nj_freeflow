var myComponent = function (options) {

    /* initialize SDK */ 
    this.sdk = new madCreator ({
        id : 26
    });

    /* tab identifier */ 
    this.tab = options.tab;

    /* input container */
    this.container = options.container;

    /* ad preview container */
    this.content = options.content;
    /* clear content */
    this.content.html('');
    
    /* define the data structure if its empty */
    this.data = Object.keys(options.data).length != 0 ? options.data : {layers:{}};

    /* set data structure to SDK */
    this.sdk.setPrefStructure (this.data);
    
    var _this = this;
    this.sdk.loadJs('http://192.168.56.1:9090/js/animation.js',  function () {   
        _this.animateProperty();
    });
    
    this.sdk.loadJs('http://192.168.56.1:9090/js/media_image.js');
    this.sdk.loadJs('http://192.168.56.1:9090/js/media_btn.js');
    this.sdk.loadJs('http://192.168.56.1:9090/js/media_text.js');
    this.sdk.loadJs('http://192.168.56.1:9090/js/media_shape.js');
    this.sdk.loadJs('http://192.168.56.1:9090/js/velocity.js', function () {
        if (window.jQuery) { window.Velocity = $.Velocity; };
    });
    
    this.sdk.loadCss('http://192.168.56.1:9090/css/style.css');
    //this.sdk.loadCss('http://192.168.56.1:9090/css/animate.css');
    //this.sdk.loadCss('http://192.168.56.1:9090/css/animation-property.css');
    this.sdk.loadCss('http://192.168.56.1:9090/css/nj-pure-tab.css');
    
    this.layering();
    this.layeringEvents();
    
    
    this.layerContent();
    
    /* add layer for new ad */
    if ( Object.keys(options.data).length == 0 ) {
        $('.ad_creator_sub_btn[tab='+this.tab+']').click();
    }
}
/* layering */
myComponent.prototype.layering = function () {
    
    var _this = this;
    
    var addLayer = this.sdk.getButton({
        title : { title : '' },
        input : { value : 'Add Layer', style : 'margin-bottom:10px;', tab : this.tab }, 
        event : {
            type : 'click', 
            'callback' : function () {
                
                var index =  Object.keys(_this.data.layers).length;
                
                /* create layer */
                var layer = document.createElement('div');
                layer.id = 'ff_layer_' + index;
                layer.className = 'ff_layer ff_layer_style selected';
                layer.setAttribute('tab', _this.tab);
                layer.setAttribute('layer', index);
                
                /* test */
                layer.style.position = 'absolute';
                layer.style.top = 0;
                layer.style.left = 0;
                layer.style.width = 100;
                layer.style.height = 50;
                
                layer.innerHTML = '<div class="content"><img src="http://192.168.56.1:9090/img/' + index + '.png" width="100%" height="100%"/></div>';
                
                /* remove selected div */
                $('.ff_layer[tab=' + _this.tab + ']').removeClass('selected');
                
                /* add to content */
                _this.content.append(layer);
                /* init resize */
                _this.stopReize('.ff_layer[tab=' + _this.tab + ']');
                _this.resize(layer);
                /* draggable */
                _this.drag(layer);
                
                /* add to list */
                var list = document.createElement('li');
                list.id = 'ff_layer_list_' + index;
                list.className = 'ff_layer_list_style ff_layer_list selected ui-state-default';
                list.setAttribute('tab', _this.tab);
                list.setAttribute('layer', index);
                list.innerHTML = 'Layer ' + index + '<i class="fa fa-trash fa-2x ff_delete_layer" tab="' + _this.tab + '" layer="' + index + '"></i>';
                $('#ff_layers_list_sortable').sortable({
                    start: function(event, ui) {
                        ui.item.startPos = ui.item.index();
                    },
                    update : function (event, ui) {
                        /* start pos get from start */ 
                        var start = ui.item.startPos;
                        /* latest index */
                        var index = ui.item.index();
                        var tab = $(ui.item).attr('tab');
                        var layer = $(ui.item).attr('layer');
                        
                        if (index < start) {
                            --index;
                        }

                        /* insert after the child of the position before 
                        * Eg. new position 2, so need to insert after child at position 1
                        */
                        if (index != -1) {
                            $(_this.content).children('#ff_layer_' + layer).insertAfter( $(_this.content).children().get(index) )
                        } else {
                            $(_this.content).prepend($(_this.content).children('#ff_layer_' + layer));
                        }
                    }
                }).disableSelection();
                
                /* moreve selected on list */
                $('.ff_layer_list[tab=' + _this.tab + ']').removeClass('selected');
                
                document.querySelector('#ff_layers_list_sortable[tab=' + _this.tab + ']').appendChild(list);
                
                /* add to json */
                _this.data.layers[index] = {
                    x : 0,
                    y : 0,
                    w : 100,
                    h : 50,
                    status : 1,
                    content : {
                        media : -1,
                        data : {}
                    }
                }
                
                /* set content property after insert to json */
                _this.setContentProperty(_this.tab, index);
                
                /* show layer content */
                _this.showLayerContent();
                
                /* change the media */
                _this.changeMedia(index);
            }
        }  
    });
    
    var layersList = this.sdk.getCustom({
        'title' : { 'title' : '' },
        'input' : '<div id="ff_layers_list" class="ff_layers_list_style" tab="' + this.tab + '"><ul id="ff_layers_list_sortable" class="ff_layers_list_sortable_style" tab="' + this.tab + '"></ul></div>'
    });
    
    var section = this.sdk.section ({
        'title' : {'title':'Layering'},
        'input' : [addLayer, layersList],
    });
    
    this.container.append(section);
}
/* Layering */
myComponent.prototype.layeringEvents = function () {
    
    var _this = this;
    /* select layer from list */
    $(document).on('click', '.ff_layer_list[tab='+this.tab+']', function () {
        
        /* layer index */
        var index = $(this).attr('layer');
        /* tab */
        var tab = $(this).attr('tab');
        
        /* selected on list */
        $('.ff_layer_list[tab=' + tab + ']').removeClass('selected');
        $(this).addClass('selected');
        
        /* selected div */
        $('.ff_layer[tab=' + tab + ']').removeClass('selected');
        $('#ff_layer_' + index + '[tab=' + tab + ']').addClass('selected');
        
        /* resize */
        _this.stopReize('.ff_layer[tab=' + tab + ']');
        _this.resize('#ff_layer_' + index + '[tab=' + tab + ']');
        
        /* set content property */
        _this.setContentProperty(tab, index);
        
        /* change the media */
        _this.changeMedia(index);
    });
    
    /* select layer from list */
    $(document).on('click', '.ff_layer[tab='+this.tab+']', function () {
        
        /* layer index */
        var index = $(this).attr('layer');
        /* tab */
        var tab = $(this).attr('tab');
        
        /* selected on list */
        $('.ff_layer_list[tab=' + tab + ']').removeClass('selected');
        $('#ff_layer_list_' + index + '[tab=' + tab + ']').addClass('selected');
        
        /* selected div */
        $('.ff_layer[tab=' + tab + ']').removeClass('selected');
        $(this).addClass('selected');
        
        /* resize */
        _this.stopReize('.ff_layer[tab=' + tab + ']');
        _this.resize('#ff_layer_' + index + '[tab=' + tab + ']');
        
        /* set content property */
        _this.setContentProperty(tab, index);
        
        /* change the media */
        _this.changeMedia(index);
    });
    
    /* delete layer */
    $(document).on('click', '.ff_delete_layer[tab='+this.tab+']', function () {
        
        /* layer index */
        var index = $(this).attr('layer');
        /* tab */
        var tab = $(this).attr('tab');
        
        /* remove */
        $('#ff_layer_' + index + '[tab=' + tab + ']').remove();
        $('#ff_layer_list_' + index + '[tab=' + tab + ']').remove();
        
        /* json */
        _this.data.layers[index].status = 0; 
    });
}

myComponent.prototype.resize = function (ele) {
    
    var _this = this;
    
    this.resizeEvents = this.resizeEvents || [];
    
    $(ele).resizable({
        stop : function (event, ui) {
            var tab = $(ui.element).attr('tab');
            var layer = $(ui.element).attr('layer');
            
            /* json */
            _this.data.layers[layer].w = ui.size.width;
            _this.data.layers[layer].h = ui.size.height;
            
            /* set to input */
            $('.ff_w_input[tab=' + tab + ']').val(ui.size.width);
            $('.ff_h_input[tab=' + tab + ']').val(ui.size.height);
            
            _this.resizeEventTrigger({
                size : ui.size,
                tab : tab,
                layer : layer
            });
            
            console.log(_this.data);
        }
    });
}
myComponent.prototype.addResizeEvent = function (fn) {  console.log(fn);
    this.resizeEvents.push(fn);
};
myComponent.prototype.resizeEventTrigger = function (options) {
    for (var i = 0; i < this.resizeEvents.length; i++) {
        this.resizeEvents[0](options);
    }
};
myComponent.prototype.stopReize = function (ele) {
    $(ele).resizable('destroy');
}

myComponent.prototype.drag = function (ele) {
    
    var _this = this;
    
    $(ele).draggable({
        cancel: false,
        stop : function (event, ui) {
            var tab = $(ui.helper[0]).attr('tab');
            var layer = $(ui.helper[0]).attr('layer');

            /* json */
            _this.data.layers[layer].x = ui.position.left;
            _this.data.layers[layer].y = ui.position.top;
            
            
            /* set to input */
            if ($(ui.helper[0]).hasClass('selected')) {
                $('.ff_x_input[tab=' + tab + ']').val(ui.position.left);
                $('.ff_y_input[tab=' + tab + ']').val(ui.position.top);
            }
            
            console.log(_this.data);
        }
    });
}


myComponent.prototype.layerContent = function () {
    
    var _this = this;
    
    var divider = this.sdk.getDivider ();
    
    var x = this.sdk.getInput({
        'title' : {
            'title' : 'X Position'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_x_input',
            'tab' : this.tab,
            'value' : 0
        },
        'event' : {
            'type' : 'blur',
            'dispatch' : true,
            'callback' : function () {
                
                var value = $(this).val();
                var tab = $(this).attr('tab');
                var layer = $('.ff_layer.selected[tab=' + tab + ']').attr('layer');
                
                $('.ff_layer.selected[tab=' + tab + ']').css('left', value);
                
                /* json */
                if (typeof _this.data.layers[layer] != 'undefined') {
                    _this.data.layers[layer].x = value;
                }
            }
        }
    });
    var y = this.sdk.getInput({
        'title' : {
            'title' : 'Y Position'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_y_input',
            'tab' : this.tab,
            'value' : 0
        },
        'event' : {
            'type' : 'blur',
            'dispatch' : true,
            'callback' : function () {
                
                var value = $(this).val();
                var tab = $(this).attr('tab');
                var layer = $('.ff_layer.selected[tab=' + tab + ']').attr('layer');
                
                $('.ff_layer.selected[tab=' + tab + ']').css('top', value);
                
                /* json */
                if (typeof _this.data.layers[layer] != 'undefined') {
                    _this.data.layers[layer].y = value;
                }
            }
        }
    });
    var w = this.sdk.getInput({
        'title' : {
            'title' : 'Width'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_w_input',
            'tab' : this.tab,
            'value' : 0
        },
        'event' : {
            'type' : 'blur',
            'dispatch' : true,
            'callback' : function () {
                
                var value = $(this).val();
                var tab = $(this).attr('tab');
                var layer = $('.ff_layer.selected[tab=' + tab + ']').attr('layer');
                
                $('.ff_layer.selected[tab=' + tab + ']').css('width', value);
                
                /* json */
                if (typeof _this.data.layers[layer] != 'undefined') {
                    _this.data.layers[layer].w = value;
                }
            }
        }
    });
    var h = this.sdk.getInput({
        'title' : {
            'title' : 'Height'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_h_input',
            'tab' : this.tab,
            'value' : 0
        },
        'event' : {
            'type' : 'blur',
            'dispatch' : true,
            'callback' : function () {
                
                var value = $(this).val();
                var tab = $(this).attr('tab');
                var layer = $('.ff_layer.selected[tab=' + tab + ']').attr('layer');
                
                $('.ff_layer.selected[tab=' + tab + ']').css('height', value);
                
                /* json */
                if (typeof _this.data.layers[layer] != 'undefined') {
                    _this.data.layers[layer].h = value;
                }
            }
        }
    });
    
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
    
    var section = this.sdk.section ({
        'title' : {'title':''},
        'input' : [x, y, w, h],
    });
    
    var section_2 = this.sdk.section ({
        'title' : {'title':'Media'},
        'input' : [media, mediaContent],
    });
    
    /* hide sections until there's selected layer */
    //$(section).hide();
    $(section_2).hide();
    
    //this.layerContent_section = section;
    this.layerContent_section_2 = section_2;
    
    //this.container.append(divider);
    this.renderTabs();
    this.propertyContainer.append([x, y, w, h]);
    
    this.container.append(section_2); 
} 
myComponent.prototype.renderTabs = function () {
    
    var tabs = this.sdk.getCustom({
        'title' : { 'title' : '' },
        'input' : '<div id="nj_tabs_' + this.tab + '"class="nj_tabs"tab="' + this.tab + '"><input type="radio"checked name="tabs"id="nj_tab_1_'+this.tab+'"rel="1"><label for="nj_tab_1_'+this.tab+'"id="label1"class="nj_tab_radio selected">Property</label><input type="radio"name="tabs"id="nj_tab_2_'+this.tab+'"rel="2"><label for="nj_tab_2_'+this.tab+'"id="label2"class="nj_tab_radio">Animation</label><div id="nj_tab_content_1"class="tab_content selected"></div><div id="nj_tab_content_2"class="tab_content"></div></div>'
    });
    tabs.style.padding = '0';
    
    this.container.append(tabs);
    
    this.propertyContainer = $(tabs).find('#nj_tab_content_1');
    this.animationContainer = $(tabs).find('#nj_tab_content_2');
    
    $('#nj_tabs_' + this.tab + ' input[type=radio][name=tabs]').on('change', function () {
        $(this).siblings('.nj_tab_radio').removeClass('selected');
        $(this).next().addClass('selected');
        
        $(this).siblings('.tab_content').removeClass('selected');
        $(this).siblings('#nj_tab_content_' + $(this).attr('rel')).addClass('selected');
    });
}
myComponent.prototype.changeMedia = function (index) {
    this.media.value = this.data.layers[index].content.media || -1;
    
    this.media.dispatchEvent(new Event('change'));
}
myComponent.prototype.showLayerContent = function () {
    $(this.layerContent_section).show();
    $(this.layerContent_section_2).show();
}
myComponent.prototype.setContentProperty = function (tab, index) {
    /* set to input */
    $('.ff_w_input[tab=' + tab + ']').val(this.data.layers[index].w);
    $('.ff_h_input[tab=' + tab + ']').val(this.data.layers[index].h);
    /* set to input */
    $('.ff_x_input[tab=' + tab + ']').val(this.data.layers[index].x);
    $('.ff_y_input[tab=' + tab + ']').val(this.data.layers[index].y);
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
