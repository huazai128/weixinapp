var util = require("../../utils/util.js");
var API =  require("../../utils/api.js");

Page({
    data:{                  //初始化值
        title:"话题列表",  
        postsList:[],
        hidden:false,
        page:1,
        tab:"all"
    },
    // onPullDownRefresh:function(){
    //     console.log(1212121);
    //     this.fetchDate();
    //     console.log("下拉刷新",new Date())
    // },
    onLoad:function(){       //生命周期－监听页面加载，触发函数
        this.fetchDate();    //
    },
    onTapTag:function(e){    //点击头部定义的事件，触发函数
    //    console.dir(e);
       var self = this; 
       var tab = e.currentTarget.id;   //获取当前ID对象的值
       self.setData({
           tab:tab
       });
       if(tab != "all"){
           this.fetchDate({tab:tab});
       }else{
           this.fetchDate();
       }
    },
    fetchDate:function(data){
        var self = this;
        self.setData({        //重新设置hidden值
            hidden:false      //显示加载
        });
        if(!data) data = {};  //如果没有数据传入就显示为空
        if(!data.page) data.page = 1;  //页面参数显示1
        if(data.page === 1){
            self.setData({
                postsList:[]
            })
        };
        wx.request({
            url:API.getTopics(data),  //请求地址
            success:function(res){    //请求成功
                self.setData({
                    postsList: self.data.postsList.concat(res.data.data.map(function (item) {
                        item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));  //处理时间戳
                        return item;
                    }))
                });
                setTimeout(function(){
                    self.setData({
                        hidden:true
                    },300)
                })
            }
        });
        console.log(self.data.postsList)
    },
    redictDetail:function(e){  //点击详情事件触发
        var id = e.currentTarget.id;
        console.log(id+"=======");
        var url = "../detail/index?id=" + id;
        wx.navigateTo({  //连接跳转
            url:url
        })
    },
    lower:function(e){         //用来监听下拉刷新更多
        var self = this;
        self.setData({
            page:self.data.page + 1
        });
        if(self.data.tab !== "all"){
            this.fetchDate({tab: self.data.tab, page: self.data.page});
        }else{
            this.fetchDate({page:self.data.page});
        }
        // console.log("下拉刷新",new Date());
    }
})