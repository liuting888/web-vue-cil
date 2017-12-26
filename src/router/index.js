import Vue from 'vue'
import Router from 'vue-router'

//
 const MemberCenter = resolve => require(['@/views/member_center/index'], resolve);


Vue.use(Router)

export default new Router({
  routes: [
    {
      	path: '/',
      	redirect: '/member_center'
    },
    /***************** 商品相关页面 详情、兑换、兑换结果 ******************/
    {
        path: '/member_center',
        name: 'MemberCenter',
        component: MemberCenter,
        children: [
            {
                path: 'member_center',
                name: 'MemberCenter',
                component: MemberCenter
            }
        ]
    }
  ]
})
