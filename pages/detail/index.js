//logs.js
var util = require('../../utils/util.js');
var API = require("../../utils/api.js");
Page({
  data: {                //用于数据绑定
    title:"话题详情",
    detail:{},
    hidden:false          //loading:加载时显示
  },
  onLoad: function (options) {   //页面加载，触发函数
    this.fetchData(options.id);  //加载数据
  },
  fetchData:function(id){        //根据ID获取页面详情
    var self = this;
    self.setData({               //重新获取值
      hidden:false
    });
    wx.request({
      url:API.getTopicById(id,{mdrender:false}),
      success:function(res){
        // console.log(res)
        res.data.data.create_at = util.getDateDiff(new Date(res.data.data.create_at));// 时间戳
        res.data.data.replies = res.data.data.replies.map(function(item){             //对于所有评论时间进行时间戳
        // console.log(item)
          item.create_at = util.getDateDiff(new Date(item.create_at));
          return item;
        })
        self.setData({
          detail:res.data.data
        });
        setTimeout(function(){
          self.setData({
            hidden:true
          })
        },300)
      }
    })
  }
})
