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
            color : 'black', 
            bgColor : 'transparent',
            size : '12'
        };
    }
    
    this.render();
    this.panel();
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
            'class' : 'ff_media_text_text_input',
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
    
    var bgColors = this.sdk.getSelect({
        'title' : {
            'title' : 'Background Color'
        },
        'input' : {
            'value' : this.data.data[this.id].bgColor,
            'options' : [
                {'text' : 'transparent', 'value' : 'transparent'},
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
                
                _this.content.children('p.ff_media_text_container').css('background-color', value);
                _this.data.data[_this.id].bgColor = value;
            }
        }
    });
    
    var colors = this.sdk.getSelect({
        'title' : {
            'title' : 'Color'
        },
        'input' : {
            'value' : this.data.data[this.id].color,
            'options' : [
                {'text' : 'black', 'value' : 'black'},
                {'text' : 'white', 'value' : 'white'},
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
                
                _this.content.children('p.ff_media_text_container').css('color', value);
                _this.data.data[_this.id].color = value;
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
            'class' : 'ff_media_text_size_input',
            'tab' : this.tab,
            'value' : this.data.data[this.id].size,
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                var value = $(this).val();
                
                _this.content.children('p.ff_media_text_container').css('font-size', value + 'px');
                _this.data.data[_this.id].size = value;
            }
        }
    });
    
    var section = this.sdk.section ({
        'input' : [text, bgColors, colors, size],
    });
    
    this.container.html('');
    this.container.append(section);
}
textMedia.prototype.render = function () {
    
    this.txt = $('<p id="ff_text_txt_' + this.layer + '" tab="' + this.tab + '" layer="' + this.layer + '">' + this.data.data[this.id].text + ' </p>').addClass('ff_media_text_container');
    
    this.content.html(this.txt);
    
}
