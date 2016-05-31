/**
 * This file contains the function that are used to login to car2goweb.
 *
 * @author sheraz
 */

var loginBase = function() { 
   var loginPO = require('../pageObject/login-po.js');
   var customLogger = require('../helper/custom-logger.js');
   var utilityObj = require('../helper/utility');
   var logger = customLogger.logger("login Base");

   /**
        * This function used to check whether loginSectionHeader present or not.
        *
        * @author sheraz
        */
   this.isLoginSectionPresent=function(){
	  return loginPO.loginSectionHeader.isPresent();
   }

    /**
        * This function used to login to car2goweb application
        *
        * @param dataProviderObj
        * @author sheraz
        */
    this.car2goweblogin=function(dataProviderObj){
		loginPO.loginSectionHeader.isPresent().then(function(){
	    logger.info("Perfroming login with userName::"+"'"+dataProviderObj.userloginId+" , password:: "+"'"+dataProviderObj.password+"'")		
		utilityObj.browserWait(loginPO.userName,"loginPO.userName");
		loginPO.userName.clear().sendKeys(dataProviderObj.userloginId);
		utilityObj.browserWait(loginPO.userPassword,"loginPO.userPassword");
		loginPO.userPassword.clear().sendKeys(dataProviderObj.password);
		utilityObj.browserWait(loginPO.loginButton,"loginPO.loginButton");
		loginPO.loginButton.click();
		})
	}

    /**
        * This function used to logout from car2goweb application
        *
        * @param dataProviderObj
        * @author sheraz
        */
	this.car2goweblogout=function(){
	    loginPO.settingMenu.isPresent().then(function(){
	    logger.info("Performing logout from car2web application");
	    utilityObj.browserWait(loginPO.settingMenu,"loginPO.settingMenu");
	    loginPO.settingMenu.click();
	    utilityObj.browserWaitforseconds(2);
	    utilityObj.browserWait(loginPO.logout,"loginPO.logout");
	    loginPO.logout.click();
	    utilityObj.browserWait(loginPO.returnToLoginBtn,"loginPO.returnToLoginBtn");
	    loginPO.returnToLoginBtn.click();
	    })
	 }

    /**
        * This function used to check whether LoginBtn  present or not.
        *
        * @author sheraz
        */
	this.isLoginBtnPresent=function(){
	    return loginPO.loginButton.isPresent();
	 }

	/**
         * This function used to return UserMgmt PageHeader.
         *
         * @author sheraz
         */
	this.returnUserMagmtPageHeader=function(){
		 return loginPO.userMgmtPageHeader.getText();
	}

	 /**
        * This function used to check whether validationMdg  present or not.
        *
        * @author sheraz
        */
	this.isValidationMessagePresent=function(){
	     return loginPO.validationMsg.isPresent();
	}
};
module.exports = new loginBase();