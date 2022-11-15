package com.niit.UserAuthentication.security;

import com.niit.UserAuthentication.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.Map;

@Service
public class SecurityTokenGeneratorImpl implements SecurityTokenGenerator{
    @Override
    public Map<String, String> generateToken(User user) {
        Map<String, String> tokenDetails = new HashMap<>();
        String token = Jwts.builder().setId(user.getUserEmail()).signWith(SignatureAlgorithm.HS256,
                "secretKey").compact();
        tokenDetails.put("token", token);
        tokenDetails.put("message", "User login has been validated");
        return tokenDetails;
    }
}
