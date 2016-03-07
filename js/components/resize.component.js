
myComponent.prototype.resize = function (ele) {
    
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
myComponent.prototype.addResizeEvent = function (fn) {
    this.resizeEvents.push(fn);
};
myComponent.prototype.resizeEventTrigger = function (options) {
    for (var i = 0; i < this.resizeEvents.length; i++) {
        this.resizeEvents[0](options);
    }
};
myComponent.prototype.stopReize = function (ele) {
    $(ele).resizable('destroy');
}