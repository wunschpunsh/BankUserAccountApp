import {rewriteAcc} from './transfer.js';
import {renderUserTransactions} from './transaction.js';
import {createGreeting} from './util.js';
import {deleteAcc, signIn, createLogoutTimer} from './account.js';
import {createRenderSetting} from './transaction.js';
import {requestLoan} from './loan.js';
import {sortTransactions} from './sort.js';

// User entry
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const btnLogin = document.querySelector('.login__btn');
const welcome = document.querySelector('.welcome');

let currentLogoutTimer;

// Balance transactions

const renderPersonalAccount = () => {
  btnLogin.addEventListener('click', (evt) => {
    evt.preventDefault();
    const login = inputLoginUsername.value;
    const pin = +inputLoginPin.value;
    const userAccount = signIn(login, pin);

    if (userAccount) {
      createRenderSetting();
      renderUserTransactions(userAccount);
      createGreeting(userAccount.userName, welcome);
      rewriteAcc(userAccount);
      deleteAcc(userAccount);
      requestLoan(userAccount);
      sortTransactions(userAccount);
      if (currentLogoutTimer) clearInterval(currentLogoutTimer);

      // Update timer
      document.documentElement.addEventListener('mousemove', () => {
        clearInterval(currentLogoutTimer);
        currentLogoutTimer = createLogoutTimer();
      });
    } else {
      alert('Неправильные данные');
    }
  });
};

export {renderPersonalAccount, renderUserTransactions};
