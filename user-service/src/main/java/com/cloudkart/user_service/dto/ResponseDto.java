package com.cloudkart.user_service.dto;

import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "Response", description = "Schema to hold successful response information")
public class ResponseDto<T> {

        @Schema(description = "Status code in the response")
        private HttpStatus status;

        @Schema(description = "client response data")
        private T data;

        @Schema(description = "time when the response was created")
        private LocalDateTime timestamp;

        @Schema(description = "Status message in the response")
        private String statusMessage;

        public ResponseDto(HttpStatus status, T data, String statusMessage) {
                this.status = status;
                this.data = data;
                this.statusMessage = statusMessage;
                this.timestamp = LocalDateTime.now();
        }
}
