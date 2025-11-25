FROM golang:1.21

WORKDIR /app

# Install Haskell (GHC and Cabal)
RUN apt-get update && \
    apt-get install -y ghc cabal-install && \
    rm -rf /var/lib/apt/lists/*

# Install Haskell dependencies
RUN cabal update && \
    cabal install --lib --package-env /app hspec hspec-core QuickCheck

COPY go.mod ./
RUN go mod download

COPY . .
RUN go build -o runner-service . && \
    chmod +x entrypoint.sh

EXPOSE 8080
CMD ["./entrypoint.sh"]
