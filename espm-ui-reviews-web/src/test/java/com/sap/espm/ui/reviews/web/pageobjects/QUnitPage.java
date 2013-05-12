package com.sap.espm.ui.reviews.web.pageobjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.FindBys;

public class QUnitPage extends PageObject {

	@FindBys({ @FindBy(id = "qunit-testresult"), @FindBy(className = "passed") })
	private WebElement passedElement;

	@FindBys({ @FindBy(id = "qunit-testresult"), @FindBy(className = "total") })
	private WebElement totalElement;

	public QUnitPage(final WebDriver driver) {
		super(driver);
	}

	public static QUnitPage create(final WebDriver driver) {
		return PageObject.create(driver, QUnitPage.class);
	}

	@Override
	public boolean isCurrentPage() {
		return checkElementIsDisplayed(passedElement)
				&& checkElementIsDisplayed(totalElement);
	}

	public int getPassed() {
		return Integer.parseInt(passedElement.getText());
	}

	public int getTotal() {
		return Integer.parseInt(totalElement.getText());
	}

}