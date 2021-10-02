const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

var serviceAccount = require("../chatbot-nodejs-13e5f-firebase-adminsdk-dvur0-2e57522ede.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://chatbot-nodejs-13e5f-default-rtdb.firebaseio.com/'
});

const db=admin.database();

router.get('/', (req, res)=>{ //node sabe donde esta views
    res.render('index.ejs',{
        title:'Chatbot',
        index:'seleccionado',
        tc:'',
        contactanos:'',
        test: ''
    });
  });

  router.get('/contact', (req, res)=>{ //node sabe donde esta views
    res.render('contact.ejs',{
        title:'Contacto',
        index:'',
        tc:'',
        contactanos:'seleccionado',
        test: ''
    });
  });

  router.get('/tc', (req, res)=>{ //node sabe donde esta views
    res.render('tc.ejs',{
        title:'T&C',
        index:'',
        tc:'seleccionado',
        contactanos:'',
        test:''
    });
  });
  router.get('/test', (req, res)=>{ //node sabe donde esta views
   //consulta a la db
    db.ref('test').once('value', (snapshot) =>{
       const data = snapshot.val();
       console.log(data)
       console.log(snapshot.val())

       res.render('test.ejs',{
           title:'Ti',
           index:'seleccionado',
           tc:'',
           contactanos:'',
           test: 'seleccionado',
           contactos : data
       });
    });
   
  });

  router.post('/base', (req, res)=>{
    console.log(req.body);
    const newcontact = {
      nombre: req.body.name,
      apellido: req.body.lasname,
      extra: req.body.extra,
      
    }
    //insert en la db
    db.ref('contactos').push(newcontact);
    db.ref('contactos').once('value', (snapshot) =>{
      const data = snapshot.val();
      console.log(data)
      console.log(snapshot.val())

      res.render('test.ejs',{
          title:'Ti',
          index:'seleccionado',
          tc:'',
          contactanos:'',
          contactos : data
      });
   });
  });

  router.get('/delete/:id', (req, res)=>{ //node sabe donde esta views
db.ref('contactos/' + req.params.id).remove();
db.ref('contactos').once('value', (snapshot) =>{
  const data = snapshot.val();
  console.log(data)
  console.log(snapshot.val())

  res.render('test.ejs',{
      title:'Ti',
      index:'seleccionado',
      tc:'',
      contactanos:'',
      contactos : data
  });
});
  });

  module.exports = router;
