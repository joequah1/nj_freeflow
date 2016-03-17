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
            shape : 'rectangle',
            'background-color' : 'grey',
            'border-radius' : '0'
        };
    }

    console.log(this.data.data[this.id]);
    this.render();
    this.panel();
    this.plugins();
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
            'class' : 'ff_media_shape_text_input form-control',
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

    var bgcolor = this.sdk.getInput({
        'title' : {
            'title' : 'Background Color'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'form-control color-picker bgcolor',
            'tab' : this.tab,
            'value' : this.data.data[_this.id]['background-color'],
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'change',
            'dispatch' : true,
            'callback' : function () {
                // _this.content.children('a.ff_button_btn').html($(this).val());
                
                // _this.data.data[_this.id].bgColor = $(this).val();
            }
        }
    });

    var radius = this.sdk.getInput({
        'title' : {
            'title' : 'Border Radius'
        },
        'id' : '',
        input : {
            'type' : 'number',
            'class' : 'ff_media_shape_radius_input form-control',
            'tab' : this.tab,
            'value' : _this.data.data[_this.id]['border-radius'],
            'min': '0',
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                var value = $(this).val();
                _this.content.children('div.ff_media_shape_div').css('border-radius', value+'px');
                _this.data.data[_this.id]['border-radius'] = value;
            }
        }
    });

    var rounded_corners = this.sdk.getInput({
        'title' : {
            'title' : 'Rounded Corners'
        },
        'id' : '',
        input : {
            'type' : 'number',
            'class' : 'ff_media_shape_roundcorner_input form-control',
            'tab' : this.tab,
            'value' : _this.data.data[_this.id]['border-radius'],
            'min': '0',
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                var value = $(this).val();
                _this.content.children('div.ff_media_shape_div.rectangle').css('border-radius', value+'px');
                _this.data.data[_this.id]['border-radius'] = value + 'px';
            }
        }
    });

    var shape = this.sdk.getSelect({
        'title' : {
            'title' : 'Shape'
        },
        'input' : {
            'value' : this.data.data[this.id].shape,
            'class' : 'form-control ',
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
                if (value == 'circle') {
                    $(rounded_corners).hide();
                    $(radius).show();
                    _this.content.children('div.ff_media_shape_div.circle').css('border-radius', '50px');
                    $('.ff_media_shape_radius_input').val('50');
                    _this.data.data[_this.id]['border-radius'] = '50px';
                }else{
                    $(radius).hide();
                    $(rounded_corners).show();
                    _this.content.children('div.ff_media_shape_div.rectangle').css('border-radius', '0px');
                    $('.ff_media_shape_roundcorner_input').val(0);
                    _this.data.data[_this.id]['border-radius'] = '0px';
                }
            }
        }
    });

    if (this.data.data[_this.id].shape != 'circle') {
        $(radius).hide();
        $(rounded_corners).show();
    }else{
        $(rounded_corners).hide();
        $(radius).show();
        _this.data.data[_this.id]['border-radius'] = '50px';
    }

    var section = this.sdk.section ({
        'input' : [shape, bgcolor, radius, rounded_corners],
    });

    this.container.html('');
    this.container.append(section);
}
shapeMedia.prototype.render = function () {
    this.txt = $('<div id="ff_media_shape_div_' + this.layer + '" tab="' + this.tab + '" layer="' + this.layer + '"></div>').addClass('ff_media_shape_div_style').addClass('ff_media_shape_div').addClass(this.data.data[this.id].shape);
    this.content.html(this.txt);
    for(var key in this.data.data[this.id]){
        if(key != 'shape'){
            this.content.children('div.ff_media_shape_div').css(key, this.data.data[this.id][key]);
        }
    }
}

shapeMedia.prototype.plugins = function(){
    var _this = this;
    $('.color-picker').colorpicker({ format: 'hex' });

    $('.color-picker.bgcolor').on('changeColor', function(){
        var value = $(this).colorpicker('getValue', '#000000');
        _this.content.children('div.ff_media_shape_div').css('background-color', value);
        _this.data.data[_this.id]['background-color'] = value;
    });
}