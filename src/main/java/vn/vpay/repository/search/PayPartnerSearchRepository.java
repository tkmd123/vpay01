package vn.vpay.repository.search;

import vn.vpay.domain.PayPartner;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PayPartner entity.
 */
public interface PayPartnerSearchRepository extends ElasticsearchRepository<PayPartner, Long> {
}
