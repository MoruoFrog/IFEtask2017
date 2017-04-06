function Observer(object){
    var keys = Object.keys(object),
        that = this


    keys.forEach(function(key){
        var val = object[key]
        if(typeof val === 'object' && !Array.isArray(val)){
           object[key] = new Observer(val)
        }
        var privateKey = '__'  + key
        that.data[privateKey] = object[key]
        that.watch[key] = []
        Object.defineProperty(that.data,key,{
            enumerable : true,
            configurable : true,
            get : function(){
                console.log("你访问了" + key)
                return that.data[privateKey]
            },
            set : function(newValue){
                that.data[privateKey] = newValue
                console.log("你设置了" + key + "的值，新的值为" + value)
                if(that.watch[key].length > 0){
                    that.watch.forEach(function(fun){
                        fun(newValue,val)
                    })
                }
            }
        })
    })
}

function Observer(object){
    this.data = object
    this.walk(object)
}

let p = Observer.prototype

p.walk = function(data){
    var val
    for(key in data){
        if(Object.hasOwnProperty(key)){
            val = data[key]
            if(typeof val === 'object'){
                new Observer(val)
            }

            this.convert(key,val)
        }
    }
}

p.convert = function(key,value){
    Object.defineProperty(this.data,key,{
        enumerable : true,
        configurable : true,
        get : function(){
            console.log("你访问了" + key)
            return value
        },
        set : function(newValue){
            console.log("你修改了" + key + "新的值为" + newValue)
            val = newValue
        }
    })
}

function Observer(data){
    this.convert(data)
}

let p = Object.prototype

p.convert = function(data){
    for(let key in data){
        let val
        if(data.hasOwnProperty(key)){
            val = data[key]
            if(typeof val === 'object'){
                new Observer(val)
            }

            Object.defineProperty(this,key,{
                enumerable : true,
                configurable : true,
                get : function(){
                    console.log("你访问了" + key)
                    return val
                },
                set : function(newValue){
                    console.log("你修改了" + key + "新的值为" + newValue)
                    val = newValue
                }
            })
        }
    }
}