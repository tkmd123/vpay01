package vn.vpay.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * Product: VN: 50k, VN: 100k
 * VT: 50k, VT: 100k
 */
@ApiModel(description = "Product: VN: 50k, VN: 100k VT: 50k, VT: 100k")
@Entity
@Table(name = "product_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "productitem")
public class ProductItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "product_item_code", nullable = false)
    private String productItemCode;

    @NotNull
    @Column(name = "product_item_name", nullable = false)
    private String productItemName;

    @Column(name = "product_item_value")
    private Integer productItemValue;

    @Column(name = "product_item_desc")
    private String productItemDesc;

    @Column(name = "product_item_udf_1")
    private String productItemUDF1;

    @Column(name = "product_item_udf_2")
    private String productItemUDF2;

    @Column(name = "product_item_udf_3")
    private String productItemUDF3;

    @NotNull
    @Column(name = "is_deleted", nullable = false)
    private Integer isDeleted;

    @ManyToOne
    @JsonIgnoreProperties("productProductItems")
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductItemCode() {
        return productItemCode;
    }

    public ProductItem productItemCode(String productItemCode) {
        this.productItemCode = productItemCode;
        return this;
    }

    public void setProductItemCode(String productItemCode) {
        this.productItemCode = productItemCode;
    }

    public String getProductItemName() {
        return productItemName;
    }

    public ProductItem productItemName(String productItemName) {
        this.productItemName = productItemName;
        return this;
    }

    public void setProductItemName(String productItemName) {
        this.productItemName = productItemName;
    }

    public Integer getProductItemValue() {
        return productItemValue;
    }

    public ProductItem productItemValue(Integer productItemValue) {
        this.productItemValue = productItemValue;
        return this;
    }

    public void setProductItemValue(Integer productItemValue) {
        this.productItemValue = productItemValue;
    }

    public String getProductItemDesc() {
        return productItemDesc;
    }

    public ProductItem productItemDesc(String productItemDesc) {
        this.productItemDesc = productItemDesc;
        return this;
    }

    public void setProductItemDesc(String productItemDesc) {
        this.productItemDesc = productItemDesc;
    }

    public String getProductItemUDF1() {
        return productItemUDF1;
    }

    public ProductItem productItemUDF1(String productItemUDF1) {
        this.productItemUDF1 = productItemUDF1;
        return this;
    }

    public void setProductItemUDF1(String productItemUDF1) {
        this.productItemUDF1 = productItemUDF1;
    }

    public String getProductItemUDF2() {
        return productItemUDF2;
    }

    public ProductItem productItemUDF2(String productItemUDF2) {
        this.productItemUDF2 = productItemUDF2;
        return this;
    }

    public void setProductItemUDF2(String productItemUDF2) {
        this.productItemUDF2 = productItemUDF2;
    }

    public String getProductItemUDF3() {
        return productItemUDF3;
    }

    public ProductItem productItemUDF3(String productItemUDF3) {
        this.productItemUDF3 = productItemUDF3;
        return this;
    }

    public void setProductItemUDF3(String productItemUDF3) {
        this.productItemUDF3 = productItemUDF3;
    }

    public Integer getIsDeleted() {
        return isDeleted;
    }

    public ProductItem isDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
        return this;
    }

    public void setIsDeleted(Integer isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Product getProduct() {
        return product;
    }

    public ProductItem product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProductItem productItem = (ProductItem) o;
        if (productItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductItem{" +
            "id=" + getId() +
            ", productItemCode='" + getProductItemCode() + "'" +
            ", productItemName='" + getProductItemName() + "'" +
            ", productItemValue=" + getProductItemValue() +
            ", productItemDesc='" + getProductItemDesc() + "'" +
            ", productItemUDF1='" + getProductItemUDF1() + "'" +
            ", productItemUDF2='" + getProductItemUDF2() + "'" +
            ", productItemUDF3='" + getProductItemUDF3() + "'" +
            ", isDeleted=" + getIsDeleted() +
            "}";
    }
}
