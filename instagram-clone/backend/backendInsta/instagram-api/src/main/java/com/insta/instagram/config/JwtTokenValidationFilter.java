package com.insta.instagram.config;

import java.io.IOException;

import javax.crypto.SecretKey;
import com.insta.instagram.config.SecurityContext;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;
import java.util.List;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.*;


public class JwtTokenValidationFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String jwt=request.getHeader(SecurityContext.HEADER);
		//Bearer
		if(jwt != null) {
			try {
				jwt=jwt.substring(7);
				SecretKey key = Keys.hmacShaKeyFor(SecurityContext.JWT_KEY.getBytes());
				Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
				String username = String.valueOf(claims.get("username"));
				String authorities = (String) claims.get("authorities");
				
				List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
				
				Authentication auth = new UsernamePasswordAuthenticationToken(username,null, auths);
				
				SecurityContextHolder.getContext().setAuthentication(auth);
				
			} catch(Exception e) {
				throw new BadCredentialsException("Invalid token...");
			}
		
	  }
		
		filterChain.doFilter(request, response);

   }
	
	protected boolean shouldNotFilter(HttpServletRequest req) throws ServletException {
		return req.getServletPath().equals("/signin");
	}
}
