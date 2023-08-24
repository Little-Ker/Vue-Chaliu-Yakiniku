import Mock from 'mockjs'

function getRandom(x) {
  return Math.floor(Math.random() * x)
}

const viviData = {
  name: 'Vivi',
  cellphone: '09123456789',
  email: 'vivi123@gmail.com',
  pwd: '123',
  MID: 'vivi',
  acc: 'vivi',
}

// 生成假資料
const data = Mock.mock({
  'memberList|1-10': [{
    name: '@first',
    cellphone: '09123456789',
    email: '@email',
    pwd: '@string',
    MID: '@first',
    acc: '@string',
  }],
})

const memberList = [...data?.memberList]
memberList.push(viviData)
console.log('memberList', memberList)

const data2 = Mock.mock({
  'reseveList|5-25': [{
    'OID|+1': 1,
    'memberData|1': memberList,
    'shopName|1': ['台中朝富店', '台中公益店', '台中中清店', '高雄博愛店'],
    'status|1': ['已取消', '已用餐', '訂位中'],
    'date': '@date()',
    'time|1': ['中午 11:00', '中午 13:00', '下午 15:00', '下午 17:00', '晚上 19:00', '晚上 21:00'],
    'people': getRandom(4) + 1,
    'bookDate': '@date()',
  }],
})


const reseveList = data2.reseveList.map((cur) => {
  return {
    OID: cur.OID,
    MID: cur.memberData.MID,
    memberName: cur.memberData.name,
    cellphone: cur.memberData.cellphone,
    email: cur.memberData.email,
    shopName: cur.shopName,
    status: cur.status,
    date: cur.date,
    time: cur.time,
    people: cur.people,
    bookDate: cur.bookDate,
  }
})

console.log('reseveList', reseveList)


// 驗證會員登入 API
Mock.mock((process.env.VUE_APP_M_LOGIN), 'post', (options) => {
  const payload = JSON.parse(options.body)
  const findMemberData = memberList.find((cur) => {
    return cur.acc === payload?.acc && cur.pwd === payload?.pwd
  })
  const result = {
    status: (findMemberData) ? 'success' : 'error',
    result: [findMemberData],
  }
  return result
}

)

// 驗證註冊會員帳號是否重複 API
Mock.mock((process.env.VUE_APP_M_CHECK_ACC), 'post', (options) => {
  const payload = JSON.parse(options.body)
  const findAccData = memberList.find((cur) => {
    return cur.acc === payload?.acc
  })
  const result = {
    status: (findAccData) ? 'error' : 'success',
    result: null,
  }
  return result
})

// 註冊會員 API
Mock.mock((process.env.VUE_APP_M_REGIST), 'post', (options) => {
  const payload = JSON.parse(options.body)
  memberList.push({
    ...payload,
    MID: payload.acc,
  })
  const result = {
    status: 'success',
    result: null,
  }
  return result
})

// 修改會員密碼 API
Mock.mock((process.env.VUE_APP_M_UPDATE_PWD), 'post', (options) => {
  const payload = JSON.parse(options.body)
  memberList.forEach((cur, index) => {
    if (payload.MID === cur.MID) {
      memberList[index].pwd = payload.newPassword
    }
  })
  const result = {
    status: 'success',
    result: null,
  }
  return result
})

// 修改會員資訊 API
Mock.mock((process.env.VUE_APP_M_UPDATE_INFO), 'post', (options) => {
  const payload = JSON.parse(options.body)
  memberList.forEach((cur, index) => {
    if (payload.MID === cur.MID) {
      memberList[index].name = payload.newName
      memberList[index].cellphone = payload.newCellphone
      memberList[index].email = payload.newEmail
    }
  })
  const result = {
    status: 'success',
    result: null,
  }
  return result
})

// 取得指定會員訂單資訊 API
Mock.mock((process.env.VUE_APP_M_SHOW_ORDER_INFO), 'post', (options) => {
  const payload = JSON.parse(options.body)
  const memberReserveList = reseveList.filter((cur) => {
    return cur.MID === payload.MID
  })
  const result = {
    status: 'success',
    result: memberReserveList,
  }
  return result
})

// 會員新增訂單 API
Mock.mock((process.env.VUE_APP_M_ADD_ORDER), 'post', (options) => {
  const payload = JSON.parse(options.body)
  const reserve = {
    OID: reseveList.length,
    MID: payload.MID,
    memberName: payload.memberName,
    cellphone: payload.cellphone,
    email: payload.email,
    shopName: payload.shopName,
    status: payload.status,
    date: payload.date,
    time: payload.time,
    people: payload.people,
    bookDate: payload.bookDate,
  }
  reseveList.push(reserve)
  const result = {
    status: 'success',
    result: reseveList,
  }
  return result
})

// 更改訂單狀態 API
Mock.mock((process.env.VUE_APP_UPDATE_ORDER_STATUS), 'post', (options) => {
  const payload = JSON.parse(options.body)
  reseveList.forEach((cur, index) => {
    if (cur.OID === payload.OID) {
      reseveList[index].status = payload.newStatus
    }
  })
  const result = {
    status: 'success',
    result: reseveList,
  }
  return result
})

// 驗證管理員登入 API
Mock.mock((process.env.VUE_APP_A_LOGIN), 'post', (options) => {
  const payload = JSON.parse(options.body)
  const isLogin = ((payload.acc === 'abc') && (payload.pwd === '123'))
  const result = {
    status: (isLogin) ? 'success' : 'error',
    result: null,
  }
  return result
})

// 取得所有分店訂單 API
Mock.mock((process.env.VUE_APP_A_SHOW_SHOP_ORDER_INFO), 'post', (options) => {
  const result = {
    status: 'success',
    result: reseveList || [],
  }
  return result
})

// 刪除訂單 API
Mock.mock((process.env.VUE_APP_A_DELETE_ORDER), 'post', (options) => {
  const payload = JSON.parse(options.body)
  let deleteOrderIndex = null
  reseveList.forEach((cur, index) => {
    if (cur.OID === payload.OID) {
      deleteOrderIndex = index
    }
  })
  reseveList.splice(deleteOrderIndex, 1)
  const result = {
    status: 'success',
    result: reseveList,
  }
  return result
})

// 取得所有會員資訊 API
Mock.mock((process.env.VUE_APP_A_SHOW_MEMBER_INFO), 'post', (options) => {
  const result = {
    status: 'success',
    result: memberList,
  }
  return result
})