package com.cloudkart.user_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "UserSearchCriteria",
    description = "Schema to represent user search criteria in the system")
public class UserSearchCriteria {

  @Schema(description = "Search term to filter users by username or email", example = "john")
  private String searchTerm;
}
