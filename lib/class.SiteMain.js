var isSlide = false;
// JavaScript Document
var SiteMain = (function() {
    var setting = {
        font	:	13,
        w		:	1477,
        h       :   1014
    };
	function init(){
        detectBrowser();
        createRange('#len-control', true);
        
        createRange('#dValue', true);

        createRange('#aValue', true);
        createRange('#fValue', false);

        createRange('#f-control', true);
        createRange('#f-control-b', false);

        setValueOfSlider("#len-control",'#len-value');
        setValueOfSlider("#aValue",'#valueofA');
        setValueOfSliderF("#f-control",'#valueofF');
        setValueOfSliderFB("#f-control-b",'#valueofF');
        respone();
        $(window).resize(function(){
            respone();
        });
    }
    //BROWSERS
    function detectBrowser(){
        uaBrowser = detect.parse(navigator.userAgent);
        var browserfamily = uaBrowser.browser.family.replace(/\s/g, '_'); //family = Mobile Safari => we need convert space character become _

        $('body').addClass('version_' + uaBrowser.browser.version).addClass(browserfamily);

        //Detect to fix css for iphone4
        if(window.screen.height == (960 / 2)) $('body').addClass('iphone4');
    }
    function respone(){
        var wid = $(window).width();
        var hed = $(window).height();
        if(wid > hed){
            setting.font = ($(window).height() * 13) / setting.h;
            $('body').css('font-size', setting.font + 'px');
        }
        
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
            isSlide = true;
            $(inputValue).val(_ev.value);
            if(idSelector=='#len-control'){
               addCustomEvent('changeHControl',_ev.value,false);
          }else{
             addCustomEvent('changeAControl',_ev.value,false);
          }
            
        });
        $(inputValue).on('keyup change', function(e){
            isSlide = false;
            if(e.which == 13 && this === document.activeElement){
                $(idSelector).slider('setValue', parseInt(this.value));
            }
        });
    }

    function setValueOfSliderF(idSelector, inputValue){
        var minSliderValue = $(idSelector).data("slider-min");
        var maxSliderValue = $(idSelector).data("slider-max");
        $(idSelector).slider().on('slide slideStop', function(_ev) {
            isSlide = true;
            $(inputValue).val(_ev.value);
            $('#f-control-b').slider('setValue', _ev.value);
            addCustomEvent('changeFControl',_ev.value,false);
        });
        $(inputValue).on('keyup change', function(e){
            isSlide = false;
            if(e.which == 13 && this === document.activeElement){
                $(idSelector).slider('setValue', parseInt(this.value));
            }

        });
    }


    function setValueOfSliderFB(idSelector, inputValue){
        var minSliderValue = $(idSelector).data("slider-min");
        var maxSliderValue = $(idSelector).data("slider-max");
        $(idSelector).slider().on('slide slideStop', function(_ev) {
            isSlide = true;
            $(inputValue).val(_ev.value);
            $('#f-control').slider('setValue', _ev.value);
            addCustomEvent('changeFControl',_ev.value,false);
        });
        $(inputValue).on('keyup change', function(e){
            isSlide = false;
            if(e.which == 13 && this === document.activeElement){
                $(idSelector).slider('setValue', parseInt(this.value));
            }
        });
    }

    function addCustomEvent(eventName,data,e){
        function CustomEvent ( event, params ) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent( 'CustomEvent' );
            evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
            return evt;
          };

          CustomEvent.prototype = window.Event.prototype;
          if (window.CustomEvent) {
              var event = new CustomEvent(eventName, {
                detail:data
            });
    
        document.dispatchEvent(event);
    }
      }

	return {
		init:init
	}
	
})();		

$(document).ready( function() {
	SiteMain.init();
});

