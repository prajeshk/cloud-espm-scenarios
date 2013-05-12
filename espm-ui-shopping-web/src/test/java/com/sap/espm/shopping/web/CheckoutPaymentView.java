package com.sap.espm.shopping.web;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class CheckoutPaymentView {

	@FindBy(id = "input-card-owner")
	private WebElement cardOwnerInputField;

	@FindBy(id = "input-card-number")
	private WebElement cardNumberInputField;

	@FindBy(id = "input-card-security-code")
	private WebElement cardSecurityCodeInputField;

	public CheckoutPaymentView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
	}

	public boolean isCardOwnerNameAvailable() {
		if (cardOwnerInputField.getText().length() > 0) {
			return true;
		} else {
			return false;
		}
	}

	public void completeMandatoryInput() {
		// enter the credit card details
		if (!isCardOwnerNameAvailable()) {
			cardOwnerInputField.sendKeys("ABC");
		}

		cardNumberInputField.sendKeys("1");
		cardSecurityCodeInputField.sendKeys("2");
		cardSecurityCodeInputField.sendKeys(Keys.RETURN);
	}

}
