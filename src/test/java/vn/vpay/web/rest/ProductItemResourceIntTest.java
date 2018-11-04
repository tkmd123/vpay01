package vn.vpay.web.rest;

import vn.vpay.Vpay01App;

import vn.vpay.domain.ProductItem;
import vn.vpay.repository.ProductItemRepository;
import vn.vpay.repository.search.ProductItemSearchRepository;
import vn.vpay.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static vn.vpay.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProductItemResource REST controller.
 *
 * @see ProductItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Vpay01App.class)
public class ProductItemResourceIntTest {

    private static final String DEFAULT_PRODUCT_ITEM_CODE = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_ITEM_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_PRODUCT_ITEM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_ITEM_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRODUCT_ITEM_VALUE = 1;
    private static final Integer UPDATED_PRODUCT_ITEM_VALUE = 2;

    private static final String DEFAULT_PRODUCT_ITEM_DESC = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_ITEM_DESC = "BBBBBBBBBB";

    private static final String DEFAULT_PRODUCT_ITEM_UDF_1 = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_ITEM_UDF_1 = "BBBBBBBBBB";

    private static final String DEFAULT_PRODUCT_ITEM_UDF_2 = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_ITEM_UDF_2 = "BBBBBBBBBB";

    private static final String DEFAULT_PRODUCT_ITEM_UDF_3 = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_ITEM_UDF_3 = "BBBBBBBBBB";

    private static final Integer DEFAULT_IS_DELETED = 1;
    private static final Integer UPDATED_IS_DELETED = 2;

    @Autowired
    private ProductItemRepository productItemRepository;

