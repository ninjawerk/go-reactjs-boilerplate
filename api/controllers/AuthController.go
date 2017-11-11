/**
 * Created by VoidArtanis on 11/2/2017
 */

package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/middlewares"
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/models"
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/shared"
)

type AuthController struct{}

type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (this AuthController) HandleLogin(c *gin.Context) {
	db:= shared.GetDb()

	reqData := LoginRequest{}
	c.BindJSON(&reqData)

	// do user auth here
	user := models.User{}
	v:= db.Where("email = ? AND password = ?", reqData.Email, reqData.Password).First(&user)
	if err:=v.Error; err==nil{
		token, _ := middlewares.GenerateToken([]byte(middlewares.SigningKey), user )
		c.JSON(200, gin.H{
			"token": token,
		})
	}else{
		c.JSON(403, gin.H{
			"message": "invalid combination!",
		})
	}




}
