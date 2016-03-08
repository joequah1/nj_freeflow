/*
this.animationContainer is required to render animation content
used VelocityJs animation library

attributes 
- njanimation-in
- njanimation-in-duration
- njanimation-in-delay
*/
var animation = function (_this) {
    
    this.prototype = {
        initialize : function () {
            var layer = $('.ff_layer.selected[tab=' + _this.tab + ']').attr('layer') || 0;
    
            /* Build In */
            var inSelection = _this.sdk.getSelect({
                'title' : { 'title' : 'Build In' },
                'input' : {
                    'options' : [
                        {'text' : 'None', 'value' : ''},
                        {'text' : 'Fade In', 'value' : 'fadeIn'},
                        {'text' : 'Slide Left In', 'value' : 'slideLeftIn'},
                        {'text' : 'Slide Right In', 'value' : 'slideRightIn'},
                        {'text' : 'Flip X In', 'value' : 'flipXIn'},
                        {'text' : 'Flip Y In', 'value' : 'flipYIn'},
                    ],
                    'tab' : _this.tab,
                    'id' : 'ff_animation_in_transition',
                    'class' : 'ff_animation_in_transition '
                },
                'event' : {
                    'type' : 'change',
                    'callback' : function () {

                        var value = $(this).val();

                        var layer = $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('layer');

                        _this.data.layers[layer].buildIn.transition = value;

                        if (value != '') {
                            /* set default opacity to 0 */
                            $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').css('opacity', 0);

                            /* Run animation for once */ 
                            Velocity( $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']'),"transition." +  value, { duration : 1000, delay : 0 });
                        }
                    }
                }
            });

            var outSelection = _this.sdk.getSelect({
                'title' : { 'title' : 'Build Out' },
                'input' : {
                    'options' : [
                        {'text' : 'None', 'value' : ''},
                        {'text' : 'Fade Out', 'value' : 'fadeOut'},
                        {'text' : 'Slide Left Out', 'value' : 'slideLeftOut'},
                        {'text' : 'Slide Right Out', 'value' : 'slideRightOut'},
                        {'text' : 'Flip X Out', 'value' : 'flipXOut'},
                        {'text' : 'Flip Y Out', 'value' : 'flipYOut'}
                    ],
                    'tab' : _this.tab,
                    'id' : 'ff_animation_out_transition',
                    'class' : 'ff_animation_out_transition '
                },
                'event' : {
                    'type' : 'change',
                    'callback' : function () {

                        var value = $(this).val();

                        var layer = $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('layer');

                        _this.data.layers[layer].buildOut.transition = value;

                        if (value != '') {
                            /* Run animation for once */ 
                            Velocity( $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']'),"transition." +  value, { duration : 1000, delay : 0,  display : 'block', complete : function (elements) { $(elements).css('opacity', 1); }});

                        }
                    }
                }
            });


            var inDelay = _this.sdk.getInput({
                'title' : { 'title' : 'Delay' },
                'id' : '',
                input : {
                    'type' : 'number',
                    'class' : 'ff_animation_in_delay_input',
                    'tab' : _this.tab,
                    'style' : 'width:95%;',
                    'step': 0.1
                },
                'event' : {
                    'type' : 'change',
                    'callback' : function () {
                        var value = $(this).val();

                        var layer = $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('layer');

                        _this.data.layers[layer].buildIn.delay = value * 1000;
                    }
                }
            });

            var outDelay = _this.sdk.getInput({
                'title' : { 'title' : 'Delay' },
                'id' : '',
                input : {
                    'type' : 'number',
                    'class' : 'ff_animation_out_delay_input',
                    'tab' : _this.tab,
                    'style' : 'width:95%;',
                    'step': 0.1
                },
                'event' : {
                    'type' : 'change',
                    'callback' : function () {
                        var value = $(this).val();

                        var layer = $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('layer');

                        _this.data.layers[layer].buildOut.delay = value * 1000;
                    }
                }
            });

            var inDuration = _this.sdk.getInput({
                'title' : { 'title' : 'Duration' },
                'id' : '',
                input : {
                    'type' : 'number',
                    'class' : 'ff_animation_in_duration_input',
                    'tab' : _this.tab,
                    'style' : 'width:95%;',
                    'step': 0.1
                },
                'event' : {
                    'type' : 'change',
                    'callback' : function () {
                        var value = $(this).val();

                        var layer = $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('layer');

                        _this.data.layers[layer].buildIn.duration = value * 1000;
                    }
                }
            });

            var outDuration = _this.sdk.getInput({
                'title' : { 'title' : 'Duration' },
                'id' : '',
                input : {
                    'type' : 'number',
                    'class' : 'ff_animation_out_duration_input',
                    'tab' : _this.tab,
                    'style' : 'width:95%;',
                    'step': 0.1
                },
                'event' : {
                    'type' : 'change',
                    'callback' : function () {
                        var value = $(this).val();

                        var layer = $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('layer');

                        _this.data.layers[layer].buildOut.duration = value * 1000;
                    }
                }
            });

            /* play aniamtion button */
            var play = _this.sdk.getButton({
                'title' : {'title' : '' },
                'input' : { value : 'play', tab : _this.tab, style : 'margin-top: 10px;' },
                'event' : {
                    'type' : 'click',
                    'callback' : function () {

                        var tab = $(this).attr('tab');

                        var eles = [];

                        var data = _this.data;

                        /* run all animations - ad serving code */
                        for ( var i = 0; i < Object.keys(data.layers).length; i++ ) {
                            var ele = document.querySelector('#ff_layer_' + i + '[tab=' + tab + ']');
                            var buildIn = data.layers[i].buildIn;
                            var buildOut = data.layers[i].buildOut;
                            if ( buildIn.transition != '' ) {

                                /* ad creator only */
                                ele.style.opacity = '0';

                                Velocity( ele, "transition." +  buildIn.transition, { duration : buildIn.duration, delay : buildIn.delay });
                            }
                            if ( buildOut.transition != '' ) {

                                /*
                                * all the out elements need to be shown after fully animated the whole ad 
                                */
                                /* push out element in to elements array */
                                eles.push(ele);

                                var x = Object.keys(data.layers).length - 1;
                                /* check if its the last element */
                                if ( i == x) {
                                    /* if it is the last element, then run the complete callback */
                                    Velocity( ele, "transition." +  buildOut.transition, { duration : buildOut.duration, delay : buildOut.delay, complete : function (elements) { 
                                        /* wait for 2 seconds, the show all the elements */
                                        setTimeout ( function () {
                                            for ( var y = 0; y < eles.length; y++ ) {
                                                eles[y].style.opacity = 1;
                                                eles[y].style.display = 'block';
                                            }
                                        }, 2000);
                                    } });

                                } else {
                                    Velocity( ele, "transition." +  buildOut.transition, { duration : buildOut.duration, delay : buildOut.delay });
                                }
                            }
                        }
                    }
                }
            });

            var divider = _this.sdk.getDivider ();
            divider.style.width = '90%';
            divider.style.margin = '25px auto';

            _this.animationContainer.append([inSelection, inDelay, inDuration, divider, outSelection, outDelay, outDuration, play]);   

        },
        change : function (tab, index) {
            /* set in input */
            $('.ff_animation_in_transition[tab=' + tab + ']').val(_this.data.layers[index].buildIn.transition);
            $('.ff_animation_in_delay_input[tab=' + tab + ']').val(_this.data.layers[index].buildIn.delay / 1000);
            $('.ff_animation_in_duration_input[tab=' + tab + ']').val(_this.data.layers[index].buildIn.duration / 1000);
            /* set out input */
            $('.ff_animation_out_transition[tab=' + tab + ']').val(_this.data.layers[index].buildOut.transition);
            $('.ff_animation_out_delay_input[tab=' + tab + ']').val(_this.data.layers[index].buildOut.delay / 1000);
            $('.ff_animation_out_duration_input[tab=' + tab + ']').val(_this.data.layers[index].buildOut.duration / 1000);
        }
    };
    
    return this.prototype; 
};


/*
myComponent.prototype.test = (function() {
    var cached_function = myComponent.prototype.test;

    return function(str) {
        console.log('New function before: ');

        cached_function.apply(this, arguments);

        console.log('New function after: ');
    };
}());
*/