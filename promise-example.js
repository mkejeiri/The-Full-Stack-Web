function doAsyncTask(cb) {
  setTimeout(() => {
    console.log("Async Task Calling Callback");
    cb();
  }, 1000);
}

doAsyncTask(() => console.log("Callback Called"));

//A promise is a placeholder for a future value.
let hasError = false;
function doAsyncTask() {
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Async Work Complete");
      if (hasError) {
        reject();
      } else {
        resolve();
      }
    }, 1000);
  });
  return promise;
}

//Callback is Called here through then
doAsyncTask().then(
  () => console.log("Task Complete!"),
  () => console.log("Task Errored!"),
);



//passing values for callback
let hasError = true;
function doAsyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (hasError) {
        reject('error'); // pass values
      } else {
        resolve('done'); // pass values
      }
    }, 1000);
  });
}

doAsyncTask().then(
  (val) => console.log(val),
  (err) => console.error(err)
);

//---------------- handling error properly
'use strict';
// Old way Via callbacks
 function doAsyncTask(cb) {
 setTimeout(() => {
 console.log("Async Task Calling Callback");
 cb();
 }, 1000);
 }
 doAsyncTask(() => console.log("Callback Called"));



// Via Promise
let error = false;
function doAsyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject('error');
      } else {
        resolve('done');
      }
    }, 1000);
  });
}

doAsyncTask().then(
    (val) => console.log(val),
    (err) => console.error(err)
);

//Immediately Resolved Promise
let promise = Promise.resolve('done');
promise.then((val) => console.log(val)); // 'done'

// Handling Errors
Promise.resolve('done')
    .then((val) => {throw new Error("fail")})
    .then((val) => console.log(val))
    .catch((err) => console.error(err));

