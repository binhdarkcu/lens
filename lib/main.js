(function() {
  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.transparentCorners = false;
  var $ = function(id){return document.getElementById(id)};
  var leftControl = $('aValue');
  var fConttol = $('f-control');
  var hLenControl = $('len-control');
  var acontrol = getElementByID('b-value');
  var mcontrol = getElementByID('m-value');
  var widthCan = 12;
  var lenImageId = 'len-img';
  var CanImageId = 'candles-img';
  var f1ImgId = 'f1-img';
  var f2ImgId = 'f2-img';
  var HCanDefault =  parseInt(getElementByID('len-value').value);
  var fDefaultValue = parseInt(getElementByID('valueofF').value);
  var F1 =  getElementByID('valueofA').value;
  console.log('F1:'+F1);
  var line = makeLine([0, 200, 600, 200 ],'green',2);
  canvas.add(line);
  makeLend(50);
  makeLineGroup();
  // var angleControl = $('angle-control');
  // angleControl.onchange = function() {
  //   rect.setAngle(parseInt(this.value, 10)).setCoords();
  //   canvas.renderAll();
  // };

  // var scaleControl = $('scale-control');
  // scaleControl.onchange = function() {
  //   rect.scale(parseFloat(this.value)).setCoords();
  //   canvas.renderAll();
  // };

  // var topControl = $('top-control');
  // topControl.onchange = function() {
  //   rect.setTop(parseInt(this.value, 10)).setCoords();
  //   canvas.renderAll();
  // };

  var lightTopLeft,lightCenter,lightBottomLeft,lightTopright,lightBottomright;
  var lenTrue, lenFalse, glass,f1,f2;
  var cTrue,cFalse;
  

  function getWidthCan(){
    var w = cTrue.getWidth();
    return w;
  }
  
  function makeLend(heightLen){
    
    var angleF = line.get('y1');
    var heightLine = getXLine();
    var angleStart  =  getCenterLine() - parseInt(F1) ;
    var angleStart2 =  getCenterLine() + parseInt(F1);
    var widthF = 16;var heightF = 26;
    //lenTrue = makeLine([angleStart, heightLine, angleStart, heightLine - heightLen ],'#fff',5);
    cTrue = makeImage(angleStart-(widthCan/2),heightLine - HCanDefault,50,widthCan,CanImageId);
    //f1 = makeF(angleF,(getCenterLine() - 45 ));
    f1 = makeImage( getCenterLine() - fDefaultValue - (widthF/2) ,heightLine - heightF,heightF,widthF,f1ImgId,false);
    f2 = makeImage( getCenterLine() + fDefaultValue - (widthF/2) , heightLine - heightF,heightF,widthF,f2ImgId,false);
    glass = makeImage(275,70,260,30,lenImageId);
    canvas.add(cTrue,f1,f2,glass);
    //lenFalse = makeLine([ getCenterLine() + getDCanFalse(), heightLine, angleStart2,heightLine + getHeightCanFalse()],'#fff',5);
    cFalse = makeImage( angleStart2 - (widthCan/2),heightLine,50,widthCan,CanImageId,true);
    canvas.add(cFalse);
    setGlass();
  }

   

  function makeLineGroup(){
   var angleStart = cTrue.getLeft() + widthCan/2;
   var widthLine  =  line.getWidth();
   var heightLend = getXLine() - cTrue.getHeight();
   var color = 'red';
   var borderWidth =2;
   var leftGlass =  glass.getLeft();
   var widthGlass = glass.getWidth();
   var angleEnd = leftGlass - (widthGlass/2);
   lightTopLeft = makeLine([angleStart, heightLend, getCenterLine(), heightLend ],color,borderWidth);
   var endPointCenter = getXLine() +  getHeightCanTrue() + (getHeightCanFalse() * 2 );
   var lightCenterY = calLine(angleStart,heightLend,getCenterLine(),getXLine(),getWidthLine());
   lightCenter = makeLine([angleStart, heightLend, widthLine,lightCenterY],color,borderWidth);
   var endPointLineBottom = calLine(angleStart, getXLine() - getHeightCanTrue(), getCenterLine() - fDefaultValue, getXLine(),getCenterLine());
   lightBottomLeft = makeLine([angleStart,heightLend, getCenterLine(),endPointLineBottom],color,borderWidth);
   var x2PointLineTopRight = getDCanFalse() * 2 + getCenterLine();
   var y2PointLineTopRight = getHeightCanFalse() + getHeightCanTrue ();
   lightTopright = makeLine([getCenterLine(), heightLend, widthLine ,setLineTopRight(widthLine)],color,borderWidth);
   lightBottomright = makeLine([getCenterLine(), endPointLineBottom, widthLine, endPointLineBottom ],color,borderWidth);
   canvas.add(lightTopLeft,lightCenter,lightBottomLeft,lightTopright,lightBottomright);
  
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
   // h' =  (d'/ d) * h: cong thuc tinh chieu cao anh ảo
    var h = (getDCanFalse() / getDCanTrue()) * getHeightLenTrue();
     //console.log('khoang cach cua cay nen that den kinh '+ getDLenTrue());
     return h;
  }

 function getDLenFalse(){
    // d' = (d*f)/ (d-f); cong thuc tinh khoảng cách ảnh ảo
    var d = (getDCanTrue () * getFLenTrue()) / (getDCanTrue() - getFLenTrue());
  
   return d;

 }

function getDLenTrue(){
    return  getCenterLine() - lenTrue.get('x2');
 }

 function getFLenTrue(){
   // get tiêu cu anh that (F1)
   return getCenterLine() - f1.getLeft() +  f1.getWidth()/2;
 }

 function getFLenFalse(){
  // get tieu cu f2;
  return f2.getLeft() - (f2.getWidth()/2) - getCenterLine();

 }

 function getHeightLenTrue(){
   return cTrue.getHeight();
 }

 function makeImage(left,top,height,width,eImg,flip){
     var imgElement = getElementByID(eImg);
      return  new fabric.Image(imgElement, {
      left:left|| 285,scale:1,
      top:top || 70, width: width || 30,height:height || 260,flipY: flip || false
    });
  }

  function getWidthLine(){
     return line.getWidth();
  }

  function setLineTopRight(x){

   var xLine = getCenterLine();
   var yLine =  getXLine() - getHeightCanTrue();
   var x1Line = fDefaultValue + getCenterLine();
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
 

 function getbValue(){
   /*
     b = (f * a) / (f - a) 
     f: khoảng cách của 2 điểm f1 đến f2
     a: khoảng cách từ cây nến thật đến kính
    */
   var f = getFCanTrue();
   //console.log('f1:'+ getFLenTrue());
   //console.log('f2:' + getFLenFalse());
   var a = getDCanTrue();
   //console.log('khoang cach f1-->f2:'+f);
   //console.log('khoang cach nen that den len:'+ getDLenTrue());
   var b = '';
   if(f==a) b = 'ー'; else b = Math.round(( f*a) / (f-a));
   //console.log('gia tri b:'+b);
   return b;

 }

 function getmValue(){
    /*
     get thong so m = b/ a
     b: thông số lấy phía trên
     a: khoảng cách từ cây nến thật đến kính
    */
    var a = getDCanTrue();
    var b = getbValue();
    var m= 0;
    if(isNumeric(b)===false) m = 0; else m = Math.round(b/a);
    return m;
 }

 function isNumeric(val) {
    return !isNaN(+val) && isFinite(val);
}


  acontrol.value= getbValue();
  mcontrol.value= getmValue();
  leftControl.onchange = function() {
     var valueRange = parseInt(this.value,10);
     changeDCan(valueRange);
     setWhenChangeA(valueRange,valueRange,getHeightCanTrue());
    canvas.renderAll();
  };

  hLenControl.onchange = function(){
    var hLenValue = parseInt(this.value);
    getElementByID('len-value').value =hLenValue;
    changeHeightCan(hLenValue);
    setWhenChangeA(leftControl.value,fDefaultValue,hLenValue);
     canvas.renderAll();
  };

 fConttol.onchange = function(){
    var fValue = parseInt(this.value);
    var f1Changed  = getCenterLine() - fValue - f1.getWidth()/2;
    var f2Changed = getCenterLine() + fValue - f1.getWidth()/2;
    f1.setLeft(f1Changed);
    f2.setLeft(f2Changed);
    changeF(fValue);
    canvas.renderAll();
 };

  function setWhenChangeA(valueChange,fchanged,dChanged){
      var changed = getCenterLine() - valueChange;
      var xCanTrue = getXCanTrue(dChanged);
      var yCanTrue = getYCanTrue(valueChange);
      var xFTrue = getCenterLine() - fchanged;
       console.log('x1:' + xCanTrue + 'hc:'+ valueChange + ' y:'+ yCanTrue );

      lightTopLeft.set({'x1':changed,'y1':getXLine() - getHeightCanTrue(),'y2':getXLine() - getHeightCanTrue()});
      lightBottomLeft.set({'x1':changed,'y1':getXLine() - getHeightCanTrue()});
      lightCenter.set({'x1':changed,'y1':getXLine() - getHeightCanTrue(),'y2':getXLine() - getHeightCanTrue()});
     
      var lightBottomLeftY = calLine(xCanTrue, yCanTrue, xFTrue , getXLine(), getCenterLine());
      


      lightBottomLeft.set({'y2':lightBottomLeftY});
      lightBottomright.set({'y1':lightBottomLeftY,'y2':lightBottomLeftY});
      var lightCenterY = calLine(changed, getXLine() - getHeightCanTrue(),getCenterLine(),getXLine(),getWidthLine());
      lightCenter.set({'y2':lightCenterY});
      var heightLenFalse  = getHeightCanFalse() + getXLine();
      var xLenFalse = getDCanFalse() + getCenterLine();
     var dCanTrue = getDCanTrue();
     var dFCanTrue = getFCanTrue();
     if(dCanTrue == dFCanTrue){
         var xPointTopRightLine = calLineFindX(getCenterLine() + dFCanTrue,getXLine(),getCenterLine(),getXLine() - getHeightCanTrue(),0);
         lightTopright.set({'x1':xPointTopRightLine,'y1':0});
        var xLightCenter = calLineFindX(getCenterLine(),getXLine(), getCenterLine() - dFCanTrue,getXLine() - getHeightCanTrue(),0);
        
        lightCenter.set({'x1':xLightCenter,'y1':0});
     }else{
         var xPointTopRightLine1 = lightTopLeft.get('x2');
         var yPointTopRightLine1 = lightTopLeft.get('y2');
         //console.log('height lend:'+ getHeightLenTrue());
         //console.log('x1:'+xPointTopRightLine1 +'- y1: ' +yPointTopRightLine1);
         var yEndPoint = calLine(xPointTopRightLine1,yPointTopRightLine1,
         getCenterLine()+ fDefaultValue, getXLine(),getWidthLine());
        
        lightTopright.set({'y1':getXLine() - getHeightLenTrue(),'y2':yEndPoint});
     }
     //console.log(' do dai len that:'+dlenTrue);
     // console.log('do dai tieu cu f1:'+ dFlendTrue);
     // console.log('changed b:'+ getbValue());
     acontrol.innerHTML= getbValue();
  }


  /* khi thay doi chieu cao cay nen that */
  function changeHeightCan(h){
     cTrue.setTop(getXLine()-h);
     cTrue.setHeight(h);
     cFalse.setHeight(getHeightCanFalse());
  }

  /* khi thay doi khoang cach cay nen thiet */

  function changeDCan(d){
      cTrue.setLeft(getCenterLine() - getDCanTrue() - widthCan/2);
      cFalse.setLeft(getCenterLine() + getDCanFalse() - widthCan/2);
      cFalse.setHeight(getHeightCanFalse());
  }

 /* khi thay doi tieu cu */
 
 function changeF(f){
   var hCan = getHeightCanTrue();
   var dCan = getDCanTrue();
   setWhenChangeA(hCan,f,dCan);
 } 

 function getXCanTrue(d){
    return getCenterLine() - parseInt(d);
 }

 function getYCanTrue(h){
    return   getXLine() - h;
 }


  /* tinh chieu thau kinh */
  
    function getDCanTrue(){
      /* get khoang cach nen that den kinh */
      return  getCenterLine() - ( getCenterLine() - getElementByID('aValue').value);
   }

   function getFCanTrue(){
      // get tiêu cu anh that (F1)
      return fDefaultValue;
   }

  function getHeightCanTrue(){
      return cTrue.getHeight();
  }

  function getDCanFalse(){
      // d' = (d*f)/ (d-f); cong thuc tinh khoảng cách ảnh ảo
      var d = (getDCanTrue() * getFCanTrue()) / (getDCanTrue() - getFCanTrue());
      console.log('d:'+getDCanTrue()+ 'f:'+getFCanTrue());
      console.log('khoang cach nen ao den kinh:' + d);
     return Math.round(d);

   }

function getHeightCanFalse(){
   // h' =  (d'/ d) * h: cong thuc tinh chieu cao anh ảo
    var h = (getDCanFalse() / getDCanTrue()) * getHeightCanTrue();
     //console.log(' chieu cay nen ao:'+ h);
     return h;
  }



  function updateControls() {
    //scaleControl.value = rect.getScaleX();
    //angleControl.value = rect.getAngle();
    leftControl.value = lenTrue.get('x1');
    hLenControl.value = lenTrue.get('y2');
    //fControl.value = f1.get();
    //topControl.value = rect.getTop();
    
  }

  function getElementByID(id){
     return  document.getElementById(id);
  }

  canvas.on({
    'object:moving': updateControls,
    'object:scaling': updateControls,
    'object:resizing': updateControls,
    'object:rotating': updateControls
  });
})();