    /**
     * This repository is mocked in the vn.vpay.repository.search test package.
     *
     * @see vn.vpay.repository.search.ProductItemSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductItemSearchRepository mockProductItemSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProductItemMockMvc;

    private ProductItem productItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductItemResource productItemResource = new ProductItemResource(productItemRepository, mockProductItemSearchRepository);
        this.restProductItemMockMvc = MockMvcBuilders.standaloneSetup(productItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductItem createEntity(EntityManager em) {
        ProductItem productItem = new ProductItem()
            .productItemCode(DEFAULT_PRODUCT_ITEM_CODE)
            .productItemName(DEFAULT_PRODUCT_ITEM_NAME)
            .productItemValue(DEFAULT_PRODUCT_ITEM_VALUE)
            .productItemDesc(DEFAULT_PRODUCT_ITEM_DESC)
            .productItemUDF1(DEFAULT_PRODUCT_ITEM_UDF_1)
            .productItemUDF2(DEFAULT_PRODUCT_ITEM_UDF_2)
            .productItemUDF3(DEFAULT_PRODUCT_ITEM_UDF_3)
            .isDeleted(DEFAULT_IS_DELETED);
        return productItem;
    }

    @Before
    public void initTest() {
        productItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductItem() throws Exception {
        int databaseSizeBeforeCreate = productItemRepository.findAll().size();

        // Create the ProductItem
        restProductItemMockMvc.perform(post("/api/product-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productItem)))
            .andExpect(status().isCreated());

        // Validate the ProductItem in the database
        List<ProductItem> productItemList = productItemRepository.findAll();
        assertThat(productItemList).hasSize(databaseSizeBeforeCreate + 1);
        ProductItem testProductItem = productItemList.get(productItemList.size() - 1);
        assertThat(testProductItem.getProductItemCode()).isEqualTo(DEFAULT_PRODUCT_ITEM_CODE);
        assertThat(testProductItem.getProductItemName()).isEqualTo(DEFAULT_PRODUCT_ITEM_NAME);
        assertThat(testProductItem.getProductItemValue()).isEqualTo(DEFAULT_PRODUCT_ITEM_VALUE);
        assertThat(testProductItem.getProductItemDesc()).isEqualTo(DEFAULT_PRODUCT_ITEM_DESC);
        assertThat(testProductItem.getProductItemUDF1()).isEqualTo(DEFAULT_PRODUCT_ITEM_UDF_1);
        assertThat(testProductItem.getProductItemUDF2()).isEqualTo(DEFAULT_PRODUCT_ITEM_UDF_2);
        assertThat(testProductItem.getProductItemUDF3()).isEqualTo(DEFAULT_PRODUCT_ITEM_UDF_3);
        assertThat(testProductItem.getIsDeleted()).isEqualTo(DEFAULT_IS_DELETED);

        // Validate the ProductItem in Elasticsearch
        verify(mockProductItemSearchRepository, times(1)).save(testProductItem);
    }

    @Test
    @Transactional
    public void createProductItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productItemRepository.findAll().size();

        // Create the ProductItem with an existing ID
        productItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductItemMockMvc.perform(post("/api/product-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProductItem in the database
        List<ProductItem> productItemList = productItemRepository.findAll();
        assertThat(productItemList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProductItem in Elasticsearch
        verify(mockProductItemSearchRepository, times(0)).save(productItem);
    }

    @Test
    @Transactional
    public void checkProductItemCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = productItemRepository.findAll().size();
        // set the field null
        productItem.setProductItemCode(null);

        // Create the ProductItem, which fails.

        restProductItemMockMvc.perform(post("/api/product-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productItem)))
            .andExpect(status().isBadRequest());

        List<ProductItem> productItemList = productItemRepository.findAll();
        assertThat(productItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProductItemNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = productItemRepository.findAll().size();
        // set the field null
        productItem.setProductItemName(null);

        // Create the ProductItem, which fails.

        restProductItemMockMvc.perform(post("/api/product-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productItem)))
            .andExpect(status().isBadRequest());

        List<ProductItem> productItemList = productItemRepository.findAll();
        assertThat(productItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsDeletedIsRequired() throws Exception {
        int databaseSizeBeforeTest = productItemRepository.findAll().size();
        // set the field null
        productItem.setIsDeleted(null);

        // Create the ProductItem, which fails.

        restProductItemMockMvc.perform(post("/api/product-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productItem)))
            .andExpect(status().isBadRequest());

        List<ProductItem> productItemList = productItemRepository.findAll();
        assertThat(productItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductItems() throws Exception {
        // Initialize the database
        productItemRepository.saveAndFlush(productItem);

        // Get all the productItemList
        restProductItemMockMvc.perform(get("/api/product-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].productItemCode").value(hasItem(DEFAULT_PRODUCT_ITEM_CODE.toString())))
            .andExpect(jsonPath("$.[*].productItemName").value(hasItem(DEFAULT_PRODUCT_ITEM_NAME.toString())))
            .andExpect(jsonPath("$.[*].productItemValue").value(hasItem(DEFAULT_PRODUCT_ITEM_VALUE)))
            .andExpect(jsonPath("$.[*].productItemDesc").value(hasItem(DEFAULT_PRODUCT_ITEM_DESC.toString())))
            .andExpect(jsonPath("$.[*].productItemUDF1").value(hasItem(DEFAULT_PRODUCT_ITEM_UDF_1.toString())))
            .andExpect(jsonPath("$.[*].productItemUDF2").value(hasItem(DEFAULT_PRODUCT_ITEM_UDF_2.toString())))
            .andExpect(jsonPath("$.[*].productItemUDF3").value(hasItem(DEFAULT_PRODUCT_ITEM_UDF_3.toString())))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED)));
    }
    
    @Test
    @Transactional
    public void getProductItem() throws Exception {
        // Initialize the database
        productItemRepository.saveAndFlush(productItem);

        // Get the productItem
        restProductItemMockMvc.perform(get("/api/product-items/{id}", productItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productItem.getId().intValue()))
            .andExpect(jsonPath("$.productItemCode").value(DEFAULT_PRODUCT_ITEM_CODE.toString()))
            .andExpect(jsonPath("$.productItemName").value(DEFAULT_PRODUCT_ITEM_NAME.toString()))
            .andExpect(jsonPath("$.productItemValue").value(DEFAULT_PRODUCT_ITEM_VALUE))
            .andExpect(jsonPath("$.productItemDesc").value(DEFAULT_PRODUCT_ITEM_DESC.toString()))
            .andExpect(jsonPath("$.productItemUDF1").value(DEFAULT_PRODUCT_ITEM_UDF_1.toString()))
            .andExpect(jsonPath("$.productItemUDF2").value(DEFAULT_PRODUCT_ITEM_UDF_2.toString()))
            .andExpect(jsonPath("$.productItemUDF3").value(DEFAULT_PRODUCT_ITEM_UDF_3.toString()))
            .andExpect(jsonPath("$.isDeleted").value(DEFAULT_IS_DELETED));
    }

    @Test
    @Transactional
    public void getNonExistingProductItem() throws Exception {
        // Get the productItem
        restProductItemMockMvc.perform(get("/api/product-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductItem() throws Exception {
        // Initialize the database
        productItemRepository.saveAndFlush(productItem);

        int databaseSizeBeforeUpdate = productItemRepository.findAll().size();

        // Update the productItem
        ProductItem updatedProductItem = productItemRepository.findById(productItem.getId()).get();
        // Disconnect from session so that the updates on updatedProductItem are not directly saved in db
        em.detach(updatedProductItem);
        updatedProductItem
            .productItemCode(UPDATED_PRODUCT_ITEM_CODE)
            .productItemName(UPDATED_PRODUCT_ITEM_NAME)
            .productItemValue(UPDATED_PRODUCT_ITEM_VALUE)
            .productItemDesc(UPDATED_PRODUCT_ITEM_DESC)
            .productItemUDF1(UPDATED_PRODUCT_ITEM_UDF_1)
            .productItemUDF2(UPDATED_PRODUCT_ITEM_UDF_2)
            .productItemUDF3(UPDATED_PRODUCT_ITEM_UDF_3)
            .isDeleted(UPDATED_IS_DELETED);

        restProductItemMockMvc.perform(put("/api/product-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductItem)))
            .andExpect(status().isOk());

        // Validate the ProductItem in the database
        List<ProductItem> productItemList = productItemRepository.findAll();
        assertThat(productItemList).hasSize(databaseSizeBeforeUpdate);
        ProductItem testProductItem = productItemList.get(productItemList.size() - 1);
        assertThat(testProductItem.getProductItemCode()).isEqualTo(UPDATED_PRODUCT_ITEM_CODE);
        assertThat(testProductItem.getProductItemName()).isEqualTo(UPDATED_PRODUCT_ITEM_NAME);
        assertThat(testProductItem.getProductItemValue()).isEqualTo(UPDATED_PRODUCT_ITEM_VALUE);
        assertThat(testProductItem.getProductItemDesc()).isEqualTo(UPDATED_PRODUCT_ITEM_DESC);
        assertThat(testProductItem.getProductItemUDF1()).isEqualTo(UPDATED_PRODUCT_ITEM_UDF_1);
        assertThat(testProductItem.getProductItemUDF2()).isEqualTo(UPDATED_PRODUCT_ITEM_UDF_2);
        assertThat(testProductItem.getProductItemUDF3()).isEqualTo(UPDATED_PRODUCT_ITEM_UDF_3);
        assertThat(testProductItem.getIsDeleted()).isEqualTo(UPDATED_IS_DELETED);

        // Validate the ProductItem in Elasticsearch
        verify(mockProductItemSearchRepository, times(1)).save(testProductItem);
    }

    @Test
    @Transactional
    public void updateNonExistingProductItem() throws Exception {
        int databaseSizeBeforeUpdate = productItemRepository.findAll().size();

        // Create the ProductItem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductItemMockMvc.perform(put("/api/product-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productItem)))
            .andExpect(status().isBadRequest());

        // Validate the ProductItem in the database
        List<ProductItem> productItemList = productItemRepository.findAll();
        assertThat(productItemList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProductItem in Elasticsearch
        verify(mockProductItemSearchRepository, times(0)).save(productItem);
    }

    @Test
    @Transactional
    public void deleteProductItem() throws Exception {
        // Initialize the database
        productItemRepository.saveAndFlush(productItem);

        int databaseSizeBeforeDelete = productItemRepository.findAll().size();

        // Get the productItem
        restProductItemMockMvc.perform(delete("/api/product-items/{id}", productItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductItem> productItemList = productItemRepository.findAll();
        assertThat(productItemList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProductItem in Elasticsearch
        verify(mockProductItemSearchRepository, times(1)).deleteById(productItem.getId());
    }

    @Test
    @Transactional
    public void searchProductItem() throws Exception {
        // Initialize the database
        productItemRepository.saveAndFlush(productItem);
        when(mockProductItemSearchRepository.search(queryStringQuery("id:" + productItem.getId())))
            .thenReturn(Collections.singletonList(productItem));
        // Search the productItem
        restProductItemMockMvc.perform(get("/api/_search/product-items?query=id:" + productItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].productItemCode").value(hasItem(DEFAULT_PRODUCT_ITEM_CODE.toString())))
            .andExpect(jsonPath("$.[*].productItemName").value(hasItem(DEFAULT_PRODUCT_ITEM_NAME.toString())))
            .andExpect(jsonPath("$.[*].productItemValue").value(hasItem(DEFAULT_PRODUCT_ITEM_VALUE)))
            .andExpect(jsonPath("$.[*].productItemDesc").value(hasItem(DEFAULT_PRODUCT_ITEM_DESC.toString())))
            .andExpect(jsonPath("$.[*].productItemUDF1").value(hasItem(DEFAULT_PRODUCT_ITEM_UDF_1.toString())))
            .andExpect(jsonPath("$.[*].productItemUDF2").value(hasItem(DEFAULT_PRODUCT_ITEM_UDF_2.toString())))
            .andExpect(jsonPath("$.[*].productItemUDF3").value(hasItem(DEFAULT_PRODUCT_ITEM_UDF_3.toString())))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductItem.class);
        ProductItem productItem1 = new ProductItem();
        productItem1.setId(1L);
        ProductItem productItem2 = new ProductItem();
        productItem2.setId(productItem1.getId());
        assertThat(productItem1).isEqualTo(productItem2);
        productItem2.setId(2L);
        assertThat(productItem1).isNotEqualTo(productItem2);
        productItem1.setId(null);
        assertThat(productItem1).isNotEqualTo(productItem2);
    }
}
