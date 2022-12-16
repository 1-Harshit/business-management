package main

import (
	"business-management/handler"
	_ "business-management/middleware"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

const (
	readTimeout  = 5 * time.Second
	writeTimeout = 10 * time.Second
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	engine := gin.New()
	// engine.Use(middleware.CORS())
	// engine.Use(middleware.Authenticator())

	handler.Router(engine)

	engine.Use(gin.Recovery())
	engine.Use(gin.Logger())

	server := &http.Server{
		Addr:         ":" + PORT,
		Handler:      engine,
		ReadTimeout:  readTimeout,
		WriteTimeout: writeTimeout,
	}

	log.Println("Server is starting on port " + PORT)

	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
