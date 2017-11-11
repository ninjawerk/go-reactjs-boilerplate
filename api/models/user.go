/**
 * Created by desha on 10/24/2017
 */

package models

import "github.com/jinzhu/gorm"

type User struct {
	gorm.Model
	Username string
	Password string
	Email    string
	Avatar   string
	Roles []UserRole `gorm:"many2many:user_roles_map;"`
}