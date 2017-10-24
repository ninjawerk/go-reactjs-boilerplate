/**
 * Created by BeastSanchez on 10/22/2017
 */

package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/BeastSanchez/go-reactjs-boilerplate/middlewares"
	"github.com/BeastSanchez/go-reactjs-boilerplate/controllers"
)

func RegisterProtectedRoutes(r *gin.Engine){

	authGroup := r.Group("/auth")

	authGroup.Use(middlewares.AuthHandler("admin"))
	{
		authGroup.GET("/getmessage",controllers.GetSecretText)
	}
}
