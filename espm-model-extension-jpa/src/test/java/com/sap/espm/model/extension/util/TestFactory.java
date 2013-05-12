package com.sap.espm.model.extension.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.eclipse.persistence.config.PersistenceUnitProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sap.espm.model.extension.CustomerReview;

//import com.sap.espm.model.extension.CustomerReview;

public class TestFactory {
	public static final String TEST_JDBC_DRIVER = "org.apache.derby.jdbc.EmbeddedDriver";
	private static final String TEST_JDBC_URL_IN_MEMORY = "jdbc:derby:memory:DemoDB;create=true";
	public static final String TEST_JDBC_URL = "jdbc:derby:DemoDB;create=true";
	public static final String TEST_JDBC_USER = "demo";
	public static final String TEST_JDBC_PASSWORD = "demo";
	private static final String TEST_TARGET_DATABASE = "Derby";
	private static final String TEST_JPA_LOG_LEVEL = "INFO";
	public static final String PERSISTENCE_UNIT = "com.sap.espm.model.extension";

	/*
	 * Indicates whether the test database instance is in-memory or file system
	 * based
	 */
	private static boolean inMemory = true;
	private static Logger logger = LoggerFactory.getLogger(TestFactory.class);
	private static Map<String, String> defaultProperties = null;
	protected static EntityManagerFactory emf;

	/**
	 * Create an EntityManagerFactory instance for the named persistence unit
	 * for accessing a local in-memory Derby test database instance.
	 * <p>
	 * 
	 * @param persistenceUnitName
	 *            the persistence unit name
	 * @return an EntityManagerFactory instance for accessing a local in-memory
	 *         Derby test database instance
	 */
	public static EntityManagerFactory createEntityManagerFactory(
			String persistenceUnitName) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory(
				persistenceUnitName, getDefaultTestProperties());
		return emf;
	}

	private static Map<String, String> getDefaultTestProperties() {
		if (defaultProperties == null) {
			defaultProperties = new HashMap<String, String>();
			defaultProperties.put(PersistenceUnitProperties.JDBC_DRIVER,
					TEST_JDBC_DRIVER);
			if (inMemory) {
				defaultProperties.put(PersistenceUnitProperties.JDBC_URL,
						TEST_JDBC_URL_IN_MEMORY);
			} else {
				defaultProperties.put(PersistenceUnitProperties.JDBC_URL,
						TEST_JDBC_URL);
			}
			defaultProperties.put(PersistenceUnitProperties.JDBC_USER,
					TEST_JDBC_USER);
			defaultProperties.put(PersistenceUnitProperties.JDBC_PASSWORD,
					TEST_JDBC_PASSWORD);
			defaultProperties.put(PersistenceUnitProperties.TARGET_DATABASE,
					TEST_TARGET_DATABASE);
			defaultProperties.put(PersistenceUnitProperties.LOGGING_LEVEL,
					TEST_JPA_LOG_LEVEL);
			defaultProperties.put(PersistenceUnitProperties.DDL_GENERATION,
					PersistenceUnitProperties.DROP_AND_CREATE);
		}
		return defaultProperties;
	}

	/**
	 * Helper method to create CustomerReview
	 * 
	 * @param em
	 *            the entity manager instance
	 * @param id
	 *            the primary key of customer review entity in db.
	 * @return the true/false status of the success/failure of operation.
	 */
	public Boolean createCustomerReview(EntityManager em,
			String customerReviewId) {
		Boolean status = true;
		CustomerReview customerReview = new CustomerReview();
		try {
			em.getTransaction().begin();

			customerReview.setCustomerReviewId(customerReviewId);
			customerReview
					.setComment("This product is really great. I like especially the design, speed and performance");
			customerReview.setRating("5");
			customerReview.setFirstName("John");
			customerReview.setLastName("Smith");
			customerReview.setProductId("HT-2001");
			Date date = new Date();
			customerReview.setCreationDate(date);
			/*
			 * customerReview.setCreationDate(new GregorianCalendar(2012, 3, 17,
			 * 13, 23, 11));
			 */

			em.persist(customerReview);
			em.getTransaction().commit();
		} catch (Exception e) {
			status = false;
			logger.error("Error occured during creation of customer review. Detailed info: "
					+ e);
		}
		return status;
	}

	/**
	 * Helper method to delete CustomerReview
	 * 
	 * @param em
	 *            the entity manager instance
	 * @param id
	 *            the primary key of customer review entity in db.
	 * @return the true/false status of the success/failure of operation.
	 */
	public Boolean deleteCustomerReview(EntityManager em,
			String customerReviewId) {
		Boolean status = true;
		CustomerReview customerReview = null;
		try {
			if (!em.getTransaction().isActive()) {
				em.getTransaction().begin();
			}
			customerReview = em.find(CustomerReview.class, customerReviewId);
			if (customerReview != null) {
				em.remove(customerReview);
				em.getTransaction().commit();
			} else {
				logger.info("CustomerReview " + customerReviewId
						+ " does not exist in the db");
				status = false;
			}

		} catch (Exception e) {
			status = false;
			logger.error("Error occured during deletion of customer review. Detailed info: "
					+ e);
		}
		return status;
	}
}
