/**
 * This file contanis pageobjects for login page.
 *
 * @author sheraz
 */

 loginPO ={
	 loginSectionHeader:element(by.css(".header.text-center>h1>img")),
	 userName : element(by.id('username')),
     userPassword:element(by.id('password')),
     loginButton : element(by.buttonText("Log In")),
	 validationMsg:element(by.css(".description")),
	 userMgmtPageHeader:element(by.css(".workspace > div:nth-child(1) > h1:nth-child(1) > span:nth-child(1) > span:nth-child(1)")),
	 settingMenu:element(by.css(".fa.fa-gear.fa-lg")),
	 logout:element(by.xpath(".//span[text()='Sign Out']")),
	 returnToLoginBtn:element(by.xpath(".//span[text()='Return to Login']")),
	 validationMsg:element(by.xpath("html/body/ui-view/div/div/div[2]")),
};
module.exports = loginPO;