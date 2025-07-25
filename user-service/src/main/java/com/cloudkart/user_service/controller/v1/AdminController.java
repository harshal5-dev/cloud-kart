package com.cloudkart.user_service.controller.v1;

import com.cloudkart.user_service.dto.*;
import com.cloudkart.user_service.service.ICreateUserData;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.user_service.service.IAuthService;
import com.cloudkart.user_service.service.IUserService;
import com.cloudkart.user_service.util.ICommonUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Admin APIs",
    description = "This controller provides administrative operations such as user management.")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/admin", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
@SecurityRequirement(name = "bearerAuth")
public class AdminController {
  private final IUserService userService;
  private final ICommonUtil commonUtil;
  private final IAuthService authService;
  private final ICreateUserData createUserData;


  @Operation(summary = "Get all users",
      description = "Fetches all users with optional search criteria and pagination.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
              schema = @Schema(implementation = PagedResDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/users/search")
  public ResponseEntity<PagedResDto<UserDto>> getAllUsers(
      @RequestParam(required = false) String searchTerm, @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy,
      @RequestParam(defaultValue = "asc") String sortDir, Authentication authentication) {
    String keycloakUserId = commonUtil.extractKeycloakUserId(authentication);
    UserSearchCriteria criteria = new UserSearchCriteria();
    if (searchTerm != null && !searchTerm.isEmpty()) {
      criteria.setSearchTerm(searchTerm);
    }

    Pageable pageable =
        PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDir), sortBy));

    PagedResDto<UserDto> users = userService.fetchAllUsers(keycloakUserId, criteria, pageable);
    return ResponseEntity.status(HttpStatus.OK).body(users);
  }

  @Operation(summary = "Get user by ID", description = "Fetches a user by their unique ID.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
              schema = @Schema(implementation = UserDto.class))),
      @ApiResponse(responseCode = "404", description = "HTTP Status Not Found",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PostMapping("/users/create")
  public ResponseEntity<ResponseDto<UserDto>> createUser(
      @Valid @RequestBody CreateUserDto createUserDto) {
    UserDto userDto = authService.createUser(createUserDto);

    ResponseDto<UserDto> response =
        new ResponseDto<>(HttpStatus.CREATED, userDto, "User created successfully");
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @Operation(summary = "Update user profile",
      description = "Updates the profile of a user identified by their unique ID.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
              schema = @Schema(implementation = UserDto.class))),
      @ApiResponse(responseCode = "404", description = "HTTP Status Not Found",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "400", description = "HTTP Status Bad Request",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),})
  @PutMapping("/users/{userId}/update")
  public ResponseEntity<ResponseDto<UserDto>> updateUser(@PathVariable String userId,
      @Valid @RequestBody UpdateUserDto updateUserDto) {
    UserDto updatedUser = userService.updateUser(userId, updateUserDto);

    ResponseDto<UserDto> response =
        new ResponseDto<>(HttpStatus.OK, updatedUser, "User updated successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }


  @Operation(summary = "Delete user by ID",
      description = "Deletes a user identified by their unique ID from the system.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
              schema = @Schema(implementation = Void.class))),
      @ApiResponse(responseCode = "404", description = "HTTP Status Not Found",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @DeleteMapping("/users/{userId}/delete")
  public ResponseEntity<ResponseDto<Void>> deleteUser(@PathVariable String userId) {
    userService.deleteUserById(userId);

    ResponseDto<Void> response =
        new ResponseDto<>(HttpStatus.OK, null, "User deleted successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @Operation(summary = "Create user data",
      description = "Creates user data for all users.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
              schema = @Schema(implementation = Void.class))),
      @ApiResponse(responseCode = "404", description = "HTTP Status Not Found",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PostMapping("/users/data/create")
  public ResponseEntity<ResponseDto<Void>> createUserData(
      @RequestBody @Valid CreateUserDataDto data) {
    createUserData.createUserData(data);

    ResponseDto<Void> response =
        new ResponseDto<>(HttpStatus.OK, null, "User data created successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
