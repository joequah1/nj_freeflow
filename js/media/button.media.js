var buttonMedia = function (options) { 
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
            text : 'button', 
            action : -1, 
            action_lp : '',
        };
    }

    this.render();
    this.panel();
    this.events();
    this.plugins();
    // this.initFont();
};

buttonMedia.prototype.panel = function () {

    var _this = this; 

    var text = this.sdk.getInput({
        'title' : {
            'title' : 'Text'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_media_button_text_input form-control',
            'tab' : this.tab,
            'value' : this.data.data[_this.id].text,
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'keyup',
            'dispatch' : true,
            'callback' : function () {
                _this.content.children('a.ff_button_btn').html($(this).val());
                _this.data.data[_this.id].text = $(this).val();
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
                // _this.content.children('a.ff_button_btn').css('color', value + 'px');
                // _this.content.children('a.ff_button_btn').html($(this).val());

                // _this.data.data[_this.id].text = $(this).val();
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
            'type' : 'change',
            'dispatch' : true,
            'callback' : function () {
                // _this.content.children('a.ff_button_btn').html($(this).val());
                
                // _this.data.data[_this.id].bgColor = $(this).val();
            }
        }
    });

    var f_family = this.sdk.getSelect({
        'title' : {
            'title' : 'Font Family'
        },
        'input' : {
            'value' : this.data.data[_this.id]['font-family'],
            'class' : 'form-control font-family ',
            'options' : this.controller.fonts,
            'tab' : _this.tab
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                var value = $(this).val();

            _this.content.children('a.ff_button_btn').css('font-family', value);
                // _this.content.children('a.ff_button_btn').css(css);
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
            'value' : '10',
            'min': '8',
            'max': '48',
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                var value = $(this).val();
                _this.content.children('a.ff_button_btn').css('font-size', value + 'px');
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
                _this.content.children('a.ff_button_btn').css('font-weight', value);
                _this.data.data[_this.id]['font-weight'] = value;
            }
        }
    });

    var lp = this.sdk.getInput({
        'title' : {
            'title' : 'Landing Page'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_media_button_lp_input form-control',
            'tab' : this.tab,
            'value' : this.data.data[_this.id].action_lp,
            'style' : 'width:95%;',
            'placeholder' : 'http://www.example.com'
        },
        'event' : {
            'type' : 'keyup',
            'dispatch' : true,
            'callback' : function () {
                _this.content.children('button').html($(this).val());

                _this.data.data[_this.id].action_lp = $(this).val();
            }
        }
    });

    if (this.data.data[_this.id].action != 0) {
        $(lp).hide();
    }

    var actions = this.sdk.getSelect({
        'title' : {
            'title' : 'Action'
        },
        'input' : {
            'value' : this.data.data[_this.id].action,
            'class' : 'form-control ',
            'options' : [
            {'text' : '-- Select --', 'value' : -1},
            {'text' : 'To Landing Page', 'value' : 0}
            ],
            'tab' : _this.tab
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {

                var value = $(this).val();

                _this.data.data[_this.id].action = value;

                /* to landing page */
                if (value == 0) {
                    /* show lp input */
                    $(lp).show();
                }
            }
        }
    });

    var section = this.sdk.section ({
        'input' : [text, color, bgcolor, f_family, f_size, f_weight, actions, lp],
    });

    this.container.html('');
    this.container.append(section);
}
buttonMedia.prototype.render = function () {

    this.btn = $('<a id="ff_button_btn_' + this.layer + '" tab="' + this.tab + '" layer="' + this.layer + '"></a>').addClass('ff_button_btn').html(this.data.data[this.id].text);

    this.content.html(this.btn);

    for(var key in this.data.data[this.id]){  
        if(key != 'text' || key != 'action' || key != 'action_lp'){ 
            this.content.children('a.ff_button_btn').css(key, this.data.data[this.id][key]);
        }
    }
}

buttonMedia.prototype.events = function () {

    var _this = this; 

    this.controller.components['resize'].addResizeEvent(function (e) {
     $('#ff_button_btn_' + e.layer + '[tab=' + e.tab + ']').css('line-height', e.size.height + 'px');
    });
}

buttonMedia.prototype.plugins = function(){
    var _this = this;
    $('.color-picker').colorpicker({ format: 'hex'});

    $('.color-picker.color').on('changeColor', function(){
        var value = $(this).colorpicker('getValue', '#000000');
        $(this).val(value);
        _this.content.children('a.ff_button_btn').css('color', value);
        _this.data.data[_this.id]['color'] = value;
    });

    $('.color-picker.bgcolor').on('changeColor', function(){
        var value = $(this).colorpicker('getValue', '#000000');
        $(this).val(value);
        _this.content.children('a.ff_button_btn').css('background-color', value);
        _this.data.data[_this.id]['background-color'] = value;
    });
}

buttonMedia.prototype.initFont = function(){
    WFP.getFonts(function(fonts){
        $('.font-family').empty();
        $.each(fonts, function(index, val) {
            $('.font-family').append('<option value="'+ val.css.font_family +'">'+ val.name +'</option>');
        });
    });
}