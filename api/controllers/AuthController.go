/**
 * Created by VoidArtanis on 11/2/2017
 */

package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/middlewares"
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/shared"
)

type AuthController struct{}


func (this AuthController)HandleLogin(c *gin.Context) {
	userId:="123"
	username:="Beast"
	roles:= []string{shared.RoleAdmin, shared.RoleProUser}

	// do user auth here

	//issue token
	token, _ := middlewares.GenerateToken([]byte(middlewares.SigningKey), userId,username, roles)

	c.JSON(200, gin.H{
		"token": token,
	})
}
