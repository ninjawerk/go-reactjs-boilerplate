/**
 * Created by BeastSanchez on 10/22/2017
 */

package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/BeastSanchez/go-reactjs-boilerplate/api/controllers"
)

func RegisterPublicRoutes(r *gin.Engine){

	r.GET("/publicmessage", controllers.GetPublicText)
}

