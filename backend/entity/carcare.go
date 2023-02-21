package entity

import (
	"time"

	"gorm.io/gorm"
)

type Carstat struct {
	gorm.Model
	Name string

	//For Link Foreign key
	Oders []Oder `gorm:"foreignKey:CarStatID"`
}

type Oder struct {
	gorm.Model
	SendDate   time.Time
	ReciveDate time.Time
	Bill       int
	Note       string
	SaveDate   time.Time

	// Save CarStat area ID in FK
	CarStatID *uint
	// to eaiser for add FK
	CarStat Carstat

	// Save Employee ID in FK
	EmployeeID *uint
	// to eaiser for add FK
	Employee Employee

	// Save VehicleInspection ID in FK
	VehicleInspectionID *uint
	// to eaiser for add FK
	VehicleInspection VehicleInspection
}
