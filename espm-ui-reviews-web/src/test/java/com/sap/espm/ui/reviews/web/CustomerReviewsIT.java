package com.sap.espm.ui.reviews.web;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.UUID;

import org.junit.Test;

import com.sap.espm.ui.reviews.web.pageobjects.CustomerReviewCreationPage;
import com.sap.espm.ui.reviews.web.pageobjects.CustomerReviewsPage;

public class CustomerReviewsIT extends UiTestBase {

	@Test
	public void testCreateReview() {
		driver.get(serverUrl + applicationPath);
		CustomerReviewsPage reviewsPage = CustomerReviewsPage.create(driver);

		assertEquals("Default category does not match", "All Categories",
				reviewsPage.getCategory());
		assertEquals("Default product does not match",
				"10\" Portable DVD player", reviewsPage.getProduct());
		assertFalse("First reviewer name is empty", reviewsPage
				.getFirstReviewer().isEmpty());
		assertFalse("First review comment is empty", reviewsPage
				.getFirstReviewComment().isEmpty());

		reviewsPage.selectCategory("Speakers");
		reviewsPage.selectProduct("Sound Booster");

		CustomerReviewCreationPage reviewCreationPage = reviewsPage
				.writeCustomerReview();

		String reviewId = UUID.randomUUID().toString();
		reviewCreationPage.writeReviewComments("Good performance (" + reviewId
				+ ")");
		reviewCreationPage.setReviewRating(3);
		reviewCreationPage.setFirstName("James");
		reviewCreationPage.setLastName("Field");

		reviewsPage = reviewCreationPage.submitAndConfirmReview();

		assertEquals(3, reviewsPage.getFirstReviewRating());
		assertTrue(reviewsPage.getFirstReviewComment().contains(reviewId));
		assertEquals("James Field", reviewsPage.getFirstReviewer());
	}

}
