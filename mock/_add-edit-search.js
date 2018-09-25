var router = require('express').Router()
var json = require('./_utils.js')

json(router, '/search', {
  "code": 200,
  "data": {
    items: [
      {
        id: 1,
        name: 'zzz',
        age: 11,
        phone: '234234234',
        email: '23423423@fe.com',
      },
      {
        id: 1,
        name: 'zzz',
        age: 11,
        phone: '234234234',
        email: '23423423@fe.com',
      },
      {
        id: 1,
        name: 'zzz',
        age: 11,
        phone: '234234234',
        email: '23423423@fe.com',
      },
      {
        id: 1,
        name: 'zzz',
        age: 11,
        phone: '234234234',
        email: '23423423@fe.com',
      },
      {
        id: 1,
        name: 'zzz',
        age: 11,
        phone: '234234234',
        email: '23423423@fe.com',
      },
    ],
    total: 300
  },
  "msg": "OK",
  "success": true
})

json(router, '/delete', {
  "code": 200,
  "msg": "OK",
  "success": true
})

json(router, '/add', {
  "code": 200,
  "msg": "OK",
  "data": {
    id: 1
  },
  "success": true
})

json(router, '/update', {
  "code": 200,
  "msg": "OK",
  "success": true
})

module.exports = router
