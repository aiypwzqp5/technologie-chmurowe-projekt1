
# Wykonane polecenia: 
## 1: docker buildx create --name zadanie1_1
## 2: docker buildx use zadanie1_1
## 3: docker login
## 4: docker buildx build -t albi899/projekt1:bx --platform linux/amd64,linux/arm/v7,linux/arm64/v8 --push .