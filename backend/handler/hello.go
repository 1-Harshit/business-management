package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HelloWorldController(c *gin.Context) {
	x := c.Query("name")
	c.JSON(http.StatusOK, gin.H{
		"message": "Hello World!"+x,
	})
}
