output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "ecr_repository_url" {
  value = aws_ecr_repository.app.repository_url
}

output "mongo_connection_string" {
  value = "mongodb://${var.db_username}:${var.db_password}@${aws_instance.mongo.private_ip}:27017/admin"
}

output "ecs_service_name" {
  value = aws_ecs_service.app.name
}