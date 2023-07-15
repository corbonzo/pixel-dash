export const keyboard ={};
const keyboardTimes ={}
document.body.addEventListener("keydown",function(event){
    var lastTime = keyboardTimes[event.key] | 0
    var time = Math.abs(lastTime-event.timeStamp)
    if(!keyboard[event.key]){
        keyboard[event.key] = 1;
        if(time <200){
            keyboard[event.key] = 2;
        }
        keyboardTimes[event.key]=event.timeStamp
    }
});
document.body.addEventListener("keyup",function(event){
    keyboard[event.key] = false;
})


    
