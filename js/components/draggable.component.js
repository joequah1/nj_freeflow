var drag = function (_this) {
    this.prototype = {
        initialize : function () {},
        new : function (layer, tab) {
            $(layer).draggable({
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
    };
    
    return this.prototype;
}