// JavaScript Document
var SiteMain = (function() {
    var setting = {
        font	:	13,
        w		:	1477,
        h       :   1014
    };
	function init(){
        createRange('#len-control', true);
        
        createRange('#dValue', true);

        createRange('#aValue', false);
        createRange('#fValue', false);

        createRange('#f-control', true);
        createRange('#f-control-b', false);

        setValueOfSlider("#len-control",'#len-value');
        setValueOfSlider("#aValue",'#valueofA');
        setValueOfSliderF("#f-control",'#valueofF');
        setValueOfSliderFB("#f-control-b",'#valueofF');
        $('.rightControl .box.box2.box2dif .slider.slider-horizontal .slider-handle').css('margin-left','5px');
    }
    function respone(){
        setting.font = ($(window).height() * 13) / setting.h;
        $('body').css('font-size', setting.font + 'px');
    }
	function createRange(idSelector, reversed){
		$(idSelector).slider({
            reversed : reversed,
            tooltip: 'hide'
        });
    }

    function setValueOfSlider(idSelector, inputValue){
        var minSliderValue = $(idSelector).data("slider-min");
        var maxSliderValue = $(idSelector).data("slider-max");
        $(idSelector).slider().on('slide slideStop', function(_ev) {
            if(idSelector == '#aValue'){
                $('.rightControl .box.box2.box2dif .slider.slider-horizontal .slider-handle').css('margin-left','-3px');
            }
            $(inputValue).val(_ev.value);
        });
        $(inputValue).on('keyup change', function(e){
            if(e.which == 13 && this === document.activeElement){
                $(idSelector).slider('setValue', parseInt(this.value));
            }
        });
    }

    function setValueOfSliderF(idSelector, inputValue){
        var minSliderValue = $(idSelector).data("slider-min");
        var maxSliderValue = $(idSelector).data("slider-max");
        $(idSelector).slider().on('slide slideStop', function(_ev) {

            $(inputValue).val(_ev.value);
            $('#f-control-b').slider('setValue', _ev.value);
        });
        $(inputValue).on('keyup change', function(e){
            if(e.which == 13 && this === document.activeElement){
                $(idSelector).slider('setValue', parseInt(this.value));
            }

        });
    }


    function setValueOfSliderFB(idSelector, inputValue){
        var minSliderValue = $(idSelector).data("slider-min");
        var maxSliderValue = $(idSelector).data("slider-max");
        $(idSelector).slider().on('slide slideStop', function(_ev) {
            $(inputValue).val(_ev.value);
            $('#f-control').slider('setValue', _ev.value);
        });
        $(inputValue).on('keyup change', function(e){
            if(e.which == 13 && this === document.activeElement){
                $(idSelector).slider('setValue', parseInt(this.value));
            }
        });
    }
	return {
		init:init
	}
	
})();		

$(document).ready( function() {
	SiteMain.init();
});

