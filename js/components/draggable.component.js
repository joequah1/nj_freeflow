myComponent.prototype.drag = function (ele) {
    
    var _this = this;
    
    $(ele).draggable({
        cancel: false,
        stop : function (event, ui) {
            var tab = $(ui.helper[0]).attr('tab');
            var layer = $(ui.helper[0]).attr('layer');

            /* json */
            _this.data.layers[layer].x = ui.position.left;
            _this.data.layers[layer].y = ui.position.top;
            
            
            /* set to input */
            if ($(ui.helper[0]).hasClass('selected')) {
                $('.ff_x_input[tab=' + tab + ']').val(ui.position.left);
                $('.ff_y_input[tab=' + tab + ']').val(ui.position.top);
            }
        }
    });
}
