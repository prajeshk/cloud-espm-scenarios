package com.sap.espm.shopping.web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class CheckoutSummaryView {

	@FindBy(id = "checkout-proceed-button-0")
	private WebElement buttonOrder;

	public CheckoutSummaryView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
	}

	public void pressButtonOrder() {
		// choose 'Order'
		buttonOrder.click();
	}
}
