function Observer(data){
    this.data = data
    this.data.publisher = data.publisher || {}
    Object.defineProperty(data,'publisher',{
        enumerable : false,
        configurable : true,
    })
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

            Object.defineProperty(data,key,{
                enumerable : true,
                configurable : true,
                get : function(){
                    console.log("你访问了" + key)
                    return val
                },
                set : function(newValue){
                    if(typeof newValue === 'object'){
                        new Observer(newValue)
                    }
                    let publisher = this.publisher[key]
                    console.log("你修改了" + key + "新的值为" + newValue)
                    if(publisher){
                        publisher.forEach(function(fun){
                            fun(newValue,val)
                        })
                    }
                    val = newValue
                }
            })
        }
    }
}

p.$watch = function(key,fun){
    let pub,obj
    obj = this.data || this
    pub = obj.publisher[key] || [] 
    if(pub.length === 0){
        obj.publisher[key] = pub
    }
    pub.push(fun)
}