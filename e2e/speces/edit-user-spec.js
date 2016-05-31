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
       * This Test case used to search the created user in userList.
       *
       * @author sheraz
       */
    it('Should search the created user in User List', function () {
         var dataProviderObj= dataProvider.readDataProvider("../car2goweb/e2e/testData/user-registration.json", browser.env,'userInfo');
         userBase.searchCreatedUserInList(dataProviderObj.createdUserEmail);
         utilityObj.browserWaitforseconds(3);
         expect(userBase.returnCreatedUserInListByEmail()).toContain(dataProviderObj.createdUserEmail);
         expect(userBase.returnCreatedUserInListByFirstName()).toContain(dataProviderObj.firstName);
         expect(userBase.returnCreatedUserInListByLastName()).toContain(dataProviderObj.lastName);
        });
	
      /**
       * This Test case used to edit the newly created user.
       *
       * @author sheraz
       */
     it('Should edit new user in car2goweb ', function () {
       // var dataProviderObj= dataProvider.readDataProvider("../car2goweb/e2e/testData/user-registration.json", browser.env,'userInfo');
        
         element.all(by.xpath(".//*[@id='pcont']/div[2]/div/table/tbody/tr[2]/td[2]/span")).click(),		                       
		 utilityObj.browserWaitforseconds(2);		 
		 element.all(by.xpath(".//*[@id='pcont']/div[2]/div/div/div/div/form/div[1]/a[1]")).click(),
		 
		 element(by.id("userLastName")).clear();
		 element(by.id("userLastName")).sendKeys("QA Edited");

		 element.all(by.xpath("//input[@type='password']")).clear();
		 element.all(by.xpath("//input[@type='password']")).sendKeys("password");
		 
		 element.all(by.id("confirmPassword")).clear();
		 element.all(by.id("confirmPassword")).sendKeys("password");
		 
		 utilityObj.browserWaitforseconds(2);
		 element.all(by.xpath(".//*[@id='pcont']/div[2]/div/div/div/div/form/div[3]/a[2]")).click(),
		              
		 utilityObj.browserWaitforseconds(2);             
     userBase.isSucessMessagePresent().then(function(text){
     expect(text).toEqual(true)
     logger.info("User updated Successfully with Email::",userEmail);
      
      })         
        
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
