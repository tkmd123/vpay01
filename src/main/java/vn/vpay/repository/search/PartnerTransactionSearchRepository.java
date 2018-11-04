package vn.vpay.repository.search;

import vn.vpay.domain.PartnerTransaction;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PartnerTransaction entity.
 */
public interface PartnerTransactionSearchRepository extends ElasticsearchRepository<PartnerTransaction, Long> {
}
