package vn.vpay.repository.search;

import vn.vpay.domain.WalletRuleRate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the WalletRuleRate entity.
 */
public interface WalletRuleRateSearchRepository extends ElasticsearchRepository<WalletRuleRate, Long> {
}
