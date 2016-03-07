myComponent.prototype.action = function () {
    
    var _this = this;
    var layer = $('.ff_layer.selected[tab=' + _this.tab + ']').attr('layer') || 0;
    
    var lp = this.sdk.getInput({
        'title' : {
            'title' : 'Landing Page'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : ' ff_action_lp_input ff_actions ',
            'tab' : this.tab,
            'value' : _this.data.layers[layer].actions.click.lp,
            'style' : 'width:95%;',
            'placeholder' : 'http://www.example.com'
        },
        'event' : {
            'type' : 'keyup',
            'dispatch' : true,
            'callback' : function () {
                var value = _this.addHttp($(this).val());
                $(this).val(value);
                var layer = $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('layer');
                
                $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('action-click-lp', value);
                
                if (typeof _this.data.layers[layer] != 'undefined') {
                    _this.data.layers[layer].actions.click.lp = value;
                }
            }
        }
    });
    $(lp).hide();
    
    var actions = [lp];
    
    var click = this.sdk.getSelect({
        'title' : {
            'title' : 'On Click'
        },
        'input' : {
            'value' : _this.data.layers[layer].actions.click.type,
            'options' : [
                {'text' : '-- Select --', 'value' : -1},
                {'text' : 'To Landing Page', 'value' : 0}
            ],
            'tab' : _this.tab,
            'class' : ' ff_action_select '
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                
                var value = $(this).val();
                var layer = $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('layer');
                
                if (typeof _this.data.layers[layer] != 'undefined') {
                    _this.data.layers[layer].actions.click.type = value;
                }
                
                $('.ff_actions').parent().hide();
                $(actions[value]).show();
            }
        }
    });
    
    this.actionContainer.append([click, lp]);
}