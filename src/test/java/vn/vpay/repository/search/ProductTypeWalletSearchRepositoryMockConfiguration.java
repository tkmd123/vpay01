package vn.vpay.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of ProductTypeWalletSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ProductTypeWalletSearchRepositoryMockConfiguration {

    @MockBean
    private ProductTypeWalletSearchRepository mockProductTypeWalletSearchRepository;

}
