package com.sap.espm.shopping.web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class CheckoutConfirmationView {

	@FindBy(id = "confirm_image")
	private WebElement confirmationImage;

	public CheckoutConfirmationView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
	}

	public boolean isConfirmationImagePresent() {
		// verify that the success message for order creation is displayed
		return confirmationImage.isDisplayed();
	}

}
