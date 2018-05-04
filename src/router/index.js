import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import Side from '../components/side/side'
import Mine from '../components/mine/mine'
import login from '../components/login/login'
import Traderecord from '../components/mine/traderecord/traderecord'
import Setting from '../components/mine/setting/setting'
import cgpn from '../components/mine/setting/cgpn/cgpn'
import odpn from '../components/mine/setting/cgpn/odpn'
import nwpn from '../components/mine/setting/cgpn/nwpn'
import cgpwd from '../components/mine/setting/cgpwd/cgpwd'
import setpwd from '../components/mine/setting/cgpwd/setpwd'
import fgpwd from '../components/mine/setting/cgpwd/fgpwd'
import fgsetpwd from '../components/mine/setting/cgpwd/fgsetpwd'

import qrcode from '../components/mine/setting/qrcode'
import Cardsmanage from '../components/mine/cardsmanage/cardsmanage'
import register from '../components/register/register'
import adress from '../components/adress/adress'
import selectcategory from '../components/selectcategory/selectcategory'
import fudailist from '../components/fudai/fudailist'
import addfd from '../components/fudai/addfd'
import fudai from '../components/fudai/fudai'
import fudaiagain from '../components/fudai/fudaiagain'
import drawrecord from '../components/fudai/drawrecord'
import noticelist from '../components/notice/noticelist'
import pending from '../components/notice/pending'
import paymentdetail from '../components/notice/paymentdetail'
import update from '../components/notice/update'
import notice from '../components/notice/notice'
import withdraw from '../components/notice/withdraw'
import balance from '../components/mine/balance/balance'
import balancedetails from '../components/mine/balance/balancedetails'
import extract from '../components/mine/balance/extract'
import extractquery from '../components/mine/balance/extractquery'
import extractdetail from '../components/mine/balance/extractdetail'
import relieve from '../components/mine/cardsmanage/relieve'
import carddetails from '../components/mine/cardsmanage/carddetails'
import addcard from '../components/mine/cardsmanage/addcards/addcard'
import verification from '../components/mine/cardsmanage/addcards/verification'
import setpassword from '../components/mine/cardsmanage/addcards/setpassword'
import auth from '../components/mine/cardsmanage/addcards/auth'
import settlementdetail from '../components/mine/settlement/settlementdetail'
import waitingforsettlement from '../components/mine/settlement/waitingforsettlement'
import waitingforsettlementdetails from '../components/mine/settlement/waitingforsettlementdetails'
import storemanage from '../components/mine/storemanage/storemanage'
import storechange from '../components/mine/storemanage/storechange'
import storeavatar from '../components/mine/storemanage/storeavatar'
import storeweeks from '../components/mine/storemanage/storeweeks'
import storetime from '../components/mine/storemanage/storetime'
import storedesc from '../components/mine/storemanage/storedesc'

