/**
 * Created by BeastSanchez on 10/22/2017
 */

package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/BeastSanchez/go-reactjs-boilerplate/middlewares"
)

const (
	RoleAdmin string = "admin"
	RoleProUser string = "pro-user"
)

func InitRouter(engine *gin.Engine) {
	engine.GET("/login",  middlewares.HandleLogin)
	RegisterProtectedRoutes(engine)
	RegisterPublicRoutes(engine)
	RegisterUtilityRoutes(engine)
}
