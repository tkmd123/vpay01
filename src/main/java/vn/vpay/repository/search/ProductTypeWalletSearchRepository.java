package vn.vpay.repository.search;

import vn.vpay.domain.ProductTypeWallet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProductTypeWallet entity.
 */
public interface ProductTypeWalletSearchRepository extends ElasticsearchRepository<ProductTypeWallet, Long> {
}
