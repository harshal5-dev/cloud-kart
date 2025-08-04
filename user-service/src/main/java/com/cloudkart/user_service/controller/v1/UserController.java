package com.cloudkart.user_service.controller.v1;

import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.user_service.dto.ErrorResponseDto;
import com.cloudkart.user_service.dto.ResponseDto;
import com.cloudkart.user_service.dto.UpdateUserDto;
import com.cloudkart.user_service.dto.UserDto;
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

@Tag(name = "User APIs",
    description = "This controller provides user-related operations such as fetching and updating user profiles.")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/users", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
@SecurityRequirement(name = "bearerAuth")
public class UserController {

  private final IUserService userService;
  private final ICommonUtil commonUtil;

  @Operation(summary = "Get current user profile",
      description = "Fetches the profile of the currently authenticated user.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
              schema = @Schema(implementation = UserDto.class))),
      @ApiResponse(responseCode = "401", description = "HTTP Status Unauthorized",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "403", description = "HTTP Status Forbidden",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @GetMapping("/me")
  public ResponseEntity<ResponseDto<UserDto>> getCurrentUser(Authentication authentication) {
    String keycloakId = commonUtil.extractKeycloakUserId(authentication);
    UserDto user = userService.getUserProfile(keycloakId);
    ResponseDto<UserDto> responseDto =
        new ResponseDto<>(HttpStatus.OK, user, "User details fetched successfully");
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }

  @Operation(summary = "Update current user profile",
      description = "Updates the profile of the currently authenticated user.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "HTTP Status OK",
          content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
              schema = @Schema(implementation = UserDto.class))),
      @ApiResponse(responseCode = "400", description = "HTTP Status Bad Request",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "401", description = "HTTP Status Unauthorized",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "403", description = "HTTP Status Forbidden",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))),
      @ApiResponse(responseCode = "500", description = "HTTP Status Internal Server Error",
          content = @Content(schema = @Schema(implementation = ErrorResponseDto.class)))})
  @PutMapping("/me/{keycloakId}")
  public ResponseEntity<ResponseDto<UserDto>> updateCurrentUser(@PathVariable String keycloakId,
      @Valid @RequestBody UpdateUserDto updateUserDto, Authentication authentication) {
    Set<String> userRoles = commonUtil.extractUserRoles(authentication);
    String keycloakUserId = commonUtil.extractKeycloakUserId(authentication);

    if (!keycloakId.equals(keycloakUserId) && !userRoles.contains("ROLE_ADMIN")) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseDto<>(
          HttpStatus.FORBIDDEN, null, "You do not have permission to update this user"));
    }

    UserDto updatedUser = userService.updateUserProfile(keycloakId, updateUserDto);
    ResponseDto<UserDto> responseDto =
        new ResponseDto<>(HttpStatus.OK, updatedUser, "User profile updated successfully");
    return ResponseEntity.status(HttpStatus.OK).body(responseDto);
  }
}