import servicecenter from '../components/servicecenter/servicecenter'
import seranrtemp from '../components/servicecenter/seranrtemp'
import weekpicker from '../components/weekpicker/weekpicker'
import imgcut from '../components/imgcut/imgcut'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      }
    },
    {
      path: '/side',
      name: 'side',
      component: Side
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/mine/traderecord',
      name: 'traderecord',
      component: Traderecord
    },
    {
      path: '/mine/balance',
      name: 'balance',
      component: balance
    },
    {
      path: '/mine/setting/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/mine/setting/qrcode',
      name: 'qrcode',
      component: qrcode
    },
    {
      path: '/mine/cardsmanage',
      name: 'cardsmanage',
      component: Cardsmanage
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/adress',
      name: 'adress',
      component: adress
    },
    {
      path: '/selectcategory',
      name: 'selectcategory',
      component: selectcategory
    },
    {
      path: '/fudailist',
      name: 'fudailist',
      component: fudailist
    },
    {
      path: '/addfd',
      name: 'addfd',
      component: addfd
    },
    {
      path: '/fudai',
      name: 'fudai',
      component: fudai
    },
    {
      path: '/fudaiagain',
      name: 'fudaiagain',
      component: fudaiagain
    },
    {
      path: '/drawrecord',
      name: 'drawrecord',
      component: drawrecord
    },
    {
      path: '/noticelist',
      name: 'noticelist',
      component: noticelist
    },
    {
      path: '/pending',
      name: 'pending',
      component: pending
    },
    {
      path: '/paymentdetail',
      name: 'paymentdetail',
      component: paymentdetail
    },
    {
      path: '/update',
      name: 'update',
      component: update
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw
    },
    {
      path: '/mine/extract',
      name: 'extract',
      component: extract
    },
    {
      path: '/mine/extractquery',
      name: 'extractquery',
      component: extractquery
    },
    {
      path: '/mine/extractdetail',
      name: 'extractdetail',
      component: extractdetail
    },
    {
      path: '/mine/balancedetails',
      name: 'balancedetails',
      component: balancedetails
    },
    {
      path: '/mine/settlement/settlementdetail',
      name: 'settlementdetail',
      component: settlementdetail
    },
    {
      path: '/mine/cardsmanage/carddetails',
      name: 'carddetails',
      component: carddetails
    },
    {
      path: '/mine/cardsmanage/relieve',
      name: 'relieve',
      component: relieve
    },
    {
      path: '/mine/cardsmanage/addcards/addcard',
      name: 'addcard',
      component: addcard
    },
    {
      path: '/mine/cardsmanage/addcards/verification',
      name: 'verification',
      component: verification
    },
    {
      path: '/mine/cardsmanage/addcards/setpassword',
      name: 'setpassword',
      component: setpassword
    },
    {
      path: '/mine/cardsmanage/addcards/auth',
      name: 'auth',
      component: auth
    },
    {
      path: '/mine/waitingforsettlement',
      name: 'waitingforsettlement',
      component: waitingforsettlement
    },
    {
      path: '/mine/waitingforsettlementdetails',
      name: 'waitingforsettlementdetails',
      component: waitingforsettlementdetails
    },
    {
      path: '/mine/storemanage/storemanage',
      name: 'storemanage',
      component: storemanage
    },
    {
      path: '/mine/storemanage/storedesc',
      name: 'storedesc',
      component: storedesc
    },
    {
      path: '/mine/storemanage/storeavatar',
      name: 'storeavatar',
      component: storeavatar
    },
    {
      path: '/mine/storemanage/storeweeks',
      name: 'storeweeks',
      component: storeweeks
    },
    {
      path: '/mine/storemanage/storetime',
      name: 'storetime',
      component: storetime
    },
    {
      path: '/mine/storemanage/storechange',
      name: 'storechange',
      component: storechange
    },
    {
      path: '/servicecenter/servicecenter',
      name: 'servicecenter',
      component: servicecenter
    },
    {
      path: '/servicecenter/seranrtemp',
      name: 'seranrtemp',
      component: seranrtemp
    },
    {
      path: '/mine/setting/cgpn/cgpn',
      name: 'cgpn',
      component: cgpn
    },
    {
      path: '/mine/setting/cgpn/odpn',
      name: 'odpn',
      component: odpn
    },
    {
      path: '/mine/setting/cgpn/nwpn',
      name: 'nwpn',
      component: nwpn
    },
    {
      path: '/mine/setting/cgpwd/cgpwd',
      name: 'cgpwd',
      component: cgpwd
    },
    {
      path: '/mine/setting/cgpwd/fgsetpwd',
      name: 'fgsetpwd',
      component: fgsetpwd
    },
    {
      path: '/mine/setting/cgpwd/setpwd',
      name: 'setpwd',
      component: setpwd
    },
    {
      path: '/mine/setting/cgpwd/fgpwd',
      name: 'fgpwd',
      component: fgpwd
    },
    {
      path: '/weekpicker/weekpicker',
      name: 'weekpicker',
      component: weekpicker
    },
    {
      path: '/imgcut/imgcut',
      name: 'imgcut',
      component: imgcut
    }
  ]
})
