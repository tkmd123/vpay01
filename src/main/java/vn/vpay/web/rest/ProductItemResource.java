package vn.vpay.web.rest;

import com.codahale.metrics.annotation.Timed;
import vn.vpay.domain.ProductItem;
import vn.vpay.repository.ProductItemRepository;
import vn.vpay.repository.search.ProductItemSearchRepository;
import vn.vpay.web.rest.errors.BadRequestAlertException;
import vn.vpay.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing ProductItem.
 */
@RestController
@RequestMapping("/api")
public class ProductItemResource {

    private final Logger log = LoggerFactory.getLogger(ProductItemResource.class);

    private static final String ENTITY_NAME = "productItem";

    private final ProductItemRepository productItemRepository;

    private final ProductItemSearchRepository productItemSearchRepository;

    public ProductItemResource(ProductItemRepository productItemRepository, ProductItemSearchRepository productItemSearchRepository) {
        this.productItemRepository = productItemRepository;
        this.productItemSearchRepository = productItemSearchRepository;
    }

    /**
     * POST  /product-items : Create a new productItem.
     *
     * @param productItem the productItem to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productItem, or with status 400 (Bad Request) if the productItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-items")
    @Timed
    public ResponseEntity<ProductItem> createProductItem(@Valid @RequestBody ProductItem productItem) throws URISyntaxException {
        log.debug("REST request to save ProductItem : {}", productItem);
        if (productItem.getId() != null) {
            throw new BadRequestAlertException("A new productItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductItem result = productItemRepository.save(productItem);
        productItemSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/product-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-items : Updates an existing productItem.
     *
     * @param productItem the productItem to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productItem,
     * or with status 400 (Bad Request) if the productItem is not valid,
     * or with status 500 (Internal Server Error) if the productItem couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-items")
    @Timed
    public ResponseEntity<ProductItem> updateProductItem(@Valid @RequestBody ProductItem productItem) throws URISyntaxException {
        log.debug("REST request to update ProductItem : {}", productItem);
        if (productItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductItem result = productItemRepository.save(productItem);
        productItemSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productItem.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-items : get all the productItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productItems in body
     */
    @GetMapping("/product-items")
    @Timed
    public List<ProductItem> getAllProductItems() {
        log.debug("REST request to get all ProductItems");
        return productItemRepository.findAll();
    }

    /**
     * GET  /product-items/:id : get the "id" productItem.
     *
     * @param id the id of the productItem to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productItem, or with status 404 (Not Found)
     */
    @GetMapping("/product-items/{id}")
    @Timed
    public ResponseEntity<ProductItem> getProductItem(@PathVariable Long id) {
        log.debug("REST request to get ProductItem : {}", id);
        Optional<ProductItem> productItem = productItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productItem);
    }

    /**
     * DELETE  /product-items/:id : delete the "id" productItem.
     *
     * @param id the id of the productItem to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductItem(@PathVariable Long id) {
        log.debug("REST request to delete ProductItem : {}", id);

        productItemRepository.deleteById(id);
        productItemSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/product-items?query=:query : search for the productItem corresponding
     * to the query.
     *
     * @param query the query of the productItem search
     * @return the result of the search
     */
    @GetMapping("/_search/product-items")
    @Timed
    public List<ProductItem> searchProductItems(@RequestParam String query) {
        log.debug("REST request to search ProductItems for query {}", query);
        return StreamSupport
            .stream(productItemSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
