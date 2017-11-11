/**
 * Created by BeastSanchez on 11/9/2017
 */

package models

import (
	"github.com/VoidArtanis/go-reactjs-boilerplate/api/shared"
)

func MigrateModels(){
	db:=shared.GetDb()
	db.AutoMigrate(&User{})
	db.AutoMigrate(&UserRole{})
}