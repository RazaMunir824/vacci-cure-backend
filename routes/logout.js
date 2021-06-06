const express = require('express')
const router = express.Router()

router.get('/logout' , (req,res) => {
    res.send('Logout')
})

module.exports = router