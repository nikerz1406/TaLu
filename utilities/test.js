export const initData = (number)=>{
    
    var result = []
    for(var i=0;i<number;i++){
        var id = Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2); 
        var value = Math.floor(Math.random() * 60*60*24*365);
        var today  = new Date(value);
        var type = Math.floor(Math.random() * 3);
        var item = {
        id,date:today.toLocaleDateString(),time:today.toLocaleTimeString(),type,
        name:id,
        }
        result.unshift(item);
    }
    return result;
}