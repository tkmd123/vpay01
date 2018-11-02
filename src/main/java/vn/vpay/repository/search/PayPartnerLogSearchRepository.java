package vn.vpay.repository.search;

import vn.vpay.domain.PayPartnerLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PayPartnerLog entity.
 */
public interface PayPartnerLogSearchRepository extends ElasticsearchRepository<PayPartnerLog, Long> {
}
