/**
 * Created by admin on 2017/8/21.
 */
!function(){

  //------------------------------------loading加载资源
  var loadImg = []
  for(var i=1;i<25;i++){
    var temp = 'images/'+i+'.png'
    loadImg.push(temp)
  }

  var loader = new PxLoader({
    statusInterval: 200000,
    loggingDelay: 20 * 10000
  })
  //console.log(loader)
  loadImg.forEach(function(ele){
    var pxImg = new PxLoaderImage(ele)
    loader.add(pxImg)
  })

  //------------------------------模仿延迟加载，异步操作无法实现new PxLoaderImage(loadImg[n])
  var isOver = true,
      n = 0
  function setTime(){
    if(isOver){
      setTimeout(function(){
        //console.log(loadImg[n])
        var pxImg = new PxLoaderImage(loadImg[n])
        loader.add(pxImg)
        console.log(pxImg)


        n++
        if(n===24){
          isOver = false
          console.log('isOver')
        }
        setTime()
      },400)
      loader.start()
      console.log(n,'n')
    }
  }
  //setTime()


  var runPlanet = document.getElementsByClassName('run-planet')[0],
      preload = document.getElementsByClassName('preload')[0]
  var frameCanvas = document.getElementById('frameCanvas')
  frameCanvas.width = 640
  frameCanvas.height = 1138

  loader.addCompletionListener(function(){
    preload.style.display = 'none'

    console.log('addCompletionListener')
    frameAnimation()

    frameCanvas.style.display = 'block'
  })

  loader.addProgressListener(function(e){
    var temp = (e.completedCount/e.totalCount)*100,
        ratio = -(36*temp/60)-7 //从开始-7deg转动到结束转动，旋转到67°。
        runPlanet.style.transform = 'translate(650px,-50px) rotateZ('+ratio+'deg)'
    //console.log(ratio)
  })
  loader.start()

  //-----------------------------------------播放序列帧

  function frameAnimation(){

    var canvas = document.getElementById('frameCanvas')
    var ctx = canvas.getContext('2d')
    var index = 0,
        totalImg = loadImg.length

    function drawImg(index){
      ctx.clearRect(0, 0, 640, 1138);
      var img = new Image()
      img.src = loadImg[index]
      ctx.drawImage(img,0,0)
    }

    var imgId = setInterval(function(){
        drawImg(index)
        index ++

      if(index>=totalImg){
        clearInterval(imgId)
        console.log('clearInterval')
      }
    },67) //每秒15帧，很流畅

    function startFrame(){
      //做个点击按钮，开始播放
    }
  }

}()