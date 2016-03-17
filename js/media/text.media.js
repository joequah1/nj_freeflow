var textMedia = function (options) {
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
            text : 'Free Flow',
            ['color'] : 'black', 
            ['background-color'] : 'transparent',
            ['font-size'] : '12',
            ['font-weight'] : '100',
            ['text-align'] : 'left'
        };
    }
    
    this.render();
    this.panel();
    this.plugins();
};

textMedia.prototype.panel = function () {
    
    var _this = this; 
    
    var text = this.sdk.getInput({
        'title' : {
            'title' : 'Text'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_media_text_text_input form-control',
            'tab' : this.data.data[this.id].text,
            'value' : 'Free Flow',
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'keyup',
            'callback' : function () {
                var value = $(this).val();
                
                _this.content.children('p.ff_media_text_container').html(value);
                _this.data.data[_this.id].text = value;
            }
        }
    });

    var color = this.sdk.getInput({
        'title' : {
            'title' : 'Color'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_media_button_text_input form-control color-picker color',
            'tab' : this.tab,
            'value' : this.data.data[_this.id]['color'],
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'change',
            'dispatch' : true,
            'callback' : function () {
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
            'class' : 'ff_media_button_text_input form-control color-picker bgcolor',
            'tab' : this.tab,
            'value' : this.data.data[_this.id]['background-color'],
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'keyup',
            'dispatch' : true,
            'callback' : function () {
        
            }
        }
    });

    var f_family = this.sdk.getSelect({
        'title' : {
            'title' : 'Font Family'
        },
        'input' : {
            'value' : this.data.data[_this.id]['font-family'],
            'class' : 'form-control ',
            'options' : this.controller.fonts,
            'tab' : _this.tab
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                var value = $(this).val();
                _this.content.children('p.ff_media_text_container').css('font-family', value);
                _this.data.data[_this.id]['font-family'] = value;
            }
        }
    });

    var f_size = this.sdk.getInput({
        'title' : {
            'title' : 'Size'
        },
        'id' : '',
        input : {
            'type' : 'number',
            'class' : 'ff_media_text_size_input form-control',
            'tab' : this.tab,
            'value' : this.data.data[_this.id]['font-size'],
            'min': '8',
            'max': '48',
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                var value = $(this).val();
                _this.content.children('p.ff_media_text_container').css('font-size', value + 'px');
                _this.data.data[_this.id]['font-size'] = value;
            }
        }
    });

    var f_weight = this.sdk.getSelect({
        'title' : {
            'title' : 'Font Weight'
        },
        'input' : {
            'value' : this.data.data[_this.id]['font-weight'],
            'class' : 'form-control ',
            'options' : [
            {'text' : '100', 'value' : '100'},
            {'text' : '200', 'value' : '200'},
            {'text' : '300', 'value' : '300'},
            {'text' : '400', 'value' : '400'},
            {'text' : '500', 'value' : '500'},
            {'text' : '600', 'value' : '600'},
            {'text' : '700', 'value' : '700'},
            {'text' : '800', 'value' : '800'},
            {'text' : '900', 'value' : '900'},
            {'text' : 'Normal', 'value' : 'Normal'},
            {'text' : 'Bold', 'value' : 'Bold'},
            {'text' : 'Bolder', 'value' : 'Bolder'}
            ],
            'tab' : _this.tab
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {

                var value = $(this).val();
                _this.content.children('p.ff_media_text_container').css('font-weight', value);
                _this.data.data[_this.id]['font-weight'] = value;
            }
        }
    });

    var alignment = this.sdk.getSelect({
        'title' : {
            'title' : 'Alignment'
        },
        'input' : {
            'value' : this.data.data[_this.id]['text-align'],
            'class' : 'form-control ',
            'options' : [
            {'text' : 'Left', 'value' : 'left'},
            {'text' : 'Center', 'value' : 'center'},
            {'text' : 'Right', 'value' : 'right'},
            {'text' : 'Justify', 'value' : 'justify'}
            ],
            'tab' : _this.tab
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {

                var value = $(this).val();
                _this.content.children('p.ff_media_text_container').css('text-align', value);
                _this.data.data[_this.id]['text-align'] = value;
            }
        }
    });

    
    var section = this.sdk.section ({
        'input' : [text, bgcolor, color, f_family, f_size, f_weight, alignment],
    });
    
    this.container.html('');
    this.container.append(section);
}
textMedia.prototype.render = function () {
    
    this.txt = $('<p id="ff_text_txt_' + this.layer + '" tab="' + this.tab + '" layer="' + this.layer + '">' + this.data.data[this.id].text + ' </p>').addClass('ff_media_text_container');
    this.content.html(this.txt);

    for(var key in this.data.data[this.id]){  
        if(key != 'text' || key != 'action' || key != 'action_lp'){ 
            this.content.children('p.ff_media_text_container').css(key, this.data.data[this.id][key]);
        }
    }
    
}

textMedia.prototype.plugins = function(){
    var _this = this;
    $('.color-picker').colorpicker({ format: 'hex' });

    $('.color-picker.color').on('changeColor', function(){
        var value = $(this).colorpicker('getValue', '#000000');
        _this.content.children('p.ff_media_text_container').css('color', value);
        _this.data.data[_this.id]['color'] = value;
    });

    $('.color-picker.bgcolor').on('changeColor', function(){
        var value = $(this).colorpicker('getValue', '#000000');
        _this.content.children('p.ff_media_text_container').css('background-color', value);
        _this.data.data[_this.id]['background-color'] = value;
    });
}