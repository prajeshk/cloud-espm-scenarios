package com.sap.espm.ui.reviews.web.pageobjects;

import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import com.google.common.base.Function;

public class CustomerReviewCreationPage extends PageObject {

	@FindBy(id = "review-comment-text-area-id")
	private WebElement reviewComments;

	@FindBy(id = "review-rating-indicator-id-itm-1")
	private WebElement reviewRating1;

	@FindBy(id = "review-rating-indicator-id-itm-2")
	private WebElement reviewRating2;

	@FindBy(id = "review-rating-indicator-id-itm-3")
	private WebElement reviewRating3;

	@FindBy(id = "review-rating-indicator-id-itm-4")
	private WebElement reviewRating4;

	@FindBy(id = "review-rating-indicator-id-itm-5")
	private WebElement reviewRating5;

	@FindBy(id = "review-first-name-field-id")
	private WebElement firstName;

	@FindBy(id = "review-last-name-field-id")
	private WebElement lastName;

	@FindBy(id = "customer-review-creation-submit-button-id")
	private WebElement submitReview;

	@FindBy(id = "__alert0--btn-OK")
	private List<WebElement> submitConfirmOkButton;

	public CustomerReviewCreationPage(WebDriver driver) {
		super(driver);
	}

	public static CustomerReviewCreationPage create(final WebDriver driver) {
		return PageObject.create(driver, CustomerReviewCreationPage.class);
	}

	@Override
	protected boolean isCurrentPage() {
		return checkElementIsDisplayed(reviewComments)
				&& checkElementIsDisplayed(submitReview);
	}

	public void writeReviewComments(String text) {
		reviewComments.clear();
		reviewComments.sendKeys(text);
	}

	public void setFirstName(String text) {
		firstName.clear();
		firstName.sendKeys(text);
	}

	public void setLastName(String text) {
		lastName.clear();
		lastName.sendKeys(text);
	}

	public void setReviewRating(int rating) {
		getRating(rating).click();
	}

	private WebElement getRating(int rating) {
		WebElement[] reviewRatings = new WebElement[] { reviewRating1,
				reviewRating2, reviewRating3, reviewRating4, reviewRating5 };
		return reviewRatings[rating - 1];
	}

	public CustomerReviewsPage submitAndConfirmReview() {
		submitReview.click();
		waitUntil(submitConfirmationIsShown());
		submitConfirmOkButton.get(0).click();
		return CustomerReviewsPage.create(driver);
	}

	private Function<WebDriver, Boolean> submitConfirmationIsShown() {
		return new Function<WebDriver, Boolean>() {
			@Override
			public Boolean apply(final WebDriver driver) {
				return !submitConfirmOkButton.isEmpty();
			}
		};
	}

}
