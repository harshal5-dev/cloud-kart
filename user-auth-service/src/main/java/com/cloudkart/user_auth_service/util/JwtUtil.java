package com.cloudkart.user_auth_service.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

  @Value("${jwt.secret.key}")
  private String SECRET_KEY;
  @Value("${jwt.expiration}")
  private long EXPIRATION_TIME;

  /**
   * Generate token with roles/authorities
   * 
   * @param username the username/email
   * @param roles list of role names (e.g., ["ROLE_USER", "ROLE_ADMIN"])
   * @return JWT token
   */
  public String generateToken(String username, List<String> roles) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("roles", roles);
    return createToken(username, claims);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  /**
   * Extract roles from token
   * 
   * @param token JWT token
   * @return list of roles
   */
  @SuppressWarnings("unchecked")
  public List<String> extractRoles(String token) {
    return extractClaim(token, claims -> (List<String>) claims.get("roles"));
  }

  public boolean validateToken(String token, String username) {
    final String tokenUsername = extractUsername(token);
    return (tokenUsername.equals(username) && !isTokenExpired(token));
  }

  public boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private String createToken(String username, Map<String, Object> claims) {
    long now = System.currentTimeMillis();
    SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    return Jwts.builder().claims(claims).subject(username).issuedAt(new Date(now))
        .expiration(new Date(now + EXPIRATION_TIME)).signWith(key, SIG.HS256).compact();
  }

  private Claims extractAllClaims(String token) {
    SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
  }

}
