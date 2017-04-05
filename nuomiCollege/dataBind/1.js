function Observer(object){
    var keys = Object.keys(object),
        that = this

    this.data = {}
    keys.forEach(function(key){
        var val = object[key]
        if(typeof val === 'object'){
           object[key] = new Observer(val)
        }
        var privateKey = '__'  + key
        that.data[privateKey] = object[key]
        console.log(key,that.data)
        Object.defineProperty(that.data,key,{
            enumerable : true,
            configurable : true,
            get : function(){
                console.log("你访问了" + key)
                return that.data[privateKey]
            },
            set : function(value){
                that.data[privateKey] = value
                console.log("你设置了" + key + "的值，新的值为" + value)
            }
        })
    })
}