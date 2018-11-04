package vn.vpay.repository.search;

import vn.vpay.domain.PartnerLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PartnerLog entity.
 */
public interface PartnerLogSearchRepository extends ElasticsearchRepository<PartnerLog, Long> {
}
