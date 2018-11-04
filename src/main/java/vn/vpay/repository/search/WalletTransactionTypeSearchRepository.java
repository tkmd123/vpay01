package vn.vpay.repository.search;

import vn.vpay.domain.WalletTransactionType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the WalletTransactionType entity.
 */
public interface WalletTransactionTypeSearchRepository extends ElasticsearchRepository<WalletTransactionType, Long> {
}
