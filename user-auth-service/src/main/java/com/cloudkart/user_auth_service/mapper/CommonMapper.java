package com.cloudkart.user_auth_service.mapper;

import org.springframework.data.domain.Page;
import com.cloudkart.user_auth_service.dto.PagedResponse;

public final class CommonMapper {

  private CommonMapper() {
    // Private constructor to prevent instantiation
  }

  public static <T> PagedResponse<T> mapToPagedResponse(Page<T> page) {
    PagedResponse<T> pagedResponse = new PagedResponse<>();

    pagedResponse.setContent(page.getContent());
    pagedResponse.setCurrentPage(page.getNumber());
    pagedResponse.setTotalPages(page.getTotalPages());
    pagedResponse.setTotalElements(page.getTotalElements());
    pagedResponse.setPageSize(page.getSize());
    pagedResponse.setLast(page.isLast());
    pagedResponse.setFirst(page.isFirst());

    return pagedResponse;
  }
}
