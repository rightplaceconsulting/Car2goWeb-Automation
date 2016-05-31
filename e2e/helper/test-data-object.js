/**
 * This file contanis testData Object for all testData used in speces
 *
 * @author sheraz
 */
var dataProvider = require('./data-provider.js');

var testDataObject = function () {

  var loginTestDataPath='../car2goweb/e2e/testData/login.json';
  var userRegistrationTestDataPath='../car2goweb/e2e/testData/user-registration.json';


 this.loginDataObj= function(){
        return dataProvider.readDataProvider(loginTestDataPath ,browser.env,'login');
  }

  this.loginInvaidDataObj= function(){
          return dataProvider.readDataProvider(loginTestDataPath ,'qa','loginInvalid');
    }

  this.userRegistrationDataObj=function(){
        return dataProvider.readDataProvider(userRegistrationTestDataPath, browser.env,'userInfo');
  }
};
module.exports = new testDataObject();