FROM node:16 AS js-build
WORKDIR /build
COPY source/DealerOn.Metaverse.Web/ClientApp/package.json source/DealerOn.Metaverse.Web/ClientApp/package-lock.json .
RUN npm install
COPY source/DealerOn.Metaverse.Web/ClientApp .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS net-build
WORKDIR /build
COPY . .
RUN dotnet publish -p:NpmBuild=false -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app  
EXPOSE 80
COPY --from=net-build /app .
COPY --from=js-build /build/dist ./wwwroot
ENTRYPOINT ["dotnet", "DealerOn.Metaverse.Web.dll"]