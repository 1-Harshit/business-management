package middleware

import (
	"business-management/util"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

var (
	jwtExpiration int
	signingKey    []byte
)

type CustomClaims struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}

func init() {
	jwtExpiration = 60 * 12
	if os.Getenv("JWT_PRIVATE_KEY") == "" {
		signingKey = []byte(util.GenerateRandom())
	} else {
		signingKey = []byte(os.Getenv("JWT_PRIVATE_KEY"))
	}
}

func GenerateToken(userID string) (string, error) {
	claims := CustomClaims{
		userID,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Duration(jwtExpiration) * time.Minute).Unix(),
			IssuedAt:  jwt.TimeFunc().Unix(),
			Issuer:    "ras",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(signingKey)
	return tokenString, err
}

func validateToken(encodedToken string) (string, error) {

	claims := &CustomClaims{}
	_, err := jwt.ParseWithClaims(encodedToken, claims, func(token *jwt.Token) (interface{}, error) {
		if _, isvalid := token.Method.(*jwt.SigningMethodHMAC); !isvalid {
			return nil, fmt.Errorf("invalid token %s", token.Header["alg"])
		}
		return []byte(signingKey), nil
	})

	if err != nil {
		return "", err
	}

	return claims.UserID, nil
}
