# Stage 1: build with the full .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY OnlineStore.API.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish

#stage 2: run with small ASP.NET runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "OnlineStore.API.dll"]