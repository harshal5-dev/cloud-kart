package com.cloudkart.product_service.dto;

import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "PagedResDto", description = "Schema to represent paginated response data")
public class PagedResDto<T> {

  @Schema(name = "content", type = "array", implementation = Object.class,
      description = "List of content items for the current page")
  private List<T> content;

  @Schema(description = "Current page number", example = "1")
  private int currentPage;

  @Schema(description = "Total number of pages available", example = "10")
  private int totalPages;

  @Schema(description = "Total number of elements across all pages", example = "100")
  private long totalElements;

  @Schema(description = "Size of each page", example = "10")
  private int pageSize;

  @Schema(description = "Indicates if there is a next page available", example = "true")
  private boolean last;

  @Schema(description = "Indicates if there is a previous page available", example = "false")
  private boolean first;

}
