package com.sap.espm.shopping.web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

/**
 * Page object for home page of this sample.
 */
public class StartPage {

	private WebDriver driver;

	@FindBy(id = "dontShowAgainBox")
	private WebElement disclaimer;

	@FindBy(id = "welcomePageOkButton")
	private WebElement welcomeok;

	@FindBy(id = "__button1")
	private WebElement settings;

	@FindBy(id = "nav-checkout")
	private WebElement checkoutLink;

	@FindBy(id = "nav-shopping")
	private WebElement shoppingLink;

	@FindBy(id = "shopping-cart-panebar-item")
	private WebElement shoppingCartPaneBar;

	@FindBy(id = "__alert0--btn-OK")
	private WebElement refresh;

	/**
	 * Construct Selenium page object from home page loaded with given web driver from given application URL.
	 */
	public StartPage(WebDriver webDriver, String applicationUrl) {
		driver = webDriver;
		webDriver.get(applicationUrl);
		PageFactory.initElements(webDriver, this);
	}

	public void doRefresh() {
		refresh.click();
	}

	public void checkBox() {
		disclaimer.click();
	}

	public void selectOk() {
		welcomeok.click();
	}

	public SettingsView navigateToSettings() {
		settings.click();
		return new SettingsView(driver);
	}

	public CheckoutAreaView navigateToCheckout() {
		checkoutLink.click();
		return new CheckoutAreaView(driver);
	}

	public ShoppingAreaView navigateToShopping() {
		shoppingLink.click();
		return new ShoppingAreaView(driver);
	}

	public ShoppingCartView openShoppingCart() {
		shoppingCartPaneBar.click();
		return new ShoppingCartView(driver);
	}
}