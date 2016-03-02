var buttonMedia = function (options) { 
    console.log(options)
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
            'class' : 'ff_media_button_text_input',
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
    
    var lp = this.sdk.getInput({
        'title' : {
            'title' : 'Landing Page'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_media_button_lp_input',
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
        'input' : [text, actions, lp],
    });
    
    this.container.html('');
    this.container.append(section);
}
buttonMedia.prototype.render = function () {
    
    this.btn = $('<a id="ff_button_btn_' + this.layer + '" tab="' + this.tab + '" layer="' + this.layer + '"></a>').addClass('ff_button_btn').html(this.data.data[this.id].text);
    
    this.content.html(this.btn);
}

buttonMedia.prototype.events = function () {
    
    var _this = this; 
    
    this.controller.addResizeEvent(function (e) {
        $('#ff_button_btn_' + e.layer + '[tab=' + e.tab + ']').css('line-height', e.size.height + 'px');
    });
}
