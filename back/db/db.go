package db

import (
	"fmt"
	"log"
	"os"

	"github.com/raeinsoltani/gorello/back/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	var err error
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is not set")
	}
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database!", err)
	}
	fmt.Println("Database connected")

	err = DB.AutoMigrate(&models.User{}, &models.UserWorkspaceRole{}, &models.Workspace{}, &models.Task{})
	if err != nil {
		log.Fatal("Failed to migrate database!", err)
	}
	fmt.Println("Database Migrated")
}
