package com.cloudkart.user_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CreateUserDataDto {

  List<RegisterUserDto> users = new ArrayList<>();

  @Schema(description = "Master key for user registration", example = "masterKey123")
  private String masterKey;
}
