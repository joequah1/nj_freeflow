

myComponent.prototype.layerContent = function () {
    
    var _this = this;
    
    var divider = this.sdk.getDivider ();

    var x = this.sdk.getInput({
        'title' : {
            'title' : 'X Position'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_x_input',
            'tab' : this.tab,
            'value' : 0
        },
        'event' : {
            'type' : 'blur',
            'dispatch' : true,
            'callback' : function () {
                
                var value = $(this).val();
                var tab = $(this).attr('tab');
                var layer = $('.ff_layer.selected[tab=' + tab + ']').attr('layer');
                
                $('.ff_layer.selected[tab=' + tab + ']').css('left', value);
                
                /* json */
                if (typeof _this.data.layers[layer] != 'undefined') {
                    _this.data.layers[layer].x = value;
                }
            }
        }
    });
    var y = this.sdk.getInput({
        'title' : {
            'title' : 'Y Position'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_y_input',
            'tab' : this.tab,
            'value' : 0
        },
        'event' : {
            'type' : 'blur',
            'dispatch' : true,
            'callback' : function () {
                
                var value = $(this).val();
                var tab = $(this).attr('tab');
                var layer = $('.ff_layer.selected[tab=' + tab + ']').attr('layer');
                
                $('.ff_layer.selected[tab=' + tab + ']').css('top', value);
                
                /* json */
                if (typeof _this.data.layers[layer] != 'undefined') {
                    _this.data.layers[layer].y = value;
                }
            }
        }
    });
    var w = this.sdk.getInput({
        'title' : {
            'title' : 'Width'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_w_input',
            'tab' : this.tab,
            'value' : 0
        },
        'event' : {
            'type' : 'blur',
            'dispatch' : true,
            'callback' : function () {
                
                var value = $(this).val();
                var tab = $(this).attr('tab');
                var layer = $('.ff_layer.selected[tab=' + tab + ']').attr('layer');
                
                $('.ff_layer.selected[tab=' + tab + ']').css('width', value);
                
                /* json */
                if (typeof _this.data.layers[layer] != 'undefined') {
                    _this.data.layers[layer].w = value;
                }
            }
        }
    });
    var h = this.sdk.getInput({
        'title' : {
            'title' : 'Height'
        },
        'id' : '',
        input : {
            'type' : 'text',
            'class' : 'ff_h_input',
            'tab' : this.tab,
            'value' : 0
        },
        'event' : {
            'type' : 'blur',
            'dispatch' : false,
            'callback' : function () {
                
                var value = $(this).val();
                var tab = $(this).attr('tab');
                var layer = $('.ff_layer.selected[tab=' + tab + ']').attr('layer');
                
                $('.ff_layer.selected[tab=' + tab + ']').css('height', value);
                
                /* json */
                if (typeof _this.data.layers[layer] != 'undefined') {
                    _this.data.layers[layer].h = value;
                }
            }
        }
    });
    
    
    var section = this.sdk.section ({
        'title' : {'title':''},
        'input' : [x, y, w, h],
    });
    
    //this.container.append(divider);
    this.renderTabs();
    this.propertyContainer.append([x, y, w, h]);
    
} 
myComponent.prototype.renderTabs = function () {
    
    var tabs = this.sdk.getCustom({
        'title' : { 'title' : '' },
        'input' : '<div id="nj_tabs_' + this.tab + '"class="nj_tabs"tab="' + this.tab + '"> \
                <input type="radio"checked name="tabs"id="nj_tab_1_'+this.tab+'"rel="1"> \
                <label for="nj_tab_1_'+this.tab+'"id="label1"class="nj_tab_radio selected">Property</label> \
                <input type="radio"name="tabs"id="nj_tab_2_'+this.tab+'"rel="2"> \
                <label for="nj_tab_2_'+this.tab+'"id="label2"class="nj_tab_radio">Animation</label> \
                <input type="radio"checked name="tabs"id="nj_tab_3_'+this.tab+'"rel="3"> \
                <label for="nj_tab_3_'+this.tab+'"id="label3"class="nj_tab_radio">Action</label> \
                <div id="nj_tab_content_1"class="tab_content selected"></div> \
                <div id="nj_tab_content_2"class="tab_content"></div> \
                <div id="nj_tab_content_3"class="tab_content"></div></div>'
    });
    tabs.style.padding = '0';
    
    this.container.append(tabs);
    
    this.propertyContainer = $(tabs).find('#nj_tab_content_1');
    this.animationContainer = $(tabs).find('#nj_tab_content_2');
    this.actionContainer = $(tabs).find('#nj_tab_content_3');
    
    $('#nj_tabs_' + this.tab + ' input[type=radio][name=tabs]').on('change', function () {
        $(this).siblings('.nj_tab_radio').removeClass('selected');
        $(this).next().addClass('selected');
        
        $(this).siblings('.tab_content').removeClass('selected');
        $(this).siblings('#nj_tab_content_' + $(this).attr('rel')).addClass('selected');
    });
}

myComponent.prototype.showLayerContent = function () {
    $(this.layerContent_section).show();
    $(this.layerContent_section_2).show();
}
myComponent.prototype.setContentProperty = function (tab, index) {
    /* set to input */
    $('.ff_w_input[tab=' + tab + ']').val(this.data.layers[index].w);
    document.querySelector('.ff_w_input[tab=' + tab + ']').dispatchEvent(new Event('blur'));
    $('.ff_h_input[tab=' + tab + ']').val(this.data.layers[index].h);
    document.querySelector('.ff_h_input[tab=' + tab + ']').dispatchEvent(new Event('blur'));
    /* set to input */
    $('.ff_x_input[tab=' + tab + ']').val(this.data.layers[index].x);
    document.querySelector('.ff_x_input[tab=' + tab + ']').dispatchEvent(new Event('blur'));
    $('.ff_y_input[tab=' + tab + ']').val(this.data.layers[index].y);
    document.querySelector('.ff_y_input[tab=' + tab + ']').dispatchEvent(new Event('blur'));
}



