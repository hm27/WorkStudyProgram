export default{
    currency(v,obj){//es6的写法
        obj=obj || {};
        obj.num=obj.num || 2;
        obj.type=obj.type || "￥";
        return obj.type+v;
    },
    date(v){
        var date=new Date(v);
        return date.getFullYear()+"-"
            +(date.getMonth()+1).toString().padStart(2,"0")+"-"
            +date.getDate().toString().padStart(2,"0")
            +" "+date.getHours().toString().padStart(2,"0")
            +":"+date.getMinutes().toString().padStart(2,"0")
            +":"+date.getSeconds().toString().padStart(2,"0");
    },
    imgUrl(v){
        return "http://127.0.0.1/"+v;
    }
}





// 全局的过滤器
//Vue.filter("currency",function(v,obj){
//  obj=obj || {};
//  obj.num=obj.num || 2;
//  obj.type=obj.type || "$";
//  return obj.type+v.toFixed(obj.num);
//})
//Vue.filter("date",function(v){
//  var date=new Date(v);
//  return date.getFullYear()+"-"
//      +(date.getMonth()+1).toString().padStart(2,"0")+"-"
//      +date.getDate().toString().padStart(2,"0")
//      +" "+date.getHours().toString().padStart(2,"0")
//      +":"+date.getMinutes().toString().padStart(2,"0")
//      +":"+date.getSeconds().toString().padStart(2,"0");
//})
