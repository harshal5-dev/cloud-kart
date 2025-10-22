package com.cloudkart.product_service.controller.v1;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.product_service.constants.ProductConstants;
import com.cloudkart.product_service.dto.ErrorResponseDto;
import com.cloudkart.product_service.dto.PagedResDto;
import com.cloudkart.product_service.dto.ProductDto;
import com.cloudkart.product_service.dto.ProductResDto;
import com.cloudkart.product_service.dto.ResponseDto;
import com.cloudkart.product_service.service.IPublicProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;

@Tag(name = "Public REST APIs for Product in Cloud Kart",
        description = "REST APIs in Cloud kart to FETCH, searching, sorting and filtering product details.")
@RestController
@RequestMapping(path = "/api/v1/products", produces = {MediaType.APPLICATION_JSON_VALUE})
public class PublicProductController {

    private final IPublicProductService iPublicProductService;

    public PublicProductController(IPublicProductService iPublicProductService) {
        this.iPublicProductService = iPublicProductService;
    }

    @Operation(summary = "Search Products REST API",
            description = "REST API to search products with various filters like category, keyword, brand, price range, and pagination.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK",
                    content = @Content(schema = @Schema(implementation = PagedResDto.class))),
            @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
                    content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
    @GetMapping
    public ResponseEntity<PagedResDto<ProductResDto>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        PagedResDto<ProductResDto> response = iPublicProductService.searchProducts(category,
                keyword, brand, minPrice, maxPrice, page, size, sortBy, sortDir);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Fetch Products for Landing Page REST API",
            description = "REST API to fetch products for the landing page based on type and limit.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK", content = @Content(
                    array = @ArraySchema(schema = @Schema(implementation = ProductResDto.class)))),
            @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
                    content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
    @GetMapping("/landing")
    public ResponseEntity<List<ProductResDto>> getLandingPageProducts(
            @RequestParam(defaultValue = "latest") String type,
            @RequestParam(defaultValue = "8") int limit) {
        List<ProductResDto> response = iPublicProductService.getLandingPageProducts(type, limit);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Fetch Product Details REST API",
            description = "REST API to fetch Product details based on a slug")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "HTTP Status OK",
                    content = @Content(schema = @Schema(implementation = ProductDto.class))),
            @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
                    content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
    @GetMapping("/{sku}")
    public ResponseEntity<ResponseDto<ProductDto>> fetchProduct(
            @PathVariable @NotNull(message = "sku cannot be null or empty") String sku) {
        ProductDto product = iPublicProductService.fetchProduct(sku);
        ResponseDto<ProductDto> responseDto =
                new ResponseDto<>(HttpStatus.OK, product, ProductConstants.MESSAGE_FETCHED);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
