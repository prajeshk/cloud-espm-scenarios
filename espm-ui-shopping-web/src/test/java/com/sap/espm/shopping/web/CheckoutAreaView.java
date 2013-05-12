package com.sap.espm.shopping.web;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class CheckoutAreaView {

	private WebDriver driver;

	@FindBy(id = "checkout-proceed-button-0")
	private WebElement buttonProceed;

	@FindBy(id = "roadmap-back-button-0")
	private WebElement buttonBack;

	@FindBy(id = "checkout-step-1")
	private WebElement roadMapStep1;

	@FindBy(id = "checkout-step-2")
	private WebElement roadMapStep2;

	@FindBy(id = "checkout-step-3")
	private WebElement roadMapStep3;

	@FindBy(id = "checkout-step-4")
	private WebElement roadMapStep4;

	public CheckoutAreaView(WebDriver webDriver) {
		// initialize the webdriver
		PageFactory.initElements(webDriver, this);
		driver = webDriver;
	}

	public void navigateForward() {
		// choose 'Proceed'
		buttonProceed.click();
	}

	public void navigateBack() {
		buttonBack.click();
	}

	private WebElement getRoadMapItem(int stepNumber) {
		WebElement roadMapItem = null;
		switch (stepNumber) {
		case 1:
			roadMapItem = roadMapStep1;
			break;
		case 2:
			roadMapItem = roadMapStep2;
			break;
		case 3:
			roadMapItem = roadMapStep3;
			break;
		case 4:
			roadMapItem = roadMapStep4;
			break;
		}
		return roadMapItem;
	}

	public void clickRoadMapItem(int stepNumber) {
		getRoadMapItem(stepNumber).click();
	}

	public boolean isRoadMapStepActive(int stepNumber) {
		return !getRoadMapItem(stepNumber).getAttribute("class").contains("sapUiRoadMapDisabled");
	}

	public boolean isProceedButtonActive() {
		return !buttonProceed.getAttribute("class").contains("sapUiBtnDsbl");
	}

	public CheckoutShoppingCartView getCheckoutShoppingCart() {
		return new CheckoutShoppingCartView(driver);
	}

	public CheckoutAddressView getAddressView() {
		return new CheckoutAddressView(driver);
	}

	public CheckoutPaymentView getPaymentView() {
		return new CheckoutPaymentView(driver);
	}

	public CheckoutSummaryView getSummaryView() {
		return new CheckoutSummaryView(driver);
	}

	public CheckoutConfirmationView getConfirmationView() {
		return new CheckoutConfirmationView(driver);
	}

}
