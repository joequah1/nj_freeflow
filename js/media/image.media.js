var imageMedia = function (options) { 
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
            image : '',
            action : -1, 
            action_lp : '',
        };
    }
    
    this.render();
    this.panel();
};

imageMedia.prototype.panel = function () {
    
    var _this = this; 
    
    var image = this.sdk.getFile({
        'title' : {
            'title' : 'Image'
        },
        'id' : '',
        input : {
            'class' : 'ff_media_image_file_input',
            'tab' : this.tab,
            'value' : this.data.data[this.id].image,
            'style' : 'width:95%;'
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                
                console.log(this.files)
                
                if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                      
                        _this.content.children('img').attr('src', e.target.result);
                        _this.data.data[_this.id].image = e.target.result;
                    };
                    reader.readAsDataURL(this.files[0]);
                  }
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
        'input' : [image, actions, lp],
    });
    
    this.container.html('');
    this.container.append(section);
}

imageMedia.prototype.render = function () {
    
    this.img = $('<img id="ff_image_img_' + this.layer + '" src="' + this.data.data[this.id].image + '" tab="' + this.tab + '" layer="' + this.layer + '"/>').addClass('ff_media_image_style');
    
    this.content.html(this.img);
}
