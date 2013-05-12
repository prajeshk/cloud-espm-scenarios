package com.sap.espm.shopping.web;

import java.util.List;
import java.util.NoSuchElementException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.google.common.base.Function;

public class ShoppingProductListView {

	private WebDriver driver;

	@FindBy(id = "back-to-categories-link")
	private WebElement backToCategoriesLink;

	@FindBy(xpath = "//button[contains(@id,'add-to-cart-button')]")
	private WebElement addToCartButtons;

	public ShoppingProductListView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
		driver = webDriver;
	}

	public ShoppingCategoriesView navigateBackToCategories() {
		// choose 'Back To Categories' link
		backToCategoriesLink.click();
		return new ShoppingCategoriesView(driver);
	}

	public boolean isProductListEmpty() {
		List<WebElement> elements = driver.findElements(By.xpath("//li[contains(@id,'product-rr-row')]"));
		return elements.isEmpty();
	}

	/**
	 * Just add the first product to the shopping cart
	 */
	public void addToCart(final String productSearchString) {
		iWait().until(tableLineIsRendered(productSearchString));
		addToCartButtons.click();
	}

	private Function<WebDriver, Boolean> tableLineIsRendered(final String productSearchString) {
		return new Function<WebDriver, Boolean>() {
			public Boolean apply(WebDriver driver) {
				try {
					driver.findElement(By.xpath("//span[contains(@title,'" + productSearchString + "')]"));
					return true;
				} catch (NoSuchElementException e) {
					return false;
				}
			}
		};
	}

	private WebDriverWait iWait() {
		return new WebDriverWait(driver, 6);
	}

}
