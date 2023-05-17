CREATE TABLE tbl_Allowances (
AllowanceId INT PRIMARY KEY IDENTITY(1,1),
WageType NVARCHAR(50)
);

CREATE TABLE tbl_Employee (
EmployeeId INT PRIMARY KEY IDENTITY(1,1),
Name NVARCHAR(100),
PersonalNumber NVARCHAR(20) UNIQUE,
CNIC NVARCHAR(15) UNIQUE,
DOB DATE,
EntryDate DATE,
NTN NVARCHAR(50) UNIQUE,
Designation NVARCHAR(100),
PayScale NVARCHAR(50),
PayScaleType NVARCHAR(50),
BPS INT,
PayStage INT
);

CREATE TABLE tbl_EmployeeDetails (
EmployeeDetailsId INT PRIMARY KEY IDENTITY(1,1),
EmployeeId INT REFERENCES tbl_Employee(EmployeeId),
AccountNumber NVARCHAR(50),
BankDetails NVARCHAR(200),
PermanentAddress NVARCHAR(200),
PostingCity NVARCHAR(100),
Email NVARCHAR(100)
);

CREATE TABLE tbl_EmpAllowances (
EmpAllowanceId INT PRIMARY KEY IDENTITY(1,1),
EmployeeId INT REFERENCES tbl_Employee(EmployeeId),
AllowanceId INT REFERENCES tbl_Allowances(AllowanceId),
Amount MONEY,
CONSTRAINT UC_EmpAllowances UNIQUE(EmployeeId, AllowanceId)
);

CREATE TABLE tbl_Deductions (
DeductionId INT PRIMARY KEY IDENTITY(1,1),
EmployeeId INT REFERENCES tbl_Employee(EmployeeId),
WageType NVARCHAR(50),
Amount MONEY,
DeductionDate DATE
);

CREATE TABLE tbl_GPFund (
GPFundId INT PRIMARY KEY IDENTITY(1,1),
EmployeeId INT REFERENCES tbl_Employee(EmployeeId),
GPFAccountNo NVARCHAR(50),
Amount MONEY,
DeductionDate DATE
);

CREATE TABLE tbl_LoansAndAdvance (
LoanId INT PRIMARY KEY IDENTITY(1,1),
EmployeeId INT REFERENCES tbl_Employee(EmployeeId),
Description NVARCHAR(200),
Amount MONEY,
Date DATETIME,
IsFromGPF BIT
);

CREATE TABLE tbl_PayRoll (
PayRollId INT PRIMARY KEY IDENTITY(1,1),
PayRollSection NVARCHAR(100),
EmployeeId INT REFERENCES tbl_Employee(EmployeeId),
PayRollDate DATETIME,
CONSTRAINT UC_PayRoll UNIQUE(EmployeeId, PayRollDate)
);