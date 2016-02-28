// JavaScript Document
var SiteMain = (function() {
	function init(){
        createRange('#dValue', true);
        createRange('#aValue', false);
        createRange('#fValue', false);
        setValueOfSlider("#dValue",'#valueofD');
        setValueOfSlider("#aValue",'#valueofA');
        setValueOfSlider("#fValue",'#valueofF');
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
        $(idSelector).slider().on('slide', function(_ev) {
            $(inputValue).val(_ev.value);
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

