package com.cloudkart.api_gateway.service.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "user-auth-service")
public interface UserAuthFeignClient {

}
