FROM golang:1.21

WORKDIR /app

# Install Haskell (GHC and Cabal)
RUN apt-get update && \
    apt-get install -y ghc cabal-install && \
    rm -rf /var/lib/apt/lists/*

# Install Haskell dependencies
RUN cabal update && \
    cabal install --lib --package-env /app hspec hspec-core QuickCheck

COPY runner-service/go.mod runner-service/go.sum ./
RUN go mod download

COPY runner-service/ .
RUN go build -o runner-service . && \
    chmod +x entrypoint.sh

EXPOSE 8080
CMD ["./entrypoint.sh"]
