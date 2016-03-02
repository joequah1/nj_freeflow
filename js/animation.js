/*
this.animationContainer is required to render animation content
used VelocityJs animation library

attributes 
- njanimation-in
- njanimation-in-duration
- njanimation-in-delay
*/
myComponent.prototype.animateProperty = function () {
    
    var _this = this;
    
    var media = this.sdk.getSelect({
        'title' : { 'title' : 'Animation' },
        'input' : {
            'value' : -1,
            'options' : [
                {'text' : '-- Select --', 'value' : -1},
                {'text' : 'Fade In', 'value' : 'fadeIn'},
                {'text' : 'Fade Out', 'value' : 'fadeOut'},
                {'text' : 'Slide In Left', 'value' : 'slideLeftIn'},
                {'text' : 'Slide In Right', 'value' : 'slideRightIn'}
            ],
            'tab' : this.tab,
            'id' : 'ff_animation_type'
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                
                var value = $(this).val();

                if (value != -1) {
                    $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').addClass('njanimation');
                    $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('njanimation-in', value);
                    $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('njanimation-in-duration', 1000);
                } else {
                    $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').removeClass('njanimation');
                }
            }
        }
    });
    
    var delay = this.sdk.getInput({
        'title' : { 'title' : 'Delay' },
        'id' : '',
        input : {
            'type' : 'number',
            'class' : 'ff_animation_delay_input',
            'tab' : this.tab,
            'value' : 0.1,
            'style' : 'width:95%;',
            'step': 0.1
        },
        'event' : {
            'type' : 'change',
            'callback' : function () {
                var value = $(this).val();
                
                $('.ff_layer.selected[tab=' + $(this).attr('tab') + ']').attr('njanimation-in-delay', value * 1000);
            }
        }
    });
    
    /* play aniamtion button */
    var play = this.sdk.getButton({
        'title' : {'title' : '' },
        'input' : { value : 'play', tab : this.tab },
        'event' : {
            'type' : 'click',
            'callback' : function () {
                console.log(1)
                var tab = $(this).attr('tab');

                /* run all animations - ad serving code */
                var eles = document.getElementsByClassName('njanimation');
                for ( var i = 0; i < eles.length; i++ ) {
                    var transition = eles[i].getAttribute('njanimation-in');
                    var duration = eles[i].getAttribute('njanimation-in-duration');
                    var delay = eles[i].getAttribute('njanimation-in-delay');
                    console.log(eles[i]);
                    Velocity(eles[i],"transition." +  transition, {duration : duration, delay : delay});
                }
            
            }
        }
    });
    
    /* section to contain animations inputs */
    var section = this.sdk.section ({
        'input' : [media, delay, play],
    });
    
    this.animationContainer.append([media, delay, play]);          
}