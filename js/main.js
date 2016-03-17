var freeflowComponent = function (options) {

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
    this.components = {};
    
    this.fonts = [{'text' : 'Arial', 'value' : 'Arial'},{'text' : 'Arial Black', 'value' : 'Arial Black'},{'text' : 'Book Antiqua', 'value' : 'Book Antiqua'},{'text' : 'Comic Sans MS', 'value' : 'Comic Sans MS'},{'text' : 'Courier New', 'value' : 'Courier New'},{'text' : 'Georgia', 'value' : 'Georgia'},{'text' : 'Helvetica', 'value' : 'Helvetica'},{'text' : 'Lucida Console', 'value' : 'Lucida Console'},{'text' : 'Lucida Grande', 'value' : 'Lucida Grande'},{'text' : 'Lucida Sans Unicode', 'value' : 'Lucida Sans Unicode'},{'text' : 'Palatino Linotype', 'value' : 'Palatino Linotype'},{'text' : 'Tahoma', 'value' : 'Tahoma'},{'text' : 'Times New Roman', 'value' : 'Times New Roman'},{'text' : 'Trebuchet MS', 'value' : 'Trebuchet MS'},{'text' : 'Verdana', 'value' : 'Verdana'}];

    this.path = options.path

    this.sdk.loadCss(this.path + 'css/style.css');
    this.sdk.loadCss(this.path + 'css/media.css');
    this.sdk.loadCss(this.path + 'css/nj-pure-tab.css');
    this.sdk.loadCss(this.path + 'js/plugins/colorpicker/css/bootstrap-colorpicker.min.css');
    
    var js = [
        'js/components/layer.component.js',
        'js/components/resize.component.js',
        'js/components/draggable.component.js',
        'js/components/media.component.js',
        'js/components/animation.component.js',
        'js/components/property.component.js',
        'js/components/action.component.js',
        'js/media/image.media.js',
        'js/media/button.media.js',
        'js/media/text.media.js',
        'js/media/shape.media.js',
        'js/plugins/velocity.js',
        'js/plugins/colorpicker/js/bootstrap-colorpicker.js'];
    
    /* load all js before initializing */
    this.loadJs(js, function () {
        
        /* to use Velocity without Jquery */ 
        if (window.jQuery) { window.Velocity = $.Velocity; };
        
        _this.generate();
        _this.components = { 
            'layer' : layer,
            'media' : media,
            'property' : property,
            'animation' : animation,
            'action' : action,
            'drag' : drag,
            'resize' : resize
        };
        
        _this.register();

        /* add layer for new ad */
        if ( Object.keys(options.data).length == 0 ) {
            $('.ad_creator_sub_btn[tab='+_this.tab+']').click();
        } else {
            for ( var i = 0; i < Object.keys(options.data.layers).length; i++ ) {
                _this.components['layer'].create(i);
            }
        }
    })
    

}
/* initializing components */
freeflowComponent.prototype.register = function () {
    for ( var fn in this.components ) {   
        this.components[fn] = new this.components[fn](this);
        this.components[fn].initialize();
    }
}
/* on selected layer change, trigger change function in each component */
freeflowComponent.prototype.onLayerChange = function (tab, index) {
    for ( var fn in this.components ) {  
        if (typeof this.components[fn].change != 'undefined') {
            this.components[fn].change(tab, index);
        }
    }
}
freeflowComponent.prototype.onNewLayer = function (layer, tab) {
    for ( var fn in this.components ) {  
        if (typeof this.components[fn].new != 'undefined') {
            this.components[fn].new(layer, tab);
        }
    }
}


freeflowComponent.prototype.loadJs = function(files, callback) {
    var _this = this;
    var script, r;
    r = false;
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = this.path + files[0];
    files.shift();
    script.onload = script.onreadystatechange = function() {
        if (!r && (!this.readyState || this.readyState == 'complete')) {
            r = true;
            if (files.length == 0) {
                callback();
            } else {
                _this.loadJs(files, callback)
            }
        }
    };
    document.getElementsByTagName('head')[0].appendChild(script);
}

freeflowComponent.prototype.addHttp = function (url) {
   if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
   }
   return url;
}


/* @TEST generate html */
freeflowComponent.prototype.generate = function () {
    
    var _this = this;
    
    var generate = this.sdk.getButton({
        'title' : {'title' : '' },
        'input' : { value : 'Generate', tab : this.tab, style : 'margin-top: 10px;' },
        'event' : {
            'type' : 'click',
            'callback' : function () {
                
                var tab = $(this).attr('tab');
                console.log('generate');
                console.log(_this.content.html() );
                console.log(JSON.stringify(_this.data));
                _this.sdk.setPrefStructure (_this.data);
                
            }
        }
    });
    
    this.container.append(generate);
}