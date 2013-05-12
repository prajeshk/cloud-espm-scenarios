package com.sap.espm.shopping.web;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class CheckoutAddressView {

	private WebDriver driver;

	@FindBy(id = "address-email")
	private WebElement emailInputField;

	@FindBy(id = "existing_customer")
	private WebElement existingCustomerRadioButton;

	@FindBy(id = "new_customer")
	private WebElement newCustomerRadioButton;

	public CheckoutAddressView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
		driver = webDriver;
	}


	public void enterEmail(String text) {
		// enter the mail id
		emailInputField.clear();
		emailInputField.sendKeys(text);
		emailInputField.sendKeys(Keys.RETURN);
	}

	public void switchToNewCustomer() {
		// choose new customer
		newCustomerRadioButton.click();
	}

	public void switchToExistingCustomer() {
		// choose existing customer
		existingCustomerRadioButton.click();
	}


	public boolean isAddressFormAvailable() {
		// verify that the address field is available
		if (driver.findElement(By.id("address-fields")) != null) {
			return true;
		} else {
			return false;
		}
	}

}
