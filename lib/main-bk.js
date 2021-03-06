var main = (function() { 
  function loadScript(){
     this.__canvases = [ ];
    var canvas = new fabric.Canvas('c');
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.getZIndex = function() {
      return this.canvas.getObjects().indexOf(this);
   }
   
    var $ = function(id){return document.getElementById(id)};
    var leftControl = $('aValue');
    var valueOfA = $('valueofA');
    var fControl = $('f-control');
    var valueoff = $('valueofF');
    var fControlb = $('f-control-b');
    var hLenControl = $('len-control');
    var hLenValue = $('len-value');
    var btnReset = $('btnReset');
    var bcontrol = getElementByID('b-value');
    var mcontrol = getElementByID('m-value');
    var fReset = 50;
    var widthCan = 30;
    var lenImageId = 'len-img';
    var CanImageId = 'candles-img';
    var f1ImgId = 'f1-img';
    var f2ImgId = 'f2-img';
    var HCanDefault =  parseInt(getElementByID('len-value').value);
    var dCanDefault =  parseInt(getElementByID('valueofA').value);
    var fDefaultValue = parseInt(getElementByID('valueofF').value);
    var F1 =  parseInt(getElementByID('valueofA').value);
    var bgLine = '#FF9B00';
    var borderWidth =2;
    var hCavas = $('main-cavas').getAttribute('height');
    var wCavas = $('main-cavas').getAttribute('width');
    var rHCan = 3.7;
    var rDCan = 3.2;
    var widthF = 33; var heightF = 67;
    var line = makeLine([0, hCavas/2, 1400, hCavas/2 ],'#000',2);
    canvas.add(line);
    makeLend(888,1400);
    makeLineGroup();
    var lightTopLeft,lightCenter,lightBottomLeft,lightTopright,lightBottomright;
    var lenTrue, lenFalse, glass,f1,f2;
    var cTrue,cFalse;

    function getWidthCan(){
      var w = cTrue.getWidth();
      return w;
    }
    
    function makeLend(heightLen,Widthlen){
      
      var angleF = line.get('y1');
      var heightLine = getXLine();
      var halfWCan =  widthCan/2;
      var angleStart  = getCenterLine() - (dCanDefault  * rDCan) - halfWCan;
      var angleStart2 =  getCenterLine() + (dCanDefault * rDCan) - halfWCan;
      var f1Left = getCenterLine() - fDefaultValue * rDCan -  widthF/2;
      var f2Left = getCenterLine() + fDefaultValue * rDCan - widthF/2;
      cTrue = makeImage(angleStart,heightLine - (HCanDefault * rHCan ), HCanDefault * rHCan, widthCan,CanImageId);  
      f1 = makeImage( f1Left,heightLine - heightF,heightF,widthF,f1ImgId,false,100);
      f2 = makeImage( f2Left , heightLine - heightF,heightF,widthF,f2ImgId,false,100);
      glass = makeImage(Widthlen,heightLen,heightLen,40,lenImageId);
      cFalse = makeImage( angleStart2,heightLine,HCanDefault * rHCan , widthCan,CanImageId,true,1);
      canvas.add(cTrue,cFalse);
      canvas.add(f1,f2,glass);
      setGlass();
      setZIndex();
    }

     

    function makeLineGroup(){
     var angleStart = cTrue.getLeft() + cTrue.getWidth()/2;
     var widthLine  =  line.getWidth();
     var heightLend = getXLine() - cTrue.getHeight();
     var leftGlass =  glass.getLeft();
     var widthGlass = glass.getWidth();
     var angleEnd = leftGlass - (widthGlass/2);
     lightTopLeft = makeLine([angleStart, heightLend, getCenterLine(), heightLend ],bgLine,borderWidth);
     var endPointCenter = getXLine() +  getHeightCanTrue() + (getHeightCanFalse() * 2 );
     var lightCenterY = calLine(angleStart,heightLend,getCenterLine(),getXLine(),getWidthLine());
     lightCenter = makeLine([angleStart, heightLend, widthLine,lightCenterY],bgLine,borderWidth);
     var endPointLineBottom = calLine(angleStart, heightLend , f1.getLeft() + widthF/2, getXLine(),getCenterLine());
     lightBottomLeft = makeLine([angleStart,heightLend, getCenterLine(),endPointLineBottom],bgLine,borderWidth);
     var x2PointLineTopRight = getDCanFalse() * 2 + getCenterLine();
     var y2PointLineTopRight = getHeightCanFalse() + getHeightCanTrue();
     lightTopright = makeLine([getCenterLine(), heightLend, widthLine ,setLineTopRight(widthLine)],bgLine,borderWidth);
     lightBottomright = makeLine([getCenterLine(), endPointLineBottom, widthLine, endPointLineBottom ],bgLine,borderWidth);
     canvas.add(lightTopLeft,lightCenter,lightBottomLeft,lightTopright,lightBottomright);
    
    }

    function setZIndex(){
       var heightLine = getXLine();
       canvas.bringForward(cTrue);
       canvas.bringToFront(f1);
       canvas.bringToFront(f2);
        canvas.renderAll();
    }

    function makeLine(coords,bg,bw,img) {
              return new fabric.Line(coords, {
                fill: bg,
                stroke:bg,
                strokeWidth: bw,
                originX: 'center',
                originY: 'center',
                selectable: false
              });
        }
   
    function setGlass(){
     var heightGlass =  glass.getHeight();
     var widthGlass = glass.getWidth();
      glass.setLeft( getCenterLine() - (widthGlass/2) );
      glass.setTop( getXLine() - (heightGlass/2) );
    }

    function getCenterLine(){
      return  line.getWidth() / 2 ;
    }

    function getXLine(){
       return line.get('y1');
    }

    function makeF(angleStart,left){
      return new fabric.Triangle({
        top: angleStart,angle:180, left: left, width:10, height:10, fill: 'blue' });
    }

    function getHeightLenFalse(){
     // h' =  (d'/ d) * h: cong thuc tinh chieu cao anh áº£o
      var h = (getDCanFalse() / getDCanTrue()) * getHeightLenTrue();
       //console.log('khoang cach cua cay nen that den kinh '+ getDLenTrue());
       return h;
    }

   function getDLenFalse(){
      // d' = (d*f)/ (d-f); cong thuc tinh khoáº£ng cÃ¡ch áº£nh áº£o
      var d = (getDCanTrue () * getFLenTrue()) / (getDCanTrue() - getFLenTrue());
    
     return d;

   }

  /*aaaaaaaaaaaaaa*/
  function getDLenTrue(){
      return  getCenterLine() - lenTrue.get('x2');
   }

   function getFLenTrue(){
     // get tiÃªu cu anh that (F1)
     return getCenterLine() - f1.getLeft() +  f1.getWidth()/2;
   }

   function getFLenFalse(){
    // get tieu cu f2;
    return f2.getLeft() - (f2.getWidth()/2) - getCenterLine();

   }

   function getHeightLenTrue(){
     return cTrue.getHeight();
   }

   function makeImage(left,top,height,width,eImg,flip,zIndex){
       var imgElement = getElementByID(eImg);
        return  new fabric.Image(imgElement, {
        left:left|| 285,scale:1,
        top:top || 70, width: width || 30,height:height || 260,flipY: flip || false,
        selectable: false,
            crossOrigin: "anonymous"
        });
    }

    function getWidthLine(){
       return line.getWidth();
    }

    function setLineTopRight(x){

     var xLine = getCenterLine();
     var yLine =  getXLine() - (getHeightCanTrue() * rHCan);
     var x1Line = f2.getLeft() + widthF/2;
     var y1Line = getXLine();
     var y2 = calLine(xLine,yLine,x1Line,getXLine(),x);
      return y2;
    }

    function calLine(x1,y1,x2,y2,x){
     
     var a,b,y;
     var yL = y1 - y2;
     var xL = x1 - x2;
      a = yL / xL;
      b = y1 - a*x1;
      y = a*x + b;
      return y;
    }

   function calLineFindX(x1,y1,x2,y2,y){
     var a,b,x;
     var yL = y1 - y2;
     var xL = x1 - x2;
      a = yL / xL;
      b = y1 - a*x1;
      x = (y-b)/a;
      return x;

   }
   

   function getbValue(d,fb){
     /*
       b = (f * a) / (f - a) 
       f: khoáº£ng cÃ¡ch cá»§a 2 Ä‘iá»ƒm f1 Ä‘áº¿n f2
       a: khoáº£ng cÃ¡ch tá»« cÃ¢y náº¿n tháº­t Ä‘áº¿n kÃ­nh
      */
     var f = getFCanTrue(fb);
     //console.log('f2:' + getFLenFalse());
     if(d>0){
       var a = getDCanTrue(d);
     }else{
        var a = getDCanTrue();
    }
     
     var b = '';
     b = Math.round((f*a) / (a-f));
     if(b==0 || a==f ){ b = '-'; } else if (b < 0)  b = Math.abs(b);
     return b;

   }

   function getmValue(d,fb){
      /*
       get thong so m = b/ a
       b: thÃ´ng sá»‘ láº¥y phÃ­a trÃªn
       a: khoáº£ng cÃ¡ch tá»« cÃ¢y náº¿n tháº­t Ä‘áº¿n kÃ­nh
      */
      var a = getDCanTrue(d);
      var b = getbValue(d,fb);
      var m= 0;
      if(isNumeric(b)===false) m = 0; else m = b/a;
      if(m == 0) m = '-';else  m = m.toFixed(2);
      return m;
   }

   function isNumeric(val) {
      return !isNaN(+val) && isFinite(val);
  }

    leftControl.onchange = function() {
       var dCanValue = parseInt(this.value);
       changeDCan(dCanValue);
       setWhenChangeA(getHeightCanTrue(),getFCanTrue(),dCanValue);
      canvas.renderAll();
    };

    var oldValueofA = valueofA.value;

    valueofA.addEventListener('keyup', function(e){
      var dCanValue = parseInt(this.value);
      if(e.which == 13 && this === document.activeElement){

        isSlide = false;
        console.log(dCanValue);
         if(msAlert(dCanValue,15,200)){
            changeDCan(dCanValue);
            setWhenChangeA(getHeightCanTrue(),getFCanTrue(),dCanValue);
            canvas.renderAll();
            oldValueofA = dCanValue;
        }
      }
      
     });

    hLenControl.onchange = function(){
      var hLenValue = parseInt(this.value);
      getElementByID('len-value').value =hLenValue;
      changeHeightCan(hLenValue);
      setWhenChangeA(hLenValue,getFCanTrue(),leftControl.value);
      canvas.renderAll();

    };
    
    var oldHLenValue = hLenValue.value;
     hLenValue.addEventListener('keyup', function(e){
          var hLValue = parseInt(this.value);
        if(e.which == 13 && this === document.activeElement){
          isSlide = false;
          if(msAlert(hLValue,1,100)){
             changeHeightCan(hLValue);
             setWhenChangeA(hLValue,getFCanTrue(),leftControl.value);
             canvas.renderAll();
             oldHLenValue = hLValue;
          }
        }
          
     });

  fControl.onchange = function(){
      var fValue = parseInt(this.value);
      var f1Changed  = getCenterLine() - fValue  * rDCan - widthF/2;
      var f2Changed = getCenterLine() + fValue * rDCan - widthF/2;
      f1.setLeft(f1Changed);
      f2.setLeft(f2Changed);
      changeF(fValue,leftControl.value,hLenValue.value);
      canvas.renderAll();
  };

  fControlb.onchange = function(){
      var fValue = parseInt(fControl.value);
      var f1Changed  = getCenterLine() - fValue * rDCan - widthF/2;
      var f2Changed = getCenterLine() + fValue * rDCan - widthF/2;
      f1.setLeft(f1Changed);
      f2.setLeft(f2Changed);
      canvas.renderAll();
     changeF(fValue,leftControl.value,hLenValue.value);
  };

   var oldValueofF = valueofF.value;

   valueofF.addEventListener('keyup', function(e){

     var fValue = parseInt(this.value);
    if(e.which == 13 && this === document.activeElement){
        isSlide = false;
          if(msAlert(fValue,15,100)){
              fValue = parseInt(fControl.value);
              var f1Changed  = getCenterLine() - fValue*rDCan - widthF/2;
              var f2Changed = getCenterLine() + fValue *rDCan - widthF/2;
              f1.setLeft(f1Changed);
              f2.setLeft(f2Changed);
              changeF(fValue,leftControl.value,hLenValue.value);
              canvas.renderAll();
              oldValueofF = fValue;
          }
    }

     });

    document.addEventListener("changeHControl",function(e){
        oldHLenValue = e.detail;
        console.log('change H '+ oldHLenValue);
   });

   document.addEventListener("changeAControl",function(e){
         oldValueofA = e.detail;

   });

   document.addEventListener("changeFControl",function(e){
       valueofF = e.detail;

   });

   document.getElementById('html').onclick = function(e) {
      if(isSlide == false && e.target.className != 'normal' && e.target.className != 'hover' && e.target != hLenValue && e.target.className != 'slider-track' && e.target.className != 'slider-handle min-slider-handle round') {
            
            hLenValue.value =  oldHLenValue;
      }
      if(isSlide == false && e.target.className != 'normal' && e.target.className != 'hover' && e.target != valueofA && e.target.className != 'slider-track' && e.target.className != 'slider-handle min-slider-handle round') {
            
            valueofA.value =  oldValueofA;
      } 
      if(isSlide == false && e.target.className != 'normal' && e.target.className != 'hover' && e.target != valueofF && e.target.className != 'slider-track' && e.target.className != 'slider-handle min-slider-handle round') {
            valueofF.value =  oldValueofF;
      } 
  }

   function msAlert(number,min, max,ms){

    if(isNaN(number)) return false;

     if(number < min || number > max)
      {
         var m = ms || 'Please input number in rang from ' + min + '-'+ max;
         alert(m);
         return false;
      }else{

          return true;
      }
     
   }

   document.getElementById('btnReset').onclick = function() {
        resetCavas();
        canvas.renderAll();
      };

   function resetCavas(){
        var f1Changed  = getCenterLine() - fReset * rDCan - widthF/2;
        var f2Changed  = getCenterLine() + fReset*rDCan - widthF/2;
        f1.setLeft(f1Changed);
        f2.setLeft(f2Changed);
        setWhenChangeA(50,50,100);
        cFalse.setHeight(50*rHCan);
        cTrue.setTop(getXLine()- 50*rHCan);
        cTrue.setHeight(50*rHCan);
        bcontrol.value =100;
        mcontrol.value = 1;
       oldValueofA = valueofA.value;
       oldHLenValue = hLenValue.value;
       oldValueofF = valueofF.value; 
   }

    function setWhenChangeA(hChange,fchanged,dChanged){
        var changed = getCenterLine() - (hChange * rHCan);
        var xCanTrue = getXCanTrue(dChanged * rDCan);
        var yCanTrue = getYCanTrue(hChange * rHCan);
        var xFTrue =  getCenterLine() - (fchanged * rDCan);
        var yFTrue = getXLine();
        var xLenTop =  getCenterLine();
        var yLenTop  =  yCanTrue ;
        var xFFalse =   getCenterLine() +  fchanged * rDCan;
        var yFFalse =  yFTrue;
        var hChanged = (hChange * 184) /  50;
        lightTopLeft.set({'x1':xCanTrue,'y1':yCanTrue,'y2':yLenTop});
        lightBottomLeft.set({'x1':xLenTop,'y1':yCanTrue});
        lightCenter.set({'x1':changed,'y1':getXLine() - getHeightCanTrue(),'y2':getXLine() - getHeightCanTrue()});
        var lightBottomLeftY = calLine(xCanTrue, yCanTrue, xFTrue , yFTrue, getCenterLine());
        lightBottomLeft.set({'x1':xCanTrue,'y1':yCanTrue,'y2':lightBottomLeftY});
        lightBottomright.set({'y1':lightBottomLeftY,'y2':lightBottomLeftY});
        var lightCenterY = calLine(xCanTrue,yCanTrue,getCenterLine(),getXLine(),getWidthLine());
        lightCenter.set({'x1':xCanTrue,'y1':yCanTrue,'y2':lightCenterY});
        var heightLenFalse  = getHeightCanFalse() + getXLine();
        var xLenFalse = getDCanFalse() + getCenterLine();
       var dCanTrue = getDCanTrue(dChanged) * rDCan;
       var dFCanTrue = getFCanTrue(fchanged) * rDCan;
       var wFTrue =  hChange * widthF / heightF + 10;
        var hC = parseInt(getHeightCanFalse(hChange,dChanged,fchanged) * rHCan);
       var wf =  parseInt(getHeightCanFalse(hChange,dChanged,fchanged))  * widthF / heightF;
       var wFFalse = wf + 10;
        if(parseInt(dChanged) < parseInt(fchanged)){
             wFFalse = wf;
             if(hC > -200 && hC < 0){
                wFFalse = wFTrue + 2;
             }
        }
       var leftCanFalse = getCenterLine() + getDCanFalse() * rDCan - wFFalse/2; 
       cFalse.setLeft(leftCanFalse);
       if(parseInt(dChanged) == parseInt(fchanged)){
      
          var xLightCenter = calLineFindX(getCenterLine(),getXLine(),xCanTrue,yCanTrue,0);
          lightCenter.set({'x1':xLightCenter,'y1':0});
          var xPointTopRightLine = calLineFindX(xFFalse,yFFalse,xLenTop,yLenTop,0);
          var yEndPoint = calLine(xLenTop,yLenTop,xFFalse,yFFalse,getWidthLine());
           lightTopright.set({'x1':xLenTop,'y1':yLenTop,'y2':yEndPoint});
           lightTopright.set({'x1':xPointTopRightLine,'y1':0});  

       }else{
           var yEndPoint = calLine(xLenTop,yLenTop,xFFalse,yFFalse,getWidthLine());
            lightTopright.set({'x1':xLenTop,'y1':yLenTop,'y2':yEndPoint});
       }

       if ( parseInt(dChanged) < parseInt(fchanged)){
               lightBottomLeft.setStrokeWidth(0);
               lightBottomright.setStrokeWidth(0); 
               cFalse.setAngle(180);
              // cFalse.setFlipY(false);
               var xLightR = calLineFindX(xFFalse,yFFalse,xLenTop,yLenTop,0);
                lightTopright.set({'x1':xLightR,'y1':0});
                var xLightC = calLineFindX(getCenterLine(),getXLine(),xCanTrue,yCanTrue,0);
                lightCenter.set({'x1':xLightC,'y1':0});
               // bcontrol.value= getbValue();
         }else{
            lightBottomLeft.setStrokeWidth(2);
            lightBottomright.setStrokeWidth(2); 
            cFalse.setFlipY(true);
            //cFalse.setAngle(180);
            var a =cFalse.getAngle();
            if(a >0){
               cFalse.setAngle(0);
            }
            if(parseInt(dChanged) == parseInt(fchanged)){
              lightBottomLeft.setStrokeWidth(0);
            }
          
         }
      bcontrol.value= getbValue(dChanged,fchanged);
     
      if(parseInt(dChanged) <= parseInt(fchanged)){
          cFalse.setElement(getElementByID('f15-img'));
          cFalse.setTop(getXLine());
      }else{
         cFalse.setElement(getElementByID('candles-img'));
         var dCanFalseCheck = getDCanFalse(dChanged,fchanged) * rDCan - wFFalse/2;
         var fLeftFalse = getCenterLine() + dCanFalseCheck;
         cFalse.setLeft(fLeftFalse);
         cFalse.setTop(getXLine());
      }
       
       cTrue.setHeight(hChanged);
       cTrue.setTop(getXLine() - hChanged);
       cFalse.setHeight(Math.abs(hC));
       cTrue.setWidth(Math.abs(wFTrue));
       cFalse.setWidth(Math.abs(wFFalse));
      cTrue.setLeft(getCenterLine() - (dChanged * rDCan) - wFTrue/2);
      mcontrol.value = getmValue(dChanged,fchanged);
      canvas.renderAll();
      
    }

    /* khi thay doi chieu cao cay nen that */
    function changeHeightCan(h){
       cTrue.setTop(getXLine() - (h * rHCan ));
       cTrue.setHeight(h * rHCan);
       cFalse.setHeight(getHeightCanFalse(h));
    }

    /* khi thay doi khoang cach cay nen thiet */

    function changeDCan(d){
        cTrue.setLeft(getCenterLine() - getDCanTrue() * rDCan - cTrue.getWidth()/2);
        cFalse.setLeft(getCenterLine() + getDCanFalse() * rDCan - cTrue.getWidth()/2);
        var hc= parseInt(getHeightCanFalse()) * rHCan;
        cFalse.setHeight(hc);
    }

   /* khi thay doi tieu cu */
   
   function changeF(f,d,h){
     var hCan = getHeightCanTrue(h);
     var dCan = getDCanTrue(d);
     
     var mwidth = 38, maxwidth = 48;

     var between = 10;
     var setminw = mwidth + (150/f);
     var setmaxw = mwidth - (f*0.15);
     
     if(f < 50){
        glass.setWidth(setminw);
      }else{
        if(f >=50 && f < 70){
            glass.setWidth(mwidth - (f*0.05));
        }
        else if(f >= 70){
          glass.setWidth(mwidth - (f*0.1));
        }
      }

     
   setGlass();
     setWhenChangeA(hCan,f,dCan);
   } 

   function getXCanTrue(d){
      return getCenterLine() - parseInt(d);
   }

   function getYCanTrue(h){
      return   getXLine() - h;
   }

    /* tinh chieu thau kinh */
    
      function getDCanTrue(h){
        /* get khoang cach nen that den kinh */
        var hv = h || leftControl.value;
        return hv;
     }
    
    function getFCanTrue(f){
        // get tiÃªu cu anh that (F1)
        var fv= f || fControl.value;
        return fv;
     }

    function getHeightCanTrue(h){
        return h || hLenValue.value;
    }

    function getDCanFalse(d,f){
        // d' = (d*f)/ (d-f); cong thuc tinh khoáº£ng cÃ¡ch áº£nh áº£o
        var db = (getDCanTrue(d) * getFCanTrue(f)) / (getDCanTrue(d) - getFCanTrue(f));
       return Math.round(db);

     }

    function getHeightCanFalse(h,d,f){
     // h' =  (d'/ d) * h: cong thuc tinh chieu cao anh áº£o
      var h = (getDCanFalse() / getDCanTrue(d)) * getHeightCanTrue(h);
       return Math.round(h);
    }



    function updateControls() {
     
      leftControl.value = lenTrue.get('x1');
      hLenControl.value = lenTrue.get('y2');
      
    }

    function getElementByID(id){
       return  document.getElementById(id);
    }

    // canvas.on({
    //   'object:moving': updateControls,
    //   'object:scaling': updateControls,
    //   'object:resizing': updateControls,
    //   'object:rotating': updateControls
    // });
      this.__canvases.push(canvas);
      fabric.util.addListener(fabric.window, 'load', function() {
        var canvas = this.__canvas || this.canvas,
            canvases = this.__canvases || this.canvases;

        canvas && canvas.calcOffset && canvas.calcOffset();

        if (canvases && canvases.length) {
          for (var i = 0, len = canvases.length; i < len; i++) {
            canvases[i].calcOffset();
          }
        }
      });
    }
    return {
      loadScript:loadScript
    };

})(); 

