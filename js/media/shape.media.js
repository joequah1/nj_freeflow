var shapeMedia = function (options) {
    this.id = options.id;
    this.content = $(options.content);
    this.container = $(options.container);
    this.sdk = options.sdk;
    this.tab = options.tab;
    this.layer = options.layer;
    this.controller = options.controller;
    this.data = options.data
    
    /* set json */
    this.data.media = this.id;
    if (typeof this.data.data[this.id] == 'undefined') {
        this.data.data[this.id] = {
            bgColor : 'grey',
            shape : 'rectangle'
        };
    }
    
    this.render();
    this.panel();
};

shapeMedia.prototype.panel = function () {
    
    var _this = this; 
    
    var text = this.sdk.getInput({
        'title' : {
            'title' : 'Text'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_media_shape_text_input',
            'tab' : this.data.data[this.id].text,
            'value' : 'Free Flow',
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'keyup',
            'callback' : function () {
                var value = $(this).val();
                
                _this.content.children('p.ff_media_shape_div').html(value);
                _this.data.data[_this.id].text = value;
            }
        }
    });
    
    var bgColors = this.sdk.getSelect({
        'title' : {
            'title' : 'Background Color'
        },
        'input' : {
            'value' : this.data.data[this.id].bgColor,
            'options' : [
                {'text' : 'grey', 'value' : 'grey'},
                {'text' : 'white', 'value' : 'white'},
                {'text' : 'black', 'value' : 'black'},
                {'text' : 'blue', 'value' : 'blue'},
                {'text' : 'red', 'value' : 'red'},
                {'text' : 'green', 'value' : 'green'}
            ],
            'tab' : _this.tab
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                
                var value = $(this).val();
                
                _this.content.children('p.ff_media_shape_div').css('background-color', value);
                _this.data.data[_this.id].bgColor = value;
            }
        }
    });
    
    var shape = this.sdk.getSelect({
        'title' : {
            'title' : 'Shape'
        },
        'input' : {
            'value' : this.data.data[this.id].color,
            'options' : [
                {'text' : 'Rectangle', 'value' : 'rectangle'},
                {'text' : 'Circle', 'value' : 'circle'},
            ],
            'tab' : _this.tab
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                
                var value = $(this).val();
                
                _this.content.children('div.ff_media_shape_div').addClass(value);
                _this.data.data[_this.id].shape = value;
            }
        }
    });
    
    var size = this.sdk.getInput({
        'title' : {
            'title' : 'Size'
        },
        'id' : '',
        input : {
            'type' : 'number',
            'class' : 'ff_media_shape_size_input',
            'tab' : this.tab,
            'value' : this.data.data[this.id].size,
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                var value = $(this).val();
                
                _this.content.children('p.ff_media_shape_div').css('font-size', value + 'px');
                _this.data.data[_this.id].size = value;
            }
        }
    });
    
    var section = this.sdk.section ({
        'input' : [text, shape, bgColors],
    });
    
    this.container.html('');
    this.container.append(section);
}
shapeMedia.prototype.render = function () {
    
    this.txt = $('<div id="ff_media_shape_div_' + this.layer + '" tab="' + this.tab + '" layer="' + this.layer + '"</div>').addClass('ff_media_shape_div_style').addClass('ff_media_shape_div').addClass(this.data.data[this.id].shape);
    
    this.content.html(this.txt);
    
}
