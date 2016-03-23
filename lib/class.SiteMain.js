var isSlide = false;
// JavaScript Document
var SiteMain = (function() {
    var setting = {
        font	:	13,
        w		:	1800,
        h       :   990
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
        var resizeId;
        $(window).resize(function(){

            clearTimeout(resizeId);
            resizeId = setTimeout(respone, 500);
        });
    }
    function getScrollBarState() {
        var result = {vScrollbar: true, hScrollbar: true};
        var origX = window.pageXOffset;
        var origY = window.pageYOffset;
        if (typeof origX != "undefined") {
            // try scrolling by 1 both vertically and horizontally
            // tricky though because if we are at end of scroll range, this direction might not scroll
            window.scrollBy(1, 1);
            // did we move ?
            result.vScrollbar = window.pageYOffset != origY;
            result.hScrollbar = window.pageXOffset != origX;
            if (!result.vScrollbar || !result.hScrollbar) {
                window.scrollBy(-1,-1);  // try scrolling the other direction just in case we were at the limit
                result.vScrollbar = result.vScrollbar | (window.pageYOffset != origY);
                result.hScrollbar = result.hScrollbar | (window.pageXOffset != origX);
            }

            // reset window to default scroll state
            window.scrollTo(origX, origY); 
        }
        return(result);
    }
    function getSBLive(w) {
        var d = w.document, c = d.compatMode;
        r = c && /CSS/.test(c) ? d.documentElement : d.body;
        if (typeof w.innerWidth == 'number') {
            // incredibly the next two lines serves equally to the scope
            // I prefer the first because it resembles more the feature
            // being detected by its functionality than by assumptions
            console.log([ r.scrollWidth > r.clientWidth, r.scrollHeight > r.clientHeight ]);
            if($('body').hasClass('Chrome') || $('body').hasClass('Firefox') || $('body').hasClass('IE')){
                return [ r.scrollWidth > r.clientWidth, r.scrollHeight > r.clientHeight ];
            }else{
                return [ w.innerHeight > r.clientHeight, w.innerWidth > r.clientWidth ]; 
            }
                
            
        } else {
            return [ r.scrollWidth > r.clientWidth, r.scrollHeight > r.clientHeight ];
        }
    }
    
    function recalc(w) {
        var d = w.document, r = d.documentElement;
        return getSBLive(window)[0];
    }

    //BROWSERS
    function detectBrowser(){
        uaBrowser = detect.parse(navigator.userAgent);
        var browserfamily = uaBrowser.browser.family.replace(/\s/g, '_'); //family = Mobile Safari => we need convert space character become _

        $('body').addClass('version_' + uaBrowser.browser.version).addClass(browserfamily);

        //Detect to fix css for iphone4
        if(window.screen.height == (960 / 2)) $('body').addClass('iphone4');
    }
    var first = 0;
    function respone(){
        var wid = $(window).width();
        var hed = $(window).height();
        var contain = $('.rightControl').innerHeight();
        
        if(first == 0){
            setting.font = (hed * 13) / 1035;
            first= 1;
            if($('body').hasClass('IE')){
                setting.font = (hed * 13) / 1028;
            }
        }else{
            setting.font = (hed * 12.5) / setting.h;
        }
        $('body').css('font-size', setting.font + 'px');

        var s = getScrollBarState();
        console.log(s.vScrollbar);
        if (s.vScrollbar) {
            setting.font = ($(window).width() * 12.5) / setting.w;
            $('body').css('font-size', setting.font + 'px');
        }
        /*if(getSBLive(window)[0] == true){
            setting.font = ($(window).width() * 12.5) / setting.w;
            $('body').css('font-size', setting.font + 'px');
        }*/
        
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

