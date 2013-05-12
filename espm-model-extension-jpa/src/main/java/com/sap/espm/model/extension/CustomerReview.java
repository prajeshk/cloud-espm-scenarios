package com.sap.espm.model.extension;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * Entity implementation class for entity CustomerReview
 */

@Entity
@Table(name = "ESPM_EXTENSION_CUSTOMER_REVIEW")
public class CustomerReview implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "CUSTOMER_REVIEW_ID", length = 16)
	private String customerReviewId;

	@Column(name = "COMMENT")
	private String comment;

	@Column(name = "RATING", length = 1)
	private String rating;

	@Column(name = "PRODUCT_ID", length = 10)
	private String productId;

	@Column(name = "DATE_OF_CREATION")
	@Temporal(TemporalType.TIMESTAMP)
	private Date creationDate;

	@Column(name = "FIRST_NAME", length = 40)
	private String firstName;

	@Column(name = "LAST_NAME", length = 40)
	private String lastName;

	public CustomerReview() {
		super();
	}

	public String getCustomerReviewId() {
		return this.customerReviewId;
	}

	public void setCustomerReviewId(String customerReviewId) {
		this.customerReviewId = customerReviewId;
	}

	public String getComment() {
		return this.comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getRating() {
		return this.rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getProductId() {
		return this.productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public Date getCreationDate() {
		return this.creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

}
