package com.sap.espm.shopping.web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.Keys;

public class ShoppingSearchView {

	private final WebDriver driver;

	@FindBy(id = "search-field-tf-input")
	private WebElement searchFieldInputfield;

	public ShoppingSearchView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
		driver = webDriver;

	}

	public ShoppingProductListView searchFor(String text) {
		// enter the search text
		searchFieldInputfield.sendKeys(text);
		searchFieldInputfield.sendKeys(Keys.RETURN);
		return new ShoppingProductListView(driver);
	}

}
