package vn.vpay.repository.search;

import vn.vpay.domain.Wallet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Wallet entity.
 */
public interface WalletSearchRepository extends ElasticsearchRepository<Wallet, Long> {
}
