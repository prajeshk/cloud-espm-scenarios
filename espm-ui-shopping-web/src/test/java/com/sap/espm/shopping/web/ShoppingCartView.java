package com.sap.espm.shopping.web;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

public class ShoppingCartView {

	private WebDriver driver;

	public ShoppingCartView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
		driver = webDriver;
	}

	public boolean isShoppingCartEmpty() {
		List<WebElement> elements = driver.findElements(By.xpath("//li[contains(@id,'shopping-cart-rr-row')]"));
		return elements.isEmpty();
	}

}
