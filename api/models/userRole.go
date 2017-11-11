/**
 * Created by BeastSanchez on 11/9/2017
 */

package models

import "github.com/jinzhu/gorm"

type UserRole struct {
	gorm.Model
	Name  string
	Users []User     `gorm:"many2many:user_roles_map;"`
}
