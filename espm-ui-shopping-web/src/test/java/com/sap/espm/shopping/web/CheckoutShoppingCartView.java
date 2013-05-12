package com.sap.espm.shopping.web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public class CheckoutShoppingCartView {

	public CheckoutShoppingCartView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
	}

	public boolean isCheckoutShoppingCartEmpty() {
		return false;
	}

}
