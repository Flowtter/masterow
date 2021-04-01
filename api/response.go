package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func responseToRequestOK(c *gin.Context, err error) {
	dataMap := gin.H{
		"code":    http.StatusOK,
		"status":  "sucess",
		"payload": nil,
	}
	if err != nil {
		dataMap["error"] = err.Error()
	}
	c.JSON(http.StatusOK, dataMap)
}
