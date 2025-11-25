FROM haskell:slim

WORKDIR /app

# Install Go 1.21
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz && \
    rm go1.21.5.linux-amd64.tar.gz && \
    rm -rf /var/lib/apt/lists/*

ENV PATH=$PATH:/usr/local/go/bin

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
