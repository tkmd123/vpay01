package vn.vpay.repository.search;

import vn.vpay.domain.WalletTransaction;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the WalletTransaction entity.
 */
public interface WalletTransactionSearchRepository extends ElasticsearchRepository<WalletTransaction, Long> {
}
