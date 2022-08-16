const {log} = require('utils-nxg-cg');
const {email,objecteMailOpt,objecteMailReq} = require('email-cg-lib');
const express = require('express');

const { request } = require('express');

const app = express();
app.use(express.json());

app.post('/', async(req, res)=>{
  let properties = {...objecteMailReq};  
  properties.host = req.body.host;
  properties.port = req.body.port;
  properties.secure = req.body.secure;
  properties.user = req.body.user;
  properties.pass = req.body.pass;
  properties.from = req.body.from;
  properties.to = req.body.to;
  properties.subject = req.body.subject;
  properties.text = req.body.text;
  
    try{
      const result = await email({data:properties},{});
      log.info("resultado", result);
      res.json(result);
    }
  
    catch(err){
      res.status(500).json(err);
    }
  })

  app.listen(3000, ()=>{
    console.log("Server ejecutandose en el puerto 3000");
  });