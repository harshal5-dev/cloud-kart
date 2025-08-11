package com.cloudkart.user_service.dto;

import java.util.ArrayList;
import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserDataDto {

  List<RegisterUserDto> users = new ArrayList<>();

  @Schema(description = "Master key for user registration", example = "masterKey123")
  private String masterKey;

  List<CreateUserDto> adminUsers = new ArrayList<>();
}
