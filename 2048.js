var data=null;//保存4*4个数据的二位数组
var RN=4,CN=4;//保存总行数和总列数
var score=0;//保存游戏得分
var status=0,//保存游戏状态编号
    GAMEOVER=0,RUNNING=1;//为游戏状态编号起名
function start(){
    //初始化游戏状态为运行中
    status=RUNNING;
    score=0;
    data=[];//创建空数组保存在data中
    //将data初始化为4*4个0的二位数组
    for(var r=0;r<RN;r++){
        data.push([]);
        for(var c=0;c<CN;c++){
            data[r][c]=0;
        }
    }
    //生成2个随机数
    randomNum();randomNum();
    //更新页面
    updateView();
    //为页面绑定键盘按下事件处理函数
    //---回调函数
    document.onkeydown=function(e){
        //获得键盘号：
        //alert(e.keyCode);
        switch(e.keyCode){
            case 37://左
                moveLeft();
                break;
            case 38://上
                moveUp();
                break;
            case 39://右
                moveRight();
                break;
            case 40://下
                moveDown();
                break;
        }
    }
}
//随机位置生成数
function randomNum(){
    //反复生成
    while(true){
        //随机生成0~RN-1行号r
        var r=parseInt(Math.random()*RN);
        //随机生成0~CN-1列号c
        var c=parseInt(Math.random()*CN);
        if(data[r][c]==0){
            //在data中r行c列赋值一个2或4
            data[r][c]=Math.random()>0.5?2:4;
            break;
        }
    }
}
function updateView(){
    for(var r=0;r<RN;r++){
        for(var c=0;c<CN;c++){
            var div=document.getElementById("c"+r+c);
            if(data[r][c]!==0){
                //设置div的内容为当前元素值
                div.innerHTML=data[r][c];
                //在div的class中追加 n
                div.className="cell n"+data[r][c];
            }else{
                //清除div中的残留内容
                div.innerHTML="";
                //恢复class为cell
                div.className="cell";
            }
        }
    }
    //将score更新到id为score的span中
    var span=document.getElementById("score");
    span.innerHTML=score;
    //找到id为gameover的div
    var div=document.getElementById("gameover");
    //如果游戏状态为GAMEOVER,设置div的display为block
    if(status==GAMEOVER){
        div.style.display="block";
    }else{//否则设置div的style的display为none
        div.style.display="none";
    }
    document.getElementById("final").innerHTML=score;

}
function isGAMEOVER(){
    for(var r=0;r<RN;r++){
        for(var c=0;c<CN;c++){
            if(data[r][c]==0){
                return false;
            }else if(c<CN-1 && data[r][c]==data[r][c+1]){
                return false;
            }else if(r<RN-1 && data[r][c]==data[r+1][c]){
                return false;
            }
        }
    }
    return true;
}
//左移所有行
function moveLeft(){
    //为data拍照保存在before中
    var before=String(data);
    //遍历data中每一行
    for(var r=0;r<RN;r++) {
        //左移第r行
        moveLeftInRow(r);
        //遍历结束
    }
    //为data拍照保存在after中
    var after=String(data);
    //如果before！=after
    if(before!=after){
      //随机生成数
        randomNum();
        //如果游戏结束
        if(isGAMEOVER()){
            //就修改游戏状态为GAMEOVER
            status=GAMEOVER;
        }
      //更新界面
        updateView();
    }
}
function moveLeftInRow(r){
    //c从0开始遍历data中r行每个格，到<CN-1结束
    for(var c=0;c<CN-1;c++){
      //查找c位置右侧下一个不为0的位置nextc
        var nextc=getNextInRow(r,c);
        //如果找到
        if(nextc!=-1){
           //如果c位置的值为0
            if(data[r][c]==0){
             //将nextc位置的值赋给c位置
                data[r][c]=data[r][nextc];
             //将nextc位置的值置为0
                data[r][nextc]=0;
             //c留在原地
                c--;
            }else if(data[r][c]==data[r][nextc]){
          //否则如果c位置的值等于nextc位置的值
             //将c位置的值*2
                data[r][c]*=2;
                //将合并后的新值累加到score上
                score+=data[r][c];
             //将nextc位置的值置为0
                data[r][nextc]=0;
            }
        }else break;//否则（没找到），就退出
    }
}
//专门负责查找r行c列右侧下一个不为0的位置
function getNextInRow(r,c){
    //nextc从c+1开始，到<CN
    for(var nextc=c+1;nextc<CN;nextc++){
      //如果data中r行nextc位置不为0
        if(data[r][nextc]!=0){
        //就返回nextc
            return nextc;
        }//遍历结束
    }
    return -1;//返回-1
}
//右移所有行
function moveRight(){
    //为data拍照保存在before中
    var before=String(data);
    //遍历data中每一行
    for(var r=0;r<RN;r++) {
        //左移第r行
        moveRightInRow(r);
        //遍历结束
    }
    //为data拍照保存在after中
    var after=String(data);
    //如果before！=after
    if(before!=after){
        //随机生成数
        randomNum();
        //如果游戏结束
        if(isGAMEOVER()){
            //就修改游戏状态为GAMEOVER
            status=GAMEOVER;
        }
        //更新界面
        updateView();
    }
}
function moveRightInRow(r){
    //c从CN-1开始遍历data中r行每个格，到>0结束
    for(var c=CN-1;c>0;c--){
        //查找c位置左侧前一个不为0的位置prevc
        var prevc=getprevInRow(r,c);
        //如果找到
        if(prevc!=-1){
            //如果c位置的值为0
            if(data[r][c]==0){
                //将prevc位置的值赋给c位置
                data[r][c]=data[r][prevc];
                //将prevc位置的值置为0
                data[r][prevc]=0;
                //c留在原地
                c++;
            }else if(data[r][c]==data[r][prevc]){
                //否则如果c位置的值等于nextc位置的值
                //将c位置的值*2
                data[r][c]*=2;
                //将合并后的新值累加到score上
                score+=data[r][c];
                //将nextc位置的值置为0
                data[r][prevc]=0;
            }
        }else break;//否则（没找到），就退出
    }
}
function getprevInRow(r,c){
    //prev从c-1开始反向遍历，到>=0的位置结束
    for(var prevc=c-1;prevc>=0;prevc--){
        //如果data中r行prevc位置的值不为0
        if(data[r][prevc]!=0){
            return prevc;//返回prevc
        }
    }
    return -1;//返回-1
}
//上移所有行
function moveUp(){
    var before=String(data);
    for(var c=0;c<CN;c++){
        moveUpInCol(c);
    }
    var after=String(data);
    if(before!=after){
        randomNum();
        //如果游戏结束
        if(isGAMEOVER()){
            //就修改游戏状态为GAMEOVER
            status=GAMEOVER;
        }
        updateView();
    }
}
function moveUpInCol(c){
    for(var r=0;r<RN-1;r++){
        var downr=getDownInCol(r,c);
        if(downr!=-1){
            if(data[r][c]==0){
                data[r][c]=data[downr][c];
                data[downr][c]=0;
                r--;
            }else if(data[r][c]==data[downr][c]){
                data[r][c]*=2;
                //将合并后的新值累加到score上
                score+=data[r][c];
                data[downr][c]=0;
            }
        }else break;
    }
}
function getDownInCol(r,c){
    for(var downr=r+1;downr<RN;downr++){
        if(data[downr][c]!=0){
            return downr;
        }
    }
    return -1;
}
//下移所有行
function moveDown(){
    var before=String(data);
    for(var c=0;c<CN;c++){
        moveDownInCol(c);
    }
    var after=String(data);
    if(before!=after){
        randomNum();
        //如果游戏结束
        if(isGAMEOVER()){
            //就修改游戏状态为GAMEOVER
            status=GAMEOVER;
        }
        updateView();
    }
}
function moveDownInCol(c){
    for(var r=RN-1;r>0;r--){
        var upr=getUpInCol(r,c);
        if(upr!=-1){
            if(data[r][c]==0){
                data[r][c]=data[upr][c];
                data[upr][c]=0;
                r++;
            }else if(data[r][c]==data[upr][c]){
                data[r][c]*=2;
                //将合并后的新值累加到score上
                score+=data[r][c];
                data[upr][c]=0;
            }
        }else break;
    }
}
function getUpInCol(r,c){
    for(var upr=r-1;upr>=0;upr--){
        if(data[upr][c]!=0){
            return upr;
        }
    }
    return -1;
}
start();