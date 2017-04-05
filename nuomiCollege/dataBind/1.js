function Observer(object){
    var keys = Object.keys(object),

    this.data = {}
    keys.forEach(function(key){
        var val = object[key]
        if(typeof val === 'object'){
            new Observer(val)
        }
        var privateKey = '__'  + key
        data[privateKey] = object[key]
        Object.defineProperty(data,key,{
            get : function(){
                console.log("你访问了" + key)
                return data[privateKey]
            },
            set : function(value){
                data[privateKey] = value
                console.log("你设置了" + key + "的值，新的值为" + value)
            }
        })
    })

}