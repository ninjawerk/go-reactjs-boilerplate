/**
 * Created by VoidArtanis on 11/2/2017
 */

package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/shared"
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/models"
)

type UserController struct{}

type SignUpRequest struct {
	Username     string `json:"username" binding:"required"`
	PasswordHash string `json:"passwordHash" binding:"required"`
	Email string `json:"email" binding:"required"`
}


func (this UserController) UserSignUp(c *gin.Context) {
	db:= shared.GetDb()

	reqData := SignUpRequest{}
	c.BindJSON(&reqData)

	//fetch userroles
	role := models.UserRole{}
	db.Where("Name = ?", "User").First(&role)

	roles := []models.UserRole{
		role,
	}

	user := models.User{Username: reqData.Username, Email: reqData.Email, Password: reqData.PasswordHash, Roles:roles}
	db.Create(&user)

	c.JSON(200, gin.H{
		"message": "Successfully added user!",
		"user":    "Successfully added user!",
	})
}
