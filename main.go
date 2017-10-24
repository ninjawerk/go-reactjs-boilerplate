/**
 * Created by BeastSanchez on 10/22/2017
 */

package main

import (
	"github.com/gin-gonic/gin"
	"github.com/BeastSanchez/go-reactjs-boilerplate/routes"
)

var DB = make(map[string]string)

func main() {
	r := gin.Default()
	routes.InitRouter(r)

	r.Run(":8080")
}