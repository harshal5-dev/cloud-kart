package com.cloudkart.api_gateway.dto;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppConfigDto {

  private List<String> frontendUrls;

  public List<String> getFrontendUrls() {
    return frontendUrls;
  }

  public void setFrontendUrls(List<String> frontendUrls) {
    this.frontendUrls = frontendUrls;
  }

}
