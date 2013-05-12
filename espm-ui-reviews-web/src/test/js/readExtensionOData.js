jQuery.sap.require("sap.app.utility");

module("utility.js - sap.app.readExtensionOData", {
	setup : function() {
		this.objectUnderTest = sap.app.readExtensionOData;

		this.sSomeProductId = "some_id";
		this.oFirstReviewForSomeProduct = {
			ProductId : this.sSomeProductId,
			Rating : 3
		};
		this.oSecondReviewForSomeProduct = {
			ProductId : this.sSomeProductId,
			Rating : 4
		};
		this.oReviewForSomeOtherProduct = {
			ProductId : "some_other_id",
			Rating : 1
		};
	},

	teardown : function() {
	}
});

test("no reviews", function() {
	var oRatingInfo = this.objectUnderTest.getRatingInfo();
	equal(oRatingInfo.iReviewsCount, 0, "review count is initial (0)");
	equal(oRatingInfo.fAverageRating, 0.0, "average rating is initial (0.0)");
});

test("one review", function() {
	var oReviews = {
		singleReview : this.oFirstReviewForSomeProduct
	};
	var sSelectedProductId = this.sSomeProductId;
	var oRatingInfo = this.objectUnderTest.getRatingInfo(oReviews, sSelectedProductId);
	equal(oRatingInfo.iReviewsCount, 1, "reviews count is 1");
	equal(oRatingInfo.fAverageRating, 3.0, "average rating equals rating of single review");
});

test("two reviews", function() {
	var oReviews = {
		firstReview : this.oFirstReviewForSomeProduct,
		secondReview : this.oSecondReviewForSomeProduct
	};
	var sSelectedProductId = this.sSomeProductId;
	var oRatingInfo = this.objectUnderTest.getRatingInfo(oReviews, sSelectedProductId);
	equal(oRatingInfo.iReviewsCount, 2, "reviews count is 2");
	equal(oRatingInfo.fAverageRating, 3.5, " average rating equals mean value of both reviews");
});

test("three reviews whereas one is for a different product", function() {
	var oReviews = {
		firstReview : this.oFirstReviewForSomeProduct,
		secondReview : this.oSecondReviewForSomeProduct,
		thirdReview : this.oReviewForSomeOtherProduct
	};
	var sSelectedProductId = this.sSomeProductId;
	var oRatingInfo = this.objectUnderTest.getRatingInfo(oReviews, sSelectedProductId);
	equal(oRatingInfo.iReviewsCount, 2, "reviews count is 2");
	equal(oRatingInfo.fAverageRating, 3.5, "average rating equals mean value of the reviews of the selected product");
});
