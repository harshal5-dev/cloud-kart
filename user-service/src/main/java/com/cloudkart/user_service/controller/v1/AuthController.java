package com.cloudkart.user_service.controller.v1;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cloudkart.user_service.dto.ErrorResponseDto;
import com.cloudkart.user_service.dto.RegisterUserDto;
import com.cloudkart.user_service.dto.ResponseDto;
import com.cloudkart.user_service.dto.UserDto;
import com.cloudkart.user_service.service.IAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Authentication APIs",
                description = "This controller provides authentication-related operations such as user registration.")
@RestController
@RequestMapping(path = "/api/v1/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Validated
public class AuthController {

        private final IAuthService authService;

        @Operation(summary = "Register a new user",
                        description = "Registers a new user in the system with the provided details.")
        @ApiResponses({@ApiResponse(responseCode = "201",
                        description = "User registered successfully",
                        content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                                        schema = @Schema(implementation = UserDto.class))),
                        @ApiResponse(responseCode = "400",
                                        description = "Bad Request - Invalid input data",
                                        content = @Content(schema = @Schema(
                                                        implementation = ErrorResponseDto.class))),
                        @ApiResponse(responseCode = "500",
                                        description = "Internal Server Error - Unable to register user",
                                        content = @Content(schema = @Schema(
                                                        implementation = ErrorResponseDto.class)))})
        @PostMapping("/register")
        public ResponseEntity<ResponseDto<UserDto>> registerUser(
                        @Valid @RequestBody RegisterUserDto registerUserDto) {
                UserDto userDto = authService.registerUser(registerUserDto);
                ResponseDto<UserDto> response = new ResponseDto<>(HttpStatus.CREATED, userDto,
                                "User registered successfully");
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

}
