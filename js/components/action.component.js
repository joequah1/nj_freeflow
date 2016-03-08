var action = function (_this) {
    this.prototype = {
        initialize : function () {
            var layer = $('.ff_layer.selected[tab=' + _this.tab + ']').attr('layer') || 0;
    
            var lp = _this.sdk.getInput({
                'title' : {
                    'title' : 'Landing Page'
                },
                'id' : '',
                input : {
                    'type' : 'text',
                    'class' : ' ff_action_lp_input ff_actions ',
                    'tab' : _this.tab,
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

            var click = _this.sdk.getSelect({
                'title' : {
                    'title' : 'On Click'
                },
                'input' : {
                    'value' : -1,
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
                        var tab = $(this).attr('tab');
                        var layer = $('.ff_layer.selected[tab=' + tab + ']').attr('layer');

                        if (typeof _this.data.layers[layer] != 'undefined') {
                            _this.data.layers[layer].actions.click.type = value;
                        }

                        $('.ff_actions[tab=' + tab + ']').parent().hide();
                        $(actions[value]).show();
                    }
                }
            });

            _this.actionContainer.append([click, lp]);
        },
        change : function (tab, index) {
            /* set in input */
            $('.ff_action_lp_input[tab=' + tab + ']').val(_this.data.layers[index].actions.click.lp);
            $('.ff_action_select[tab=' + tab + ']').val(_this.data.layers[index].actions.click.type);
            document.querySelector('.ff_action_select[tab=' + tab + ']').dispatchEvent(new Event('change'));
        }
    };
    
    return this.prototype;
}