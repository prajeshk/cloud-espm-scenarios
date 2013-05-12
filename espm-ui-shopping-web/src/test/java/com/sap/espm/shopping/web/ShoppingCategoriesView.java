package com.sap.espm.shopping.web;

import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.By;

public class ShoppingCategoriesView {

	private WebDriver driver;

	// search for 'Laser'
	@FindBy(partialLinkText = "Laser")
	private WebElement categoryLink;

	public ShoppingCategoriesView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
		driver = webDriver;
	}

	public ShoppingProductListView clickCategoryLink() {
		categoryLink.click();
		return new ShoppingProductListView(driver);
	}

	public boolean areCategoriesAvailable() {
		List<WebElement> categories = driver.findElements(By.partialLinkText("categories-list"));
		return categories.isEmpty();
	}

}
