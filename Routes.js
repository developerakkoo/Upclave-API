const express = require("express");


const router = express.Router();

router.get('/api/user-details/:id', (req, res, next) =>{
    let userId = req.params.id;
     
    get(child(userRef, `users/${userId}`))
    .then((user) => {
      if(user.exists()){
        console.log(user.val());
        res.status(200).json({
          status: "success",
          user
        })
      }else{
        console.log("No user");
      }
    }).catch(err =>{
      res.status(404).json({
        status: "Failure",
        err
      })
    })
})

module.exports = router;