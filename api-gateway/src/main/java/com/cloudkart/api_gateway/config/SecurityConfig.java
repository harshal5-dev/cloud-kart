package com.cloudkart.api_gateway.config;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import com.cloudkart.api_gateway.security.CustomAccessDeniedHandler;
import com.cloudkart.api_gateway.security.CustomAuthenticationEntryPoint;
import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
  private final CustomAuthenticationEntryPoint authenticationEntryPoint;
  private final CustomAccessDeniedHandler accessDeniedHandler;

  private static final Logger log = org.slf4j.LoggerFactory.getLogger(SecurityConfig.class);

  public SecurityConfig(CustomAuthenticationEntryPoint authenticationEntryPoint,
      CustomAccessDeniedHandler accessDeniedHandler) {
    this.authenticationEntryPoint = authenticationEntryPoint;
    this.accessDeniedHandler = accessDeniedHandler;
  }

  @Bean
  public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    return http.csrf(ServerHttpSecurity.CsrfSpec::disable)
        .exceptionHandling(exceptionHandling -> exceptionHandling
            .authenticationEntryPoint(authenticationEntryPoint)
            .accessDeniedHandler(accessDeniedHandler))
        .authorizeExchange(auth -> auth.pathMatchers("/actuator/**").permitAll()
            .pathMatchers("/api/v1/categories/**", "/api/v1/products/**", "/api/v1/auth/**")
            .permitAll()
            .pathMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**",
                "/webjars/**")
            .permitAll().pathMatchers("/api/v1/admin/categories/**", "/api/v1/admin/products/**")
            .hasAnyRole("ADMIN", "MANAGER").pathMatchers("/api/v1/admin/**").hasRole("ADMIN")
            .pathMatchers("/api/v1/users/**").hasAnyRole("USER", "ADMIN", "MANAGER").anyExchange()
            .authenticated())
        .oauth2ResourceServer(oAuth2 -> oAuth2
            .jwt(jwtSpec -> jwtSpec.jwtAuthenticationConverter(jwtAuthenticationConverter())))
        .build();
  }

  @Bean
  public Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtAuthenticationConverter() {
    return jwt -> {
      Collection<GrantedAuthority> authorities = extractAuthorities(jwt);
      return Mono.just(new JwtAuthenticationToken(jwt, authorities));
    };
  }

  public Collection<GrantedAuthority> extractAuthorities(Jwt jwt) {
    try {
      Map<String, Object> realmAccess = jwt.getClaim("realm_access");
      if (realmAccess == null) {
        return Collections.emptyList();
      }

      Object rolesObject = realmAccess.get("roles");
      if (rolesObject instanceof Collection<?> roleCollection) {
        return roleCollection.stream().filter(String.class::isInstance).map(String.class::cast)
            .map(role -> "ROLE_" + role.toUpperCase()).map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());
      }
      return Collections.emptyList();
    } catch (Exception e) {
      log.warn("Failed to convert JWT roles to authorities", e);
      return Collections.emptyList();
    }
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:5173"));
    configuration
        .setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
    configuration.setExposedHeaders(List.of("x-auth-token"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
