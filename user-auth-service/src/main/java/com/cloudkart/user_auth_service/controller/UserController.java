package com.cloudkart.user_auth_service.controller;

import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.user_auth_service.dto.AppErrorResponse;
import com.cloudkart.user_auth_service.dto.AppResponse;
import com.cloudkart.user_auth_service.dto.UserRequest;
import com.cloudkart.user_auth_service.dto.UserResponse;
import com.cloudkart.user_auth_service.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "User APIs",
    description = "This controller provides user-related operations such as fetching and updating user profiles.")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/users", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
@SecurityRequirement(name = "bearerAuth")
public class UserController {

  private final IUserService userService;


  @Operation(summary = "Get current user profile",
      description = "Fetches the profile of the currently authenticated user.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
              schema = @Schema(implementation = UserResponse.class))),
      @ApiResponse(responseCode = "401", description = "HTTP Status Unauthorized",
          content = @Content(schema = @Schema(implementation = AppErrorResponse.class))),
      @ApiResponse(responseCode = "403", description = "HTTP Status Forbidden",
          content = @Content(schema = @Schema(implementation = AppErrorResponse.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = AppErrorResponse.class)))})
  @GetMapping("/me")
  public ResponseEntity<AppResponse<UserResponse>> getCurrentUser(
      @RequestParam UUID userIdentifier) {
    UserResponse user = userService.getUserProfile(userIdentifier);
    AppResponse<UserResponse> response =
        new AppResponse<>(HttpStatus.OK, user, "User details fetched successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @Operation(summary = "Get user by ID", description = "Fetches a user by their unique ID.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
              schema = @Schema(implementation = UserResponse.class))),
      @ApiResponse(responseCode = "404", description = "HTTP Status Not Found",
          content = @Content(schema = @Schema(implementation = AppErrorResponse.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = AppErrorResponse.class)))})
  @PostMapping("/create")
  public ResponseEntity<AppResponse<UserResponse>> createUser(
      @Valid @RequestBody UserRequest userRequest) {
    UserResponse userResponse = userService.createUser(userRequest);

    AppResponse<UserResponse> response =
        new AppResponse<>(HttpStatus.CREATED, userResponse, "User created successfully");
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

}
