package com.sap.espm.model.extension;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;

import com.sap.espm.model.extension.util.TestFactory;

public abstract class AbstractTest {

	protected static EntityManagerFactory emf;
	protected EntityManager em;

	@BeforeClass
	public static void setup() {
		emf = TestFactory
				.createEntityManagerFactory(TestFactory.PERSISTENCE_UNIT);
	}

	@Before
	public void before() {
		this.em = emf.createEntityManager();
	}

	@After
	public void after() {
		if (em.getTransaction().isActive()) {
			em.getTransaction().rollback();
		}
		this.em.close();
	}

	@AfterClass
	public static void shutdown() {
		emf.close();
	}
}
