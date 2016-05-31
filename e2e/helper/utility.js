var utility = function () {
    var customLogger = require('./custom-logger.js');
    var logger = customLogger.logger("utility");

    /**
     * This function is used to hit the url in browser
     *
     * @author sheraz
     * @param url
     */
    this.getUrl = function (url) {
        browser.manage().deleteAllCookies();
        browser.manage().window().maximize();
		logger.info("browser.name::",browser.name)
		if( browser.name=='safari'){
		browser.sleep(10000);}
        browser.get(url);
		if( browser.name=='safari'){
		browser.sleep(9000);
		}
    };
	
	/**
     * This function is used to select dropdown options
     *
     * @author sheraz
     * @param pageHeaderLocator
	 * @param dropDownLocator
	 * @param dropOptionsLocatos
	 * @param filterCondition
     */
	this.selectDropDownOptions=function(pageHeaderLocator,dropDownLocator,dropOptionsLocatos,filterCondition){
		pageHeaderLocator.isDisplayed().then(function(text){
			    browser.sleep(3000);
			    dropDownLocator.click();
				logger.info("Selecting DropDown options With Name:",filterCondition)
		        dropOptionsLocatos.filter(function(elem, index) {
                  return elem.getText().then(function(text) {
                    return text === filterCondition;
               });
               }).first().click();
			})
	}

    /**
     * This method is used to wait for given seconds.
     *
     * @param seconds
     * @author sheraz
     */
    this.browserWaitforseconds = function (seconds) {
        browser.sleep(seconds * 1000);
    };

    /**
     * This function is used to wait for second.
     *
     * @author sheraz
     * @returns boolean false
     */
    var _retryOnErr = function (err) {
        browser.sleep(1000);
        return false;
    };

    /**
     * This function is used to wait for element present up to timeout.
     *
     * @author sheraz
     * @param elmentFinder
     * @param elementDesc
     * @param timeout
     */
    this.browserWait = function (elmentFinder, elementDesc, timeout) {

        if (!timeout) {
            timeout = 60;
        }
        browser.driver.wait(function () {
                return elmentFinder.isPresent().then(function (present) {
                    if (present == true) {
                        return elmentFinder.isDisplayed().then(function (value) {
                            return value == true;
                        });

                    } else {
                        return _retryOnErr();
                    }
                }, _retryOnErr);

            }, timeout * 1000,
            elementDesc + '::Error waiting for element present:').then(
            function (waitRetValue) {
                return waitRetValue; // usually just `true`
            }, function (err) {
                throw err;
            });
    };

    /**
     * This function is used to wait for element enabled up to timeout and
     * return true/false value based on element availability.
     *
     * @author sheraz
     * @param elmentFinder
     * @param elementDesc
     * @param timeout
     * @returns boolean
     */
    this.browserWaitToEnabledElement = function (elmentFinder, elementDesc, timeout) {

        if (!timeout) {
            timeout = 60;
        }

        browser.driver.wait(function () {
                return elmentFinder.isPresent().then(function (present) {
                    if (present == true) {
                        return elmentFinder.isEnabled().then(function (value) {
                            return value == true;
                        });

                    } else {
                        return _retryOnErr();
                    }
                }, _retryOnErr);

            }, timeout * 1000,
            elementDesc + '::Error waiting for element enabled:').then(
            function (waitRetValue) {
                return waitRetValue; // usually just `true`
            }, function (err) {
                return false;
            });
    };
    /**
     * This function is used for element present or not .
     *
     * @author sheraz
     * @param elementObject
     * @returns boolean value
     */
    this.elementCheck = function (elementObject) {
        return elementObject.isPresent().then(function (present) {
            if (present) {
                return true;
            } else {
                return false;
            }
        });
    };

    /**
     * This function is used to return current day date in given format YYMMDD.
     *
     * @author sheraz
     * @returns date
     */
    this.getDateStamp = function () {
        var moment = require('moment');
        return moment().format('YYMMDD');
    };

    /**
     * This function is used to return current day date in given format
     * YYMMDDHHmm.
     *
     * @author sheraz
     * @returns date
     */
    this.getTimeStamp = function () {
        var moment = require('moment');
        return moment().format('YYMMDDHHmm');
    };

    /**
     * This function is used to return current day date in given format
     * DDMMYYYYHHmmSSSS.
     *
     * @author sheraz
     * @returns date
     */
    this.getFullDateString = function () {
        var moment = require('moment');
        return moment().format('DDMMYYYYHHmmSSSS');

    };

    /**
     * This function is used to return current day date in given format
     * DD/MM/YYYY HH:mm:SS.
     *
     * @author sheraz
     * @returns date
     */
    this.getTodayDate = function () {
        var moment = require('moment');
        var todaydate = moment().format('DD/MM/YYYY HH:mm:SS');
        return todaydate;
    };
    /**
     * This function is used to return current day date in given format
     * DD/MM/YYYY.
     *
     * @author sheraz
     * @returns date
     */
    this.getTodayDateOnly = function () {
        var moment = require('moment');
        var todaydate = moment().format('MM/DD/YYYY');
        return todaydate;
    };

    /**
     * This function is used to return next 30 days date in given format DD/MM/YYYY
     *
     * @author sheraz
     * @returns date
     */
    this.getNextMonthDate = function () {
        var moment = require('moment');
        var nextMonthDate = moment().add('day', 30);
        return nextMonthDate.format('MM/DD/YYYY');
    };

    /**
     * This function is used to return next day date in given format DD/MM/YYYY
     * HH:mm:SS.
     *
     * @author sheraz
     * @returns date
     */
    this.getNextDate = function () {
        var moment = require('moment');
        var Nextdaydate = moment().add('day', 1);
        return Nextdaydate.format('DD/MM/YYYY HH:mm:SS');
    };

    /**
     * This function is used to upload file.
     *
     * @author sheraz
     * @param browseButton
     * @param filetoUpload
     * @param uploadButton
     */
    this.uploadFile = function (browseButton, filetoUpload, uploadButton) {
        var path = require('path');
        var absolutePath = path.resolve(__dirname, filetoUpload);
        browseButton.sendKeys(absolutePath);
        if (uploadButton) {
            uploadButton.click();
        }
    };

    /**
     * This method is used to search in text box either using search button or
     * Enter key .
     *
     * @author sheraz
     * @param element
     * @param searchText
     * @param searchButton
     */
    var searchBox = function (element, searchText, searchButton) {
        element.clear();
        element.sendKeys(searchText);
        if (searchButton) {
            searchButton.click();
        } else {
            element.sendKeys(protractor.Key.ENTER);
        }
        browser.waitForAngular();

    };

    /**
     * This method used to accept confirm Alert.
     *
     * @author sheraz
     */
    this.confirmAlert = function () {
        browser.switchTo().alert().then(function (alert) {
            alert.accept();
        }, function (err) {
            logger.error(err);
        });
    };


    /**
         * This method used to accept dismiss alert.
         *
         * @author sheraz
         */
    this.dismissAlert = function () {
        browser.switchTo().alert().then(function (alert) {
            alert.dismiss();
        }, function (err) {
            logger.error(err);
        });
    };

    /**
     * This function is used to switch on frame.
     *
     * @author sheraz
     */

    this.switchToFrame = function (element) {
        browser.waitForAngular();
        browser.switchTo().frame(element);
    };

    /**
     * This function is used to switch on new Window.
     *
     * @author sheraz
     */
    var parentHandle = {};
    var popUpHandle = {};
    this.switchToNewWindow = function () {
        parentHandle = browser.getWindowHandle();
        browser.getAllWindowHandles().then(function (handles) {
            popUpHandle = handles[1];
            browser.switchTo().window(popUpHandle);
        });
    };

    /**
     * This function is used to switch on Old Window.
     *
     * @author sheraz
     */
    this.switchToMainWindow = function () {
        browser.close();
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(parentHandle);
        });
    };
};

module.exports = new utility();