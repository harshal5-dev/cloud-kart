package com.cloudkart.product_service.mapper;

import org.springframework.data.domain.Page;
import com.cloudkart.product_service.dto.PagedResDto;

public final class CommonMapper {

  public static <T> PagedResDto<T> mapToPagedResDto(Page<T> page) {
    PagedResDto<T> pagedResDto = new PagedResDto<>();

    pagedResDto.setContent(page.getContent());
    pagedResDto.setCurrentPage(page.getNumber());
    pagedResDto.setTotalPages(page.getTotalPages());
    pagedResDto.setTotalElements(page.getTotalElements());
    pagedResDto.setPageSize(page.getSize());
    pagedResDto.setLast(page.isLast());
    pagedResDto.setFirst(page.isFirst());

    return pagedResDto;
  }
}
