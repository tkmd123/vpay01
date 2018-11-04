package vn.vpay.repository.search;

import vn.vpay.domain.ProductItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProductItem entity.
 */
public interface ProductItemSearchRepository extends ElasticsearchRepository<ProductItem, Long> {
}
