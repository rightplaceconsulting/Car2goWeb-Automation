describe('Car2goweb application:', function () {
	 var loginBase = require('../base/login-base.js');
	 var utilityObj = require('../helper/utility.js');
	 var customLogger = require('../helper/custom-logger.js');
     var logger = customLogger.logger("login Spec");
	 var dataProvider = require('../helper/data-provider.js');
	 var testDataObj = require('../helper/test-data-object.js');
	 var using = require('jasmine-data-provider');


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
    it('Should Navigate to car2goweb ', function () {
		var dataProviderObj = testDataObj.loginDataObj();
		utilityObj.getUrl(dataProviderObj.url);
		loginBase.isLoginSectionPresent().then(function(text){
			expect(text).toEqual(true);
			logger.info("Successfully Navigated to home page of car2goweb");
		})       
    });

    /**
     * This Test case used to login to car2goweb application and asserts validation message.
     *
     * @author sheraz
     */
    using(testDataObj.loginInvaidDataObj, function (dataProviderObj) {
    it('Should perform Login to car2goweb with Invalid credentials', function () {
        logger.info("Performing login to car2goweb application");
        loginBase.car2goweblogin(dataProviderObj);
        loginBase.isLoginBtnPresent().then(function(text){
            expect(text).toEqual(true)
            logger.info("Invalid credentials execution done for::"+"'"+dataProviderObj.userloginId+" , password:: "+"'"+dataProviderObj.password+"'")
        })
    });
   });

    /**
     * This Test case used to login to car2goweb application and asserts user Magmt pageHeader text.
     *
     * @author sheraz
     */
    it('Should Login to car2goweb ', function () {
		var dataProviderObj = testDataObj.loginDataObj();
        logger.info("Performing login to car2goweb application");
		loginBase.car2goweblogin(dataProviderObj);
		loginBase.returnUserMagmtPageHeader().getText().then(function(text){
			expect(text).toEqual(dataProviderObj.usePageHeader)
		    logger.info("login successful with userName::"+"'"+dataProviderObj.userloginId+" , password:: "+"'"+dataProviderObj.password+"'")			
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
