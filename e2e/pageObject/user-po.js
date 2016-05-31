/**
 * This file contanis pageobjects for user Mgmt page.
 *
 * @author sheraz
 */

 userPO ={
	 userMgmtPageHeader:element(by.css(".workspace > div:nth-child(1) > h1:nth-child(1) > span:nth-child(1) > span:nth-child(1)")),
	 createNewUserBtn:element(by.xpath(".//span[text()='New User']")),
	 newUserPageHeader:element(by.css("h1.ng-scope > span:nth-child(1)")),
	 firstNameTxtBx:element(by.model("user.firstName")),
	 lastNameTxtBx:element(by.model("user.lastName")),
	 emailAddressTxtBx:element(by.model("user.emailAddress")),
	 passwordTxtBox:element(by.model("user.password")),
	 userStatusDropDown:element(by.model("user.status")),
	 userStatusOptions:element.all(by.xpath("//*[@id='userStatus']/option")),
	 userRoleDropdown:element(by.model("selectedRole.key")),
	 userRoleOptions:element.all(by.xpath("//*[@id='userRole']/option")),
	 selectLocationDropDown:element(by.model("selectedLocation.key")),
	 locationOptions:element.all(by.xpath(".//*[@ng-model='selectedLocation.key']/option")),
	 homeLocationDropDown:element(by.model("primaryLocation.id")),
	 homeLocationOptions:element.all(by.xpath(".//*[@ng-model='primaryLocation.id']/option")),
	 createUserButton:element(by.css("a.btn:nth-child(2) > span:nth-child(2) > span:nth-child(1)")),
	 userSuccessMessage:element(by.xpath(".//*[@id='pcont']/div[2]/div/div[1]/div")),
	 userSearchBox:element(by.model("findUser.filterBy")),
	 userSearchBtn:element(by.css(".btn-default > span:nth-child(2) > span:nth-child(1)")),
	 userListColumns:element.all(by.repeater("column in activeColumns")),
	 userEmailList:element.all(by.xpath(".//*[@id='pcont']/div[2]/div/table/tbody/tr/td[2]")),
	 userFirstNameList:element.all(by.xpath(".//*[@id='pcont']/div[2]/div/table/tbody/tr/td[3]")),
	 userLastName:element.all(by.xpath(".//*[@id='pcont']/div[2]/div/table/tbody/tr/td[4]")),
	 userCheckBox:element(by.xpath(".//*[@id='pcont']/div[2]/div/table/tbody/tr[2]/td[1]/input")),
	 deleteUserBtn:element(by.xpath("//span[text()='Delete']")),
	 confirmDeleteBtn:element(by.id("delete-user")),
	 userListRecordCount:element.all(by.xpath(".//*[@id='pcont']/div[2]/div/table/tbody/tr/th[1]")),
};
module.exports = userPO;