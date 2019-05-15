var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const Persona = require('./models/Persona');
const db = require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

db.connect();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/personas',(req,res)=>{
  Persona.create({
    nombre:req.body.nombre,
    apellidos:req.body.apellidos,
    edad:req.body.edad
  })
    .then(doc=>{
      res.json(doc)
    }).catch(err=>{
      console.log(err);
    })
});
app.get('/personas',(req,res)=>{
  Persona.find({})
    .then(doc=>{
      res.json(doc)
    }).catch(err=>{
      console.log(err);
    })
});

app.get('/personas/:id',(req,res)=>{
  Persona.findById(req.params.id)
    .then(doc=>{
      res.json(doc)
    }).catch(err=>{
      console.log(err);
    })

})
app.put('/personas/:id',(req,res)=>{
    Persona.update({'_id':req.params.id},{
    nombre:req.body.nombre,
    apellidos:req.body.apellidos,
    edad:req.body.edad

  })
    .then(doc=>{
      res.json(doc)
    }).catch(err=>{
      console.log(err);
    })

})

app.delete('/personas/:id',(req,res)=>{
  Persona.findOneAndDelete(req.params.id)
    .then(doc=>{
      res.json(doc)
    }).catch(err=>{
      console.log(err);
    })

})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
