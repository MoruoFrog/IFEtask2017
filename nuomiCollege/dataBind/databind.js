function Observer(data,parentKey,parentObj){
    this.data = data
    this.data.subscriber = data.subscriber || {
    Object.defineProperty(data,'subscriber',{
        enumerable : false,
        configurable : true,
    })
    this.convert(data,parentKey,parentObj)
}

let p = Object.prototype

p.convert = function(data,parentKey,parentObj){
    for(let key in data){
        let val
        if(data.hasOwnProperty(key)){
            val = data[key]
            if(typeof val === 'object'){
                new Observer(val,key,data)
            }
            this.defineGetterAndSetter(data,key,val,parentKey,parentObj)
        }
    }
}
var arrayMethod = ['push','pop','shift','unshift','sort','reverse']
var arrayWatch = {}
arrayMethod.forEach(method => {
  var origin = Array.prototype[method]
  arrayMethod[method] = function(){
    this.watcher.forEach(fun => fun())
    return origin.apply(this,arguments)
  }
})
p.defineGetterAndSetter = function(data,key,parentKey,parentObj){
  Object.defineProperty(data,key,{
      enumerable : true,
      configurable : true,
      get : function(){
          return val
      },
      set : function(newValue){
          if(typeof newValue === 'object'){
              new Observer(newValue)
          }
          let subscriber = this.subscriber[key]
          if(subscriber){
              subscriber.forEach(function(fun){
                  fun(newValue,val)
              })
          }
          if(parentObj && !parentObj.data){
              parentObj[parentKey] = data
          }else{
              parentObj.data[parentKey] = data
          }
          val = newValue
      }
  })
}

p.$watch = function(key,fun){
    let sub,obj
    obj = this.data || this
    sub = obj.subscriber[key] || []
    if(sub.length === 0){
        obj.subscriber[key] = sub
    }
    sub.push(fun)
}
