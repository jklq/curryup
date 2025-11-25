FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o runner-service .

FROM haskell:9.4
WORKDIR /app

# Install system dependencies if needed (e.g. for network)
# haskell:9.4 is based on debian usually.

RUN cabal update && \
    cabal install --lib --package-env /app hspec hspec-core QuickCheck

COPY --from=builder /app/runner-service .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 8080
CMD ["./entrypoint.sh"]
