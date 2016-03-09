
var layer = function (_this) {
    this.prototype = {
        initialize : function () {
            var self = this;
            var addLayer = _this.sdk.getButton({
                title : { title : '' },
                input : { value : 'Add Layer', style : 'margin-bottom:10px;', tab : _this.tab }, 
                event : {
                    type : 'click', 
                    'callback' : function () {
                        self.create(Object.keys(_this.data.layers).length);
                    }
                }  
            });

            var layersList = _this.sdk.getCustom({
                'title' : { 'title' : '' },
                'input' : '<div id="ff_layers_list" class="ff_layers_list_style" tab="' + _this.tab + '"><ul id="ff_layers_list_sortable" class="ff_layers_list_sortable_style" tab="' + _this.tab + '"></ul></div>'
            });

            var section = _this.sdk.section ({
                'title' : {'title':'Layering'},
                'input' : [addLayer, layersList],
            });

            _this.container.append(section);

            /* intilize events */
            this.events();
        }, 
        events : function () {
             /* select layer from list */
            $(document).on('click', '.ff_layer_list[tab='+_this.tab+']', function () {

                /* layer index */
                var index = $(this).attr('layer');
                /* tab */
                var tab = $(this).attr('tab');

                /* selected on list */
                $('.ff_layer_list[tab=' + tab + ']').removeClass('selected');
                $(this).addClass('selected');

                /* selected div */
                $('.ff_layer[tab=' + tab + ']').removeClass('selected');
                $('#ff_layer_' + index + '[tab=' + tab + ']').addClass('selected');

                /* resize */
                //_this.stopReize('.ff_layer[tab=' + tab + ']');
                //_this.resize('#ff_layer_' + index + '[tab=' + tab + ']');

                _this.onNewLayer('#ff_layer_' + index + '[tab=' + tab + ']', tab);
                /* set content property */
                _this.onLayerChange(tab, index);
            });

            /* select layer from list */
            $(document).on('click', '.ff_layer[tab='+_this.tab+']', function () {

                /* layer index */
                var index = $(this).attr('layer');
                /* tab */
                var tab = $(this).attr('tab');

                /* selected on list */
                $('.ff_layer_list[tab=' + tab + ']').removeClass('selected');
                $('#ff_layer_list_' + index + '[tab=' + tab + ']').addClass('selected');

                /* selected div */
                $('.ff_layer[tab=' + tab + ']').removeClass('selected');
                $(this).addClass('selected');

                /* resize */
                //_this.stopReize('.ff_layer[tab=' + tab + ']');
                //_this.resize('#ff_layer_' + index + '[tab=' + tab + ']');
                
                
                _this.onNewLayer('#ff_layer_' + index + '[tab=' + tab + ']', tab);
                /* set content property */
                _this.onLayerChange(tab, index);
            });

            /* delete layer */
            $(document).on('click', '.ff_delete_layer[tab='+_this.tab+']', function () {

                /* layer index */
                var index = $(this).attr('layer');
                /* tab */
                var tab = $(this).attr('tab');

                /* remove */
                $('#ff_layer_' + index + '[tab=' + tab + ']').remove();
                $('#ff_layer_list_' + index + '[tab=' + tab + ']').remove();

                /* json */
                _this.data.layers[index].status = 0; 
            });
        },
        create : function (index) {
            /* create layer */
            var layer = document.createElement('div');
            layer.id = 'ff_layer_' + index;
            layer.className = 'ff_layer ff_layer_style selected';
            layer.setAttribute('tab', _this.tab);
            layer.setAttribute('layer', index);

            /* test */
            layer.style.position = 'absolute';
            layer.style.top = 0;
            layer.style.left = 0;
            layer.style.width = 100;
            layer.style.height = 50;

            layer.innerHTML = '<div class="content"><img src="' + _this.path + 'img/ff-component-layer.jpg" width="100%" height="100%"/></div>';

            /* remove selected div */
            $('.ff_layer[tab=' + _this.tab + ']').removeClass('selected');

            /* add to content */
            _this.content.append(layer);
            /* init resize */
            //_this.stopReize('.ff_layer[tab=' + _this.tab + ']');
            //_this.resize(layer);
            
            _this.onNewLayer(layer, _this.tab);

            /* add to list */
            var list = document.createElement('li');
            list.id = 'ff_layer_list_' + index;
            list.className = 'ff_layer_list_style ff_layer_list selected ui-state-default';
            list.setAttribute('tab', _this.tab);
            list.setAttribute('layer', index);
            list.innerHTML = 'Layer ' + index + '<i class="fa fa-trash fa-2x ff_delete_layer" tab="' + _this.tab + '" layer="' + index + '"></i>';
            $('#ff_layers_list_sortable').sortable({
                start: function(event, ui) {
                    ui.item.startPos = ui.item.index();
                },
                update : function (event, ui) {
                    /* start pos get from start */ 
                    var start = ui.item.startPos;
                    /* latest index */
                    var index = ui.item.index();
                    var tab = $(ui.item).attr('tab');
                    var layer = $(ui.item).attr('layer');

                    if (index < start) {
                        --index;
                    }

                    /* insert after the child of the position before 
                    * Eg. new position 2, so need to insert after child at position 1
                    */
                    if (index != -1) {
                        $(_this.content).children('#ff_layer_' + layer).insertAfter( $(_this.content).children().get(index) )
                    } else {
                        $(_this.content).prepend($(_this.content).children('#ff_layer_' + layer));
                    }
                }
            }).disableSelection();

            /* moreve selected on list */
            $('.ff_layer_list[tab=' + _this.tab + ']').removeClass('selected');

            document.querySelector('#ff_layers_list_sortable[tab=' + _this.tab + ']').appendChild(list);

            /* 
            * create json only if its undefined, new layer
            * existing layer will already have its own value
            */
            if ( typeof _this.data.layers[index] == 'undefined' ) {
                _this.data.layers[index] = {
                    x : 0,
                    y : 0,
                    w : 100,
                    h : 50,
                    status : 1,
                    content : {
                        media : -1,
                        data : {}
                    },
                    actions : {
                        click : {
                            type : -1,
                            lp : ''
                        }
                    },
                    buildIn : {
                        transition : '', 
                        delay : 0,
                        duration : 1000
                    },
                    buildOut : {
                        transition : '', 
                        delay : 0,
                        duration : 1000
                    }
                }
            }

            /* set content property after insert to json */
            _this.onLayerChange(_this.tab, index);
        }
    };
    
    return this.prototype;
}