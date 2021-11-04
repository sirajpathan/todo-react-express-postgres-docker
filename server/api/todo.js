'use strict';
var express = require('express');
var router = express.Router();
const pgp = require('pg-promise')();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = pgp(process.env[config.use_env_variable]);


router.get('/api/task', function(req, res) {
  db.query('SELECT t.id as id, t.title as main_title, array_agg(st.title) as titles, array_agg(st.status) as substatus , array_agg(st.id) as subid FROM task as t left join subtask as st on t.id = st.task_id group by main_title, t.id')
    .then(function(data) {
      setTimeout(() => res.send(JSON.stringify(data)), 0);
    })
    .catch(function(error) {
      res.status(404).send(error);
    });
});

router.post('/api/task', function(req, res) {
  db.query('insert into task (title, status, created_at) values($1, false, $2) RETURNING id',
   [req.body.title, new Date()])
    .then(function(data) {console.log(data);
      res.send(data);
    })
    .catch(function(error) {
      res.status(404).send(error);
    });
});

router.post('/api/task/:id/subtask', function(req, res) {
  db.query('insert into subtask (title, status, created_at, task_id) values($1, false, $2, $3) RETURNING id',
   [req.body.title, new Date(), req.params.id])
    .then(function(data) {
      res.send(data);
    })
    .catch(function(error) {
      res.status(404).send(error);
    });
});

router.patch('/api/task/:id/subtask/:subtaskId', function(req, res) {
  db.none('UPDATE subtask SET status=$2 WHERE id=$1', [req.params.subtaskId, req.body.status])
    .then(function() {
      res.status(204).send();
    })
    .catch(function(error) {
      res.status(409).send(error);
    });
});

module.exports = router;