$(window).load(function(){
  main.loadScript();
  var hSlider = $("input#len-control").slider();
       var aSlider = $("input#aValue").slider();
       var fSlider = $("input#f-control").slider();
       var fSliderb = $("input#f-control-b").slider();
       hSlider.slider('setValue',50);
       aSlider.slider('setValue',100);
       fSlider.slider('setValue',50);
       fSliderb.slider('setValue',50);
       isSlide = true;
       $('#len-value').val(50);
       oldHLenValue = 50;
       $('#valueofA').val(100);
       oldValueofA = 100;
       $('#valueofF').val(50);
       oldValueofF = 50;
       bcontrol = 100;
       $('#b-value').val(100);
       mcontrol = 1;
       $('#m-value').val(1);

});

$(document).ready(function(){
$('#btnReset').click(function(){
       var hSlider = $("input#len-control").slider();
       var aSlider = $("input#aValue").slider();
       var fSlider = $("input#f-control").slider();
       var fSliderb = $("input#f-control-b").slider();
       hSlider.slider('setValue',50);
       aSlider.slider('setValue',100);
       fSlider.slider('setValue',50);
       fSliderb.slider('setValue',50);
       isSlide = true;
       $('#len-value').val(50);
       oldHLenValue = 50;
       $('#valueofA').val(100);
       oldValueofA = 100;
       $('#valueofF').val(50);
       oldValueofF = 50;

    }
  );
});

