package com.cloudkart.product_service.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.cloudkart.product_service.dto.ProductDto;
import com.cloudkart.product_service.entity.Category;
import com.cloudkart.product_service.entity.Product;
import com.cloudkart.product_service.exception.ProductAlreadyExists;
import com.cloudkart.product_service.exception.ResourceNotFoundException;
import com.cloudkart.product_service.mapper.ProductMapper;
import com.cloudkart.product_service.repository.ProductRepository;
import com.cloudkart.product_service.service.ICategoryService;
import com.cloudkart.product_service.service.IProductService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

  private final ProductRepository productRepository;
  private final ICategoryService iCategoryService;

  /**
   * Counts the total number of products.
   *
   * @return the count of products
   */
  @Override
  public long countProducts() {
    return productRepository.count();
  }

  /**
   * Retrieves all products.
   *
   * @return a list of all products
   */
  @Override
  public List<ProductDto> fetchProducts() {
    List<Product> products = productRepository.findAll();
    return products.stream().map(ProductMapper::toDto).toList();
  }

  /**
   * Retrieves a product by its SKU.
   *
   * @param sku the SKU of the product to retrieve
   * @return the product with the specified SKU
   */
  @Override
  public ProductDto fetchProduct(String sku) {
    Product product = fetchProductBySku(sku);
    return ProductMapper.toDto(product);
  }

  /**
   * Retrieves a product by its SKU.
   *
   * @param sku the SKU of the product to retrieve
   * @return the product with the specified SKU
   */
  @Override
  public Product fetchProductBySku(String sku) {
    return productRepository.findBySku(sku)
        .orElseThrow(() -> new ResourceNotFoundException("Product", "sku", sku));
  }

  /**
   * Creates a new product.
   *
   * @param productDto the product to create
   * @return the created product
   */
  @Override
  public ProductDto createProduct(ProductDto productDto) {
    Category category = iCategoryService.fetchCategoryBySlug(productDto.getCategorySlug());

    if (productRepository.findBySku(productDto.getSku()).isPresent()) {
      throw new ProductAlreadyExists(
          "Product with SKU " + productDto.getSku() + " already exists.");
    }

    Product product = new Product();
    product.setCategory(category);

    ProductMapper.toModel(productDto, product);
    Product createdProduct = productRepository.save(product);

    return ProductMapper.toDto(createdProduct);
  }

  /**
   * Updates an existing product.
   *
   * @param sku the SKU of the product to update
   * @param productDto the updated product data
   * @return the updated product
   */
  @Override
  public ProductDto updateProduct(String sku, ProductDto productDto) {
    Optional<Product> optionalProduct = productRepository.findBySku(sku);

    if (optionalProduct.isEmpty()) {
      throw new ResourceNotFoundException("Product", "sku", sku);
    }

    Category category = iCategoryService.fetchCategoryBySlug(productDto.getCategorySlug());

    Product product = optionalProduct.get();
    boolean exists = productRepository.existsBySkuAndIdNot(productDto.getSku(), product.getId());

    if (exists) {
      throw new ProductAlreadyExists(
          "Product with SKU " + productDto.getSku() + " already exists.");
    }

    product.setCategory(category);
    ProductMapper.toModel(productDto, product);
    Product updatedProduct = productRepository.save(product);

    return ProductMapper.toDto(updatedProduct);
  }

  /**
   * Deletes a product by its SKU.
   *
   * @param sku the SKU of the product to delete
   */
  @Override
  public void deleteProduct(String sku) {
    Product product = productRepository.findBySku(sku)
        .orElseThrow(() -> new ResourceNotFoundException("Product", "sku", sku));
    productRepository.deleteById(product.getId());
  }
}
