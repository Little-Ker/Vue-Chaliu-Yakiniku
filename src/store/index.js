import {
  createStore 
} from 'vuex'

export default createStore({
  state: {
    isShowLoading: 1,
    isChangePageAnim: false,
    isFirstEnterWeb: true,
    // 登入
    isShowLogin: false,
    isLoginSuccess: false,
    isShowNotice: false,
    isShowCheckNotice: false,
    noticeText: '',
    isShowRegister: false,
    // 會員資料
    memberName: null,
    memberCellphone: null,
    memberEmail: null,
    memberPassword: null,
    memberId: null,
    // 管理員資料
    isAdiminsLogin: false,
    // 現在時刻
    nowTime: 0,
    // 預約單狀態
    orderLevel: 1,
    // 預約單資訊
    chooseReserveDateData: {
      dateData: '',
      date: '',
      day: '',
    },
    chooseReserveTimeData: '',
    orderMessage: {
      shop: '',
      people: '',
      dateData: '',
      date: '',
      day: '',
      time: '',
    },
  },
  actions: {
    updateIsShowLoading(context, isShowLoading) {
      context.commit('SetIsShowLoading', isShowLoading)
    },
    updateIsChangePageAnim(context, isChangePageAnim) {
      context.commit('SetIsChangePageAnim', isChangePageAnim)
    },
    updateIsFirstEnterWeb(context, isFirstEnterWeb) {
      context.commit('SetIsFirstEnterWeb', isFirstEnterWeb)
    },
    updateIsShowLogin(context, isShowLogin) {
      context.commit('SetIsShowLogin', isShowLogin)
    },
    updateIsLoginSuccess(context, isLoginSuccess) {
      context.commit('SetIsLoginSuccess', isLoginSuccess)
    },
    updateIsShowNotice(context, isShowNotice) {
      context.commit('SetIsShowNotice', isShowNotice)
    },
    updateNoticeText(context, noticeText) {
      context.commit('SetNoticeText', noticeText)
    },
    updateIsShowCheckNotice(context, isShowCheckNotice) {
      context.commit('SetIsShowCheckNotice', isShowCheckNotice)
    },
    updateIsShowRegister(context, isShowRegister) {
      context.commit('SetIsShowRegister', isShowRegister)
    },
    // 會員資料
    updateMemberName(context, memberName) {
      context.commit('SetMemberName', memberName)
    },
    updateMemberCellphone(context, memberCellphone) {
      context.commit('SetMemberCellphone', memberCellphone)
    },
    updateMemberEmail(context, memberEmail) {
      context.commit('SetMemberEmail', memberEmail)
    },
    updateMemberPassword(context, memberPassword) {
      context.commit('SetMemberPassword', memberPassword)
    },
    updateMemberId(context, memberId) {
      context.commit('SetMemberId', memberId)
    },
    // 管理員資料
    updateIsAdiminsLogin(context, isAdiminsLogin) {
      context.commit('SetIsAdiminsLogin', isAdiminsLogin)
    },
    // 現在時刻
    updateNowTime(context, nowTime) {
      context.commit('SetNowTime', nowTime)
    },
    // 預約單狀態
    updateOrderLevel(context, orderLevel) {
      context.commit('SetOrderLevel', orderLevel)
    },
    // 預約單資訊
    updateChooseReserveDateData(context, chooseReserveDateData) {
      context.commit('SetChooseReserveDateData', chooseReserveDateData)
    },
    updateChooseReserveTimeData(context, chooseReserveTimeData) {
      context.commit('SetChooseReserveTimeData', chooseReserveTimeData)
    },
    updateOrderMessage(context, orderMessage) {
      context.commit('SetOrderMessage', orderMessage)
    },
  },
  // 改state資料
  mutations: {
    SetIsShowLoading(state, isShowLoading) {
      state.isShowLoading = isShowLoading
    },
    SetIsChangePageAnim(state, isChangePageAnim) {
      state.isChangePageAnim = isChangePageAnim
    },
    SetIsFirstEnterWeb(state, isFirstEnterWeb) {
      state.isFirstEnterWeb = isFirstEnterWeb
    },
    SetIsShowLogin(state, isShowLogin) {
      state.isShowLogin = isShowLogin
    },
    SetIsLoginSuccess(state, isLoginSuccess) {
      state.isLoginSuccess = isLoginSuccess
    },
    SetIsShowNotice(state, isShowNotice) {
      state.isShowNotice = isShowNotice
    },
    SetNoticeText(state, noticeText) {
      state.noticeText = noticeText
    },
    SetIsShowCheckNotice(state, isShowCheckNotice) {
      state.isShowCheckNotice = isShowCheckNotice
    },
    SetIsShowRegister(state, isShowRegister) {
      state.isShowRegister = isShowRegister
    },
    // 會員資料
    SetMemberName(state, memberName) {
      state.memberName = memberName
    },
    SetMemberCellphone(state, memberCellphone) {
      state.memberCellphone = memberCellphone
    },
    SetMemberEmail(state, memberEmail) {
      state.memberEmail = memberEmail
    },
    SetMemberPassword(state, memberPassword) {
      state.memberPassword = memberPassword
    },
    SetMemberId(state, memberId) {
      state.memberId = memberId
    },
    // 管理員資料
    SetIsAdiminsLogin(state, isAdiminsLogin) {
      state.isAdiminsLogin = isAdiminsLogin
    },
    // 現在時刻
    SetNowTime(state, nowTime) {
      state.nowTime = nowTime
    },
    // 預約單狀態
    SetOrderLevel(state, orderLevel) {
      state.orderLevel = orderLevel
    },
    // 預約單資訊
    SetChooseReserveDateData(state, chooseReserveDateData) {
      state.chooseReserveDateData = chooseReserveDateData
    },
    SetChooseReserveTimeData(state, chooseReserveTimeData) {
      state.chooseReserveTimeData = chooseReserveTimeData
    },
    SetOrderMessage(state, orderMessage) {
      state.orderMessage = orderMessage
    },
  },
  modules: {},
})