(function() {
  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.transparentCorners = false;
  var $ = function(id){return document.getElementById(id)};
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
  
  function makeLend(heightLen){
    
    var angleF = line.get('y1');
    var heightLine = line.get('y1');
    var angleStart  = parseInt( getCenterLine() - 100 );
    var angleSrart2 = parseInt( getCenterLine() + 100 );
    lenTrue = makeLine([angleStart, heightLine, angleStart, heightLine - heightLen ],'blue',5);
    //cTrue = makeImage(275,70,260,30,'len-img');
    //glass = makeGlass(140,width/2);
    f1 = makeF(angleF,(getCenterLine() - 45 ));
    f2 = makeF(angleF,(getCenterLine() + 55 ));
    glass = makeImage(275,70,260,30,'len-img');
    canvas.add(lenTrue,f1,f2,glass);
    lenFalse = makeLine([ getCenterLine() + getDLenFalse(), heightLine, angleSrart2,heightLine + getHeightLenFalse()],'#000',5);
    canvas.add(lenFalse);
    setGlass();
   
    //setImg(lenTrue,lenImg);
  }

  function makeLineGroup(){
   var angleStart = lenTrue.get('x1');
   var widthLine = line.get('x2');
   var heightLend = lenTrue.get('y2');
   var color = 'red';
   var borderWidth =2;
   var leftGlass = glass.getLeft();
   var widthGlass = glass.getBoundingRectWidth();
   var angleEnd = leftGlass - (widthGlass/2);
   lightTopLeft = makeLine([angleStart, heightLend, getCenterLine(), heightLend ],color,borderWidth);
   var endPointCenter = getXLine() +  getHeightLenTrue() + (getHeightLenFalse() * 2 );
   var lightCenterY = calLine(angleStart,heightLend,getCenterLine(),getXLine(),getWidthLine());
   lightCenter = makeLine([angleStart, heightLend, widthLine,lightCenterY],color,borderWidth);
    
   var endPointLineBottom = calLine(angleStart,heightLend, getCenterLine() - getFLenTrue() ,getXLine(),getCenterLine());
   lightBottomLeft = makeLine([angleStart,heightLend, getCenterLine(),endPointLineBottom],color,borderWidth);
   var x2PointLineTopRight = getDLenFalse() * 2 + getCenterLine();
   var y2PointLineTopRight = getHeightLenFalse() + getHeightLenTrue ();
   lightTopright = makeLine([getCenterLine(), heightLend, widthLine ,setLineTopRight(widthLine)],'red',borderWidth);
   lightBottomright = makeLine([getCenterLine(), endPointLineBottom, widthLine, endPointLineBottom ],'red',borderWidth);
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
   //var widthGlass = glass.getBoundingRectWidth();
  // var heightGlass  = glass.getBoundingRectHeight();
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
    var h = (getDLenFalse() / getDLenTrue()) * getHeightLenTrue();
     //console.log('khoang cach cua cay nen that den kinh '+ getDLenTrue());
     return h;
  }

 function getDLenFalse(){
    // d' = (d*f)/ (d-f); cong thuc tinh khoảng cách ảnh ảo
    var d = (getDLenTrue () * getFLenTrue()) / (getDLenTrue() - getFLenTrue());
  
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
   return lenTrue.getHeight();
 }

  function makeRec(top,left){
    return new fabric.Rect({ left: left, top: top, fill:'blue', width: 100, height: 260,

    });
  }

 function makeImage(left,top,height,width,eImg){
     var imgElement = getElementByID(eImg);
      return  new fabric.Image(imgElement, {
      left:left|| 285,scale:1,
      top:top || 70, width: width || 30,height:height || 260,
    });
  }

  function getWidthLine(){
     return line.getWidth();
  }

  function setLineTopRight(x){

   var xLine = getCenterLine();
   var yLine =  lenTrue.get('y2');
   var x1Line = getFLenFalse() + getCenterLine();
   var y1Line = getXLine() + getHeightLenFalse();
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
   var f = getFLenTrue();
   //console.log('f1:'+ getFLenTrue());
   //console.log('f2:' + getFLenFalse());
   var a = getDLenTrue();
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
    var a = getDLenTrue();
    var b = getbValue();
    var m= 0;
    if(isNumeric(b)===false) m = 0; else m = Math.round(b/a);
    return m;
 }

 function isNumeric(val) {
    return !isNaN(+val) && isFinite(val);
}

  var leftControl = $('aValue');
  var fConttol = $('f-control');
  var hLenControl = $('len-control');
  var acontrol = getElementByID('b-value');
  var mcontrol = getElementByID('m-value');
   acontrol.value= getbValue();
   mcontrol.value= getmValue();
  leftControl.onchange = function() {
     var valueRange = parseInt(this.value,10);
     
     //lightTopLeft.set({'x1':valueRange});
     //lightCenter.set({'x1':valueRange});
     setWhenChangeA(valueRange);
     //lenFalse.set({'y2':valueRange});
     document.getElementById('valueofA').value = parseInt(this.value,10) ;
    canvas.renderAll();
  };

  hLenControl.onchange = function(){
    var hLenValue = parseInt(this.value);
    getElementByID('len-value').value =hLenValue;
    lenTrue.set({'y2':getXLine()- hLenValue});
    setWhenChangeA(leftControl.value);
     canvas.renderAll();
  }

  function setWhenChangeA(valueChange){
      var changed = getCenterLine() - valueChange;
      lightTopLeft.set({'x1':changed,'y1':getXLine() - getHeightLenTrue(),'y2':getXLine() - getHeightLenTrue()});
      lightBottomLeft.set({'x1':changed,'y1':getXLine() - getHeightLenTrue()});
      lightCenter.set({'x1':changed,'y1':getXLine() - getHeightLenTrue(),'y2':getXLine() - getHeightLenTrue()});
      lenTrue.set({'x1': changed,'x2':changed});
      var lightBottomLeftY = calLine(changed, getXLine() - getHeightLenTrue() , getCenterLine() - getFLenTrue() , getXLine(), getCenterLine());
      lightBottomLeft.set({'y2':lightBottomLeftY});
      lightBottomright.set({'y1':lightBottomLeftY,'y2':lightBottomLeftY});
      var lightCenterY = calLine(changed, getXLine() - getHeightLenTrue(),getCenterLine(),getXLine(),getWidthLine());
      lightCenter.set({'y2':lightCenterY});
      var heightLenFalse  = getHeightLenFalse() + getXLine();
      var xLenFalse = getDLenFalse() + getCenterLine();
      lenFalse.set({'x1':xLenFalse,'x2':xLenFalse,'y2': heightLenFalse });

     var dlenTrue = getDLenTrue();
     var dFlendTrue = getFLenTrue();
     if(dlenTrue == dFlendTrue){
         var xPointTopRightLine = calLineFindX(getCenterLine() + dFlendTrue,getXLine(),getCenterLine(),getXLine() - getHeightLenTrue(),0);
         lightTopright.set({'x1':xPointTopRightLine,'y1':0});
        var xLightCenter = calLineFindX(getCenterLine(),getXLine(), getCenterLine() - dFlendTrue,getXLine() - getHeightLenTrue(),0);
        
        lightCenter.set({'x1':xLightCenter,'y1':0});
     }else{
         var xPointTopRightLine1 = lightTopLeft.get('x2');
         var yPointTopRightLine1 = lightTopLeft.get('y2');
         console.log('height lend:'+ getHeightLenTrue());
         console.log('x1:'+xPointTopRightLine1 +'- y1: ' +yPointTopRightLine1);
         var yEndPoint = calLine(xPointTopRightLine1,yPointTopRightLine1,
         getCenterLine()+ getFLenTrue(), getXLine(),getWidthLine());
        
        lightTopright.set({'y1':getXLine() - getHeightLenTrue(),'y2':yEndPoint});
     }
      console.log(' do dai len that:'+dlenTrue);
      console.log('do dai tieu cu f1:'+ dFlendTrue);
      console.log('changed b:'+ getbValue());
     acontrol.innerHTML= getbValue();
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