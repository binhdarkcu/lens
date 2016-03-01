// JavaScript Document
var SiteMain = (function() {
    var setting = {
        font	:	13,
        w		:	1477,
        h       :   1014
    };
	function init(){
        createRange('#len-control', true);
        respone();
        $(window).resize(function(){
            respone();
        });
        createRange('#dValue', true);

        createRange('#aValue', false);
        createRange('#fValue', false);

        createRange('#f-control', false);
        createRange('#f-control-b', false);

        setValueOfSlider("#len-control",'#len-value');
        setValueOfSlider("#aValue",'#valueofA');
        setValueOfSliderF("#f-control",'#valueofF');
        setValueOfSliderFB("#f-control-b",'#valueofF');
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
            $(inputValue).val(_ev.value);
        });
        $(inputValue).on('keyup change', function(){
            var val = Math.abs(parseInt(this.value, 10) || minSliderValue);
            this.value = val > maxSliderValue ? maxSliderValue : val;
            $(idSelector).slider('setValue', val);
        });
    }

    function setValueOfSliderF(idSelector, inputValue){
        var minSliderValue = $(idSelector).data("slider-min");
        var maxSliderValue = $(idSelector).data("slider-max");
        $(idSelector).slider().on('slide slideStop', function(_ev) {
            $(inputValue).val(_ev.value);
            $('#f-control-b').slider('setValue', _ev.value);
        });
        $(inputValue).on('keyup change', function(){
            var val = Math.abs(parseInt(this.value, 10) || minSliderValue);
            this.value = val > maxSliderValue ? maxSliderValue : val;
            $(idSelector).slider('setValue', val);
        });
    }


    function setValueOfSliderFB(idSelector, inputValue){
        var minSliderValue = $(idSelector).data("slider-min");
        var maxSliderValue = $(idSelector).data("slider-max");
        $(idSelector).slider().on('slide slideStop', function(_ev) {
            $(inputValue).val(_ev.value);
            $('#f-control').slider('setValue', _ev.value);
        });
        $(inputValue).on('keyup change', function(){
            var val = Math.abs(parseInt(this.value, 10) || minSliderValue);
            this.value = val > maxSliderValue ? maxSliderValue : val;
            $(idSelector).slider('setValue', val);
        });
    }
	return {
		init:init
	}
	
})();		

$(document).ready( function() {
	SiteMain.init();
});

