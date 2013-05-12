package com.sap.espm.shopping.web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public class ShoppingAreaView {
	private WebDriver driver;

	public ShoppingAreaView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
		driver = webDriver;
	}

	public ShoppingCategoriesView getCategoriesView() {
		return new ShoppingCategoriesView(driver);
	}

	public ShoppingSearchView getSearchView() {
		return new ShoppingSearchView(driver);
	}
}
