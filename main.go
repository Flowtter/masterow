package main

import (
	"github.com/Flowtter/masterow/api"
	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load()
}

func main() {
	api.RunRouter()
}
