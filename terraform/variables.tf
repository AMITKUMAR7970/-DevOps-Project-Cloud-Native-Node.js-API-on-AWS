variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "app_name" {
  description = "Application name"
  default     = "advanced-devops-app"
}

variable "db_instance_type" {
  description = "MongoDB EC2 instance type"
  default     = "t3.micro"
}

variable "db_username" {
  description = "MongoDB username"
  default     = "admin"
}

variable "db_password" {
  description = "MongoDB password"
  default     = "password1234"
}

variable "vpc_cidr" {
  description = "VPC CIDR"
  default     = "10.0.0.0/16"
}