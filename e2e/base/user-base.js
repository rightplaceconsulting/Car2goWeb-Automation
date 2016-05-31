/**
 * This file contains the function that are used to create/edit/delete user in car2goweb.
 *
 * @author sheraz
 */

var userBase = function() { 
   var userPO = require('../pageObject/user-po.js');
   var customLogger = require('../helper/custom-logger.js');
   var utilityObj = require('../helper/utility');
   var logger = customLogger.logger("login Base");
   var dataProvider = require('../helper/data-provider.js');

   /**
    * This function used to navigate to create new user Page.
    *
    * @author sheraz
    */
   this.navigateToCreateUserPage=function(){
	   userPO.userMgmtPageHeader.isPresent().then(function(){
	   userPO.createNewUserBtn.click();
	   })
   }

   /**
   * This function used to enter userInfo for creating new user.
   *
   * @author sheraz
   */
   this.enterNewUserInfo=function(dataProviderObj,userEmail){
        userPO.newUserPageHeader.isPresent().then(function(){
        utilityObj.browserWait(userPO.firstNameTxtBx,"userPO.firstNameTxtBx");
        userPO.firstNameTxtBx.clear().sendKeys(dataProviderObj.firstName);
        utilityObj.browserWait(userPO.lastNameTxtBx,"userPO.lastNameTxtBx");
        userPO.lastNameTxtBx.clear().sendKeys(dataProviderObj.lastName);
        utilityObj.browserWait(userPO.emailAddressTxtBx,"userPO.emailAddressTxtBx");
        userPO.emailAddressTxtBx.clear().sendKeys(userEmail);
        userPO.passwordTxtBox.clear().sendKeys(dataProviderObj.password);
        utilityObj.selectDropDownOptions(userPO.newUserPageHeader,userPO.userStatusDropDown,userPO.userStatusOptions,dataProviderObj.userStatus);
        utilityObj.selectDropDownOptions(userPO.newUserPageHeader,userPO.userRoleDropdown,userPO.userRoleOptions,dataProviderObj.userRole);
        utilityObj.selectDropDownOptions(userPO.newUserPageHeader,userPO.selectLocationDropDown,userPO.locationOptions,dataProviderObj.location);
        utilityObj.selectDropDownOptions(userPO.newUserPageHeader,userPO.homeLocationDropDown,userPO.homeLocationOptions,dataProviderObj.location);
        utilityObj.browserWaitforseconds(2);
        dataProvider.writeDataProvider("../car2goweb/e2e/testData/user-registration.json",browser.env,"userInfo","createdUserEmail",userEmail);
        })
   }

   /**
   * This function used to click on create user button.
   *
   * @author sheraz
   */
   this.clickCreateUserBtn=function(){
        userPO.newUserPageHeader.isPresent().then(function(){
          utilityObj.browserWait(userPO.createUserButton,"userPO.createUserButton");
          userPO.createUserButton.click();
        })
   }

    /**
     * This function used to check wheather success message present or not.
     *
     * @author sheraz
     */
   this.isSucessMessagePresent=function(){
        return userPO.userSuccessMessage.isPresent();
   }

   /**
    * This function used to return pageHeader Text.
    *
    * @author sheraz
    */
   this.newUserPageHeaderText=function(){
        return userPO.newUserPageHeader.getText();
   }
   /**
   * This function used to search user by Email
   *
   * @author sheraz
   */
   this.searchCreatedUserInList=function(userEmail){
   // userPO.userMgmtPageHeader.isPresent().then(function(){
       userPO.userSearchBox.clear().sendKeys(userEmail);
       userPO.userSearchBtn.click();
     //   });
   }

 /**
  * This function used to delete user by Email
  *
  * @author sheraz
  */
   this.searchAndDeleteUser=function(userEmail){
    userPO.userMgmtPageHeader.isPresent().then(function(){
         logger.info("Deleting user with user Email::",userEmail)
          utilityObj.browserWait(userPO.userSearchBtn,"userPO.userSearchBtn");
          userPO.userSearchBtn.click();
          utilityObj.browserWait(userPO.userCheckBox,"userPO.userCheckBox");
          utilityObj.browserWaitforseconds(1);
          userPO.userCheckBox.click();
          utilityObj.browserWait(userPO.deleteUserBtn,"userPO.deleteUserBtn");
          utilityObj.browserWaitforseconds(1);
          userPO.deleteUserBtn.click();
          utilityObj.browserWait(userPO.userSearchBox,"userPO.confirmDeleteBtn");
          utilityObj.browserWaitforseconds(1);
          userPO.confirmDeleteBtn.click();
          utilityObj.browserWaitforseconds(1);
           });
   }

   this.isUserMgmtPageHeaderPresent=function(){
       return  userPO.userMgmtPageHeader.isPresent();
   }

   this.userListRecordCount=function(){
      return userPO.userListRecordCount.count();
   }
    /**
     * This function used to return user emailList for userList
     *
     * @author sheraz
     */
   this.returnCreatedUserInListByEmail=function(userEmail){
       return userPO.userEmailList.reduce(function(acc, elem) {
                 return elem.getText().then(function(text) {
                   return acc + text + ',';
                 });
               }, '');
   }

   /**
    * This function used to return user FirstName List for userList
    *
    * @author sheraz
    */
   this.returnCreatedUserInListByFirstName=function(firstName){
      return userPO.userFirstNameList.reduce(function(acc, elem) {
                return elem.getText().then(function(text) {
                  return acc + text + ',';
                });
              }, '');
   }

   /**
   * This function used to return user LastName List for userList
   *
   * @author sheraz
   */
   this.returnCreatedUserInListByLastName=function(lastName){
      return userPO.userLastName.reduce(function(acc, elem) {
               return elem.getText().then(function(text) {
                 return acc + text + ',';
               });
             }, '');
  }

   /**
  * This function used to return user userColumn List for userList
  *
  * @author sheraz
  */
   this.returnUserListColumns=function(){
       return columnList= userPO.userListColumns.reduce(function(acc, elem) {
             return elem.getText().then(function(text) {
               return acc + text + ',';
             });
           }, '');
   }

};
module.exports = new userBase();