const express = require('express')
const router = express.Router()

// router.get('/logout' , (req,res) => {
//     res.send('Logout')
// })

router.get('/logout', function(req, res) {
    req.logout();
    if (!req.session) {
      req.session.destroy(function(err) {
        res.redirect('/login');
      });
    }
    else {
      res.redirect('/login');
    }
});

module.exports = router

