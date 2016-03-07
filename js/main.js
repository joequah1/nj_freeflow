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
    
    this.path = 'http://192.168.56.1:9090/';

    this.sdk.loadCss(this.path + 'css/style.css');
    this.sdk.loadCss(this.path + 'css/media.css');
    this.sdk.loadCss(this.path + 'css/nj-pure-tab.css');
    
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
        'js/plugins/velocity.js'];
    
    /* load all js before initializing */
    this.loadJs(js, function () {
        
        /* to use Velocity without Jquery */ 
        if (window.jQuery) { window.Velocity = $.Velocity; };
        
        _this.generate();
        _this.layering();
        _this.renderMedia();
        _this.layerContent();
        _this.animateProperty();
        _this.action();

        /* add layer for new ad */
        if ( Object.keys(options.data).length == 0 ) {
            $('.ad_creator_sub_btn[tab='+_this.tab+']').click();
        } else {
            for ( var i = 0; i < Object.keys(options.data.layers).length; i++ ) {
                _this.createLayer(_this, i);
                _this.changeMedia(i);
            }
        }
    })
    

}

myComponent.prototype.loadJs = function(files, callback) {
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

myComponent.prototype.addHttp = function (url) {
   if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
   }
   return url;
}

myComponent.prototype.generate = function () {
    
    var _this = this;
    
    var generate = this.sdk.getButton({
        'title' : {'title' : '' },
        'input' : { value : 'Generate', tab : this.tab, style : 'margin-top: 10px;' },
        'event' : {
            'type' : 'click',
            'callback' : function () {
                
                $.get('http://192.168.56.1:9090/js/main.js', function (data) {
                    console.log(data);
                });
                var tab = $(this).attr('tab');
                console.log('generate');
                console.log(_this.content.html() );
                console.log(JSON.stringify(_this.data));
            }
        }
    });
    
    this.container.append(generate);
}