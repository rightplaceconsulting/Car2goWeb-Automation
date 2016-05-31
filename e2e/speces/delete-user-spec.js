describe('Car2goweb application:', function () {
	 var loginBase = require('../base/login-base.js');
	 var utilityObj = require('../helper/utility.js');
	 var customLogger = require('../helper/custom-logger.js');
     var logger = customLogger.logger("login Spec");
	 var userBase = require('../base/user-base.js');
	 var testDataObj = require('../helper/test-data-object.js');
	 var dataProvider = require('../helper/data-provider.js');
	 var createdUserEmail="";

	 
	 
    beforeEach(function () {
    });
      beforeAll(function () {
		logger.info("Executing script on:", "'"+browser.env+"'"+" environment"+" and " +"'"+browser.name+"'"+" browser" )
    });

    /**
     * This Test case used to navigate to car2goweb application and asserts Login sections.
     *
     * @author sheraz
     */
    it('Navigate to car2goweb ', function () {
		var dataProviderObj = testDataObj.loginDataObj();
		utilityObj.getUrl(dataProviderObj.url);
		loginBase.isLoginSectionPresent().then(function(text){
			expect(text).toEqual(true);
			logger.info("Successfully Navigated to home page of car2goweb");
		})       
    });

	 /**
     * This Test case used to login to car2goweb application ans asserts user Magmt pageHeader text.
     *
     * @author sheraz
     */
    it('Login to car2goweb ', function () {
		var dataProviderObj = testDataObj.loginDataObj();
        logger.info("Performing login to car2goweb application");
		loginBase.car2goweblogin(dataProviderObj);
		loginBase.returnUserMagmtPageHeader().getText().then(function(text){
			expect(text).toEqual(dataProviderObj.usePageHeader)
		    logger.info("login successful with userName::"+"'"+dataProviderObj.userloginId+" , password:: "+"'"+dataProviderObj.password+"'")			
		})   
    });


    /**
       * This Test case used to verify created user in userList.
       *
       * @author sheraz
       */
    it('Should verify created user in User List', function () {
         var dataProviderObj= dataProvider.readDataProvider("../car2goweb/e2e/testData/user-registration.json", browser.env,'userInfo');
         userBase.searchCreatedUserInList(dataProviderObj.createdUserEmail);
         utilityObj.browserWaitforseconds(3);
         expect(userBase.returnCreatedUserInListByEmail()).toContain(dataProviderObj.createdUserEmail);
         expect(userBase.returnCreatedUserInListByFirstName()).toContain(dataProviderObj.firstName);
         expect(userBase.returnCreatedUserInListByLastName()).toContain(dataProviderObj.lastName);
        });

      /**
       * This Test case used to Delete created user by email.
       *
       * @author sheraz
       */
    it('Should delete created user from UserList page ', function () {
          var dataProviderObj= dataProvider.readDataProvider("../car2goweb/e2e/testData/user-registration.json", browser.env,'userInfo');
          utilityObj.browserWaitforseconds(2);
          userBase.searchAndDeleteUser(dataProviderObj.createdUserEmail);
        expect(userBase.userListRecordCount()).toBeLessThan(2);
          });

    /**
      * This Test case used to verify available columns in userList.
      *
      * @author sheraz
      */
    it('Should verify available columns in UserList page ', function () {
         logger.info("Verifying all available columns in userList page")
         utilityObj.browserWaitforseconds(2);
         expect(userBase.returnUserListColumns()).toContain("Email Address,First Name,Last Name,Roles,Status,Last Login");
        });

     /**
      * This Test case used to logout from car2goweb application ans asserts loginButton Present or not.
      *
      * @author sheraz
      */
    it('Should Logout from car2goweb ', function () {
        loginBase.car2goweblogout();
        utilityObj.browserWaitforseconds(2);
        loginBase.isLoginBtnPresent().then(function(text){
            expect(text).toEqual(true);
             logger.info("Logout successful from car2goweb application");
        })
    });
});
