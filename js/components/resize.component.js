
freeflowComponent.prototype.resize = function (ele) {
    
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
        }
    });
}
freeflowComponent.prototype.addResizeEvent = function (fn) {
    this.resizeEvents.push(fn);
};
freeflowComponent.prototype.resizeEventTrigger = function (options) {
    for (var i = 0; i < this.resizeEvents.length; i++) {
        this.resizeEvents[0](options);
    }
};
freeflowComponent.prototype.stopReize = function (ele) {
    $(ele).resizable('destroy');
}

var resize = function (_this) {
    this.prototype = {
        initialize : function () {
            this.resizeEvents = [];
        },
        new : function (layer, tab) {
            var self = this;
            
            $('.ff_layer[tab=' + tab + ']').resizable('destroy');
            
            $(layer).resizable({
                stop : function (event, ui) {
                    var tab = $(ui.element).attr('tab');
                    var layer = $(ui.element).attr('layer');

                    /* json */
                    _this.data.layers[layer].w = ui.size.width;
                    _this.data.layers[layer].h = ui.size.height;

                    /* set to input */
                    $('.ff_w_input[tab=' + tab + ']').val(ui.size.width);
                    $('.ff_h_input[tab=' + tab + ']').val(ui.size.height);

                    self.onResize({
                        size : ui.size,
                        tab : tab,
                        layer : layer
                    });
                }
            });
        },
        onResize : function (options) {
            for (var i = 0; i < this.resizeEvents.length; i++) {
                this.resizeEvents[0](options);
            }
        },
        addResizeEvent : function (fn) {
            this.resizeEvents.push(fn);
        }
    };
    
    return this.prototype;
}