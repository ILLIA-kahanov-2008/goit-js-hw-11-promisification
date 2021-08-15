// Задание 1
// Напиши функцию delay(ms), которая возвращает промис, переходящий в состояние "resolved" через ms миллисекунд. Значением исполнившегося промиса должно быть то кол-во миллисекунд которое передали во время вызова функции delay.

const delay = (ms) => {
  return new Promise((resolved) => {
    setTimeout(() => {
      return resolved(ms);
    }, ms);
  });
};

const logger = (time) => console.log("Task #1:", `Resolved after ${time}ms`);

// Вызовы функции для проверки
delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms

// Задание 2
// Перепиши функцию toggleUserState() так, чтобы она не использовала callback-функцию callback, а принимала всего два параметра allUsers и userName и возвращала промис.

console.log("Task #2");

const users = [
  { name: "Mango", active: true },
  { name: "Poly", active: false },
  { name: "Ajax", active: true },
  { name: "Lux", active: false },
];

const toggleUserState = (allUsers, userName) => {
  return new Promise((resolve) => {
    return resolve(
      allUsers.map((user) =>
        user.name === userName ? { ...user, active: !user.active } : user,
      ),
    );
  });
};

const logger2 = (updatedUsers) => console.table(updatedUsers);

toggleUserState(users, "Mango").then(logger2);
toggleUserState(users, "Lux").then(logger2);

// const toggleUserState = (allUsers, userName) => {
//   const updatedUsers = allUsers.map(user =>
//     user.name === userName ? { ...user, active: !user.active } : user,
//   );
//     return Promise.resolve(updatedUsers);
// };

// /*
//  * Должно работать так
//  */
// toggleUserState(users, 'Mango').then(resp => console.table(resp));
// toggleUserState(users, 'Lux').then(resp => console.table(resp));

// Задание 3
// Перепиши функцию makeTransaction() так, чтобы она не использовала callback-функции onSuccess и onError, а принимала всего один параметр transaction и возвращала промис.

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
  const delay = randomIntegerFromInterval(200, 500);
  return new Promise((resolved, rejected) => {
    setTimeout(() => {
      const canProcess = Math.random() > 0.3;

      if (canProcess) {
        resolved({ id: transaction.id, time: delay });
      } else {
        rejected(transaction.id);
      }
    }, delay);
  });
};

const logSuccess = ({ id, time }) => {
  console.log("Task #3", `Transaction ${id} processed in ${time}ms`);
};

const logError = (id) => {
  console.warn(
    "Task #3",
    `Error processing transaction ${id}. Please try again later.`,
  );
};

/*
 * Должно работать так
 */
makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);

makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);

makeTransaction({ id: 72, amount: 75 }).then(logSuccess).catch(logError);

makeTransaction({ id: 73, amount: 100 }).then(logSuccess).catch(logError);
