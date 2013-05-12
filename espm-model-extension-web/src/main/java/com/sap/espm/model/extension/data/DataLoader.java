package com.sap.espm.model.extension.data;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sap.espm.model.extension.CustomerReview;

/**
 * Data loader tool for loading JPA entities (here customer reviews) into the
 * db.
 */
public class DataLoader {

	private static Logger logger = LoggerFactory.getLogger(DataLoader.class);
	private final EntityManagerFactory emf;

	public DataLoader(EntityManagerFactory emf) {
		this.emf = emf;
	}

	/**
	 * Load customer reviews.
	 */
	public void loadData() {
		EntityManager em = emf.createEntityManager();
		try {
			persistSampleCustomerReview(em);
			logNumberOfCustomerReviews(em);
		} catch (Exception e) {
			logger.error("Exception occured", e);
		} finally {
			em.close();
		}
	}

	/**
	 * Persist one customer
	 * 
	 * @param em
	 *            Entity Manager
	 */
	private void persistSampleCustomerReview(EntityManager em) {
		try {
			em.getTransaction().begin();

			CustomerReview customerReview = new CustomerReview();
			customerReview
					.setComment("This product is really great. I like especially the design, speed and performance");
			customerReview.setRating("5");
			customerReview.setFirstName("John");
			customerReview.setLastName("Smith");
			customerReview.setProductId("HT-2001");
			customerReview.setCreationDate(new Date());

			em.persist(customerReview);
			em.getTransaction().commit();
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
		}
	}

	/**
	 * Get number of customer reviews in database
	 * 
	 * @param em
	 *            Entity Manager
	 * @return number of customers
	 */
	private void logNumberOfCustomerReviews(EntityManager em) {
		TypedQuery<CustomerReview> queryCustomerReview = em.createQuery(
				"SELECT cr FROM CustomerReview cr", CustomerReview.class);
		List<CustomerReview> resCustomerReview = queryCustomerReview
				.getResultList();
		logger.info(resCustomerReview.size()
				+ " CustomerReview loaded in the db");
	}
}