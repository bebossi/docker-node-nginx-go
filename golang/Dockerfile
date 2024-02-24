FROM golang:alpine AS build

WORKDIR /app

COPY main.go .

RUN go build main.go

FROM scratch

WORKDIR /home/app
COPY --from=build /app /home/app
CMD ["./main"]
