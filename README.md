# 🚀 Advanced DevOps Project: Cloud-Native Node.js API on AWS

Welcome to a hands-on, production-grade DevOps project that demonstrates the seamless integration of application development, infrastructure as code, containerization, automation, testing, and monitoring—all using industry-standard tools like **Docker**, **Terraform**, **GitHub Actions**, **Prometheus**, **Grafana**, and **AWS ECS**.

---

## 📚 Table of Contents

- [Project Summary](#project-summary)
- [Architecture Overview](#architecture-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Project Structure](#project-structure)
  - [Quick Start](#quick-start)
- [Development & Testing](#development--testing)
- [Containerization & Local Deployment](#containerization--local-deployment)
- [Infrastructure Automation](#infrastructure-automation)
- [CI/CD Pipeline](#cicd-pipeline)
- [Observability & Monitoring](#observability--monitoring)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Customization and Extensibility](#customization-and-extensibility)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Project Summary

This repository is an end-to-end template for deploying a scalable Node.js REST API with MongoDB to AWS ECS Fargate using Terraform. The project emphasizes:

- **Modern DevOps workflows** (CI/CD, IaC, containerization)
- **Cloud-native architecture** with best practices
- **Automated application testing and monitoring**
- **Easy extensibility** for your real-world workloads

---

## Architecture Overview

The system architecture is visualized below:

![Project Architecture](docs/architecture.png)

**Highlights:**

- **Node.js API** (containerized) served via AWS ECS (Fargate)
- **MongoDB** provisioned on an isolated EC2 instance (for demo; upgrade to DocumentDB for production)
- **ECR** for storing Docker images
- **Terraform** provisioning all AWS resources (networking, compute, security, IAM, etc.)
- **GitHub Actions** for CI/CD automation
- **Prometheus & Grafana** for metrics and dashboarding
- **AWS CloudWatch** for centralized logging

---

## Features

- 🚢 **Full Containerization** for app and database
- ⚡ **Automated Infrastructure Provisioning** with Terraform
- 👨‍💻 **Automated Testing** for API endpoints using Jest & Supertest
- 🔄 **CI/CD Pipeline**: code tested, built, and deployed on every push
- 📊 **Monitoring**: Prometheus metrics and Grafana dashboards
- 🔐 **Secure Networking** with VPC, subnets, and security groups
- 📦 **Cloud-Native Ready**: Easily swap MongoDB for DocumentDB or add autoscaling
- 🧩 **Extensible**: Drop in your own Node.js/Flask/Go app

---

## Getting Started

### Prerequisites

- AWS account with IAM permissions for ECS, EC2, VPC, ECR, and IAM management
- [Terraform](https://www.terraform.io/downloads.html) (v1.0+)
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (for local dev/testing)
- [GitHub CLI](https://cli.github.com/) (optional, for secrets)
- AWS CLI configured (`aws configure`)
- Create GitHub repository secrets:  
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`

---

### Project Structure

```
advanced-devops-project/
├── app/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── __tests__/
│       └── api.test.js
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── provider.tf
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── prometheus/
│   ├── prometheus.yml
│   └── Dockerfile
├── docker-compose.monitoring.yml
├── docs/
│   └── architecture.png
└── README.md
```

---

### Quick Start

#### 1. **Clone the Repository**

```sh
git clone https://github.com/<your-username>/advanced-devops-project.git
cd advanced-devops-project
```

#### 2. **Local Development & Testing**

```sh
cd app
npm install
npm test       # runs automated API tests
npm start      # start the API on http://localhost:3000
```

#### 3. **Containerize the Application**

```sh
docker build -t advanced-devops-app .
docker run -p 3000:3000 --env MONGO_URI=<your-mongo-uri> advanced-devops-app
```

#### 4. **Infrastructure Provisioning with Terraform**

```sh
cd terraform
terraform init
terraform plan
terraform apply
```
*Note: Outputs will include the ECS service name and MongoDB connection string.*

#### 5. **Monitoring Stack (Local, Optional)**

```sh
docker-compose -f docker-compose.monitoring.yml up
# Access Prometheus at http://localhost:9090
# Access Grafana at http://localhost:3001 (login: admin/admin)
```

---

## Development & Testing

- API endpoints are tested using Jest and Supertest (`npm test`).
- Add your own tests in `app/__tests__/`.

---

## Containerization & Local Deployment

- The app is fully containerized via the provided Dockerfile.
- You can override the MongoDB connection with the `MONGO_URI` environment variable.

---

## Infrastructure Automation

- Terraform scripts in `/terraform` will provision:
  - VPC, subnets, security groups
  - ECS Cluster & Service (Fargate)
  - ECR repository for Docker images
  - EC2 instance for MongoDB (for demo)
  - IAM roles and policies

---

## CI/CD Pipeline

- **GitHub Actions** workflow triggers on every push to `main`:
  1. Runs tests (`npm test`)
  2. Builds and pushes Docker image to ECR
  3. Applies Terraform to update AWS infrastructure
  4. Deploys new app version to ECS

Add your AWS credentials as repository secrets.

---

## Observability & Monitoring

- The app exposes [Prometheus](https://github.com/siimon/prom-client) metrics at `/metrics`.
- Sample Prometheus and Grafana setup included for local dashboards.
- ECS logs are shipped to AWS CloudWatch for centralized logging.

---

## API Endpoints

| Method | Path        | Description          |
|--------|-------------|---------------------|
| GET    | `/`         | Health check        |
| GET    | `/items`    | List all items      |
| POST   | `/items`    | Add new item        |
| GET    | `/metrics`  | Prometheus metrics  |

---

## Environment Variables

| Name        | Purpose                        | Default                  |
|-------------|-------------------------------|--------------------------|
| MONGO_URI   | MongoDB connection string     | mongodb://localhost:27017/devopsdb |
| PORT        | API server port               | 3000                     |

---

## Customization and Extensibility

- Swap `app/` for your own Node.js, Flask, or Go app—just expose health and `/metrics` endpoints!
- Upgrade to managed MongoDB (AWS DocumentDB) for production
- Add more tests or monitoring as your use-case grows

---

## Troubleshooting

- **Failed Terraform apply?** Check your AWS credentials and permissions.
- **App can't connect to MongoDB?** Ensure the DB is running and accessible via the security group.
- **Containers don't start?** Check logs in ECS and CloudWatch.
- **Prometheus/Grafana issues?** Confirm ports and service health in Docker Compose.

---

## License

This project is licensed under the MIT License.  
Feel free to use, adapt, and share!

---

**Build, test, automate, and monitor—your cloud-native journey starts here.**
