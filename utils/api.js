'use strict'
var HOST_URL = 'https://cnodejs.org/api/v1';   
var GET_TOPICS = "/topics";      //请求所有数据
var GET_TOPIC_BY_ID = "/topic/"; //根据ID请求详情页面
function getUrl(obj){            //obj是一个对象 
    // console.log(Object.keys(obj));  //
    return Object.keys(obj).map(function(k){  //map遍历对象
        return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);  //获取对象的key和value
    }).join("&");   //可以不要join
}
module.exports = {
    getTopics : function(obj){
        return HOST_URL + GET_TOPICS + "?" + getUrl(obj);
    },
    getTopicById : function(id,obj){
        return HOST_URL + GET_TOPIC_BY_ID + id + "?" + getUrl(obj)
    }
}