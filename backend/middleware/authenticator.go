package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func Authenticator() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authorizationHeader := ctx.GetHeader("authorization")
		if len(authorizationHeader) == 0 {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized,
				gin.H{"error": "authorization header is not provided"})
			return
		}

		fields := strings.Fields(authorizationHeader)
		if len(fields) < 2 {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized,
				gin.H{"error": "invalid authorization header format"})
			return
		}

		authorizationType := strings.ToLower(fields[0])
		if authorizationType != ("bearer") {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized,
				gin.H{"error": "bearer not found"})
			return
		}

		userID, err := validateToken(fields[1])
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized,
				gin.H{"error": "invalid token"})
			return
		}

		ctx.Set("userID", userID)
		ctx.Next()
	}
}

func GetUserID(ctx *gin.Context) string {
	return ctx.GetString("userID")
}
