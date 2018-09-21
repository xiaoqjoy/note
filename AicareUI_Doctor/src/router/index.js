import Vue from 'vue';
import Router from 'vue-router';
import validCodeLogin from '@/components/login/validCodeLogin'
import C2CChat from '@/components/chat/C2CChat'
import passwordLogin from '@/components/login/passwordLogin'
import remind from '@/components/remind/remind'
import addPatient from '@/components/addPatient'
import remindMsgList from '@/components/remind/remindMsgList'
import patient from '@/components/home/patient'
import add from '@/components/home/add'
import edit from '@/components/home/edit'
import sugerManager from '@/components/home/sugerManager'
import patientDetail from '@/components/home/patientDetail'
import record from '@/components/home/record'
import sugerData from '@/components/home/sugerData'
import messageList from '@/components/chat/messageList'
import remindMessageList from '@/components/chat/remindMessageList'
import mine from '@/components/mine/mine'
import doctorInfo from '@/components/mine/doctorInfo'
import editInfo from '@/components/mine/editInfo'
import wallet from '@/components/mine/wallet'
import withdraw from '@/components/mine/withdraw'
import withdrawResult from '@/components/mine/withdrawResult'
import consultingService from '@/components/mine/consultingService'

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'validCodeLogin',
      component: validCodeLogin
    },
    {
      path: '/chat/C2CChat',
      name: 'C2CChat',
      component: C2CChat
    },
    {
      path: '/login/passwordLogin',
      name: 'passwordLogin',
      component: passwordLogin
    },
    {
      path: '/remind/remind',
      name: 'remind',
      component: remind
    },
    {
      path: '/addPatient',
      name: 'addPatient',
      component: addPatient
    },
    {
      path: '/remind/remindMsgList',
      name: 'remindMsgList',
      component: remindMsgList
    },
    {
      path: '/home/patient',
      name: 'patient',
      component: patient
    },
    {
      path: '/home/add',
      name: 'add',
      component: add
    },
    {
      path: '/home/edit',
      name: 'edit',
      component: edit
    },
    {
      path: '/home/sugerManager',
      name: 'sugerManager',
      component: sugerManager
    },
    {
      path: '/home/patientDetail',
      name: 'patientDetail',
      component: patientDetail
    },
    {
      path: '/home/record',
      name: 'record',
      component: record
    },
    {
      path: '/home/sugerData',
      name: 'sugerData',
      component: sugerData
    },
    {
      path: '/chat/messageList',
      name: 'messageList',
      component: messageList
    },
    {
      path: '/chat/remindMessageList',
      name: 'remindMessageList',
      component: remindMessageList
    },
    {
      path: '/mine/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/mine/doctorInfo',
      name: 'doctorInfo',
      component: doctorInfo
    },
    {
      path: '/mine/editInfo',
      name: 'editInfo',
      component: editInfo
    },
    {
      path: '/mine/wallet',
      name: 'wallet',
      component: wallet
    },
    {
      path: '/mine/withdraw',
      name: 'withdraw',
      component: withdraw
    },
    {
      path: '/mine/withdrawResult',
      name: 'withdrawResult',
      component: withdrawResult
    },
    {
      path: '/mine/consultingService',
      name: 'consultingService',
      component: consultingService
    }
  ]
});

export default router;
