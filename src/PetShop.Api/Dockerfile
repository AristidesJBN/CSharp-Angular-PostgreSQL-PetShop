FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY PetShop.Api.csproj ./
RUN dotnet restore "PetShop.Api.csproj"

COPY . .
RUN dotnet publish "PetShop.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5049
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "PetShop.Api.dll"]
