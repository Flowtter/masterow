package api

import (
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func RunRouter() {
	r := echo.New()
	// r.Use(static.Serve("/", static.LocalFile("./ui/build", true)))
	// r.NoRoute(func(c echo.Context) {
	// 	c.File("./ui/build/index.html")
	// })

	r.Use(middleware.CORS())

	handleRanks(r)
	r.Start(":" + os.Getenv("PORT"))
}
